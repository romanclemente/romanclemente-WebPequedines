import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { InterfaceTareaCallBack } from 'src/app/dataforms/InterfaceTareaCallBack';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";



@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  archivoNombre = "Elige un archivo"
  comentario: String;
  file: File;
  filepath;

  constructor(
    public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterfaceTareaCallBack,
    public servicio: ServicioService, public storage: AngularFireStorage) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

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

    this.data.filepath = this.filepath;
    this.data.archivo = this.file;
    this.archivoNombre = this.file.name;
    // and wait for confirm by user
  }





}
