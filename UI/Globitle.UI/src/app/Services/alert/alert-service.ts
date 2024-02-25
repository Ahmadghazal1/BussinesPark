import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {
    constructor(private toastr: ToastrService) { }

    showAlertMessage = (title: string, message: any, type: string): void => {
        const options = {

            closeButton: true,
        };


        switch (type.trim().toLowerCase()) {
            case 'success':
                this.toastr.success(message, title, options);
                break;
            case 'error':
                this.toastr.error(message, title, options);
                break;
            case 'warning':
                this.toastr.warning(message, title, options);
                break;
            case 'info':
                this.toastr.info(message, title, options);
                break;
            default:
                this.toastr.info(message, title, options);
        }
    }
}