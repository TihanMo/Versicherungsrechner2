import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersicherungsrechnerComponent } from './versicherungsrechner.component';

describe('VersicherungsrechnerComponent', () => {
  let component: VersicherungsrechnerComponent;
  let fixture: ComponentFixture<VersicherungsrechnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersicherungsrechnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersicherungsrechnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
