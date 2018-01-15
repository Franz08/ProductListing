import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Product } from './product-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewProduct {
  id?: string;
  title: number;
  description: string;
  price: number;
  dateCreated: number;
}

@Injectable()
export class ProductService {

  notesCollection: AngularFirestoreCollection<Product>;
  noteDocument:   AngularFirestoreDocument<Product>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products', (ref) => ref.orderBy('dateCreated', 'desc').limit(5));
  }

  getData(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  getSnapshot(): Observable<Product[]> {
    // ['added', 'modified', 'removed']
    return this.productsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Product;
        return { id: a.payload.doc.id, content: data.content, hearts: data.hearts, dateCreated: data.time };
      });
    });
  }

  getProduct(id: string) {
    return this.afs.doc<Product>(`products/${id}`);
  }

  create(content: string) {
    const product = {
      id,
      title,
      description,
      price: 0,
      dateCreated: new Date().getTime(),
    };
    return this.productsCollection.add(product);
  }

  updateProduct(id: string, data: Partial<Product>) {
    return this.getProduct(id).update(data);
  }

  deleteProduct(id: string) {
    return this.getProduct(id).delete();
  }
}
