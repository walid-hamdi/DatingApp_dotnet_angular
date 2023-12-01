import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorServerComponent } from './error-server.component';

describe('ErrorServerComponent', () => {
  let component: ErrorServerComponent;
  let fixture: ComponentFixture<ErrorServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorServerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
