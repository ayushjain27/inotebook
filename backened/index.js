const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello Ayush!')
// })

app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backened listening on port ${port}`)
})
