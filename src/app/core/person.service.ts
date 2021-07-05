import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Person } from "../shared/models/person.model";

@Injectable({
  providedIn: "root",
})
export class PersonService {

  baseUrl = environment.baseUrl;

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
    return this.http.get<Person>(this.baseUrl + id);
  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(this.baseUrl, person);
  }

  delete(id: string): Observable<Person> {
    return this.http.delete<Person>(this.baseUrl);
  }
}
