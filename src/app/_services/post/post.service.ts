import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from "../../_models";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  getAllPosts(){
    const url : string = `${environment.apiUrl}posts`;
    let options = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<Post[]>(url,options).toPromise();
  }
}
