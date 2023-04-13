const mongoose = require('mongoose');

let Student = null;

if (mongoose.models.Student) {
  Student = mongoose.model('Student');
} else {
  const studentSchema = new mongoose.Schema({
    sname: {
      type: String,
      required: [true, 'Name is required'],

    },
    fname: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: String
    },
    dob: {
      type: String
    },
    gender: {
      type: String
    },
    country: {
      type: {}

    },
    message: {
      type: String
    },
    skills: {
      type: [String]
    },
    location: {
      type: Object
    },
    // image: {
    //   type: String,
    // }
  });
  Student = mongoose.model('Student', studentSchema);
}
module.exports = Student;