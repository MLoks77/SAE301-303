import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Utilisationcookie } from './utilisationcookie';

describe('Utilisationcookie', () => {
  let component: Utilisationcookie;
  let fixture: ComponentFixture<Utilisationcookie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Utilisationcookie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Utilisationcookie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
