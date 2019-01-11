export class CustomerModel {

  _id: string = null;
  name: string = null;
  address: string = null;
  phone: string = null;

  constructor(obj?) {
    for (const prop in obj) {
      if (typeof this[prop] !== 'undefined') {
        this[prop] = obj[prop];
      }
    }
  }
}
