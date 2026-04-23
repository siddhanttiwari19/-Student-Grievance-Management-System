const Grievance = require("../models/Grievance");

exports.create = async (req, res) => {
  const grievance = await Grievance.create({ ...req.body, user: req.user });
  res.json(grievance);
};

exports.getAll = async (req, res) => {
  const data = await Grievance.find();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.delete = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

exports.search = async (req, res) => {
  const data = await Grievance.find({
    title: { $regex: req.query.title, $options: "i" }
  });
  res.json(data);
};