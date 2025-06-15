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
  nombre = 'Juani Rodríguez';
  correo = 'juani@agrofacil.com';
  editandoPerfil = false;

  editarPerfil() {
    this.editandoPerfil = true;
  }

  cancelarEdicion() {
    this.editandoPerfil = false;
  }

  guardarCambios() {
    // Aquí podrías hacer una llamada al backend para actualizar los datos
    console.log('Datos guardados:', this.nombre, this.correo);
    this.editandoPerfil = false;
  }
}
