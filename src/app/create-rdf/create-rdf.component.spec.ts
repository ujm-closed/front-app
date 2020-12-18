import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRdfComponent } from './create-rdf.component';

describe('CreateRdfComponent', () => {
  let component: CreateRdfComponent;
  let fixture: ComponentFixture<CreateRdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
