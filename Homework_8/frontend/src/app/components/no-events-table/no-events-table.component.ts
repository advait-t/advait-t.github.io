import { Component, Input } from '@angular/core';
import { SharedShowdetailsService } from '../../service/shared-showdetails.service';

@Component({
  selector: 'app-no-events-table',
  templateUrl: './no-events-table.component.html',
  styleUrls: ['./no-events-table.component.css']
})
export class NoEventsTableComponent {
  @Input() showtable: boolean = true;

  constructor(private share_details:SharedShowdetailsService) {
    this.share_details.setShowdetails(false);
  }
}

