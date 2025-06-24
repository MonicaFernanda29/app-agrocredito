import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPayload } from '../../core/models/response/UserPayloand';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: UserPayload | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUserData();
  }
}
