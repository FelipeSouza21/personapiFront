import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../shared/material/material.module";
import { FieldsModule } from "../shared/components/fields/fields.module";
import { PersonCreateComponent } from "./person-create/person-create.component";
import { PersonReadComponent } from "./person-read/person-read.component";
import { PersonCrudComponent } from "./person-crud/person-crud.component";
import { PersonViewComponent } from './person-view/person-view.component';

@NgModule({
  declarations: [
    PersonCreateComponent,
    PersonReadComponent,
    PersonCrudComponent,
    PersonViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FieldsModule
  ],
})
export class PersonModule {}
