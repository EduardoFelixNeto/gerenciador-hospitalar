import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient,
              private authService: AuthService
  ) {}

  comprarPontos(id: number, dto: {
    valorReais: number;
    quantidadePontos: number | null;
    descricao: string
  }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/comprar-pontos`, dto);
  }

  getUserId(): Observable<number> {
    const token = this.authService.getToken();
    if (!token) throw new Error('Token não encontrado');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload?.sub;
      if (!email) throw new Error('Email não encontrado no token');

      return this.getUserIdFromEmail(email);
    } catch (e) {
      console.error('Erro ao decodificar token JWT', e);
      throw e;
    }
  }

  getUserIdFromEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/buscar-id?email=${email}`);
  }
}
