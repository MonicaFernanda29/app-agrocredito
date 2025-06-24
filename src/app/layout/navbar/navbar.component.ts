import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule , Router} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 constructor(public authService: AuthService, private router: Router) {}

   cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
