const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const password = process.env.PASSWORD;

//Define the schema of the document i want to read
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//Define Notes schema object
const NotesSchema = mongoose.Schema({
  text: String,
  title: String,
  timeStamp: { type: Date, default: Date.now },
});

//create document model
const User = new mongoose.model('Users', UserSchema);

//create document model
const Note = new mongoose.model('Notes', NotesSchema);

//connect to database
async function main() {
  console.log('connecting');
  await mongoose.connect(
    `mongodb+srv://emi:${password}@cluster0.wvmqc9u.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0`
  );
  console.log('connected');
  return 'connected to db';
}

//disconnect to database
async function closeCon() {
  await mongoose.disconnect();
  console.log('connection closed');
}

//run the code
main()
  .then(async (success) => {
    console.log(success);
    //use User Document schema to search inside it
    const response = await User.find({ name: 'emi' });
    console.log(response);
    //close db
    await closeCon();
  })
  .catch((err) => console.error(err));
