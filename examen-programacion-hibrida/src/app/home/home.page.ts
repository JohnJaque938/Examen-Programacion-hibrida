import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonThumbnail, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone'; 
import { RouterLink } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { PublicacionService } from '../servicios/publicacion.service'; // Servicio para gestionar publicaciones
import { Publicacion } from '../modelo/publicacion'; // Modelo de la publicación
import { FechaFormatoPipe } from '../pipes/fecha-formato.pipe'; // Pipe para formatear fechas
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [ IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonThumbnail, IonFab, IonFabButton, IonIcon, RouterLink, NgIf, NgForOf, FechaFormatoPipe ],
})
export class HomePage implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) {
    // Agrega íconos para la aplicación
    addIcons({
      add,    // Ícono para el botón flotante de añadir
      trash,  // Ícono para el botón de eliminar publicación
    });
  }
  // Método que se ejecuta al iniciar el componente
  async ngOnInit() {
    // Obtener todas las publicaciones desde el servicio
    this.publicaciones = await this.publicacionService.obtenerPublicaciones();
  }
  // Método para eliminar una publicación
  async eliminarPublicacion(id: string) {
    await this.publicacionService.eliminarPublicacion(id);
    this.publicaciones = await this.publicacionService.obtenerPublicaciones();
  }
}