var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: {type:String, required:true},
    userId: {type:String, required:true},
    // imageID: {type:String, required:true},
    imagePath: {type:String, required:true},
    // imageName: {type:String, required:true},
    ingredients: {type:String, required:true},
    instructions: {type:String, required:true},
    category: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    savedBy: Array,
    saves: Number
});

module.exports = mongoose.model('posts', imageSchema);