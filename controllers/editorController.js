const Album = require('../models/Album');
const User = require('../models/User');
const Video = require('../models/Video');
const Lyric = require('../models/Lyric');
const Artist = require('../models/Artist');
const Room = require('../models/Room');
const News = require('../models/News');
console.log('hummms');
const HttpsToHttp = async (req, res) => {
    try{
        let rooms = await Room.find({});
        //console.log(rooms);
        for(let i=0;i<rooms.length;i++) {
            if(rooms[i].logo) {
                rooms[i].logo = 'http://' + rooms[i].logo.split("://")[1];
                //console.log(rooms[i].logo);
                await rooms[i].save();
            }
        }
        let artists = await Artist.find({});
        for(let i=0; i<artists.length; i++ ) {
            if(artists[i].photo){
                artists[i].photo = 'http://' + artists[i].photo.split("://")[1];
                console.log(artists[i].photo);
                await artists[i].save();
            }
        }


        let users = await User.find();
        for(let i =0; i<users.length; i++) {
            if(users[i].avatar) {
                users[i].avatar = 'http://' + users[i].avatar.split("://")[1];
                console.log(users[i].avatar);
                await users[i].save();
            }
        }

        let videos = await Video.find({});
        for(let j=0;j<videos.length; j++) {
            console.log("HUmm");
            console.log(videos[j].path);
            if(videos[j].path) {
                videos[j].path = 'http://' + videos[j].path.split("://")[1];
                console.log(videos[j].path);
                await videos[j].save();
            }
        }

        let lyrics = await Lyric.find({});
        for(let i=0;i<lyrics.length; i++) {
            if(lyrics[i].path) { 
                lyrics[i].path = 'http://' + lyrics[i].path.split("://")[1];
            }
            if(lyrics[i].photo) { 
                lyrics[i].photo = 'http://' + lyrics[i].photo.split('://')[1]
            }
            console.log(lyrics[i].path, lyrics[i].photo);
            await lyrics[i].save();
        }

        let news = await News.find();
        for(let i=0;i<news.length;i++) {
            for (let j=0; j<news[i].photos.length;j++) {
                if(news[i].photos[j]) { 
                    news[i].photos[j] = 'http://' + news[i].photos[j].split("://")[1]
                    console.log(news[i].photos[j]);
                }
            }
            await news[i].save();
        }

        let albums = await Album.find();
        for(let i=0; i<albums.length;i++) {
            albums[i].photo = 'http://' + albums[i].photo.split("://")[1];
            for(let j=0;j<albums[i].lyric.length; j++ ) {
                if(albums[i].lyric[j].audio) {
                    albums[i].lyric[j].audio = 'http://' + albums[i].lyric[j].audio.split("://")[1];
                }
            }
            await albums[i].save();
        }

        console.log(albums);

        return res.status(201).json('successfully updated to http')
    }catch(err) {
        return res.status(500).json({message: 'Error, couldn\'t convert all files to http'});
    }
}

const HttpToHttps = async (req, res) => {
    try{
        let rooms = await Room.find({});
        //console.log(rooms);
        for(let i=0;i<rooms.length;i++) {
            if(rooms[i].logo) {
                rooms[i].logo = 'https://' + rooms[i].logo.split("://")[1];
                //console.log(rooms[i].logo);
                await rooms[i].save();
            }
        }
        let artists = await Artist.find({});
        for(let i=0; i<artists.length; i++ ) {
            if(artists[i].photo){
                artists[i].photo = 'https://' + artists[i].photo.split("://")[1];
                console.log(artists[i].photo);
                await artists[i].save();
            }
        }


        let users = await User.find();
        for(let i =0; i<users.length; i++) {
            if(users[i].avatar) {
                users[i].avatar = 'https://' + users[i].avatar.split("://")[1];
                console.log(users[i].avatar);
                await users[i].save();
            }
        }

        let videos = await Video.find({});
        for(let j=0;j<videos.length; j++) {
            console.log("HUmm");
            console.log(videos[j].path);
            if(videos[j].path) {
                videos[j].path = 'https://' + videos[j].path.split("://")[1];
                console.log(videos[j].path);
                await videos[j].save();
            }
        }
        let lyrics = await Lyric.find({});
        for(let i=0;i<lyrics.length; i++) {
            if(lyrics[i].path) { 
                lyrics[i].path = 'https://' + lyrics[i].path.split("://")[1];
            }
            if(lyrics[i].photo) { 
                lyrics[i].photo = 'https://' + lyrics[i].photo.split('://')[1]
            }
            console.log(lyrics[i].photo, lyrics[i].path);
            await lyrics[i].save();
        }

        let news = await News.find();
        for(let i=0;i<news.length;i++) {
            for (let j=0; j<news[i].photos.length;j++) {
                if(news[i].photos[j]) { 
                    news[i].photos[j] = 'https://' + news[i].photos[j].split("://")[1]
                    console.log(news[i].photos[j]);
                }
            }
            await news[i].save();
        }

        let albums = await Album.find();
        for(let i=0; i<albums.length;i++) {
            albums[i].photo = 'https://' + albums[i].photo.split("://")[1];
            for(let j=0;j<albums[i].lyric.length; j++ ) {
                if(albums[i].lyric[j].audio) {
                    albums[i].lyric[j].audio = 'https://' + albums[i].lyric[j].audio.split("://")[1];
                }
            }
            await albums[i].save();
        }

        console.log(albums);

        return res.status(201).json('successfully updated to https')
    }catch(err) {
       return res.status(500).json({message: 'Error, could not convert all files to https'});
    }
}


module.exports = {HttpToHttps, HttpsToHttp};