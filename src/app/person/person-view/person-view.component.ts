import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/core/person.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Person } from 'src/app/shared/models/person.model';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  person: Person;
  id: number;

  constructor(public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private personService: PersonService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.view();
  }

  delete(): void {
    const config = {
      data: {
        title: "Are you sure?",
        btnSuccess: "Yes",
        btnCancel: "Cancel",
        colorBtnSuccess: "warn",
        colorBtnCancel: "primary",
        hasBtnClose: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((option: boolean) => {
      if (option) {
        this.personService.delete(this.id)
          .subscribe(() => this.router.navigateByUrl("/persons"));
      }
    });
  }

  private view(): void {
    this.personService.readById(this.id).subscribe((person: Person) =>
      this.person = person)
  }

  private edit(): void {
    this.router.navigateByUrl("/persons/update/" + this.id);
  }

  private back(): void {
    this.router.navigateByUrl("persons");  
  }

}
