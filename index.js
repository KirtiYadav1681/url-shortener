const express = require('express');
const app = express();
app.use(express.json());

const db = require('./config/mongoose');

const UrlRouter = require('./routes/UrlRoutes');
app.use('/', UrlRouter);

const UserRouter = require('./routes/UserRoutes')
app.use('/user', UserRouter);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})