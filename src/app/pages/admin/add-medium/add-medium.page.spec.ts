import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMediumPage } from './add-medium.page';

describe('AddMediumPage', () => {
  let component: AddMediumPage;
  let fixture: ComponentFixture<AddMediumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddMediumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
