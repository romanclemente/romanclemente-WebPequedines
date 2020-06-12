import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-perfil-datos',
  templateUrl: './perfil-datos.component.html',
  styleUrls: ['./perfil-datos.component.css']
})
export class PerfilDatosComponent implements OnInit {

  constructor(public servicio: ServicioService) { }


  ngOnInit(): void {
  }

}
