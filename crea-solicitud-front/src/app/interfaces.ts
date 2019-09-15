import DateTimeFormat = Intl.DateTimeFormat

export interface ISolicitudes {
  id: number
  creado_por: IUsuarios
  nombre: string
  script: string
  descripcion: string
  fecha_creacion: number
}
export interface IUsuarios {
  id: number
}
