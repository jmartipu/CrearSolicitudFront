import { Component, OnInit } from '@angular/core'
import { ISolicitudes, IUsuarios } from '../interfaces'
import { SolicitudesService } from '../solicitudes/solicitudes.service'

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css'],
})
export class ListaServiciosComponent implements OnInit {
  solicitud: ISolicitudes
  constructor(private solicitudesService: SolicitudesService) {
    this.solicitud = {
      id: 0,
      nombre: 'constructor nombre',
      script: 'constructor script',
      descripcion: 'constructor descripcion',
      fecha_creacion: 1,
      creado_por: new (class implements IUsuarios {
        id: 1
      })(),
    }
  }

  ngOnInit() {
    this.solicitudesService
      .getServicioSolicitudes()
      .subscribe(data => (this.solicitud = data))
  }
}
