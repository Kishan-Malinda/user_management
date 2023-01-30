import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeLink : any; 
  ngOnInit() : void{
    this.activeLink = '/';
  }
  navigationLinks = [ {navItem: 'Home', navLink : '/'}, 
          {navItem: 'Users', navLink : 'users'},
          {navItem: 'Search', navLink : 'search'},
          ];

  
}
