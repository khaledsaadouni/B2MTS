import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCalndrierComponent } from './test-calndrier.component';

describe('TestCalndrierComponent', () => {
  let component: TestCalndrierComponent;
  let fixture: ComponentFixture<TestCalndrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCalndrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCalndrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
