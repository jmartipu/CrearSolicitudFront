import {HttpErrorResponse} from "@angular/common/http";
import { throwError} from "rxjs";

export function transformError(error: HttpErrorResponse | string){
  let errorMessage = 'Ha ocurrido un error'
  if(typeof error ==='string'){
    errorMessage = error
  }
  else if(error.error instanceof ErrorEvent){
    errorMessage = `Èrror! ${error.error.message}`
  }else if(error.status){
    errorMessage = `Peticion fallida con error ${error.status}
    ${error.statusText}`
  }
  return throwError(errorMessage)
}
