import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Input() searchQuery: string | undefined;
  @Output() searchQueryEvent = new EventEmitter<string>();

  showingOverlay: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    document.addEventListener('click', this.onClickOutside.bind(this));
  }
  
  showOverlay() {
    this.showingOverlay = !this.showingOverlay;
  }
  
  onClickOutside(event: { target: any; }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showingOverlay = false;
    }
  }
  @Input() filterCriteria: any;
  @Output() filterCriteriaEvent = new EventEmitter<any>();
  
  // Handle the filter criteria emitted by the search-filter component
  handleFilterCriteria(criteria: any) {
    this.filterCriteriaEvent.emit(criteria);
    this.showingOverlay = false;
    console.log('Filter Criteria received in SearchBar:', criteria);
  }

  search() {
    this.searchQueryEvent.emit(this.searchQuery);
  }
}
