import {Component, ViewChild, Input, ApplicationRef} from '@angular/core';
import { MdSidenav } from '@angular/material';
import {PgService} from './services/pg-service/pg-service';
import {NavigationService} from './services/navigation/navigation.service';
import {LocalStorageService} from './services/local-storage/local-storage.service';

declare var saveAs;
declare var JSZip;

@Component({
  selector: 'pr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public navigation: NavigationService, private pgService: PgService, private locStore: LocalStorageService){
      navigation.currentTitle = 'Variation database';
  }
  
  
}
