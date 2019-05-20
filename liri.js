require("dotenv").config();

var fs = require("fs");
var moment = require('moment');
var axios = require("axios");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);



let command = process.argv[2];
let searchTerm = process.argv.slice(3).join(" ");

fs.appendFileSync('log.txt', command + ":\n", function (err) {
    if (err) throw err;
});

switch (command) {
    case "concert-this": //bands in town
        searchForBandsInTown(searchTerm);
        break;
    case "spotify-this-song": //spotify
        spotifyThisSong(searchTerm);
        break;
    case "movie-this": // OMDB for movies
        movieThis(searchTerm);
        break;
    case "do-what-it-says": //  read commands from a file and execute the commands above
        doRandom();
        break;
}

function searchForBandsInTown(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
     
            if (response.data[0].venue != undefined) {
                console.log("\n**********EVENT INFO*********\n");
                fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");
                console.log("Event Venue: " + response.data[0].venue.name);
                fs.appendFileSync("log.txt", "Event Venue: " + response.data[0].venue.name + "\n");
                console.log("Event Location: " + response.data[0].venue.city);
                fs.appendFileSync("log.txt", "Event Location: " + response.data[0].venue.city + "\n");
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
                fs.appendFileSync("log.txt", "Event Date & Time:: " + eventDateTime.format("dddd, MMMM Do YYYY") + "\n");
                console.log("\n*****************************");
                fs.appendFileSync("log.txt", "*****************************" + "\n");

            } else {
                console.log("No results found.");
            }
        }
    ).catch(function (error) {
        console.log(error);
    });
}

function spotifyThisSong(song) {
    spotify
        .search({
            type: 'track',
            query: song
        })
        .then(function (response) {
            if (response.tracks.total === 0) {
                errorConditionForSpotify();
            } else {
                console.log("\n**********SONG INFO*********\n");
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
                fs.appendFileSync("log.txt", "Artist(s): " + response.tracks.items[0].artists[0].name + "\n");
                console.log("Track: " + response.tracks.items[0].name);
                fs.appendFileSync("log.txt", "Track: " + response.tracks.items[0].name + "\n");
                console.log("Preview Your Song Here: " + response.tracks.items[0].preview_url);
                fs.appendFileSync("log.txt", "Preview Your Song Here: " + response.tracks.items[0].preview_url + "\n");
                console.log("Album: " + response.tracks.items[0].album.name);
                fs.appendFileSync("log.txt", "Album: " + response.tracks.items[0].album.name + "\n");
                console.log("\n*****************************");
                fs.appendFileSync("log.txt", "*****************************\n");

            }
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. Showing results for 'The Sign' by Ace of Base");
        });
}

function errorConditionForSpotify() {
    spotify
        .search({
            type: 'track',
            query: 'The Sign'
        })
        .then(function (response) {
            for (var i = 0; i < response.tracks.items.length; i++) {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log("\n**********SONG INFO*********\n");
                    fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                    console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
                    fs.appendFileSync("log.txt", "Artist(s): " + response.tracks.items[0].artists[0].name + "\n");
                    console.log("Track: " + response.tracks.items[0].name);
                    fs.appendFileSync("log.txt", "Track: " + response.tracks.items[0].name + "\n");
                    console.log("Preview Your Song Here: " + response.tracks.items[0].preview_url);
                    fs.appendFileSync("log.txt", "Preview Your Song Here: " + response.tracks.items[0].preview_url + "\n");
                    console.log("Album: " + response.tracks.items[0].album.name);
                    fs.appendFileSync("log.txt", "Album: " + response.tracks.items[0].album.name + "\n");
                    console.log("\n*****************************");
                    fs.appendFileSync("log.txt", "*****************************\n");
                    i = response.tracks.items.length;


                }
            }
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. ");
        });
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function (response) {

            if (response.data.Title != undefined) {
                console.log("\n**********MOVIE INFO*********\n");
                fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
                console.log("Title: " + response.data.Title);
                fs.appendFileSync("log.txt", "Title: " + response.data.Title + "\n");
                console.log("Year: " + response.data.Year);
                fs.appendFileSync("log.txt", "Year: " + response.data.Year + "\n");
                console.log("IMDB Rating: " + response.data.imdbRating);
                fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating + "\n");
                console.log("Country: " + response.data.Country);
                fs.appendFileSync("log.txt", "Country: " + response.data.Country + "\n");
                console.log("Language: " + response.data.Language);
                fs.appendFileSync("log.txt", "Language: " + response.data.Language + "\n");
                console.log("Plot: " + response.data.Plot);
                fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
                console.log("Actors: " + response.data.Actors);
                fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
                console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating + "\n");
                fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.tomatoRating + "\n");
                console.log("\n*****************************");
                fs.appendFileSync("log.txt", "*****************************\n");



            } else {
                movieThis("Mr. Nobody");
            }
        }

    ).catch(function (error) {
        console.log(error);
        console.log("No Results found. ");
    });
}


function doRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        spotifyThisSong(dataArr[1])

        if (error) {
            return console.log(error);
        }
    });
}