import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonCreateComponent } from './person/person-create/person-create.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PersonCrudComponent } from './person/person-crud/person-crud.component';
import { PersonReadComponent } from './person/person-read/person-read.component';
import { PersonModule } from './person/person.module';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PersonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
