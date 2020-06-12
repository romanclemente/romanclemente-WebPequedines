import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    
  }

  /*ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = '../../assets/manos.jpg';
 }*/

}
