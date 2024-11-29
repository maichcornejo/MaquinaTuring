import { Injectable } from '@angular/core';
import { Cinta } from '../models/cinta';
import { Head } from '../models/head';
import { Estado } from '../models/estado';
import { Transicion } from '../models/transicion';

@Injectable({
  providedIn: 'root',
})
export class TuringService {
  private cinta: Cinta;
  private cabezal: Head;
  private estados: Map<string, Estado>;
  private transiciones: Transicion[];
  private estadoActual: Estado;
  private simboloBlanco: string;

  constructor() {
    // Inicialización vacía, los datos se cargarán desde el JSON
    this.cinta = new Cinta(0);
    this.cabezal = new Head();
    this.estados = new Map();
    this.transiciones = [];
    this.estadoActual = new Estado(''); // Temporal, se actualizará al cargar
    this.simboloBlanco = '_'; // Valor por defecto
  }

  cargarDesdeJSON(data: any): void {
    // Limpiar la configuración actual
    this.estados.clear();
    this.transiciones = [];

    // Configurar los estados y el símbolo en blanco
    const estados = data.Q.split(','); // Separar los estados por comas
    this.simboloBlanco = data.b;

    estados.forEach((id: string) => {
      const esFinal = data.F.includes(id);
      this.estados.set(id, new Estado(id, esFinal));
    });

    // Configurar el estado inicial
    this.estadoActual = this.estados.get(data.S)!;

    // Configurar las transiciones
    Object.keys(data.transitions).forEach((estado) => {
      Object.keys(data.transitions[estado]).forEach((simbolo) => {
        const [nuevoEstado, simboloEscribir, direccion] =
          data.transitions[estado][simbolo];
        this.transiciones.push(
          new Transicion(estado, simbolo, nuevoEstado, simboloEscribir, direccion)
        );
      });
    });

    // Configurar la cinta inicial
    this.cinta = new Cinta(20, this.simboloBlanco); // Tamaño por defecto de 20
    this.cabezal = new Head(10); // Posición inicial centrada
  }

  // Métodos existentes (ejecutarPaso, obtenerCinta, etc.)
  ejecutarPaso(): boolean {
    const simboloActual = this.cinta.leer(this.cabezal.posicion);

    // Buscar una transición válida
    const transicion = this.transiciones.find(
      (t) =>
        t.estadoActual === this.estadoActual.id &&
        t.simboloLeido === simboloActual
    );

    if (!transicion) {
      return false; // No hay transición válida, máquina detenida
    }

    // Aplicar la transición
    this.cinta.escribir(this.cabezal.posicion, transicion.simboloEscrito);
    this.estadoActual = this.estados.get(transicion.nuevoEstado)!;

    if (transicion.direccion === 'derecha') {
      this.cabezal.moverDerecha();
    } else {
      this.cabezal.moverIzquierda();
    }

    return true; // Paso ejecutado correctamente
  }

  getCinta(): string[] {
    return this.cinta.getCinta();
  }

  getPosicionCabezal(): number {
    return this.cabezal.posicion;
  }

  getEstadoActual(): Estado {
    return this.estadoActual;
  }
}
