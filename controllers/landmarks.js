module.exports = {
  create: landmarksCreate,
  index: landmarksIndex,
  show: landmarksShow,
  update: landmarksUpdate,
  delete: landmarksDelete
};

const Landmark = require('../models/landmark');

function landmarksCreate(req, res) {
  Landmark.create(req.body.landmark, (err, landmark) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!landmark) return res.status(500).json({ success: false, message: 'Please send the correct information to create a landmark.' });
    return res.status(201).json(landmark);
  });
}

function landmarksIndex(req, res) {
  Landmark.find((err, landmarks) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ landmarks });
  });
}

function landmarksShow(req, res) {
  Landmark.findById(req.params.id, (err, landmark) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!landmark) return res.status(404).json({ message: 'Landmark not found.' });
    return res.status(200).json({ landmark });
  });
}

function landmarksUpdate(req, res) {
  Landmark.findByIdAndUpdate(req.params.id, req.body.landmark, { new: true },  (err, landmark) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!landmark) return res.status(404).json({ message: 'Landmark not found.' });
    return res.status(200).json({ landmark });
  });
}

function landmarksDelete(req, res) {
  Landmark.findByIdAndRemove(req.params.id, (err, landmark) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!landmark) return res.status(404).json({ message: 'Landmark not found.' });
    return res.status(204).send();
  });
}
