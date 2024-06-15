const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const password = process.env.PASSWORD;

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: String,
});

const boxSetSchema = new mongoose.Schema({
  name: String,
  desc: String,
  books: [bookSchema],
});

const BoxSet = mongoose.model('BoxSet', boxSetSchema);

//connect to database
async function connect() {
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

async function main() {
  await connect();

  const books = [
    {
      title: 'rocky',
      author: 'Silvester Stallone',
      price: '£9.99',
    },
    {
      title: 'rocky 2',
      author: 'Silvester Stallone',
      price: '£9.99',
    },
    {
      title: 'rocky 3',
      author: 'Silvester Stallone',
      price: '£9.99',
    },
    {
      title: 'rocky 4',
      author: 'Silvester Stallone',
      price: '£9.99',
    },
    {
      title: 'rocky 5',
      author: 'Silvester Stallone',
      price: '£9.99',
    },
  ];

  const boxSet = new BoxSet({
    name: 'Rocky',
    desc: 'all Rocky books',
    books: books,
  });

  await boxSet.save();

  await closeCon();
}

main();
