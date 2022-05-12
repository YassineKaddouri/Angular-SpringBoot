import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // images = ["/../../assets/images/imagesite.jpg", "/../../assets/images/de.jpg", "/../../assets/images/imagesite.jpg"];
  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  signup(){
  this.router.navigate(['login']);
  }
}

