export class Tarea {

    id: String;
    uid_autor: String;
    descripcion: String;
    fecha_entrega: String;
    titulo: String;
    url: String;

    constructor(id: String, titulo: String, uid_autor: String, descripcion: String, fecha_entrega: String,  url: String) {
        this.id = id;
        this.titulo = titulo;
        this.uid_autor = uid_autor;
        this.descripcion = descripcion;
        this.fecha_entrega = fecha_entrega;
        this.url = url;
    }

}