import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  @Input() customWidth: string = '300px';
  @Output() applyFiltersEvent = new EventEmitter<any>();

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      studyspot_is_indoor: [''],
      filters: this.formBuilder.group({
        studyspot_noise_level: [],
        studspot_crowdedness_level: [],
        amenities: this.formBuilder.group({
          studyspot_power_outlets: [],
          studyspot_strong_wifi: [],
          studyspot_ada: [],
          studyspot_easy_to_find: []
        })
      }),
      temperature: ['']
    });
  }

  applyFilters(filterCriteria: any) {
    this.applyFiltersEvent.emit(filterCriteria);
    console.log('Filter Criteria sent from SearchFilter:', filterCriteria);
  }

}
