import { Component, Input } from '@angular/core';
import axios from 'axios';

import { SharedShowdetailsService } from '../../service/shared-showdetails.service';



@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})

export class EventsTableComponent {
  @Input() events: any[] = [];
  @Input() showtable: boolean = true;

  constructor(private share_details:SharedShowdetailsService) {
    this.share_details.setShowdetails(false);
  }

  ngOnChanges() {
    this.showdetails = this.share_details.getShowdetails();
    this.showtable  = this.share_details.getShowtable();
  }

  event_details: any;
  artist_info: any[] = [];
  venue_information: any[] = [];
  showdetails = false;
  artist_details:any =[];
  resp:any = [];


  spotify_artist_info(artist_name: any) {
    var artist_info_Data: any;
    if (artist_name[0] === 'No Music') {
      this.artist_info = [];
    }
    else {
      
      for(var i=0;i<artist_name.length;i++){
        const url = `https://web-tech-hw9.uw.r.appspot.com/spotify_artist_info?artist_name=${artist_name[i]}`;
        axios.get(url)
          .then(response => {
            console.log('SPOTIFY', response.data);
            this.artist_details.push(response.data);
          });
      }
      this.showtable = false;
      this.showdetails = true;
    }
    console.log('ARTIST', artist_name);
    console.log(this.artist_details);
  }

  venue_data_info(venue_name: any) {
    console.log(venue_name);
    const url = `https://web-tech-hw9.uw.r.appspot.com/venue_details?venue_name=${venue_name}`;

    axios.get(url)
      .then(response => {
        // console.log(response.data);
        this.venue_information = response.data;
        console.log('VENUE', this.venue_information);
      });
      this.showtable = false;
      this.showdetails = true;
  }

  clickEventName(event_id: any) {
    this.artist_details = [];
    this.artist_info = [];
    console.log(event_id);
    const url = `https://web-tech-hw9.uw.r.appspot.com/event_details?event_id=${event_id}`;
      axios.get(url)
      .then(response => {
        this.event_details = response.data;
        this.event_details.isFav = false;
        var existingFavEventsForIcon= localStorage.getItem('favourite_events') || "";
        var favEventsArrayForIcon = JSON.parse(existingFavEventsForIcon);
        for(var i=0;i<favEventsArrayForIcon.length;i++){
          if(this.event_details.name1 === favEventsArrayForIcon[i].name){
            this.event_details.isFav = true;
          }
        }
        console.log(this.event_details);
        this.venue_data_info(this.event_details.venue);
        
        console.log(this.event_details.music_related)
        var artist_info_list = [];

        if (this.event_details.music_related === "Music") {
          console.log("Music");
          this.spotify_artist_info(this.event_details.artist_list);
        }
        else {
          console.log("No Music");
          this.spotify_artist_info(['No Music']);
        }
        
      });
      this.showtable = false;
      this.showdetails = true;
      this.share_details.setShowdetails(true);
  }

  updatetable(showtable:any){
    console.log("In Parent Component: ", showtable);
    this.showtable = showtable;
  }

  updatedetails(showdetails:any){
    console.log("In Parent Component: ", showdetails);
    this.showdetails = showdetails;
  }
} 
