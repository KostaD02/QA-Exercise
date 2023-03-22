import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  public displayToast(text: string, Icon: string, color: string, time: number = 1500): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: color,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: Icon as SweetAlertIcon,
      title: text,
    });
  }

  public displayModal(icon: SweetAlertIcon, title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
