export class Estado {
    id: string;      // Identificador del estado (por ejemplo, "q0", "q1")
    esFinal: boolean; 
  
    constructor(id: string, esFinal: boolean = false) {
      this.id = id;
      this.esFinal = esFinal;
    }
  }
  