module.exports = {
  object: obj => typeof obj === 'object' && !Array.isArray(obj),
  array: array => typeof array === 'object' && Array.isArray(array),
  string: string => typeof string === 'string',
  number: number => typeof number === 'number',
  boolean: boolean => typeof boolean === 'boolean'
};