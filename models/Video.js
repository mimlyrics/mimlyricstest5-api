const mongoose = require("mongoose");
const User = require("./User");
const videoSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        lowerCase: true,
    },
    description: {
        type: String,
        trim: true,
        lowerCase: true,
    },
    artists: {
        type: [String],
    },
    genre: {
        type: String
    },
    download: {
        type: Number,
        default: () => 0
    },
    points: {
        type: Number,
        default: () => 0
    },
    isPopular: {
        type: Boolean,
        default: () => false
    },
    country: {
        type: String,
        default: () => ""
    },
    likes: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
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
    isReviewed: {
        type: Boolean,
        default: () => false
    },
    isShort: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
const Video = mongoose.model('Video', videoSchema);
module.exports = Video;