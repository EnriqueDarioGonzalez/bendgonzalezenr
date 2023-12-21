const {connect} = require('mongoose')

exports.connectDb = async () => {
    await connect('mongodb://127.0.0.1:27017/miPrimeraBase')
    console.log('base de datos conectada')
}