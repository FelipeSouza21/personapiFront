import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCrudComponent } from './person-crud.component';

describe('PersonCrudComponent', () => {
  let component: PersonCrudComponent;
  let fixture: ComponentFixture<PersonCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
