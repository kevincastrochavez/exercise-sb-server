const mongodb = require('./db/connect');

const getAllBusinesses = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('businesses').find();

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBusinesses,
};
