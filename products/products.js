'use strict';

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
        price: { required: true, type: 'number' },
        weight: { required: true, type: 'number' },
        quantity_in_stock: { required: true, type: 'number' }
    };
  }
}

module.exports = Products;