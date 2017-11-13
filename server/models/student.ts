import * as mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  program: String,
  address: String,
  phone: Number,
  age: Number
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
