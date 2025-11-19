import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagemenu } from './pagemenu';

describe('Pagemenu', () => {
  let component: Pagemenu;
  let fixture: ComponentFixture<Pagemenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagemenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagemenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
