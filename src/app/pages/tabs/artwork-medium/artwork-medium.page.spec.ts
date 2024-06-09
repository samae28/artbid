import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkMediumPage } from './artwork-medium.page';

describe('ArtworkMediumPage', () => {
  let component: ArtworkMediumPage;
  let fixture: ComponentFixture<ArtworkMediumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArtworkMediumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
