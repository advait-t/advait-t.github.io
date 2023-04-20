import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedShowdetailsService {

  showdetails: boolean = true;
  clicked_clear : boolean = false;
  showtable: boolean = true;

  constructor() { }

  getShowdetails() {
    return this.showdetails;
  } 
  
  setShowdetails(showdetails: boolean) {
    this.showdetails = showdetails;
  }

  getClickedClear() {
    return this.clicked_clear;
  }

  setClickedClear(clicked_clear: boolean) {
    this.clicked_clear = clicked_clear;
  }

  getShowtable() {
    return this.showtable;
  } 

  setShowtable(showtable: boolean) {
    this.showtable = showtable;
  }
  
}
