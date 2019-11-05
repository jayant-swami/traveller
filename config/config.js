require("dotenv").config();

const config = {
 app: {
   port: parseInt(process.env.PORT) || 5000
 },
 db: {
    mongoUrl: process.env.MONGO_URL,
    connectOptions: {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true ,useFindAndModify: false }
 },
 jwt: {
     jwtSecret: process.env.JWT_SECRET
 } 
};

module.exports = config;
