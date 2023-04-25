const {connect, set} = require('mongoose');

exports.connectDb = async() => {
    try {
        set('strictQuery', true);
        await connect(process.env.MONGO_URL);
        console.log('mongoose connected..');
        
    } catch (error) {
        console.log(error);
    }
}