const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  field: {
    type: String,
  },
});

const Supervisor = mongoose.model("fields", supervisorSchema);
module.exports = Supervisor;
