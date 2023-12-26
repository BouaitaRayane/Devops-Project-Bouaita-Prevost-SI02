const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
// const redis = require('redis');
// const redisClient = redis.createClient();
const app = express()
const port = process.env.PORT || 3000

const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World! Rayane Bouaita and Guillaume Prevost'))


app.use('/user', userRouter)


app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/readiness', (req, res) => {
    db.get('nonexistent_key', (error, result) => {
      if (error) {
          console.error('Error checking Redis readiness:', error);
          res.status(500).send('Internal Server Error');
      } else {
          res.send('OK');
      }
  });
});

const server = app.listen(port, (err) => {
    if (err) throw err
    console.log("Server listening the port " + port)
})

module.exports = server
//TODO: Swagger