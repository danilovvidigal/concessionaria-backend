const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
mongoClient.connect("mongodb://localhost:27017")
            .then(conn => global.conn = conn.db("concessionaria"))
            .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("carros").find().toArray();
}

function insert(carro) {
    return global.conn.collection("carros").insertOne(carro);
}



function findById(id) {
    return global.conn.collection("carros").findOne(new ObjectId(id));
}


function deleteById(id) {
    return global.conn.collection("carros").deleteOne({ _id: new ObjectId(id) });
}

function update(id, carro) {
    return global.conn.collection("carros").updateOne({ _id: new ObjectId(id) }, { $set: carro });
}
 

module.exports = { findAll, insert, findById, deleteById, update  }