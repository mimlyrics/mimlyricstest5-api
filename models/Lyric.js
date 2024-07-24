const mongoose = require("mongoose");

const lyricSchema = mongoose.Schema({
    path: {
        type: String,
    },
    photo: {
        type: String
    },
    text: String,
    lyric: [
        {
            text: String,
            startTime: String,
            endTime: String,
        }
    ],
    category: {
        type: String,
    },
    genre: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    artists: {
        type: Array,
    },
    meaning: {
        type: String,
        default: () => ""
    },
    tLinks: [
        {
          lang: String,
          lyric: [{text: String, startTime: String, endTime: String}],
          text: String,
          views: Number,
          description: String,
          meaning: String,
        }
    ],
    downloads: {
        type: Number,
        default: () => 0
    },
    points: {
        type: Number,
        default: () => 0
    },
    country: {
        type: String,
        default: () => ""
    },
    views: {
        type: Number,
        default: () => 0
    },
    shares: {
        type: Number,
            default: () => 0
    },
    comments: {
        type: Number,
        default: () => 0
    },
    likes: [
        {type: mongoose.SchemaTypes.ObjectId,ref: 'User'},  
    ],
    isReviewed: {
        type: Boolean,
        default: () => false   
    },
    isPopular: {
        type: Boolean,
        default: () => false  
    },
}, {
    timestamps: true
})

const Lyric = mongoose.model('Lyric', lyricSchema);
module.exports = Lyric;