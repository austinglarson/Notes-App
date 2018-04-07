import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';
import { AuthService} from '../../services/auth.service'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthService
  ) {
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  signup( form: NgForm ) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.auth.signup(form.value.email, form.value.password)
      .then( res => {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: "Registration Successful",
          message: "You may now log in",
          buttons: ['Ok']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch( error => {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: "Registration Error",
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      })
  }

}
