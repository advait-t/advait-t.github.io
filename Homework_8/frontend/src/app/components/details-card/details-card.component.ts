import { Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SharedShowdetailsService } from '../../service/shared-showdetails.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent {
  @Input() showdetails: boolean = true;
  @Input() event_details: any;
  @Input() clear: boolean = false;
  @Input() artist_info: any;
  @Input() venue_info: any;
  @Output() showdetailsChange = new EventEmitter<boolean>();
  @Output() showtableChange = new EventEmitter<boolean>();
  showtable:any =false;
  html_string: any;
  favourite_events: any[] = [];
  google_map_toggle: boolean = false;
  lat: any;
  lng: any;
  marker: google.maps.LatLngLiteral[] = [];
  carousel: any;
  showMore1: boolean = false;
  showMore2: boolean = false;
  showMore3: boolean = false;
  
  constructor(private share_details:SharedShowdetailsService, private modalService: NgbModal) { 
  }

  @ViewChild('google_maps_modal') google_maps_modal!: TemplateRef<any>;


  openGoogleMapsModal() {
    const options_modal: NgbModalOptions = {backdrop: false}
    const modalRef = this.modalService.open(this.google_maps_modal, options_modal);
    this.lat = this.venue_info.latitude;
    this.lng = this.venue_info.longitude;
  }

  toggleFavorite(): void {
    const favEvent = {
      name: this.event_details.name1,
      genre: this.event_details.genre,
      date: this.event_details.date,
      venue: this.event_details.venue,
      segment: this.event_details.segment,
      subgenre: this.event_details.subgenre,
      type: this.event_details.type,
      subtype: this.event_details.subtype
    };
    
  
    const existingFavEvents = localStorage.getItem('favourite_events') || "";
    let favEventsArray = [];
    if (existingFavEvents.length > 0) {
      favEventsArray = JSON.parse(existingFavEvents);
      let flag = false;
      for(let i=0; i<favEventsArray.length; i++) {
        if(favEventsArray[i].name === favEvent.name) {
          flag = true;
          break;
        }
      }    
      if(!flag) {
        favEventsArray.push(favEvent);
        localStorage.setItem('favourite_events', JSON.stringify(favEventsArray));
        this.event_details.isFav = true;
        alert("Event added to favourites!");
      } 
      else {
        this.event_details.isFav = false;
        favEventsArray = favEventsArray.filter((item:any) => item.name !== favEvent.name);
        localStorage.setItem('favourite_events', JSON.stringify(favEventsArray));
        alert("Removed from favourites!");
      }
    } else {
      favEventsArray.push(favEvent);
      localStorage.setItem('favourite_events', JSON.stringify(favEventsArray));
    }
   
    console.log("favEventsArray String", JSON.stringify(favEventsArray));
    console.log('FAVOURITE', JSON.parse(localStorage.getItem('favourite_events') || ""));
  }


  ngDoCheck(){
    if(this.share_details.getClickedClear() == true){
      this.showdetails = false;
      this.share_details.setClickedClear(false);
      console.log('clear is now '  +  this.share_details.getClickedClear());
    }
    if(true){
      this.showdetails= this.share_details.getShowdetails();
    }
  }

  goBack() {
    this.showdetails = false;
    this.showtable  = true;
    this.showtableChange.emit(this.showtable);
    this.showdetailsChange.emit(this.showdetails);
    this.event_details = [];
    this.artist_info = [];
    this.share_details.setShowdetails(false);
    this.showMore1 = false;
    this.showMore2 = false;
    this.showMore3 = false;
  }
}