import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];
