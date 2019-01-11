export class ProductModel {

  _id: string = null;
  name: string = null;
  price: number = null;

  constructor(obj?) {
    for (const prop in obj) {
      if (typeof this[prop] !== 'undefined') {
        this[prop] = obj[prop];
      }
    }
  }
}
