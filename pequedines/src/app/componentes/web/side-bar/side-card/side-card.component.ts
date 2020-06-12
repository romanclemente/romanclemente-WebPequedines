import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-side-card',
  templateUrl: './side-card.component.html',
  styleUrls: ['./side-card.component.css']
})
export class SideCardComponent implements OnInit {

  constructor(public servicio: ServicioService) { }

  ngOnInit(): void {
  }

}
