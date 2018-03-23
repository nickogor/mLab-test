import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  private mLabUrl: string = "https://api.mlab.com/api/1";
  private apiKey: string = "DdhniF9NPkr9aToHeiaw3bjLAk4lydWM";
  private dbName: string = "mlab-test";
  private table: string = "user";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.mLabUrl+"/databases/"+this.dbName+"/collections/user/?apiKey="+this.apiKey).pipe(
        tap(heroes => console.log(`fetched heroes`)),
        catchError(this.handleError('getUsers', []))
    );
  }

  addUser(user: object){
    this.http.post(this.mLabUrl+"/databases/"+this.dbName+"/collections/user/?apiKey="+this.apiKey, user).subscribe();
  }

  delUser(user: User){
    this.http.delete(this.mLabUrl+"/databases/"+this.dbName+"/collections/user/"+ user._id+"?apiKey="+this.apiKey).subscribe();
  }

  upUser(user: User){
    this.http.put(this.mLabUrl+"/databases/"+this.dbName+"/collections/user/"+user._id+"?apiKey="+this.apiKey, user).subscribe();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
