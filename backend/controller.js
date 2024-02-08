const dotenv = require("dotenv");
const axios = require("axios");
const multer = require("multer");
const Whisper = require('whisper-nodejs');
// const path = require("path");
// const FormData = require('form-data');
const fs = require("fs");
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

dotenv.config({ path: './config.env' });

const User = require("./models/userModel.js");

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull!", user: user });
            }
            else {
                res.send({ message: "Incorrect Password!" });
            }
        }
        else {
            res.send({ message: "User not registered!" });
        }
    });
}

exports.register = (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, async (err, user) => {
        if (user) {
            res.send({ message: "User already registerd!" });
        }
        else {
            try {
                await User.create({
                    name: name,
                    email: email,
                    password: password
                });
                res.send({ message: "Successfully Registered, Please login now." });
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}

const multerStorage = multer.diskStorage({
    destination : (req, file, cb) => {
      cb(null ,'public/Audio');
    },
    filename : (req, file, cb) => {
      cb(null , `user-${req.body.user_id}.mp3`);
    }
});
const upload = multer({
    storage: multerStorage
});
const whisper = new Whisper(`${process.env.OPENAI_API_KEY}`);
  
exports.uploadAudio = upload.single('audio_file');
  
exports.audioUpload = async (req, res) => {
    // const filePath= path.join(__dirname,`public/Audio/${req.file.filename}`);

    // const formData = new FormData();
    // formData.append("model","whisper-1");
    // formData.append("file",fs.createReadStream(filePath));
    // formData.append("temperature",0.8);

    // axios.post("https://api.openai.com/v1/audio/transcriptions" ,formData, {
    //     headers : {
    //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //         "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
    //     }
    // })
    // .then(async response => {
    //     const result = await axios.post("http://35.195.91.213/audio_upload",
    //     {
    //       transcript: response.data.text,
    //       user_id : req.body.user_id
    //     },
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    //       },
    //     });
    //     res.send(response.data.text);
    //     await unlinkAsync(req.file.path);
    // })
    // .catch(async error => {
    //     console.error(error);
    //     await unlinkAsync(req.file.path);
    // });


    whisper.translate(`${__dirname}/public/Audio/${req.file.filename}`, 'whisper-1' , 'en')
    .then(async text => {
        const result = await axios.post("http://35.195.91.213/audio_upload",
        {
          transcript: text,
          user_id : req.body.user_id
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            },
        });
        res.send(text);
        await unlinkAsync(req.file.path);
    })
    .catch(async error => {
        console.error(error);
        await unlinkAsync(req.file.path);
    });
};
