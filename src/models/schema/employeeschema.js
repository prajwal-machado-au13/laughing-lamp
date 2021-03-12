const mongoose = require('mongoose')
const validator = require('validator')
var employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:"Firstname is  required"
    },
    lastname : String,
    email : {
        type: String,
        required: [true,"Email is required"],
        unique:true,
    },
    phone : {
        type: String,
        required:[true,"Phone Number is required"],
    },
    address: String,
    pancard : {
        type: String,
        required: "enter the pancard number"
    },
    cloudinary_id: String,
    basicsalary : {
        type: Number,
        required:true,
        trim:true,
        min:10000,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    da: {
        type: Number,
        required: true,
        trim:true,
        min:0,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    hra : {
        type: Number,
        required: true,
        trim:true,
        min:0,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    medical : {
        type : Number,
        required: true,
        trim:true,
        min:0,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    proftax : {
        type: Number,
        required: true,
        trim:true,
        min:0,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    incometax : {
        type: Number,
        enum: [10, 20, 30],
        required : true
    },
    providentfund : {
        type: Number,
        required: true,
        trim:true,
        min:0,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },

})

employeeSchema.path('email').validate((value)=>{
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value)
},'Invalid e-mail')

employeeSchema.path('phone').validate((value)=>{
    phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/
    return phoneRegex.test(value)
},'Invalid phone number')

module.exports = mongoose.model('new',employeeSchema)