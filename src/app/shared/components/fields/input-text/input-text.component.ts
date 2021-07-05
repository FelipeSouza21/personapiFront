import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() label: string;

  constructor(public validate: ValidateFieldsService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName]
  }

}
