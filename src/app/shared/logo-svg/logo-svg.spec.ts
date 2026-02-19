import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSvg } from './logo-svg';

describe('LogoSvg', () => {
  let component: LogoSvg;
  let fixture: ComponentFixture<LogoSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
