import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/core/person.service';
import { Person } from '../../shared/models/person.model';

@Component({
  selector: 'app-person-read',
  templateUrl: './person-read.component.html',
  styleUrls: ['./person-read.component.css']
})
export class PersonReadComponent implements OnInit {

  persons: Person[]
  displayedColumns = ["id", "firstName", "lastName", "cpf", "action"]

  constructor(private personService: PersonService) { }

  ngOnInit(): void {

    DataSource;
    this.personService.read().subscribe(persons => {
      this.persons = persons
    })
  }

}
