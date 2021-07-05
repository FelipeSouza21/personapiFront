import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { PersonService } from "src/app/core/person.service";
import { Person } from "../../shared/models/person.model";
import { ValidateFieldsService } from "src/app/shared/components/fields/validate-fields.service";
import { AlertComponent } from "src/app/shared/components/alert/alert.component";
import { Alert } from "src/app/shared/models/alert";

@Component({
  selector: "app-person-create",
  templateUrl: "./person-create.component.html",
  styleUrls: ["./person-create.component.css"],
})
export class PersonCreateComponent implements OnInit {
  types: Array<string>;

  register: FormGroup;

  constructor(
    public validate: ValidateFieldsService,
    public dialog: MatDialog,
    private personService: PersonService,
    private fb: FormBuilder,
    private router: Router
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

  cancel(): void {
    this.router.navigate(["/persons"]);
  }

  submit(): void {
    this.register.markAllAsTouched();
    if (this.register.invalid) {
      return;
    }

    const person: Person = {
      firstName: this.register.value.firstName,
      lastName: this.register.value.lastName,
      cpf: this.register.value.cpf,
      birthDate: this.register.value.birthDate,
      phones: [
        {
          number: this.register.value.phoneNumber,
          type: this.register.value.phoneType,
        },
      ],
    } as Person;
    console.log(person);
    this.save(person);
  }

  restartForm(): void {
    this.register.reset();
  }

  private save(person: Person): void {
    this.personService.save(person).subscribe(
      () => {
        const config = {
          data: {
            btnSuccess: "Back to list view",
            btnCancel: "Add new person",
            colorBtnCancel: "primary",
            hasBtnClose: true,
          } as Alert,
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.afterClosed().subscribe((option: boolean) => {
          if (option) {
            this.router.navigateByUrl("/persons");
          } else {
            this.restartForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            title: "Error!",
            description: "Something went wrong!",
            colorBtnSuccess: "warn",
            btnSuccess: "Close",
          } as Alert,
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }
}
