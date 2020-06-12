import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponent } from './componentes/web/web.component';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { PerfilUsuarioComponent } from './componentes/web/usuario/perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { ButtonComponent } from './componentes/login/button/button.component';
import { UsuariosComponent } from './componentes/web/usuario/usuarios/usuarios.component';
import { TrabajosComponent } from './componentes/web/usuario/trabajos/trabajos.component';
import { TareasComponent } from './componentes/web/usuario/tareas/tareas.component';
import { TitleCardComponent } from './componentes/login/title-card/title-card.component';
import { PerfilDatosComponent } from './componentes/web/usuario/perfil-usuario/perfil-datos/perfil-datos.component';
import { TareasCardComponent } from './componentes/web/usuario/tareas/tareas-card/tareas-card.component';
import { DialogoComponent } from './componentes/web/usuario/tareas/dialogo/dialogo.component';
import { TodosTrabajosComponent } from './componentes/web/usuario/todos-trabajos/todos-trabajos.component';
import { BotonFlotanteComponent } from './componentes/boton-flotante/boton-flotante.component';
import { SideBarComponent } from './componentes/web/side-bar/side-bar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SideCardComponent } from './componentes/web/side-bar/side-card/side-card.component';

//Material ------------------------
import { MatDialogModule} from '@angular/material/dialog'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    WebComponent,
    PerfilUsuarioComponent,
    LoginComponent,
    ButtonComponent,
    UsuariosComponent,
    TrabajosComponent,
    TareasComponent,
    BotonFlotanteComponent,
    SideBarComponent,
    SideCardComponent,
    TitleCardComponent,
    PerfilDatosComponent,
    TareasCardComponent,
    DialogoComponent,
    TodosTrabajosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, 
    AngularFireDatabaseModule,
    BrowserAnimationsModule,

    //Material---------------
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
