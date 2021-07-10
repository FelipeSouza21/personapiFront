import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonCreateComponent } from './person/person-create/person-create.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PersonCrudComponent } from './person/person-crud/person-crud.component';
import { PersonModule } from './person/person.module';
import { PersonViewComponent } from './person/person-view/person-view.component';

const routes: Routes = [
  {
  path: "",
  component: HomeComponent
  },
  {
    path: "persons",
    component: PersonCrudComponent
  },
  {
    path: "persons/update/:id",
    component: PersonCreateComponent
  },
  {
    path: "persons/create",
    component: PersonCreateComponent
  }, 
  {
    path: "persons/delete",
    component: PersonCreateComponent
  },
  {
    path: "persons/view/:id",
    component: PersonViewComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PersonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
