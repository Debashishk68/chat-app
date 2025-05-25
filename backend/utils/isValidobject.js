const { ObjectId } = require("mongodb");

function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}
module.exports = isValidObjectId;