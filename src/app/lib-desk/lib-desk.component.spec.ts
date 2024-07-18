import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibDeskComponent } from './lib-desk.component';

describe('LibDeskComponent', () => {
  let component: LibDeskComponent;
  let fixture: ComponentFixture<LibDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibDeskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
