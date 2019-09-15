import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../environments/environment'
import {Observable} from "rxjs";
import {map} from "rxjs/operators"
import {ISolicitudes, IUsuarios} from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  constructor(private httpClient: HttpClient) {}

  // getServicioSolicitudes():Observable<ISolicitudes> {
  //   return this.httpClient.get<ISolicitudesServiceData>(`${environment.baseUrl}${environment.targetSolicitudesServer}:${environment.targetSolicitudesPort}${environment.targetSolicitudesContext}`)
  //     .pipe(
  //       map(data=>
  //         this.transformToISolicitudes(data)
  //       )
  //   )
  // }
  getServicioSolicitudes(){
    return this.httpClient.get<ISolicitudesServiceData>(`${environment.baseUrl}${environment.targetSolicitudesServer}:${environment.targetSolicitudesPort}${environment.targetSolicitudesContext}`)
      .pipe(
        map(data=>
          this.transformToISolicitudes(data)
        )
    )
  }

  private transformToISolicitudes(data: ISolicitudesServiceData):ISolicitudes{
    return {
      id: data.solicitud.id,
      creado_por: data.solicitud.creado_por,
      descripcion: data.solicitud.descripcion,
      fecha_creacion: data.solicitud.fecha_creacion,
      nombre: data.solicitud.nombre,
      script: data.solicitud.script
    }
  }
}

interface ISolicitudesServiceData {

    'solicitud': {
      id: number
      creado_por: IUsuarios
      nombre: string
      script: string
      descripcion: string
      fecha_creacion: number
    }

}
