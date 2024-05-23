const mongoose=require("mongoose")

const connectdb = async () => {
    try {
        console.log(process.env.mongo_uri)
        await mongoose.connect(process.env.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports={connectdb}