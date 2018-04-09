const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const option = require('./option')

const pollSchema = new Schema({
    name:String,
    owner:String,
    options:[option.Schema]
})

const pollmodel = mongoose.model('poll',pollSchema)

module.exports = {
    model:pollmodel,
    Schema:pollSchema
}