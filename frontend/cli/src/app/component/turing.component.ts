import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TuringService } from '../service/turing.service';

// Importar los JSON directamente
import genericJson from '../../assets/json/turing-generico.json';
import fibonacciJson from '../../assets/json/fibonacci.json';

@Component({
  selector: 'app-turing',
  standalone: true,
  templateUrl: './turing.component.html',
  styleUrls: ['./turing.component.css'],
})
export class TuringComponent implements OnInit {
  @ViewChild('turingCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private cellWidth = 50; // Ancho de cada celda
  private cellHeight = 50; // Alto de cada celda
  private offset = 10; // Desplazamiento entre celdas
  cinta: string[] = [];
  posicionCabezal = 0;
  estadoActual = '';

  constructor(private turingService: TuringService) {}

  ngOnInit(): void {
    this.initializeCanvas();
    this.cargarGenerica(); // Cargar la máquina genérica al inicio
  }

  // Inicializar el canvas
  initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.renderCinta();
  }

  renderCinta(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
  
    const totalCeldasVisibles = Math.floor(canvas.width / (this.cellWidth + this.offset)); // Número de celdas visibles en el canvas
    const inicio = Math.max(0, this.posicionCabezal - Math.floor(totalCeldasVisibles / 2)); // Cálculo para centrar el cabezal
  
    // Dibujar las celdas
    for (let i = inicio; i < inicio + totalCeldasVisibles && i < this.cinta.length; i++) {
      const x = (i - inicio) * (this.cellWidth + this.offset);
      const y = 20;
  
      // Dibujar celda
      this.ctx.fillStyle = i === this.posicionCabezal ? '#e74c3c' : '#ffffff';
      this.ctx.strokeStyle = '#bdc3c7';
      this.ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
      this.ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
  
      // Dibujar texto
      this.ctx.fillStyle = i === this.posicionCabezal ? '#ffffff' : '#34495e';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(this.cinta[i], x + this.cellWidth / 2, y + this.cellHeight / 2);
    }
  }
  
   // Cargar JSON genérico
   cargarGenerica(): void {
    this.turingService.cargarDesdeJSON(genericJson);
    this.actualizarVista();
  }

  // Cargar JSON de Fibonacci
  cargarFibonacci(): void {
    this.turingService.cargarDesdeJSON(fibonacciJson);
    this.actualizarVista();
  }

  ejecutarPaso(): void {
    if (this.turingService.ejecutarPaso()) {
      this.actualizarVista();
    } else {
      alert('La máquina se ha detenido.');
    }
  }

  actualizarVista(): void {
    this.cinta = this.turingService.getCinta();
    this.posicionCabezal = this.turingService.getPosicionCabezal();
    this.estadoActual = this.turingService.getEstadoActual().id;
    this.renderCinta(); // Redibujar la cinta
  }
}