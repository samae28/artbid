import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddArtworkPage } from './add-artwork.page';

describe('AddArtworkPage', () => {
  let component: AddArtworkPage;
  let fixture: ComponentFixture<AddArtworkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddArtworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
