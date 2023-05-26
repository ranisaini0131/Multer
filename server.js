const express = require('express');

const multer = require('multer');

const app = express();

const PORT = 4000;


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public')); // to upload in database
app.use('/uploads', express.static('uploads')); //for uploading frontend


//Route to upload single image
app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {

    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>` // 
    return res.send(response) //how this works?
});

//Route to upload multiple images
app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {

    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for (var i = 0; i < req.files.length; i++) {
        response += `<img src="${req.files[i].path}" /><br>`
    }

    return res.send(response)
});

app.listen(PORT, (res, req) => {
    console.log(`Server is running on ${PORT}`);
})

