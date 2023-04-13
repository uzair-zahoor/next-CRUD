const connectDB = require("../../../utils/connectDB");
import Student from "../../../model/student";
connectDB();
export default async function handler(req, res) {
    if (req.method === "DELETE") {
        try {
          await Student.findByIdAndDelete(req.query.id);
          res.status(200).send('Student deleted');
          console.log("Student deleted");
        } catch (err) {
          console.error(err);
          res.status(500).send('Error deleting student');
        }
      } else if (req.method === "PUT") {
        try {
          await Student.findByIdAndUpdate(req.query.id, req.body);
          res.status(200).send('Student updated');
        } catch (err) {
          console.error(err);
          res.status(500).send('Error updating student');
        }
      } else {
        res.status(400).send('Invalid HTTP method');
      }   
}
