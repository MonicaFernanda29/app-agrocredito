import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/request/register-request.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registrar(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const nombre = (form.querySelector('#nombre') as HTMLInputElement).value.trim();
    const email = (form.querySelector('#email') as HTMLInputElement).value.trim();
    const telefono = (form.querySelector('#telefono') as HTMLInputElement).value.trim();
    const ciudad = (form.querySelector('#ciudad') as HTMLInputElement).value.trim();
    const direccion = (form.querySelector('#direccion') as HTMLInputElement).value.trim();
    const password = (form.querySelector('#password') as HTMLInputElement).value;
    const confirmPassword = (form.querySelector('#confirmPassword') as HTMLInputElement).value;

    if (!nombre || !email || !telefono || !ciudad || !direccion || !password || !confirmPassword) {
      alert('❗ Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      alert('❌ Las contraseñas no coinciden.');
      return;
    }

    const request: RegisterRequest = {
      name: nombre,
      email: email,
      telefono: telefono,
      ciudad: ciudad,
      direccion: direccion,
      password: password,
      rol: 'Cliente' // valor por defecto
    };

    this.authService.registerUser(request).subscribe({
      next: () => {
        alert('✅ Usuario registrado con éxito');
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        const mensaje = err?.error?.message || 'Ocurrió un error. Intenta más tarde.';
        alert('❌ Error al registrar: ' + mensaje);
      }
    });
  }
}
