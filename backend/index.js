const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Siterouter = require('./Routers/SiteRouter');
const  UserRouter = require('./Routers/UserRouter');

dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


mongoose.connect(process.env.MONGOURL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.log('MongoDB connection failed:', error));


app.use('/user', UserRouter);

app.use('/home', Siterouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
