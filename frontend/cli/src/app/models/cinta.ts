export class Cinta {
    private celdas: string[];      
    private simboloBlanco: string; // espacio en blanco (por defecto "_")
  
    constructor(tamano: number, simboloBlanco: string = '_') {
      this.celdas = Array(tamano).fill(simboloBlanco);
      this.simboloBlanco = simboloBlanco;
    }
  
    leer(posicion: number): string {
      return this.celdas[posicion] || this.simboloBlanco;
    }
  
    escribir(posicion: number, simbolo: string): void {
      this.celdas[posicion] = simbolo;
    }
  
    getCinta(): string[] {
      return [...this.celdas]; // Devuelve una copia para evitar modificaciones externas
    }
  
    ajustarTamano(nuevoTamano: number): void {
      while (this.celdas.length < nuevoTamano) {
        this.celdas.push(this.simboloBlanco);
      }
    }
  }
  