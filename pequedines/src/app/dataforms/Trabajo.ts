export class Trabajo {
    id: String;
    titulo: String;
    uid_creador: String;
    fecha_subida: String;
    tarea_id: String;
    url: String;
    comentarios: String;



    constructor(id: String, uid_creador: String, titulo: String, fecha_subida: String, tarea_id: String, url: String, comentarios: String) {
        this.id = id;
        this.uid_creador = uid_creador;
        this.fecha_subida = fecha_subida;
        this.tarea_id = tarea_id;
        this.url = url;
        this.titulo = titulo;
        this.comentarios = comentarios;

    }

    mostrar() {

        console.log(
            "id: " + this.id + 
            "\nuid_creador: " + this.uid_creador +
            "\nfecha_subida: " + this.fecha_subida +
            "\ntarea_id: " + this.tarea_id +
            "\nurl: " + this.url
        )
    }
}
