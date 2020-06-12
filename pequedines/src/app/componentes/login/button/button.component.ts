import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../servicios/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(public servicio: ServicioService, public router: Router) { }

  ngOnInit(): void {
  }

login(){
  this.servicio.googlelogin();
  if(this.servicio.user){
    this.router.navigateByUrl('/perfil');
  } else {
    this.router.navigateByUrl('');
  }
}

}
