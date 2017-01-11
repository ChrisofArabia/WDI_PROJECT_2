module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/photo-walks',
  secret: process.env.SECRET || 'photo walks are such fun'
};
