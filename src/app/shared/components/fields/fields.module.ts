import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "./input-text/input-text.component";
import { InputDateComponent } from "./input-date/input-date.component";
import { MaterialModule } from "../../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputCpfComponent } from './input-cpf/input-cpf.component';
import { InputPhoneComponent } from './input-phone/input-phone.component';
import { InputSelectComponent } from './input-select/input-select.component';

@NgModule({
  declarations: [
    InputTextComponent, 
    InputDateComponent, 
    InputCpfComponent, 
    InputPhoneComponent, 
    InputSelectComponent],
  imports: [
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule, 
    FormsModule],
  exports: [
    InputTextComponent, 
    InputDateComponent, 
    InputCpfComponent, 
    InputPhoneComponent, 
    InputSelectComponent
  ]
})
export class FieldsModule {}
