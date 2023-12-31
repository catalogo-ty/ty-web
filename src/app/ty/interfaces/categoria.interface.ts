export interface CategoriaTy {
    id: string;
    nombre: string;
}

export interface Ty {
    categoriaRef: string;
    id?: string;
    nombre: string;
    color: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}