import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Trabajo } from 'src/app/dataforms/Trabajo';

@Component({
  selector: 'app-todos-trabajos',
  templateUrl: './todos-trabajos.component.html',
  styleUrls: ['./todos-trabajos.component.css']
})
export class TodosTrabajosComponent implements OnInit {

  constructor(public servicio: ServicioService) { }

  listaTrabajosFiltrada: Trabajo[];

  ngOnInit(): void {

    this.servicio.setListaUsuarios1();
    this.servicio.setListaTrabajos1();
    this.servicio.setListaTareas1();
  }

  filtrarTrabajosPorUsuario(uid: String): Trabajo[] {
    this.listaTrabajosFiltrada = this.servicio.filtrarTrabajosPorUID(uid);
    return this.listaTrabajosFiltrada;
  }

  filtrarTrabajosPorTarea(id: String): Trabajo[] {
    this.listaTrabajosFiltrada = this.servicio.filtrarTrabajosPorTareaID(id);
    return this.listaTrabajosFiltrada;
  }

  mostrarTodosLosTrabajos(): Trabajo[] {
    this.listaTrabajosFiltrada = this.servicio.listaTrabajos;
    return this.listaTrabajosFiltrada;
  }


}
