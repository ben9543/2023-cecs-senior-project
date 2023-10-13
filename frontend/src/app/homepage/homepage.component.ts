import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { StudyspotService } from '../studyspot.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnChanges {
  spots: any[] = [];
  filterCriteria: any;
  searchQuery: string = '';

  constructor(private studyspotService: StudyspotService) {}

  ngOnInit() {
    this.initializeComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['filterCriteria']) {
      this.initializeComponent();
    }
  }

  // Function to handle filter criteria when emitted
  handleFilterCriteria(criteria: any) {
    this.filterCriteria = criteria;
    this.initializeComponent();
  }


// Function to initialize the component and apply filters
private initializeComponent() {
  this.studyspotService.getAllStudyspots().subscribe(
    (data: any) => {
      if (this.searchQuery) {
        // Filter spots based on the search query
        this.spots = data.data.filter((spot: any) => {
          return spot.studyspot_name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
          if (this.filterCriteria === undefined) {
            this.spots = data.data;
            console.log('Spots:', this.spots);
          } else {
            
            this.spots = data.data.filter((spot: any) => {
              
              // Access the amenities filter criteria
              const flattenedData = this.flattenObject(this.filterCriteria);
              
              console.log('Flattened Data:', flattenedData);
              // Check if the spot meets any of the selected criteria
              for (const key in flattenedData) {
                if (flattenedData[key] !== null) {
                  if (spot[key] !== flattenedData[key]) {
                    return false; // Doesn't meet the criteria
                  }
                }
              }
  
              return true; // Meets all selected criteria

            });
          }
    }},
    (error) => {
      console.error('Error fetching StudySpots:', error);
    }
  );
}


flattenObject(obj: any, parentKey = ''): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const nestedObject = this.flattenObject(obj[key], newKey);
      Object.assign(result, nestedObject);
    } else if (obj[key] !== null && obj[key] !== '') {
      if (key === 'location') {
        result[newKey] = obj[key].toLowerCase() === 'indoor';
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  console.log('Result:', result);
  return result;
}


search() {
  this.initializeComponent();
  console.log('Search Query:', this.searchQuery);
}
handleSearchQuery(query: string) {
  this.searchQuery = query;
}

}
