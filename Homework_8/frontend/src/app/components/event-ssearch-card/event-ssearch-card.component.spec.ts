import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSsearchCardComponent } from './event-ssearch-card.component';

describe('EventSsearchCardComponent', () => {
  let component: EventSsearchCardComponent;
  let fixture: ComponentFixture<EventSsearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSsearchCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSsearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});