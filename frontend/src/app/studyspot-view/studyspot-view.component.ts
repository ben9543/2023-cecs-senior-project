import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-studyspot-view',
  templateUrl: './studyspot-view.component.html',
  styleUrls: ['./studyspot-view.component.css']
})
export class StudyspotViewComponent {
  myControl = new FormControl('');
    // can list study spots to recommend here
    options: string[] = [];
  }

