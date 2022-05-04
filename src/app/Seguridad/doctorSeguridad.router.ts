import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { DoctorService } from "src/app/Services/doctor.service";

@Injectable()
export class DoctorSegurityRouter implements CanActivate{

  constructor(private seguridadDoctorService: DoctorService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/doctor/login-doctor']);
      return false;
    }else{
      return true;
    }
  }
}
