const Schema = require('../lib/schema');

const barSchema = {
  name: 'string',
  address: 'string',
  drinks: 'object',
};

module.exports = new Schema('Bar', barSchema);