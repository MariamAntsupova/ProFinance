import { Component } from '@angular/core';
import { RouterOutlet,Router,NavigationEnd } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Home } from "./components/home/home";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, NavBar, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pro-finance';
  isHomePage = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });
  }
}
