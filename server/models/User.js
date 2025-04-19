const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const data = new mongoose.Schema({
    q1: {
        type: String,
        required: true,
    },
    q2: {
        type: String,
        required: true,
    },
    q3: {
        type: String,
        required: true,
    },
    q4: {
        type: String,
        required: true,
    },
    q5: {
        type: String,
        required: true,
    },
    q6: {
        type: String,
        required: true,
    }
});

const Data = mongoose.model('Data', data);

module.exports = Data;






