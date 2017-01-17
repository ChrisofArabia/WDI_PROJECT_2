module.exports = {
  create: walksCreate,
  index: walksIndex,
  show: walksShow,
  update: walksUpdate,
  delete: walksDelete
};

const Walk = require('../models/walk');

function walksCreate(req, res) {
  Walk.create(req.body.walk, (err, walk) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!walk) return res.status(500).json({ success: false, message: 'Please send the correct information to create a walk.' });
    return res.status(201).json(walk);
  });
}

function walksIndex(req, res) {
  Walk.find((err, walks) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ walks });
  });
}

function walksShow(req, res) {
  Walk.findById(req.params.id, (err, walk) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!walk) return res.status(404).json({ message: 'Walk not found.' });
    return res.status(200).json({ walk });
  });
}

function walksUpdate(req, res) {
  Walk.findByIdAndUpdate(req.params.id, req.body.walk, { new: true },  (err, walk) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!walk) return res.status(404).json({ message: 'Walk not found.' });
    return res.status(200).json({ walk });
  });
}

function walksDelete(req, res) {
  Walk.findByIdAndRemove(req.params.id, (err, walk) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!walk) return res.status(404).json({ message: 'Walk not found.' });
    return res.status(204).send();
  });
}
