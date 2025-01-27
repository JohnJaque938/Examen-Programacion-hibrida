import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormato', // Nombre del Pipe que se usará para el proyecto
  standalone: true,
})
export class FechaFormatoPipe implements PipeTransform {
  // Método que transforma la fecha como argumento
  transform(fecha: string): string {
    // Convierte la fecha de formato string a un objeto Date y luego la convierte a un formato de fecha local en español
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
    });
  }
}