import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Usuario } from 'src/app/dataforms/Usuario';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { Observable, concat, defer } from 'rxjs';
import { tap, finalize, ignoreElements, last, switchMap } from 'rxjs/operators';
import { Tarea } from '../../dataforms/Tarea';
import { Trabajo } from '../../dataforms/Trabajo';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-boton-flotante',
  templateUrl: './boton-flotante.component.html',
  styleUrls: ['./boton-flotante.component.css']
})
export class BotonFlotanteComponent implements OnInit {

  listaTrabajoPerso: Trabajo[];
  listaTareas: Tarea[];
  fichero: File;
  filepath;
  urlUpload: any;
  path = 'Trabajos/';
  trabajo: Trabajo;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  dialog: any;

  constructor(public servicio: ServicioService, public db: AngularFireDatabase, public storage: AngularFireStorage, private store: AngularFirestore) { }

  comprobacion(user: any, tarea: any): string {
    const trabajosTarea: Trabajo[] = [];
    const usuario = user as Usuario;
    const tare = tarea as Tarea;
    this.listaTrabajoPerso = this.servicio.filtrarTrabajosPorUID(usuario.uid);
    this.listaTrabajoPerso.forEach(element => {
      if (element.tarea_id == tare.id) {
        trabajosTarea.push(element)
      }
    });
    if (trabajosTarea.length == 0) {
      return "Sin entregar";
    } else {
      return trabajosTarea[trabajosTarea.length - 1].url as string;
    }

  }

  waitFor(event) {
    // Get input file
    this.fichero = event.target.files[0];
    const nombre = this.fichero.name;
    this.filepath = `trabajos/${nombre}`;
    // and wait for confirm by user
  }

  /*upload(tarea:Tarea){
 
   const fileRef = this.storage.ref(this.filepath);

   const task = this.storage.upload(this.filepath, this.fichero);
   this.uploadProgress = task.percentageChanges();

  /* // Get notified when the download URL is available
   task.snapshotChanges().pipe(
     finalize(() => this.uploadURL = fileRef.getDownloadURL())
   ).subscribe();

   task.snapshotChanges().pipe(
     last(),  // emit the last element after task.snapshotChanges() completed
     switchMap(() => fileRef.getDownloadURL())
   ).subscribe(url => this.addTodo(url,tarea))

   console.log("Fichero subido con exito");
 }

 addTodo(url:any,tarea:Tarea): void {
   this.path=this.path+"/Trabajo_"+tarea.titulo+"/";
   
   this.trabajo=new Trabajo("","","","","","");   
  
  this.db.object(this.path).set(this.trabajo).catch(error=>console.log(error));
 }*/

  ngOnInit(): void {

    this.servicio.setListaTareas1();


  }
  getListaTareas() {
    console.log(this.listaTareas.length);
  }
}


