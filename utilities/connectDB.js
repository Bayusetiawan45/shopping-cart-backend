const db = require('../models');

module.exports = () => {
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    })
    .then(() => {
      console.log('Connected to MongoDb');
    })
    .catch((err) => {
      console.log(`Cannot connect to the database, ${err}`);
      process.exit();
    });
};
