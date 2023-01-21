const express = require('express')

const path = require('path');
const PORT = process.env.PORT || 5000; // si le port est précisé sinon 5000
const HOST = process.env.HOST;

const app = express()
app.use('/', express.static(path.join(__dirname,'angular'))) // __dirname = le path jusqu'à backend

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
})

app.listen(PORT,() =>{
  console.log(`server running at http://localhost:${PORT}`)
})
