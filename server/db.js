const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        };
        await mongoose.connect(
            "mongodb://localhost/todo-app",
            connectionParams
        );
        console.log("Connected to the ToDo Database.");
    } catch (error) {
        console.log("Sorry dude, we couldn't make the connection.", error);
    }
}