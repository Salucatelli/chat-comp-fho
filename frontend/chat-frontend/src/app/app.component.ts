import { Component } from '@angular/core';
import { RouterOutlet, Router } from "@angular/router";
import { AuthService } from './services/auth.service';
import { NavMenuComponent } from "./pages/nav-menu/nav-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
