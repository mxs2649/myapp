/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EschermapComponent } from './eschermap.component';

describe('EschermapComponent', () => {
  let component: EschermapComponent;
  let fixture: ComponentFixture<EschermapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EschermapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EschermapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
