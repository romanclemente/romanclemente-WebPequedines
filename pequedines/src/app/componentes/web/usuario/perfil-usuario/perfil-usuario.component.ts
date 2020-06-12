import { Component, OnInit, OnChanges } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../../../../dataforms/Usuario';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Usuario;
  usuarioLog: Usuario;
  listaUsuario: Usuario[];

  ///valores del formulario
  nombre: string;
  apellido: string;
  edad: number;
  instagram: string;
  twitter: string;
  facebook: string;
  hobby: string;
  aspiraciones: string;
  otros: string;
  todo: string;

  constructor(public servicio: ServicioService, public db: AngularFireDatabase) { }


  nombreApellidos(displayName: String): string[] {
    var splitted = displayName.split(" ");
    return splitted
  }

  agregarUsuario(usu: Usuario): void {
    const path = 'usuarios/' + usu.uid;

    const u = {
      email: usu.email + "",
      displayName: usu.displayName+"",
      photoURL: usu.photoURL+"",
      private: false,
      edad: this.edad+"",
      instagram: this.instagram+"",
      twiiter: this.twitter+"",
      facebook: this.facebook+"",
      hobby: this.hobby+"",
      aspiraciones: this.aspiraciones+"",
      otros: this.otros+""
    }
    this.db.object(path).update(u).catch(error => console.log(error));

  }


  ngOnInit(): void {


    this.servicio.setListaUsuarios1();


  }


}

