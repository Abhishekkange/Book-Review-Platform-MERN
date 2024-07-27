const express = require('express');
const port = process.env.PORT || 4000;
const app = express();
const http = require('http');
const connectToMongo = require('./db/db');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

// connecting to MAIN database (MONGODB)//
connectToMongo();

// Routers
app.use('/api/v1', require('./routes/auth-routes'));
app.use('/api/v1', require('./routes/bookreview-routes'));
app.use('/api/v1', require('./routes/profile-routes'));
app.use('/api/v1', require('./routes/fileupload'));

const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
//