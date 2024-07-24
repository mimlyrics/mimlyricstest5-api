const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    photo: {
        type: String
    },
    description: {
        type: String
    },
    about: {
        type: String
    }
}, {
    timeStamps: true
})

const Notification = mongoose.model('notificationSchema', Notification);
module.exports = Notification;