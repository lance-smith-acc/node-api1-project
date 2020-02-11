// implement your API here
const express = require('express')
const Data = require('./data/db.js')
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.json({ })
})


// GET users
server.get('/api/users', (req, res) => {
    Data.find().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log(err)
        res.status(500).json({errMessage:'The users information could not be retrieved.' })
        });

})

// GET one user by id
server.get('/api/users/:id', (req, res) => {
    const user = req.params.id;

    Data.findById(user)
        .then(item => {
            if (item) {
                res.status(200).json(item);
                
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user information could not be retrieved." });
        })
})

// Add new user
server.post('/api/users', (req,res) => {
    const userInfo = req.body;

    if(userInfo.name == null || userInfo.bio == null){
        res.status(400).json({errorMessage:"Please provide name and bio for the user."})
    }
    else{
        Data.insert(userInfo)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:'There was an error while saving the user to the database' })
        });
    }
})

// Change new user info
server.put('/api/users/:id', (req,res) => {
    const { id } = req.params;
    const userInfo = req.body;

    if(!userInfo.name || !userInfo.bio){
        res.status(400).json({errorMessage:"Please provide name and bio for the user."})
    } else {
        Data.update(id, userInfo)
        .then(user => {
            if(!user){
                res.status(404).json({errorMessage:"The user with the specified ID does not exist."});                
            }
            else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:'There was an error while saving the user to the database' })
        })    
    }
})

// Delete user
server.delete('/api/users/:id', (req, res) => {

    
    Data.remove(req.params.id)
        .then(removed => {
            if (removed) {
                res.status(200).json(removed);
                
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:'The user could not be removed' })
        });
    
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port}`));