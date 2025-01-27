import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PublicacionService } from '../servicios/publicacion.service'; // Servicio para manejar publicaciones
import { Publicacion } from '../modelo/publicacion'; // Modelo de la publicación
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonButton, IonButtons, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  standalone: true,
  imports: [ IonButton, IonTextarea, IonText, IonInput, IonLabel, IonItem, IonContent, IonTitle, IonHeader, IonToolbar, IonButtons, IonIcon, 
    NgIf, ReactiveFormsModule, RouterModule
  ]
})
export class CrearPublicacionPage {
  formulario: FormGroup; // Formulario para guardar los datos
  foto: string | null = null; // Variable para almacenar la URL de la foto capturada

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService
  ) {
    // Iniciar el formulario con los campos 'titulo' y 'descripcion' con su respectivamente validaciones
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]], // Título obligatorio y mínimo 5 caracteres
      descripcion: ['', [Validators.required, Validators.minLength(20)]], // Descripción obligatoria y mínimo 20 caracteres
    });
    // Agregar los íconos
    addIcons({
      'arrow-back': arrowBackOutline,
    });
  }
  // Método para capturar una foto usando la cámara
  async capturarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera, // Usa la cámara del dispositivo
    });
    this.foto = imagen.dataUrl || null;
  }  
  // Método para guardar la publicación
  async guardarPublicacion() {
    if (this.formulario.valid) { 
      const nuevaPublicacion: Publicacion = {
        id: new Date().getTime().toString(),
        titulo: this.formulario.value.titulo,
        descripcion: this.formulario.value.descripcion,
        fecha: new Date().toISOString(),
        foto: this.foto || '',
      };
      // Llama al servicio "publicacion" para guardar la nueva publicación
      await this.publicacionService.guardarPublicacion(nuevaPublicacion);
      // Reinicia el formulario y la foto después de guardar
      this.formulario.reset();
      this.foto = null;
    }
  }
}