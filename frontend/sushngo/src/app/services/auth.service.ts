import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface SessionStatus {
  logged_in: boolean;
  user_id: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/SAE301-303/backend/api/users/session/check_session.php';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  checkSession(): Observable<boolean> {
    return this.http.get<SessionStatus>(this.apiUrl, { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
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

