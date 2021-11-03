import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiLayerComponent } from './poi-layer.component';

describe('PoiLayerComponent', () => {
  let component: PoiLayerComponent;
  let fixture: ComponentFixture<PoiLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
