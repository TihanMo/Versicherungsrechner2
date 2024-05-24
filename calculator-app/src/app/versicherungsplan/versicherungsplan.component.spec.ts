import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersicherungsplanComponent } from './versicherungsplan.component';

describe('VersicherungsplanComponent', () => {
  let component: VersicherungsplanComponent;
  let fixture: ComponentFixture<VersicherungsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersicherungsplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersicherungsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
