import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimFocusComponent } from './boletim-focus.component';

describe('BoletimFocusComponent', () => {
  let component: BoletimFocusComponent;
  let fixture: ComponentFixture<BoletimFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoletimFocusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletimFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
