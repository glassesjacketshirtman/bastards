const validate = require('./validate');
const error = require('../error');

class Schema {
  constructor(name, schemaObj) {
    if (!validate.string(name)) return error('Schema name must be a string.');
    if (!validate.object(schemaObj)) return error(`Schema values must be of type 'object'.`);

    this.__name = name;
    this.__schema = {};
    this.__register(schemaObj);
    this.validate = this.__validate.bind(this);
  }

  __checkType(prop, propType) {
    if (!validate.hasOwnProperty(propType)) {
      throw new Error(`Invalid type '${propType}' specified for property '${prop}' in schema '${this.__name}'.`);
    }
  }

  __register(schemaObj) {
    try {
      for (const prop in schemaObj) {
        const propType = schemaObj[prop];
        this.__checkType(prop, propType);
        this.__schema[prop] = propType;
      }
    } catch(e) {
      error(e.message);
    }
  }

  __checkIfPropertiesMatchSchema(obj) {
    const schemaKeys = Object.keys(this.__schema).sort();
    const objKeys = Object.keys(obj).sort();
    const diff = schemaKeys.filter(key => !objKeys.includes(key));
    if (diff.length > 0) throw new Error(`Missing '${diff.join(', ')}' on object.`);
  }

  __checkIfPropExistsInSchema(prop) {
    if (!this.__schema.hasOwnProperty(prop)) {
      throw new Error(`Prop '${prop}' does not exist in schema ${this.__name}.`)
    }
  }

  __validatePropValue(prop, value) {
    const type = this.__schema[prop];
    const validator = validate[type];
    if (!validator(value)) throw new Error(`Could not validate property '${prop}' on schema ${this.__name}. Expected: ${type}.`);
  }

  __validate(obj) {
    try {
      this.__checkIfPropertiesMatchSchema(obj);

      for (const prop in obj) {
        const value = obj[prop];
        this.__checkIfPropExistsInSchema(prop);
        this.__validatePropValue(prop, value);
      }
      return true;
    } catch(e) {
      error(e.message);
      return false;
    }
  }
}

module.exports = Schema;