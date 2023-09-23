import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  @Input() customWidth: string = '300px';
  indoor: boolean = false;
  outdoor: boolean = false;
  noiseLevel: number = 1;
  crowdednessLevel: number = 1;
  powerOutlets: boolean = false;
  strongWifi: boolean = false;
  adaAccessible: boolean = false;
  easyToFind: boolean = false;
  temperature: string = 'Warm';
}
