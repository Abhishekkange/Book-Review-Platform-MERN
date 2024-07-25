//Required Modules
const mongoose = require('mongoose');


//creating a USER SCHEMA 
const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        //require:true,
    },

    email:{

        type:String,
        required:true,
        // unique:true

    },
    password:{

        type:String,
        // required:true,

    },
    timestamp:{

        type: String
        // required:true

        
    }
});



module.exports = mongoose.model("userDetail",UserSchema);

