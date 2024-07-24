const Artist = require("../models/Artist");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const createArtist = asyncHandler( async ( req, res ) => {
    console.log("Heyy");
    console.log(req.body);
    console.log(req.file);
    const {name, origin, country, birthdate, debut, productions, nicknames, friends, relations} = req.body;
    if(req.file) {
        const destination = req.file.destination.split(".")[1];
       const photo = req.protocol + "://" + req.get("host") + "/" + req.file.path;
        const artist = new Artist({
            name:name, photo: photo,
            origin: origin, country:country,
            birthdate: Date.parse(birthdate), debut: Date.parse(debut),
            productions: productions, nicknames: nicknames,
            friends: friends,
            relations: relations,
        });
        await artist.save();
        return res.status(200).json({artist});
    }else {
        const artist = new Artist({
            name:name,
            origin: origin, country:country,
            birthdate: Date.parse(birthdate), debut: Date.parse(debut),
            productions: productions, nicknames: nicknames,
            friends: friends, relations: relations
        });
        await artist.save();
        return res.status(201).json({artist});
    }
})


const getArtistName = asyncHandler(async (req, res) => {
    const {artistId} = req.body;
    console.log("Artist_name");
    const artists = await Artist.find({}).select({'name': 1}).sort({'name': 1});
    return res.status(201).json({artists});
})

const getAllArtist = asyncHandler(async (req, res) => {
    const artists = await Artist.find({});
    return res.status(201).json({artists});
})

const getArtistById = asyncHandler(async (req, res) => {
    const {artistId} = req.params;
    console.log("OK");
    const artist = await Artist.findById({_id: artistId});
    return res.status(201).json({artist});
} )

const deleteArtist = asyncHandler(async (req, res) => {
    const {artistId} = req.params;
     await Artist.findByIdAndDeleteOne({_id: artistId});
    return res.status(200).json({message: 'artist has been successfully deleted'});
})

const getFriends = asyncHandler (async (req, res) => {
    const {artistName} = req.params;
    const friends = await Artist.findOne({name: name});
    return res.status(201).json({friends});
})

const getArtistByLetter = asyncHandler(async (req, res) => {
    console.log("YEPC");
    const {letter} = req.params;
    const artistx = await Artist.find({}).select({name:1}).sort({name:1});
    const artists = artistx.filter(artist => artist.name.toLowerCase().startsWith(letter.toLowerCase()));
    return res.status(201).json({artists});

})

const editArtist = asyncHandler( async (req, res) => {
    const {artistId} = req.params;
    const artist = await Artist({_id: artistId});
    const {name, photo, origin, country, birthdate, debut, productions, nicknames, friends, relations} = req.body;    
    if(req.file) {
        const destination = req.file.destination.split(".")[0];
        const photox = req.protocol + "://" + req.get("host") + "/" + req.file.path;
        artist.name = name || artist.name;
        artist.photo = photox || artist.photo;
        artist.origin = origin || artist.origin;
        artist.country = artist || artist.country;
        artist.birthdate = artist || artist.birthdate;
        artist.debut = debut || artist.debut;
        artist.productions = productions || artist.productions;
        artist.nicknames = nicknames || artist.nicknames;
        artist.friends = friends || artist.friends;
        artist.relations = relations || artist.relations;
        await artist.save();
        return res.status(200).json({artist});
    }else {
        artist.name = name || artist.name;
        artist.photo = artist.photo;
        artist.origin = origin || artist.origin;
        artist.country = artist || artist.country;
        artist.birthdate = artist || artist.birthdate;
        artist.debut = debut || artist.debut;
        artist.productions = productions || artist.productions;
        artist.nicknames = nicknames || artist.nicknames;
        artist.friends = friends || artist.friends;
        artist.relations = relations || artist.relations;
        await artist.save();
        return res.status(200).json({artist});
    }    
})

module.exports = {createArtist, getAllArtist, getArtistById, getArtistByLetter, getArtistName, deleteArtist, getFriends, editArtist};