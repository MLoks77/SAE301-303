import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pointsretraits } from './pointsretraits';

describe('Pointsretraits', () => {
  let component: Pointsretraits;
  let fixture: ComponentFixture<Pointsretraits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pointsretraits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pointsretraits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
