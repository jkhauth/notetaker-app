//server info
// ====================================
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

// ======================================

app.listen(PORT, function(){
    console.log("app is listening on port " + PORT)
})