import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkDetailPage } from './artwork-detail.page';

describe('ArtworkDetailPage', () => {
  let component: ArtworkDetailPage;
  let fixture: ComponentFixture<ArtworkDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArtworkDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
