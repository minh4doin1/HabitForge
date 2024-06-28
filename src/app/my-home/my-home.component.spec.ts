import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHomeComponent } from './my-home.component';

describe('MyHomeComponent', () => {
  let component: MyHomeComponent;
  let fixture: ComponentFixture<MyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
