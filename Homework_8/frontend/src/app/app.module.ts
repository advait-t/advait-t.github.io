import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventSsearchCardComponent } from './components/event-ssearch-card/event-ssearch-card.component';

// import forms module to use ngModel
import { FormsModule } from '@angular/forms';
import { NavigationButtonsComponent } from './components/navigation-buttons/navigation-buttons.component';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavouritesTableComponent } from './components/favourites-table/favourites-table.component';
import { NoEventsTableComponent } from './components/no-events-table/no-events-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps'
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    EventSsearchCardComponent,
    NavigationButtonsComponent,
    EventsTableComponent,
    DetailsCardComponent,
    FavouritesTableComponent,
    NoEventsTableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    NgbTypeaheadModule,
    MatProgressSpinnerModule,
    NgbModule,
    GoogleMapsModule,
    MdbCarouselModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }