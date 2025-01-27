import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; // Importa la clase Preferences de Capacitor para almacenar y recuperar datos
import { Publicacion } from '../modelo/publicacion'; // Modelo de la publicación

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  // Clave para acceder al almacenamiento local (preferencias)
  private readonly claveBD = 'publicaciones';
  constructor() {}
  // Método para obtener todas las publicaciones almacenadas en la base de datos
  async obtenerPublicaciones(): Promise<Publicacion[]> {
    // Obtiene el valor almacenado bajo la clave 'publicaciones'
    const { value } = await Preferences.get({ key: this.claveBD });
    return value ? JSON.parse(value) : [];
  }
  // Método para guardar una nueva publicación en la base de datos
  async guardarPublicacion(publicacion: Publicacion): Promise<void> {
    // Obtiene las publicaciones agregadas
    const publicaciones = await this.obtenerPublicaciones();
    // Agrega la nueva publicación en publicaciones
    publicaciones.push(publicacion);
    // Guarda las nuevas publicaciones en el base datos
    await Preferences.set({
      key: this.claveBD,
      value: JSON.stringify(publicaciones),
    });
  }
  // Método para eliminar una publicación
  async eliminarPublicacion(id: string): Promise<void> {
    // Obtiene las publicaciones almacenadas
    const publicaciones = await this.obtenerPublicaciones();
    const actualizadas = publicaciones.filter((pub) => pub.id !== id);
    // Guarda las publicaciones actualizadas en la base datos
    await Preferences.set({
      key: this.claveBD,
      value: JSON.stringify(actualizadas),
    });
  }
}