import { Component, ElementRef } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';

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
}
