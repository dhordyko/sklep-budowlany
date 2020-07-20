import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMobileComponent } from './start-mobile.component';

describe('StartMobileComponent', () => {
  let component: StartMobileComponent;
  let fixture: ComponentFixture<StartMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
