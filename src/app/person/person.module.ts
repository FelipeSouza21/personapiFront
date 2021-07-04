import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../shared/material/material.module";
import { PersonCreateComponent } from "./person-create/person-create.component";
import { PersonReadComponent } from "./person-read/person-read.component";
import { PersonCrudComponent } from "./person-crud/person-crud.component";
import { RouterModule } from "@angular/router";
import { FieldsModule } from "../shared/components/fields/fields.module";

@NgModule({
  declarations: [
    PersonCreateComponent,
    PersonReadComponent,
    PersonCrudComponent,
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
