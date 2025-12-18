import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mdpoublie } from './mdpoublie';

describe('Mdpoublie', () => {
  let component: Mdpoublie;
  let fixture: ComponentFixture<Mdpoublie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mdpoublie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mdpoublie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
