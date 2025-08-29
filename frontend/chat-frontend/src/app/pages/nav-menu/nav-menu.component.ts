import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  imports: [],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  constructor(private router: Router, private auth: AuthService, private cdr: ChangeDetectorRef) { }

  title = 'chat-frontend';
  isLoggedIn = false;

  ngOnInit(): void {
    // Verifica se o usuário está loggado
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  // Redireciona o usuário para o Chat
  goToChat() {
    this.router.navigate(["/chat"]);
  }

  // Redireciona o usuário para a Home
  goToHome() {
    this.router.navigate(["/"]);
  }

  // Logout function
  logout() {
    this.auth.logout();
    this.cdr.detectChanges();
  }
}
