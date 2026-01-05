const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};
