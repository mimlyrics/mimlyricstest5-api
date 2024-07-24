const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    photos:  [String],
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    about: {
        type: String, 
    }
}, {
    timestamps: true
})

const News = mongoose.model('News', newsSchema);
module.exports = News;