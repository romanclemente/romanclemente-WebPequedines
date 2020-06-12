import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: "Trabajos", route: "trabajos", icon: "bookmark", disabled: "false" },
    { name: "Tareas", route: "tareas", icon: "dashboard", disabled: "false" },
    { name: "Usuarios", route: "usuarios", icon: "account_box", disabled: "false" },
  ];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public servicio: ServicioService) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void { }


}
