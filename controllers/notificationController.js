const Notification = require('../models/Notifications');
const asyncHandler = require('express-async-handler');

const createNotification = asyncHandler(async (req, res) => {
    const {photo,description, about} = req.body;
    const notification = await Notification.create({photo: photo, description: description, about: about});
    return res.status(201).json({notification});
})

const deleteNotification = asyncHandler(async (req, res) => {
    const {notificationId} = req.params;
    await Notification.findByIdAndDeleteOne({_id: notificationId});
    return res.status(201).json({message: 'notification has been deleted successfully'});
})

const editNotification = asyncHandler(async (req, res) => {
    const {notificationId} = req.params;
    const notification = await Notification.findById({_id: notificationId});
    if(notification) {
        notification.description = req.body.description || notification.description;
        notification.about = req.body.about || notification.about;
        await notification.save();
        return res.status(201);
    }
    
})