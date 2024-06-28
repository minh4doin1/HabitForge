import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitFarmComponent } from './habit-farm.component';

describe('HabitFarmComponent', () => {
  let component: HabitFarmComponent;
  let fixture: ComponentFixture<HabitFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitFarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
