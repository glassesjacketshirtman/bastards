const Schema = require('../lib/schema');

const personSchema = {
  name: 'string',
  age: 'number',
  siblings: 'array',
  metaData: 'object',
  active: 'boolean',
};

module.exports = new Schema('Person', personSchema);