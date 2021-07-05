import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Person } from "../shared/models/person.model";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  baseUrl = "http://localhost:8080/api/v1/people";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  save(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person);
  }

  read(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  readById(id: string): Observable<Person> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  update(person: Person): Observable<Person> {
    const url = `${this.baseUrl}/${person.id}`;
    return this.http.put<Person>(url, person);
  }

  delete(id: string): Observable<Person> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Person>(url);
  }
}
