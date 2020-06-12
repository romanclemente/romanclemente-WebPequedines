import { Component } from '@angular/core';
import { ServicioService } from './servicios/servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pequedines';

  constructor(public servicio: ServicioService) {

  }
}
