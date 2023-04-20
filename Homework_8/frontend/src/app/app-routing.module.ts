// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouritesTableComponent } from './components/favourites-table/favourites-table.component';
import { EventSsearchCardComponent } from './components/event-ssearch-card/event-ssearch-card.component';

const routes: Routes = [
  // { path: '', redirectTo: '/search', pathMatch: 'full' }, // Redirect to default route
  { path: '', component: EventSsearchCardComponent }, // Route for Search card
  { path: 'favourites', component: FavouritesTableComponent }, // Route for Favourite component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

