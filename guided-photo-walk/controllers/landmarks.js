const Landmark = require('../models/landmark');

function landmarksIndex(req, res){
  Landmark.find((err, landmarks) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ landmarks: landmarks });
  });
}

module.exports = {
  index: landmarksIndex
};
