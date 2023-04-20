import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesTableComponent } from './favourites-table.component';

describe('FavouritesTableComponent', () => {
  let component: FavouritesTableComponent;
  let fixture: ComponentFixture<FavouritesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
