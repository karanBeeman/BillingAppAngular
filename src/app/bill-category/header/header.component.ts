import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mediaSub!: Subscription;
  private activeMediaQuery = '';
  deviceXs!: boolean;
  toggleActive = false;
  mediaObserver: any;

  constructor() { }

  ngOnInit(): void {
 
  }

}
