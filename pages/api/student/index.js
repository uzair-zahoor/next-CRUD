const connectDB = require("../../../utils/connectDB");
import Student from "../../../model/student";
connectDB();
export default function handler(req, res) {
  if (req.method === "GET") {
    Student.find({}, (err, Student) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving students');
      } else {
        res.status(200).json(Student);
      }
    });
  }
  if (req.method === "POST") {
    console.log(req.body);
    // const student = new Student(req.body);
       const student = new Student({
          sname: req.body.sname,
          fname: req.body.fname,
          email: req.body.email,
          contact: req.body.contact,
          dob: req.body.dob, 
          gender: req.body.gender, 
          country : req.body.country,  
          message : req.body.message ,
          skills : req.body.skills ,
          location: req.body.location,
          // image: req.file.filename, // save filename in database
        });
    // console.log(req.body);
    student.save((err, savedStudent) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving student');
      } else {
        res.status(201).send(savedStudent);
        console.log("Student saved");
      }
    });
  }
}
