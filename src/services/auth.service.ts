import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor( public fbAuth: AngularFireAuth ) {
        this.user = this.fbAuth.authState;
    }

    login(email: string, password: string) {
        return this.fbAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        this.fbAuth.auth.signOut();
    }

    signup(email:string ,password:string) {
        return this.fbAuth.auth.createUserWithEmailAndPassword(email, password);
    }
}