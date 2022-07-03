var mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const imageSchema = new Schema({

    group: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        
    },
    filename:{
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
const Documents = mongoose.model("documents", imageSchema);
module.exports = Documents;

// module.exports = new mongoose.model('Image', imageSchema);