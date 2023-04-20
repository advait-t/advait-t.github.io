import { Component, Output, EventEmitter } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { SharedShowdetailsService } from '../../service/shared-showdetails.service';


@Component({
  selector: 'app-event-ssearch-card',
  templateUrl: './event-ssearch-card.component.html',
  styleUrls: ['./event-ssearch-card.component.css']
})
export class EventSsearchCardComponent {
  auto_detect = false;
  events: any[] = [];
  showtable = false;
  showdetails = false;
  suggestions: string[] = [];
  keyword = '';
  isSubmit = false;
  True: any;
  constructor(private http: HttpClient,private share_details:SharedShowdetailsService) {}

  @Output() showtableChange = new EventEmitter<boolean>();
  @Output() showdetailsChange = new EventEmitter<boolean>();

  auto_complete(keyword: string) {
    if(keyword == '' || keyword == null) {
      this.suggestions = [];
      return;
    }
    const url = `https://web-tech-hw9.uw.r.appspot.com/autocomplete?keyword=${keyword}`;
    this.http.get<any[]>(url).subscribe((response: any[]) => {
      console.log('Autocomplete')
      this.suggestions = response;
      console.log(this.suggestions)
    }, error => {
      console.error(error);
    });
  }

  autoDetect() {
    (document.getElementById('location') as HTMLInputElement).value = '';
  }

  onSubmit() {
    this.isSubmit = true;
    const keyword = (document.getElementById('keyword') as HTMLInputElement).value;
    var distance = (document.getElementById('distance') as HTMLInputElement).value;
    if (distance == '') {
      distance = '10';
    }
    const category = (document.getElementById('category') as HTMLSelectElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;

    let url = `https://web-tech-hw9.uw.r.appspot.com/events?keyword=${keyword}&distance=${distance}&category=${category}`;
    this.share_details.setShowtable(true);
    this.share_details.setShowdetails(false);

    if (this.auto_detect) {
      console.log('auto_detect is true')
      const IPINFO_API_KEY = 'a401cd8851256a';
      const IPINFO_API_URL = 'https://ipinfo.io/json';

      this.http.get(`${IPINFO_API_URL}?token=${IPINFO_API_KEY}`).subscribe((data: any) => {
        const lat = data.loc.split(',')[0];
        const lon = data.loc.split(',')[1];
        url += `&location=${lat},${lon}`;

        axios.get(url)
          .then(response => {
            console.log(response.data);
            this.events = response.data;
            console.log(this.events);
            this.showtable = true;
          })
          .catch(error => {
            console.error(error);
          });
      });
    } else {
      url += `&location=${location}`;

      axios.get(url)
        .then(response => {
          console.log(response.data);
          this.events = response.data;
          console.log(this.events);
          this.showtable = true;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  onClear(){
    this.events = [];
    this.showtable = false;
    this.showdetails = false;
    this.share_details.setShowdetails(false);
    this.share_details.setClickedClear(true);
  }
}