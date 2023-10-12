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
            if (this.filterCriteria.filters.location === 'Indoor') {
              this.filterCriteria.filters.location = true;
            } else {
              this.filterCriteria.filters.location = false;
            }
            this.spots = data.data.filter((spot: any) => {
              
              // Access the amenities filter criteria
              const amenities = this.filterCriteria.filters.amenities;
              const filters = this.filterCriteria.filters;

              console.log('Spot:', spot);
              // Check if the spot meets any of the selected criteria
              if (
                (amenities.powerOutlets && spot.studyspot_power_outlets) &&
                (amenities.easyToFind && spot.studyspot_easy_to_find) &&
                (amenities.adaAccessible && spot.studyspot_ada) &&
                (filters.location === spot.studyspot_is_indoor) &&
                (filters.noiseLevel <= spot.studyspot_noise_level) &&
                (filters.crowdednessLevel <= spot.studspot_crowdedness_level) &&
                (filters.strongWifi === spot.studyspot_strong_wifi)
              ) {
                return true; // The spot meets at least one selected criterion
              }

              return false; // The spot does not meet any selected criteria
            });
          }
    }},
    (error) => {
      console.error('Error fetching StudySpots:', error);
    }
  );
}

search() {
  this.initializeComponent();
  console.log('Search Query:', this.searchQuery);
}
handleSearchQuery(query: string) {
  this.searchQuery = query;
}
}
