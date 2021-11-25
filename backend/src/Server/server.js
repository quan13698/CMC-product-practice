const app = require("../Apps/app");
const mongoose = require('mongoose');
const PORT = 1000;
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.xdw47.mongodb.net/CMC-product?retryWrites=true&w=majority`)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})