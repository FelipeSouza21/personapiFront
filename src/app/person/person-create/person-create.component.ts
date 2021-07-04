import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PersonService } from "src/app/core/person.service";
import { Person } from "../../shared/models/person.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidateFieldsService } from "src/app/shared/components/fields/validate-fields.service";

@Component({
  selector: "app-person-create",
  templateUrl: "./person-create.component.html",
  styleUrls: ["./person-create.component.css"],
})
export class PersonCreateComponent implements OnInit {

  types: Array<string>;

  register: FormGroup;

  person: Person = {
    firstName: "",
    lastName: "",
    cpf: "",
    birthDate: "",
    phones: [{ number: null, type: null }],
  };

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private router: Router,
    public validate: ValidateFieldsService
  ) {}

  get f() {
    return this.register.controls;
  }

  ngOnInit(): void {


    this.types = ["HOME", "MOBILE", "COMMERCIAL"];

    this.register = this.fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      cpf: [
        "",
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      birthDate: [""],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(14),
        ],
      ],
      phoneType: ["", [Validators.required]],
    });
  }

  createPerson(): void {
    console.log(this.person);
    this.personService.create(this.person).subscribe(() => {
      this.personService.showMessage("Success!");
      this.router.navigate(["/persons"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/persons"]);
  }

  submit(): void {
    this.register.markAllAsTouched();
  }
}
