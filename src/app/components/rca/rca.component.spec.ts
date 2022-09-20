import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCAComponent } from './rca.component';

describe('RCAComponent', () => {
  let component: RCAComponent;
  let fixture: ComponentFixture<RCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RCAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
