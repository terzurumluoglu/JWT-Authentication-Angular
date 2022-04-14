import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/_models';
import { AuthenticationService, PostService } from 'src/app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts : Post[];
  constructor(
    private router : Router,
    private _auth : AuthenticationService,
    private _post : PostService
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  async getAllPosts(){
    this.posts = await this._post.getAllPosts();
  }

  logout(){
    this._auth.logout();
    this.router.navigate(['/login']);
  }

}
