import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Usuario } from 'src/app/dataforms/Usuario';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  constructor(public db: AngularFireDatabase, public servicio: ServicioService) {

  }

  ngOnInit(): void {

    this.servicio.setListaUsuarios1();

  }




}
