import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, reorderArray } from 'ionic-angular';
import { AddnotePage } from '../addnote/addnote';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NotePage } from '../note/note';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  //notesList: AngularFireList<any>;
  //notesList: Observable<any>;
  notesList: any[];
  editmode: boolean = false;
  trash = [];
  reorder = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.loadNotes();
  }

  loadNotes() {
    const loader = this.loadingCtrl.create();
/*     loader.present().then( () => {
      this.notesList = this.database.list('/notes').valueChanges();
      loader.dismiss();
    }) */
    Observable.fromPromise(loader.present()).switchMap(() => { //1
      return this.database.list('/notes').valueChanges(); //2
    }).subscribe((list) => { //3
      this.notesList = list; //4
      loader.dismiss();
    });
  }

  newNote() {
    this.navCtrl.push(AddnotePage);
  }

  setEditMode() {
    this.editmode = !this.editmode;
    if( !this.editmode ) {
      this.trash = [];
    }
  }

  addToTrash( id ) {
    let index = this.trash.indexOf(id);
    if( index < 0) {
      this.trash.push(id);
    } else {
      this.trash.splice(index, 1);
    }
    console.log(this.trash);
  }

  removeTrash() {
    for(let i = 0; i < this.trash.length; i++) {
      this.database.list('/notes').remove(this.trash[i]);
    }
    this.trash = [];
    this.editmode = false;
  }

  removeAllNotes(){
    const alert = this.alertCtrl.create({
      title: "Remove all notes",
      message: "Are you sure?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.database.list('/notes').remove();
            this.editmode = false;
          }
        }
      ]
    });
    alert.present();
  }

  reorderItems( indexes ) {
    this.notesList = reorderArray(this.notesList, indexes);
  }

  loadNote(note) {
    this.editmode = false;
    this.navCtrl.push(NotePage, {
      note: note
    })
  }

}
