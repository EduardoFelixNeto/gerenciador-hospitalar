  import {PacienteDashboard} from "../../models/paciente-dashboard.model";
  import {Observable} from "rxjs";
  import {HttpClient} from "@angular/common/http";
  import {Injectable} from "@angular/core";

  @Injectable({ providedIn: 'root' })
  export class PacienteService {
    private apiUrl = 'http://localhost:3000/usuarios/dashboard';

    constructor(private http: HttpClient) {}

    getDashboardData(): Observable<PacienteDashboard> {
      return this.http.get<PacienteDashboard>(this.apiUrl);
    }
  }
