import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'; // map sert a transformer les données , tap sert a faire des actions sur les données
import { of } from 'rxjs'; // of sert a creer un observable

export interface User {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  reponse?: string;
  message?: string;
  error?: string;
  api_token?: string;
  user?: User;
}

export interface SessionStatus {
  logged_in: boolean;
  user_id: number | null;
  api_token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/SAE301-303/backend/api/api.php';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable(); // as observable = permet de recevoir les données

  constructor(private http: HttpClient) {
    this.checkSession().subscribe();
  }


  //Connexion

  login(credentials: { email: string; password: string }): Observable<AuthResponse> { // credentials sont les données envoyées par le client
    return this.http.post<AuthResponse>(this.apiUrl, credentials, {
      withCredentials: true
    }).pipe( // pipe sert a faire des actions sur les données
      tap(response => {
        if (response.success) {
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  // il faudra utiliser dans la connexion de angular inscripconex :

  // this.authService.login({ email: '...', password: '...' }).subscribe(res => {
  //   if (res.success) {
  //     console.log('Connecté !', res.user);
  //   }
  // });

  // si on veut par exemple vérifier que la personne est connecté :

  // <div *if="authService.isLoggedIn$ | async">
  // Bienvenue !
  // </div>

  //Inscription
  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, userData, {
      withCredentials: true
    });
  }

  //Déconnexion
  logout(): void {
    this.http.post<AuthResponse>(this.apiUrl, { action: 'logout' }, {
      withCredentials: true
    }).subscribe({ // subscribe sert a recevoir les données
      next: () => {
        this.isLoggedInSubject.next(false);
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion:', err);
        this.isLoggedInSubject.next(false);
      }
    });
  }

  //sessions
  checkSession(): Observable<boolean> {
    return this.http.get<SessionStatus>(`${this.apiUrl}?action=check-session`, {
      withCredentials: true
    }).pipe(
      map((response) => {
        const isLoggedIn = response.logged_in === true;
        this.isLoggedInSubject.next(isLoggedIn);
        return isLoggedIn;
      }),
      catchError((error) => {
        console.error('Erreur lors de la vérification de la session:', error);
        this.isLoggedInSubject.next(false);
        return of(false);
      })
    );
  }

  refreshSession(): void {
    this.checkSession().subscribe();
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

