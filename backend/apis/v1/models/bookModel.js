const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the book schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    coverImage:{

        type: String,
        required: false

    },
    reviews: [
        {
            user: {
                
                type:String,
                required: true
            },
            reviewText: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date
            }
        }
    ]
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
