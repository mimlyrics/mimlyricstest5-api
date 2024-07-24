const asyncHandler = require('express-async-handler');
const path = require("path");
const Album = require("../models/Album");
const fs = require("fs");

const createAlbum = asyncHandler(async (req, res) => {
    const {name, title, category, artistName, 
        points, country, isPopular, description, date} = req.body; 
    const album = await Album.create({name:name, title:title, category:category, date: date, artistName: artistName,
        points:points, country: country, isPopular: isPopular, description: description});
    return res.status(201).json({album});
})

const createPhotoCover = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    const album = await Album.findOne({_id: albumId});
    console.log("YEAH");
    //console.log(req.file);
    if(req.file && album.photo) {
        //console.log("HEE");
        const photox = req.protocol + "://" + req.get("host") + "/" + req.file.path;
        const hostFile =   req.get("host");
        //console.log(hostFile);
        const splitAlbumPhoto = album.photo.split(hostFile);
        const deleteAlbumPhoto = "." + splitAlbumPhoto[1];
        console.log(deleteAlbumPhoto);
        fs.unlink(deleteAlbumPhoto, (err) => {
            if (err) console.log(err);
            console.log("album photo cover has been deleted successfully");
        })
        album.photo = photox || album.photo;
        await album.save();
        //console.log(album);
        return res.status(201).json({album})
    }else {
        const photox = req.protocol + "://" + req.get("host") + "/" + req.file.path;
        album.photo = photox || album.photo;
        await album.save();
        console.log(album);
        return res.status(201).json({album})          
    }  
})

const updateAlbum = asyncHandler(async (req, res) => {
    console.log(req.file);
    const {albumId} = req.params;
    const album = await Album.findOne({_id: albumId});
    if(req.file) {
        const photox = req.protocol + "//:" + req.get("host") + "/" + req.file.path;
        album.name = req.body.name || album.name;
        album.title = req.body.title || album.title;
        album.category = req.body.category || album.category;
        album.artistName = req.body.artistName || album.artistName;
        album.points = req.body.points || album.points;
        album.country = req.body.country || album.country;
        album.isPopular = req.body.isPopular || album.isPopular;
        album.description = req.body.description || album.description;
        album.date = req.body.date || album.date;
        await album.save();
        return res.status(201).json({album});
    }else {
        album.name = req.body.name || album.name;
        album.title = req.body.title || album.title;
        album.category = req.body.category || album.category;
        album.artistName = req.body.artistName || album.artistName;
        album.points = req.body.points || album.points;
        album.country = req.body.country || album.country;
        album.isPopular = req.body.isPopular || album.isPopular;
        album.description = req.body.description || album.description;
        album.date = req.body.date || album.date;
        await album.save();
        return res.status(201).json({album});
    }
})

const getAlbums = asyncHandler(async (req, res) => {
    const {category} = req.params;
    const albums = await Album.find({category: category})
    return res.status(201).json({albums});
})

const getAlbumsByGenre = asyncHandler(async (req, res) => {
    const {genre} = req.params;
    const albums = await Album.find({genre: genre})
    return res.status(201).json({albums});
})

const getAlbumsByCountry = asyncHandler(async (req, res) => {
    const {country} = req.params;
    const albums = await Album.find({country: country});
    return res.status(201).json({albums});
})

const clearAlbums = asyncHandler(async(req, res) => {
    const albums = await Album.drop({});
    return res.status(200).json("Albums has been cleared");
})

const getRecentAlbum = asyncHandler(async (req, res) => {
      const  album = await Album.find({}).sort({_id: -1}).limit(1);
      return res.status(201).json({album});
})

const getAlbumById = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    const album = await Album.find({_id: albumId}).limit(1);
    return res.status(201).json({album});
})

const editAlbum = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    console.log(req.file);
    const album = await Album.findOne({_id:albumId});
    if(album && req.file ) {
        const splitPhoto = album.photo.split(":5000")[1];
        const deletePhoto = "." + splitPhoto;
        console.log(deletePhoto);
        fs.unlink(deletePhoto, (err) => {
            if(err) console.log("no such photo exists");
            console.log("file has been deleted");
        })
        const photox = req.protocol + "://" + req.get("host") + 
            req.file.destination.split(".")[1] + "/" + req.file.filename
        album.name = req.body.name || album.name;
        album.title = req.body.title || album.title;
        album.category = req.body.category || album.category;
        album.description = req.body.description || album.description;
        album.artistName = req.body.artistName || album.artistName;
        album.isPopular = req.body.isPopular || album.isPopular;
        album.photo = photox || album.photo;
        album.points = req.body.points || album.points;
        album.date = req.body.date || album.date;
        await album.save();
        //console.log(album);
        return res.status(201).json({album});
    }
    else {
        if(album && !req.file ) {
            album.name = req.body.name || album.name;
            album.title = req.body.title || album.title;
            album.category = req.body.category || album.category;
            album.description = req.body.description || album.description;
            album.artistName = req.body.artistName || album.artistName;
            album.isPopular = req.body.isPopular || album.isPopular;
            album.photo = album.photo;
            album.points = req.body.points || album.points;
            album.date = req.body.date || album.date;
            await album.save();
            return res.status(201).json({album});        
        }
    }
})

const searchAlbums = async () => {
    const {searchId} = req.params;
    const albums = await Album.find({});
    if(albums) {
        const searchalbums = albums.filter(album => album.name.toLowerCase().includes(searchId.toLowerCase()));
        if(!searchalbums) {
            searchalbums = albums.filter(album => album.category.toLowerCase().includes(searchId.toLowerCase()));
        }
        if(!searchalbums) {
            searchalbums = albums.filter(album => album.country.toLowerCase().includes(searchId.toLowerCase()));
        }
    }
    return res.status(201).json({searchalbums});
}


const audioAlbum = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    let audios = [];
    //console.log(albumId);
    console.log("yess");
    if(req.files) {
        const destination = req.files[0].destination.split(".")[1];
        //console.log(destination);
        for(let i=0; i<req.files.length;i++) {
            const mediax = {audio: req.protocol + "://" + req.get("host") + destination + "/" + req.files[i].filename, originalname: req.files[i].originalname};
            audios.push(mediax);
        }
        //console.log(audios);
        const album = await Album.findOne({_id:albumId});
        if(album) {
            album.lyric = audios || album.lyric
            await album.save();
            return res.status(201).json({album});
        }
    }
})

const editAlbum2 = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    let {text, artistName, title, points} = req.body;
    console.log("heyy");
    const album = await Album.updateOne({'lyric._id': albumId}, {$set: {'lyric.$.title': title, 
    'lyric.$.artistName': artistName, 'lyric.$.text': text, 'lyric.$.points': points }}, {}); 
    console.log(album);
    return res.status(201).json({album});
})

const deleteAlbum = asyncHandler(async (req, res) => {
    const {albumId} = req.params;
    const deleteAlbum = await Album.findByIdAndDeleteOne({_id:albumId});
    if(deleteAlbum) {
        return res.status(200).json({message: 'Has been deleted successfully'});
    }
})

module.exports ={createAlbum, audioAlbum, getRecentAlbum, editAlbum2, 
    editAlbum, getAlbumsByGenre, deleteAlbum, clearAlbums, updateAlbum, createPhotoCover, getAlbumsByCountry, getAlbumById, getAlbums, searchAlbums};