const { v4: uuidv4 } = require("uuid");

class UsersStorage {
  constructor() {
    this.storage = {};
  }

  addUser({ name, email, age, bio }) {
    const id = uuidv4();
    this.storage[id] = { name, email, age, bio };
  }

  getUsers() {
    // Convert storage object to an array of users
    return Object.keys(this.storage).map((id) => ({ id, ...this.storage[id] }));
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { name, email, age, bio }) {
    if (this.storage[id]) {
      this.storage[id] = { name, email, age, bio };
    }
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

module.exports = new UsersStorage();
