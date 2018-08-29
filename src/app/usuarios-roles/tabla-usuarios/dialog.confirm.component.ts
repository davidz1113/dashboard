import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './tabla-usuarios.component';
import { UsuarioServices } from '../../servicios/usuarioServices.services';


@Component({
    selector: 'app-dialog-interface',
    template: `
    <h1 mat-dialog-title>¿Esta seguro de que eliminara el usuario {{nombreUser}} ?</h1>
    <div mat-dialog-actions>
     <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-button cdkFocusInitial  (click)="eliminarUsuario()">Eliminar</button>
    </div>
        
    `,
    providers: [UsuarioServices]

})
export class DialogConfirmacionComponent implements DialogData {
    //variables de la interfaz
    nombreUser: string;
    idUser: number;
    respuesta :string;
    //variable respuesta servidor
    public respuesta2;

  



    constructor(public dialogRef: MatDialogRef<DialogConfirmacionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private _userServices: UsuarioServices) {

        this.nombreUser = data['nombreUser'];
        this.idUser = data['idUser'];
        this.respuesta = data['respuesta'];

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    //Metodo q elimina el usuario desde la base de datos
    eliminarUsuario() {
        this._userServices.eliminarUsuario(this.idUser).subscribe(
            respose => {
                this.respuesta2 = respose;
                if (this.respuesta2.length <= 1) {
                    this.respuesta2 = 'Error en el servidor';
                    console.log('Error en el servidor');
                }else{
                    this.dialogRef.close({respuesta:this.respuesta2.msg,status:this.respuesta2.status});
                    this.data['respuesta']= this.respuesta2.msg;
                    //console.log(this.respuesta);
                    
                }

            },
            error => {
                console.log("Error de conexion");

            }

        );
    }

}