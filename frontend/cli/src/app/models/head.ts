export class Head {
    posicion: number; // Posición actual
  
    constructor(posicionInicial: number = 0) {
      this.posicion = posicionInicial;
    }
  
    moverIzquierda(): void {
      this.posicion = Math.max(this.posicion - 1, 0); // Evita posiciones negativas
    }
  
    moverDerecha(): void {
      this.posicion++;
    }
  
    establecerPosicion(posicion: number): void {
      this.posicion = Math.max(posicion, 0);
    }
  }
  