const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const rootRouter = require('./Routes/index');

// Middleware for parsing request bodies
app.use(bodyParser.json());
// app.use("/admin", adminRouter)
app.use("/vi", rootRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
