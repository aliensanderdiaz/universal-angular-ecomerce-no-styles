import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.sass']
})
export class LoginHeaderComponent implements OnInit {

  @Output() loginCompleted = new EventEmitter<boolean>();

  email: string = '';
  pass: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginGoogle() {
    this.authService.loginGoogleUser()
      .then(res => {
        console.log({respuesta: res});
        this.loginCompleted.emit(false);
        // this.router.navigate(['/admin/list-books'])
      })
      .catch(err => console.log('err', err))
  }

  

  onLoginFacebook() {
    this.authService.loginFacebooklUser()
      .then(res => {
        console.log({respuesta: res});
        this.loginCompleted.emit(false);
        // this.router.navigate(['/admin/list-books'])
      })
      .catch(err => console.log('err', err))
  }

  onRegister() {
    this.authService.registerUser(this.email, this.pass)
      .then(res => {
        console.log({respuesta: res});
        this.loginCompleted.emit(false);
        // this.router.navigate(['/admin/list-books'])
      })
      .catch(err => console.log('err', err))
  }

  onLogin() {
    this.authService.loginEmailUser(this.email, this.pass)
      .then(res => {
        console.log({respuesta: res});
        this.loginCompleted.emit(false);
        // this.router.navigate(['/admin/list-books'])
      })
      .catch(err => console.log('err', err))
  }

}
