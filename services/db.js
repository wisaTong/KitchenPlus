let HOST_URL = 'localhost'
if (process.env.NODE_ENV==='production') HOST_URL = 'mongo'
const PORT = process.env.DB_PORT || 27018

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${HOST_URL}:${PORT}/Grader_SKE`);
