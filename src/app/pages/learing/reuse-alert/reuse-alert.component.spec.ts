import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseAlertComponent } from './reuse-alert.component';

describe('ReuseAlertComponent', () => {
  let component: ReuseAlertComponent;
  let fixture: ComponentFixture<ReuseAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReuseAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReuseAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
