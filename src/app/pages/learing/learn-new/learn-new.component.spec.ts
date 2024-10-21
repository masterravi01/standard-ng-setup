import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnNewComponent } from './learn-new.component';

describe('LearnNewComponent', () => {
  let component: LearnNewComponent;
  let fixture: ComponentFixture<LearnNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
