const ICrud = require("./interfaces/interfaceCrud");

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log(`${item} salvo em MongoDB`);
  }
}

module.exports = MongoDB;
