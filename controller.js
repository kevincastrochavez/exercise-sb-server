const mongodb = require('./db/connect');
const ObjectId = require('mongodb').ObjectId;

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

const getBusiness = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid business id to find a business');
    }

    const urlId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('businesses')
      .find({ _id: urlId });

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBusiness = async (req, res) => {
  try {
    const business = {
      businessName: req.body.businessName,
      address: req.body.address,
      zipCode: req.body.zipCode,
      opens: req.body.opens,
      closes: req.body.closes,
      phoneNumber: req.body.phoneNumber,
      businessWebsite: req.body.businessWebsite,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('businesses')
      .insertOne(business);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(`An error occurred creating a business: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBusiness = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid business id to update a business.');
    }

    const businessId = new ObjectId(req.params.id);

    const business = {
      businessName: req.body.businessName,
      address: req.body.address,
      zipCode: req.body.zipCode,
      opens: req.body.opens,
      closes: req.body.closes,
      phoneNumber: req.body.phoneNumber,
      businessWebsite: req.body.businessWebsite,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('businesses')
      .replaceOne({ _id: businessId }, business);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(`An error occurred updating a business: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid business id to delete a business.');
    }

    const businessId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('businesses')
      .remove({ _id: businessId }, true);

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(`An error occurred deleting a business: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
