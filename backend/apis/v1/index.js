const express = require('express');
const port = process.env.PORT || 4000;
const app = express();
const connectToMongo = require('./db/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// connecting to MAIN database (MONGODB)//
connectToMongo();

// Routers
app.use('/api/v1', require('./routes/Authenticaton'));
app.use('/api/v1', require('./routes/bookReview'));


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
