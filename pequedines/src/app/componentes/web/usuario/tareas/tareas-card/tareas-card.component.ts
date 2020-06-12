import { Component, OnInit, Inject } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Tarea } from 'src/app/dataforms/Tarea';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { InterfaceTareaCallBack } from 'src/app/dataforms/InterfaceTareaCallBack';
import { AngularFireStorage } from "@angular/fire/storage";
import { Trabajo } from 'src/app/dataforms/Trabajo';
import { Observable } from 'rxjs';
import { last, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tareas-card',
  templateUrl: './tareas-card.component.html',
  styleUrls: ['./tareas-card.component.css']
})
export class TareasCardComponent implements OnInit {


  listaTareas: Tarea[] = [];
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  tarea_id: String;
  currentDate = new Date();
  fecha: String;

  constructor(public servicio: ServicioService, public dialog: MatDialog, public storage: AngularFireStorage, public datePipe: DatePipe) { }

  openDialog(titulo: String, tarea_id: String): void {

    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '',
      data: {
        comentario: "",
        filepath: null,
        archivo: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var obtenido: InterfaceTareaCallBack = result;

      this.upload(titulo,
        obtenido.comentario,
        obtenido.filepath,
        obtenido.archivo,
        tarea_id);

    });
  }

  ngOnInit(): void {

    this.servicio.setListaTareas1();
    this.servicio.setListaTrabajos1();
    this.servicio.setListaUsuarios1();



  }


  buscarEntregas(id_tarea: String): boolean {


    var listaTrabajosAux = this.servicio.filtrarTrabajosPorUID(this.servicio.usuario.uid);

    for (var i = 0; i < listaTrabajosAux.length; i++) {

      if (listaTrabajosAux[i].tarea_id === id_tarea) {
        //console.log("TRUEEE: " + listaTrabajosAux[i].titulo);

        return true;
      }
    }

    return false;
  }


  upload(titulo: String, comentarios: String, filepath: any, file: File, tarea_id: String) {

    const fileRef = this.storage.ref(filepath);

    const task = this.storage.upload(filepath, file);
    this.uploadProgress = task.percentageChanges();


    task.snapshotChanges().pipe(last(), switchMap(() => fileRef.getDownloadURL()))
      .subscribe(url => {
        var id;
        if (this.servicio.listaTrabajos.length == 0) {
          id = "0";
        } else {

          var mayor: number = 0;
          for (var i = 0; i < this.servicio.listaTrabajos.length; i++) {
            if (Number(this.servicio.listaTrabajos[i].id) > mayor) {
              mayor = Number(this.servicio.listaTrabajos[i].id);
            }
          }

          id = (mayor + 1) + "";
        }

        this.fecha = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');

        this.servicio.agregarTrabajo(new Trabajo(id, this.servicio.usuario.uid, titulo + "", this.fecha, tarea_id, url, comentarios + ""));
      })

    console.log("Fichero subido con exito");

  }


}
