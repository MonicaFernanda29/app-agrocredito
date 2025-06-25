
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPayload } from '../../core/models/response/UserPayloand';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserUpdateRequest } from '../../core/models/request/user-update-request.model';
import { PasswordChangeRequest } from '../../core/models/request/password-change-request.model';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,  FormsModule, ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: UserPayload | null = null;
  usuarioEdit: any = {};
  password = { old: '', new: ' ' };

  mostrarEditar = false;
  mostrarPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUserData();
    if (this.usuario) {
      this.usuarioEdit = { ...this.usuario };
    }
  }

   
editarPerfil() {
  const payload: UserUpdateRequest = {
    id: this.usuario?.id!,
    name: this.usuarioEdit.name,
    email: this.usuarioEdit.email,
    telefono: this.usuarioEdit.telefono,
    ciudad: this.usuarioEdit.ciudad,
    direccion: this.usuarioEdit.direccion,
  };

  this.authService.actualizarPerfil(payload).subscribe({
    next: () => {
      alert('✅ Perfil actualizado');
      this.mostrarEditar = false;
    },
    error: err => {
      console.error(err);
      alert('❌ Error actualizando el perfil');
    }
  });
}

cambiarPassword() {
  const payload: PasswordChangeRequest = {
    id: this.usuario?.id!,
    oldPassword: this.password.old,
    newPassword: this.password.new,
  };

  this.authService.cambiarPassword(payload).subscribe({
    next: () => {
      alert('🔐 Contraseña actualizada');
      this.mostrarPassword = false;
    },
    error: err => {
      console.error(err);
      alert('❌ Error al cambiar la contraseña');
    }
  });
}
}
