import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {

  note: any;
  //notesList: Observable<any>;
  notesList: AngularFireList<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: AngularFireDatabase
  ) {
    this.notesList = this.database.list('/notes');
    this.note = this.navParams.get('note');
  }

  ionViewWillLeave() {
    this.notesList.update(this.note.id, {
      name: this.note.name,
      text: this.note.text,
      date: Date.now()
    })
  }

}
