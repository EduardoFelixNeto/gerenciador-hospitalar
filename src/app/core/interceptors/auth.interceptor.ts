import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// Liste os endpoints públicos (parciais ou completos)
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register'
];

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Verifica se a requisição é para uma rota pública
  const isPublic = PUBLIC_ROUTES.some(publicUrl => req.url.includes(publicUrl));

  if (isPublic) {
    // Não altera a requisição
    return next(req);
  }

  const token = localStorage.getItem('jwtToken');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};
