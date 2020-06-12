export class Usuario {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    edad: string
    instagram: string;
    twiiter: string;
    facebook: string;
    hobby: string;
    aspiraciones: string;
    otros: string;
    privado: string;

    constructor(uid: string, email: string, displayName: string, photoURL: string, edad: string, instagram: string, twiiter: string, facebook: string, hobby: string,
        aspiraciones: string, otros: string, privado: string) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.edad = edad;
        this.instagram = instagram;
        this.twiiter = twiiter;
        this.facebook = facebook;
        this.hobby = hobby;
        this.aspiraciones = aspiraciones;
        this.otros = otros;
        this.privado = privado;
        //this.id_trabajos = this.splitear_id_trabajos(id_trabajos_str);
    }


    splitear_id_trabajos(id_trabajos_str: String): number[] {
        var separacion_id_trabajos = id_trabajos_str.split(",");
        var id_trabajos: number[] = [];

        for (let index = 0; index < separacion_id_trabajos.length; index++) {

            id_trabajos.push(Number(index));

        }

        return id_trabajos;
    }

    mostrar(): String {

        return "uid: " + this.uid +
            "\nemail: " + this.email +
            "\ndisplayName: " + this.displayName +
            "\nphotoURL: " + this.photoURL +
            "\nedad: " + this.edad +
            "\ninstagram: " + this.instagram +
            "\ntwiiter: " + this.twiiter +
            "\nfacebook: " + this.facebook +
            "\nhobby: " + this.hobby +
            "\naspiraciones: " + this.aspiraciones +
            "\notros: " + this.otros +
            "\nprivado: " + this.privado;
    }

}