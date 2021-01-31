const BarSchema = require('./schemas/Bar');
const CarSchema = require('./schemas/Car');
const PersonSchema = require('./schemas/Person');

const { JIMMYS_DRINKS, SJONNIES } = require('./constants/bars');
const { MAZDA, BMW } = require('./constants/cars');
const { JAMES1, JAMES2 } = require('./constants/persons');

console.log(BarSchema.validate(JIMMYS_DRINKS));
console.log(BarSchema.validate(SJONNIES));

console.log('==========');

console.log(CarSchema.validate(MAZDA));
console.log(CarSchema.validate(BMW));

console.log('==========');

console.log(PersonSchema.validate(JAMES1));
console.log(PersonSchema.validate(JAMES2));