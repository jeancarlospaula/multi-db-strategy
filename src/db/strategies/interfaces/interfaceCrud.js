class NoteImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NoteImplementedException();
  }

  read(query) {
    throw new NoteImplementedException();
  }

  update(id, item) {
    throw new NoteImplementedException();
  }

  delete(id) {
    throw new NoteImplementedException();
  }

  isConnected() {
    throw new NoteImplementedException();
  }
}

module.exports = ICrud;
