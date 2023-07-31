const { Router } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { createIndexes } = require('./models/user.model');

// model 

const User = require('./models/user.model');
const Video = require('./models/videos.model');
const Comment = require('./models/comment.model');

const PORT = 4040;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//route
app.get('/', (req, res) => {
    res.send('Hello')
})

mongoose
.connect('mongodb+srv://admin:admin123@clustertokpedliveaufa.2zyzkfc.mongodb.net/TokpedLiveAufaCollection?retryWrites=true&w=majority')
.then(() => {
    app.listen(PORT, () => {
        console.log(`Running on Port ${PORT}`)
    })
    console.log('DB Connected');
}).catch((error) => {
    console.log('Error');
})

// USER SECTION

//save the users data
app.post('/users', async (req, res) => {
    try {
        const users = await User.create(req.body);
        res.status(200).json(users); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

// get the data
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// get the data by id
app.get('/users/:id', async (req, res) => {
    try {
        // only one, so watch the variable id
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// update the data 
app.put('/users/:id', async (req, res) => {
    try {
        // only one, so watch the variable id
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        // if user is not update
        if(!user) {
            res.status(404).json({message: `cant find user ${id}`});
        } 
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete user 
app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id, req.body);
        if(!user) {
            res.status(404).json({message: `cant find user ${id}`});
        } 
        res.status(200).json({message: "User Deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// create video and the user
app.post('/videos', async(req, res) => {
    try {
        const { title, description, videoPath, thumbnailPath, views, likes, createdBy } = req.body;
        let user = await User.findOne({username: createdBy});

        //book
        const video = new Video({ title, description, videoPath, thumbnailPath, views, likes, createdBy });
        const savedVideo = await video.save();
        res.json(savedVideo);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// get the videos
app.get('/videos', async (req, res) => {
    try {
        const videosWithUsers = await Video.find().populate('createdBy');
        res.json(videosWithUsers);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// comment the videos 
app.post('/videos/:videosId/user/:userId', async(req, res) => {
    try {
        const { videosId, userId } = req.params;
        const { text } = req.body;
        const comment = new Comment({ user: userId, video: videosId, text });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'failed to create comment'})
    }
});

