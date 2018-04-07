import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { NgForm } from '@angular/forms';
import { AuthService} from '../../services/auth.service'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthService
  ) {
  }

  signup() {
    this.navCtrl.setRoot(SignupPage);
  }

  login( form: NgForm ) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.auth.login(form.value.email, form.value.password)
      .then( data => {
        loader.dismiss();
      })
      .catch( error => {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: "Login Error",
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      })
  }

}
