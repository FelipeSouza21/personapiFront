import { ActivatedRoute, Router } from "@angular/router";
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

  id: number;
  types: Array<string>;
  register: FormGroup;

  constructor(
    public validate: ValidateFieldsService,
    public dialog: MatDialog,
    private personService: PersonService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.register.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.personService.readById(this.id)
        .subscribe((person: Person) => this.createForm(person));
    } else {
      this.createForm(this.createBlankForm());
    }

    this.types = ["HOME", "MOBILE", "COMMERCIAL"];

  }

  private createBlankForm(): Person {
    return {
      id: null,
      firstName: null,
      lastName: null,
      cpf: null,
      birthDate: null,
      phones: [{number: null,
               type: null}]
    } as Person;
  }

  private createForm(person: Person): void {
    this.register = this.fb.group({
      firstName: [
        person.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      lastName: [
        person.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      cpf: [
        person.cpf,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      birthDate: [person.birthDate],
      phoneNumber: [
        person.phones[0].number,
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(14),
        ],
      ],
      phoneType: [person.phones[0].type, [Validators.required]],
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
    if (this.id) {
      person.id = this.id;
      this.edit(person);
    } else {
      this.save(person);
    }
  }

  generatePerson(): void {
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
            hasBtnClose: true
          } as Alert
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.afterClosed().subscribe((option: boolean) => {
          if (option) {
            this.router.navigateByUrl("persons");
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
          } as Alert
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }

  private edit(person: Person): void {
    this.personService.update(person).subscribe(
      () => {
        const config = {
          data: {
            description: "Registration updated successfully!",
            btnSuccess: "Back to list view"
          } as Alert
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("persons"));
      },
      () => {
        const config = {
          data: {
            title: "Error!",
            description: "Something went wrong!",
            colorBtnSuccess: "warn",
            btnSuccess: "Close",
          } as Alert
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }


}
