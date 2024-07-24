const express = require('express');
const port = process.env.PORT || 4000;
const app = express();

// connecting to MAIN database (MONGODB)//
// connectToMongo();

// Routers
//app.use('/', require('./Routers/Authentication'));


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
