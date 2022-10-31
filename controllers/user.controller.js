const db = require('../models');
const valid = require('../utilities/valid');
const User = db.users;
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../utilities/generateToken');


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: passwordHash
    });

    const exists_user = await User.findOne({ email })
    if(exists_user) return res.status(400).json({err: 'This email already exists.'})

    const errMsg = valid(name, email, password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const result = await user.save();
    res.send(result);

  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error while register',
    });
  }

 
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email})
    if(!user) return res.status(400).json({err: 'This user does not exist.'})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

    const access_token = createAccessToken({id: user._id})
    const refresh_token = createRefreshToken({id: user._id})

    res.json({
      message: "Login Success",
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error while login',
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = await User.findById(id)
    res.send(result)
  } catch (err) {
    res.status(409).send({
      message: err.message,
    });
  }
}

exports.findAll = async (req, res) => {
  try {
    const result = await User.find()
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const result = await User.findByIdAndUpdate(id, req.body)
    if (!result) {
      res.status(404).send({
        message: "User Not Found"
      })
    }
    res.send({
      message: "User was updated"
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const result = await User.findByIdAndRemove(id)
    if (!result) {
      res.status(404).send({
        message: "User Not Found"
      })
    }
    res.send({
      message: "User was delete"
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    });
  }
}
