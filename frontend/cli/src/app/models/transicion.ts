export class Transicion {
    estadoActual: string;    
    simboloLeido: string;    
    nuevoEstado: string;     
    simboloEscrito: string;  
    direccion: 'izquierda' | 'derecha'; 
  
    constructor(
      estadoActual: string,
      simboloLeido: string,
      nuevoEstado: string,
      simboloEscrito: string,
      direccion: 'izquierda' | 'derecha'
    ) {
      this.estadoActual = estadoActual;
      this.simboloLeido = simboloLeido;
      this.nuevoEstado = nuevoEstado;
      this.simboloEscrito = simboloEscrito;
      this.direccion = direccion;
    }
  }
  