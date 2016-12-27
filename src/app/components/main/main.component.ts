import { Component, OnInit } from '@angular/core';
import { ScheduleModule } from 'primeng/primeng';

@Component({
  selector: 'main',
  template: `<p-schedule 
      [header]="headerConfig"
      [defaultView]="defaultView"
    >
    </p-schedule>` 
  // templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //events: any[];

  headerConfig: any;

  defaultView: string;

  constructor() { 

  }

  ngOnInit() {
    this.defaultView = "agendaWeek";
    this.headerConfig = {
      left: false,
      center: 'title',
      right: 'prev,next today'
    };
  }

}
