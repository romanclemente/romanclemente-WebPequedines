import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './componentes/web/usuario/perfil-usuario/perfil-usuario.component';
import { TrabajosComponent } from './componentes/web/usuario/trabajos/trabajos.component';
import { TareasComponent } from './componentes/web/usuario/tareas/tareas.component';
import { UsuariosComponent } from './componentes/web/usuario/usuarios/usuarios.component';
import { TodosTrabajosComponent } from './componentes/web/usuario/todos-trabajos/todos-trabajos.component';




const routes: Routes = [
  {path: 'perfil', component: PerfilUsuarioComponent},
  {path: 'trabajos', component:TrabajosComponent},
  {path: 'tareas', component:TareasComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'alltrabajos', component:TodosTrabajosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
