const uuidv4 = require("uuid/v4");

class Database {
  constructor() {
    this.data = {};
  }

  createTable(name) {
    this.data[name] = [];
  }

  getAll(table) {
    return this.data[table];
  }

  getByID(table, id) {
    return this.data[table].filter(obj => obj.id === id)[0];
  }

  create(table, attrs) {
    const obj = Object.assign(
      {
        id: uuidv4()
      },
      attrs
    );
    this.data[table].push(obj);
    return obj;
  }

  update(table, id, newAttrs) {
    const obj = this.getByID(table, id);
    if (!obj) return;
    for (let key in newAttrs) {
      obj[key] = newAttrs[key];
    }
    return obj;
  }

  delete(table, id) {
    for (let i = this.data[table].length - 1; i >= 0; i--) {
      if (this.data[table][i].id === id) {
        this.data[table].splice(i, 1);
        break;
      }
    }
  }
}

module.exports = Database;
