import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEventsTableComponent } from './no-events-table.component';

describe('NoEventsTableComponent', () => {
  let component: NoEventsTableComponent;
  let fixture: ComponentFixture<NoEventsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoEventsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoEventsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
