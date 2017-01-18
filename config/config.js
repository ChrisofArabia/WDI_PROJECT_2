module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGO_URI || 'mongodb://localhost/photo-walks',
  secret: process.env.SECRET || 'photo walks are such fun'
};
