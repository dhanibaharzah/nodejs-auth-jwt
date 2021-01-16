var uuid = require("uuid");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.allUsers = async (req, res) => {
    try {
      const users = await User.find({}, {username : 1, email : 1});
      res.json({
                id: uuid.v4(),
                status: 200, 
                data: users
              })
    } catch (error) {
          res.status(500).json({ message: error.message })
    }
  };

  exports.showUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id, {username : 1, email : 1})
    
      if (user == null) {
        return res.status(404).json({ message: 'Cant find subscriber'})
      }

      res.json({
        id: uuid.v4(),
        status: 200, 
        data: user
      });
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  };