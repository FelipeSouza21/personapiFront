import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PersonService } from "src/app/core/person.service";
import { Person } from "../../shared/models/person.model";
import { Phones } from "../../shared/models/phones.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-person-create",
  templateUrl: "./person-create.component.html",
  styleUrls: ["./person-create.component.css"],
})
export class PersonCreateComponent implements OnInit {
  types = ["HOME", "MOBILE", "COMMERCIAL"];

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
    private router: Router
  ) {}

  ngOnInit(): void {
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
          Validators.minLength(15),
          Validators.maxLength(15),
        ],
      ],
      birthDate: [""],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(16),
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

  submit(): void {}
}
