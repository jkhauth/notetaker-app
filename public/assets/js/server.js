//server info
// ====================================
const { json } = require("express");
var express = require("express");
var fs = require('fs')
var path = require('path')

var db = require("../../../db/db.json")
var app = express();
var PORT = 3000;
//======================================
app.use(express.static(path.join(__dirname, "../../../public")));

//boots up index.html on startup
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../../index.html'))
})

//boots up notes page
app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, '../../notes.html'))
})

// shows all notes
app.get("/api/notes", function(req, res){
    res.json(db)
})

// shows specific note
app.get("/api/notes/:db?", function(req, res){
    
    var chosen = req.params.db

    if(chosen){
    for (var i=0; i<db.length; i++) {
        if (chosen === db[i].noteID){
            res.json(db[i]);
            return;
        }
    }
    res.send("No Note Found");

}else {
    res.json(db);
}
});

// ======================================

app.listen(PORT, function(){
    console.log("app is listening on port " + PORT)
    console.log(db[1].noteID)
})