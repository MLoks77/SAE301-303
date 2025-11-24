import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ugc } from './ugc';

describe('Ugc', () => {
  let component: Ugc;
  let fixture: ComponentFixture<Ugc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ugc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ugc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
