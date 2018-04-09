const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const optionSchema = new Schema({
    name:String,
    votes:Number
})

const optionmodel = mongoose.model('option',optionSchema)

module.exports = {
    model:optionmodel,
    Schema:optionSchema
}