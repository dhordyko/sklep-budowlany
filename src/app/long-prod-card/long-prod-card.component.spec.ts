import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongProdCardComponent } from './long-prod-card.component';

describe('LongProdCardComponent', () => {
  let component: LongProdCardComponent;
  let fixture: ComponentFixture<LongProdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongProdCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongProdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
