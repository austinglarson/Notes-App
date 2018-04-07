import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-addnote',
  templateUrl: 'addnote.html',
})
export class AddnotePage {

  notesList: AngularFireList<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public database: AngularFireDatabase) {
      this.notesList = this.database.list('/notes');
  }

  addNewNote( form: NgForm ) {
    console.log(form);
    let databaseRef = this.notesList.push({});
    databaseRef.set({
      id: databaseRef.key,
      name: form.value.note_name,
      text: form.value.note_text,
      note_date: Date.now()
    }).then( newNote => {
      this.navCtrl.pop();
    }, error => {
      console.log("Uh oh");
    })
  }

}
