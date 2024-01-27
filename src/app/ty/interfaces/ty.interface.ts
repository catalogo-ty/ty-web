export interface CategoriaTy {
    id: string;
    nombre: string;
}

export interface Ty {
    categoriaRef: string;
    id?: string;
    nombre: string;
    color: string;
    fechaCreacion?: any;
    fechaActualizacion?: any;
    imageUrl?: any
    imageUrlText?: string;
}

export interface TyDeseo {
    id?: string;
    nombre: string;
    urlImagen: string;
}