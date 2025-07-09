import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInvetoryComponent } from './feed-invetory.component';

describe('FeedInvetoryComponent', () => {
  let component: FeedInvetoryComponent;
  let fixture: ComponentFixture<FeedInvetoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedInvetoryComponent]
    });
    fixture = TestBed.createComponent(FeedInvetoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
