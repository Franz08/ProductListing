import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Product } from './product-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';



@Injectable()
export class ProductService {
  
  productCollection: AngularFirestoreCollection<Product>;
  productDocument:   AngularFirestoreDocument<Product>;

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes', (ref) => ref.orderBy('time', 'desc').limit(5));
  }
  
}
