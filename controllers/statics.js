const path = require('path');

function staticsHome(req, res) {
  const path = path.join(__dirname, '../public/index.html');
  console.log(path);
  return res.sendFile(path);
}

module.exports = {
  home: staticsHome
};
