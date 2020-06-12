import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Usuario } from 'src/app/dataforms/Usuario';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { last, switchMap } from 'rxjs/operators';
import { Trabajo } from 'src/app/dataforms/Trabajo';
import { Tarea } from 'src/app/dataforms/Tarea';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  input_titulo: string = '';
  input_comentarios: string = '';
  input_file: any = null;

  currentDate = new Date();
  fecha: String;

  comentarios: String;
  titulo: String;
  filepath;
  file: File;

  pathTrabajos;
  entrega: Tarea;
  archivoNombre = "Elige un archivo"

  constructor(public servicio: ServicioService, public storage: AngularFireStorage, public datePipe: DatePipe) {
  }

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;

  ngOnInit(): void {

    // Recargamos lista de usuarios
    this.servicio.setListaUsuarios1();

    // Recargamos lista de trabajos 
    this.servicio.setListaTrabajos1();

  }



  waitFor(event) {
    // Get input file
    this.file = event.target.files[0];
    const randomId = this.file.name;
    var id = 0;
    if (this.servicio.listaTrabajos.length == 0) {

    } else {
      for (var i = 0; i < this.servicio.listaTrabajos.length; i++) {

        if (parseInt(this.servicio.listaTrabajos[i].id + "") > id) {
          id = parseInt(this.servicio.listaTrabajos[i].id + "");
        }
      }
      id++;
      
    }
    this.filepath = `${this.servicio.usuario.uid + ''}/trabajo_${id}/${randomId}`;
    this.archivoNombre = this.file.name;


    // and wait for confirm by user
  }

  upload(titulo: String, comentarios: String) {
    this.input_titulo = null
    this.input_comentarios = null;
    this.input_file = null;

    const fileRef = this.storage.ref(this.filepath);

    const task = this.storage.upload(this.filepath, this.file);
    this.uploadProgress = task.percentageChanges();


    task.snapshotChanges().pipe(last(), switchMap(() => fileRef.getDownloadURL()))
      .subscribe(url => {
        var id = 0;
        if (this.servicio.listaTrabajos.length == 0) {
    
        } else {
          for (var i = 0; i < this.servicio.listaTrabajos.length; i++) {
    
            if (parseInt(this.servicio.listaTrabajos[i].id + "") > id) {
              id = parseInt(this.servicio.listaTrabajos[i].id + "");
            }
          }
          id++;
          
        }

        this.fecha = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');

        this.servicio.agregarTrabajo(new Trabajo(id+"", this.servicio.usuario.uid, titulo + "", this.fecha + "", "null", url, comentarios + ""));
      })

    this.archivoNombre = 'Elije un archivo';
  }



  @ViewChild('form') form;

  reset() {
    this.form.nativeElement.reset()
  }



}




/*
  addTodo(url: any, id_trabajo: number): void {
    this.pathEntregaUsuario = this.pathEntregaUsuario + "/Trabajo_" + id_trabajo + "/";

    this.entrega = new Entrega(id_trabajo + "", url);

    this.db.object(this.pathEntregaUsuario).update(this.entrega).catch(error => console.log(error));
  }
*/





/*

*/