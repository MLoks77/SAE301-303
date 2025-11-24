import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plansite } from './plansite';

describe('Plansite', () => {
  let component: Plansite;
  let fixture: ComponentFixture<Plansite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plansite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Plansite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
