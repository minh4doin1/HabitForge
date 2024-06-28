import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestscapeComponent } from './questscape.component';

describe('QuestscapeComponent', () => {
  let component: QuestscapeComponent;
  let fixture: ComponentFixture<QuestscapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestscapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
