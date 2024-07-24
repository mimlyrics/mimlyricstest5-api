const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    genres: [{type: String}],
    about: [{type: String}]
})

const AppData = mongoose.model('AppData', dataSchema);
module.exports = AppData;