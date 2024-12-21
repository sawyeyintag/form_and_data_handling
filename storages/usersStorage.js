const { v4: uuidv4 } = require("uuid");

class UsersStorage {
  constructor() {
    this.storage = [];
  }

  addUser({ name, email, age, bio }) {
    const id = uuidv4();
    this.storage.push({ id, name, email, age, bio });
  }

  getUsers() {
    return this.storage;
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { name, email, age, bio }) {
    this.storage[id] = { name, email, age, bio };
  }

  deleteUser(id) {
    this.storage = this.storage.filter((user) => user.id !== id);
  }
}

module.exports = new UsersStorage();
