const mongoose = require('mongoose');

async function connectMongoDb(url) {
    return mongoose.connect(url).then(console.log("Mongo Db connected"))
}
module.exports={connectMongoDb}

const db = mongoose.connection;
