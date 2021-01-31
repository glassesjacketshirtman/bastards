const error = require('../lib/error');
jest.mock('../lib/error');

const Schema = require('../lib/schema');

describe('Schema creation', () => {
  describe('when a user supplies valid schema arguments', () => {
    it('successfully creates a new schema', () => {
      const schema = new Schema('TestSchema', { name: 'string' });
  
      expect(schema.constructor.name).toEqual('Schema');
      expect(schema.__schema).toEqual({ name: 'string' });
      expect(schema.__name).toEqual('TestSchema');
    });
  });

  describe('when a user supplies invalid schema arguments', () => {
    beforeEach(() => {
      error.mockClear();
    });

    it('fails when a schema has no name argument', () => {
      const emptySchema = new Schema();
      expect(error).toBeCalledWith('Schema name must be a string.');
    });
    
    it('fails when there is no schema object supplied', () => {
      const schemaWithName = new Schema('TestSchema');
      expect(error).toBeCalledWith(`Schema values must be of type 'object'.`);
    });

    it('fails when an invalid type exists on the schema object', () => {
      const schemaWithInvalidType = new Schema('TestSchema', { name: 'nonexistent' });
      expect(error).toBeCalledWith(`Invalid type 'nonexistent' specified for property 'name' in schema 'TestSchema'.`);
    });
  });
});

describe('Schema validation', () => {
  const personSchema = { name: 'string', age: 'number', friends: 'array' };
  const schema = new Schema('Person', personSchema);

  beforeEach(() => {
    error.mockClear();
  });

  describe('when a user supplies custom object data', () => {
    it('successfuly validates correctly structured object data', () => {
      const person = { name: 'Fred', age: 43, friends: ['Bob', 'Joe'] };
      expect(schema.validate(person)).toEqual(true);
    });
  
    it('fails when incorrect types exist on the custom object data', () => {
      const person = { name: 'Fred', age: '43', friends: ['Bob', 'Joe'] };
      expect(schema.validate(person)).toEqual(false);
      expect(error).toBeCalledWith(`Could not validate property 'age' on schema Person. Expected: number.`);
    });
  
    it('fails when properties supplied do not exist on the schema', () => {
      const person = { name: 'Fred', age: 43, friends: ['Bob', 'Joe'], address: 'Somewhere' };
      expect(schema.validate(person)).toEqual(false);
      expect(error).toBeCalledWith(`Prop 'address' does not exist in schema Person.`);
    });
  
    it('fails when properties supplied are incomplete', () => {
      const person = { name: 'Fred' };
      expect(schema.validate(person)).toEqual(false);
      expect(error).toBeCalledWith(`Missing 'age, friends' on object.`);
    });

    it('fails when object types are being passed where an array is expected' , () => {
      const person = { name: 'Fred', age: 43, friends: { name: 'Bob' } };
      expect(schema.validate(person)).toEqual(false);
      expect(error).toBeCalledWith(`Could not validate property 'friends' on schema Person. Expected: array.`);
    })
  });
});