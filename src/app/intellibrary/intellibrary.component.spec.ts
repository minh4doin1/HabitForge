import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntellibraryComponent } from './intellibrary.component';

describe('IntellibraryComponent', () => {
  let component: IntellibraryComponent;
  let fixture: ComponentFixture<IntellibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntellibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntellibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
