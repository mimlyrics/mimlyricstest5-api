const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 40,
    },
    birthName: {
        type: String,
    },
    photo: {
        type: String,
        default: () => ""
    },
    origin: {
        type: String,
    },
    country: {
        type: String,
    },
    birthdate: {
        type: String,
        required: true
    },
    debut: {
        type: String,
        required: true,
    },
    productions: {
        type: Array
    },
    friends: {
        type: Array
    },
    nicknames: {
        type: Array
    },
    relations: {
        type: Array
    },
    style: {
        type: String
    },
    subscribers: [{type: mongoose.SchemaTypes.ObjectId}],
    gallery: [
        { 
            photo: {
                type: String,
                default: () => ''
            },
            likes: {
                type: mongoose.SchemaTypes.ObjectId,
                default: () => 0
            },
            download: {
                type: Number,
                default: () => 0
            }            
        }
    ]
}, {
    timestamps: true,
})

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;