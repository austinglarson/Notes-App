import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { NotesPage } from '../pages/notes/notes'
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  notesPage: any = NotesPage;
  loginPage: any = this.rootPage;
  signupPage: any = SignupPage;

  @ViewChild('nav') nav: NavController;

  isLoggedIn = false;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public menuCtrl: MenuController,
    public afAuth: AngularFireAuth,
    public auth: AuthService
  ) {

    this.afAuth.authState.subscribe( res => {
      if( res ){
        this.isLoggedIn = true;
        this.nav.setRoot(NotesPage);
      } else {
        this.isLoggedIn = false;
        this.nav.setRoot(SignupPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  load(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout() {
    this.menuCtrl.close();
    this.auth.logout();
  }
}

