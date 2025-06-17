import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  nombre = 'Juani Pérez';
  correo = 'juanicorreo.com';
  telefono = '3001234567';
  direccion = 'Finca El Progreso, Tolima';
  editandoPerfil = false;

  pedidos = [
    { id: 1234, fecha: '05/06/2025', total: 150000 },
    { id: 1201, fecha: '01/06/2025', total: 80000 }
  ];

  editarPerfil() {
    this.editandoPerfil = true;
  }

  cancelarEdicion() {
    this.editandoPerfil = false;
  }

  guardarCambios() {
    console.log('Datos guardados:', this.nombre, this.correo, this.telefono, this.direccion);
    this.editandoPerfil = false;
  }
}