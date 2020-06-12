import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth } from "firebase";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { Usuario } from '../dataforms/Usuario';
import { Trabajo } from '../dataforms/Trabajo';
import { Tarea } from 'src/app/dataforms/Tarea';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  usuario: Usuario = null;
  listaTrabajos: Trabajo[];
  listaTareas: Tarea[];
  listaUsuarios: Usuario[];


  user = this.auth.authState.pipe(
    map((authState) => {
      if (authState) {

        this.usuario = new Usuario(authState.uid, "", "", "", "", "", "", "", "", "", "", "");
        this.setListaUsuarios1();
        return authState;
      } else {
        this.usuario = null;
        return null;
      }
    })
  );

  constructor(
    public auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }


  // Actualizar listas de angular desde firebase

  setListaUsuarios1() {


    this.db.list('usuarios').snapshotChanges().subscribe(item => {
      var listaUsuarios: Usuario[] = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        listaUsuarios.push(x as Usuario);
      });

      this.listaUsuarios = listaUsuarios;

      for (var i = 0; i < this.listaUsuarios.length; i++) {
        if (this.listaUsuarios[i].uid === this.usuario.uid) {
          this.usuario = this.listaUsuarios[i];
        }
      }


    });
  }

  setListaTrabajos1() {

    this.db.list('trabajos').snapshotChanges().subscribe(item => {
      var listaTrabajos: Trabajo[] = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        listaTrabajos.push(x as Trabajo);
      });
      this.listaTrabajos = listaTrabajos;
      this.filtrarTrabajosPorUID(this.usuario.uid);
    });

  }

  setListaTareas1() {
    this.db.list('tareas').snapshotChanges().subscribe(item => {
      var listaTareas: Tarea[] = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        listaTareas.push(x as Tarea);

      });
      this.listaTareas = listaTareas;
    });
  }


  //Agregar entradas

  agregarTrabajo(trabajo: Trabajo): void {
    const path = 'trabajos/trabajo_' + trabajo.id;

    const u = {
      uid_creador: trabajo.uid_creador,
      fecha_subida: trabajo.fecha_subida,
      id: trabajo.id,
      titulo: trabajo.titulo,
      tarea_id: trabajo.tarea_id,
      url: trabajo.url,
      comentarios: trabajo.comentarios
    }
    this.db.object(path).update(u).catch(error => console.log(error));
    console.log(this.db.list(path));
  }

  agregarTarea(tarea: Tarea): void {
    const path = 'tareas/tarea_' + tarea.id;

    const u = {
      id: tarea.id,
      titulo: tarea.titulo,
      fecha_enterga: tarea.fecha_entrega,
      uid_autor: tarea.uid_autor,
      descripcion: tarea.descripcion,
      url: tarea.url
    }
    this.db.object(path).update(u).catch(error => console.log(error));
    console.log(this.db.list(path));
  }


  //Borrar entradas

  borrarTrabajo(itemKey) {
    this.db.object('trabajos/' + itemKey).remove();
  }

  borrarTarea(itemKey) {
    this.db.object('tarea/' + itemKey).remove();
  }


  // Autentificacion

  googlelogin() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((user) => {

        const path = 'usuarios/' + user.user.uid;

        const u = {

          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
          photoURL: user.user.photoURL,
          phoneNumber: user.user.phoneNumber,
          private: true,

        }
        this.db.object(path).update(u).catch(error => console.log(error));

      })
      .catch((error) => {
        console.log("Error en google login", error);
      });

  }

  logout() {
    this.auth.signOut();
    this.router.navigate(["/"]);
  }

  //Metodos de filtrado

  buscarUsuarioPorUID(uid: String): Usuario {
    var usuario: Usuario;

    for (var i = 0; i < this.listaUsuarios.length; i++) {
      if (this.listaUsuarios[i].uid === uid) {
        usuario = this.listaUsuarios[i];
      }
    }

    return usuario;
  }

  filtrarTrabajosPorUID(uid: String): Trabajo[] {

    var listaTrabajosAux: Trabajo[] = [];

    if (this.listaTrabajos != null && this.listaTrabajos.length > 0) {

      for (var i = 0; i < this.listaTrabajos.length; i++) {

        if (this.listaTrabajos[i].uid_creador === uid) {
          listaTrabajosAux.push(this.listaTrabajos[i]);
        }

      }
    }
    return listaTrabajosAux;
  }

  filtrarTrabajosPorTareaID(id: String) {
    var listaTrabajosAux: Trabajo[] = [];

    if (this.listaTrabajos != null && this.listaTrabajos.length > 0) {

      for (var i = 0; i < this.listaTrabajos.length; i++) {

        if (this.listaTrabajos[i].tarea_id === id) {
          listaTrabajosAux.push(this.listaTrabajos[i]);
        }

      }
    }
    return listaTrabajosAux;
  }

  comprobarSiEresAdmin(): boolean {
    if (this.usuario.uid === 'lv7UEeqv41hHXku4omkRPGsKw5I3' || this.usuario.uid === 'q2W8cuqAFleg1xFmWuwPx0rSxVA2') {
      return true;
    } else {
      return false;
    }
  }





}