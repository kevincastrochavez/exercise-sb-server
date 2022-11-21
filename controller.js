const getResponse = (req, res) => {
  res.status(200).json({ message: 'This is getting from the server' });
};

module.exports = {
  getResponse,
};
