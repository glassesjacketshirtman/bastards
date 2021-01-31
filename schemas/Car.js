const Schema = require('../lib/schema');

const carSchema = {
  brand: 'string',
  type: 'string',
  milage: 'number',
  extras: 'array',
};

module.exports = new Schema('Car', carSchema);