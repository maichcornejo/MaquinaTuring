import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TuringService } from '../service/turing.service';

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
  private offset = 10; 
  cinta: string[] = [];
  posicionCabezal = 0;
  estadoActual = '';

  constructor(private turingService: TuringService) {}

  ngOnInit(): void {
    this.initializeCanvas();
    this.cargarGenerica(); // Cargar la máquina genérica al inicio
  }

  initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.renderCinta();
  }

  renderCinta(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  

    this.cinta.forEach((celda, index) => {
      const x = index * (this.cellWidth + this.offset); 
      const y = 20; 
  

      ctx.fillStyle = index === this.posicionCabezal ? '#e74c3c' : '#ffffff'; // Head en rojo
      ctx.strokeStyle = '#bdc3c7';
      ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
      ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
  
      ctx.fillStyle = index === this.posicionCabezal ? '#ffffff' : '#34495e'; 
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(celda || '_', x + this.cellWidth / 2, y + this.cellHeight / 2); 
    });
  }
  
   cargarGenerica(): void {
    this.turingService.cargarDesdeJSON(genericJson);
    this.actualizarVista();
  }


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
    this.renderCinta(); // Redibujo la cinta
  }
}