import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/request/login-request.model';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const email = (form.querySelector('#email') as HTMLInputElement).value.trim();
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    if (!email || !password) {
      alert('❗ Ingresa correo y contraseña.');
      return;
    }

    const request: LoginRequest = { email, password };

    this.authService.loginUser(request).subscribe({
      next: () => {
        alert('✅ Inicio de sesión exitoso');
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Credenciales inválidas.';
        alert('❌ Error al iniciar sesión: ' + msg);
      }
    });
  }
}
