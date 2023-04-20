import { Component } from '@angular/core';


@Component({
  selector: 'app-favourites-table',
  templateUrl: './favourites-table.component.html',
  styleUrls: ['./favourites-table.component.css']

})
export class FavouritesTableComponent {
  data: any[] = [];
  ngOnInit(): void {
    const localStorageData = localStorage.getItem('favourite_events');
    if (localStorageData) {
      this.data = JSON.parse(localStorageData);
    }
  }

  removeFavourite(event: any) {
    this.data = this.data.filter((item) => item.name !== event);
    localStorage.setItem('favourite_events', JSON.stringify(this.data));
    alert("Removed from favourites!");
  }
  
}
