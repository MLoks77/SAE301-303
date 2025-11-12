import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inscconnex } from './inscconnex';

describe('Inscconnex', () => {
  let component: Inscconnex;
  let fixture: ComponentFixture<Inscconnex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inscconnex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inscconnex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
