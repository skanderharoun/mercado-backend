const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: [ "http://localhost:3000" ] }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Mercado Marketplace API v1" })
});

app.use('/items', itemsRouter);
app.use('/auth', usersRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
            console.log('Successfully connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}`);
            });
        })
        .catch(error => {
            console.log(error);
        })
