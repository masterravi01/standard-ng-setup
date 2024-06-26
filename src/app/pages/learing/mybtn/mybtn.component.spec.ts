import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybtnComponent } from './mybtn.component';

describe('MybtnComponent', () => {
  let component: MybtnComponent;
  let fixture: ComponentFixture<MybtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MybtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
