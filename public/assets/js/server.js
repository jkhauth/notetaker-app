// ====================================
//server info
const { json } = require("express");
var express = require("express");
var fs = require('fs')
var path = require('path')
var db = require("../../../db/db.json")
var app = express();
var PORT = 3000;

//======================================
//===STATIC SETUP=======================
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../../public")));


//=======================================
//===GET REQUESTS========================
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
app.get(`/api/notes/:db`, function(req, res){
    
    var chosen = req.params.db

    if(chosen){
    for (var i=0; i<db.length; i++) {
        if (chosen === db[i].id){
            res.json(db[i]);
            return;
        }
    }
    res.send("No Note Found");
}
});


//=======================================
//===POST REQUESTS
app.post("/api/notes", function(req, res){
var note ={
    id: db.length + 1,
    title: req.body.title,
    text: req.body.text
}
console.log(db.length)
console.log(note)
db.push(note)
res.end()
})



//=======================================
//===DELETE REQUESTS
app.delete("/api/notes:id", (req , res) => {
    const { id } = req.params;
    if (id) {
        console.log(id + " will be deleted")
    }
    res.end()
})
// ======================================
app.listen(PORT, function(){
    console.log("app is listening on port " + PORT)
})