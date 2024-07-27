const User = require('../models/UserModel');
const book = require('../models/bookModel');


//function to get the details of given user from its ID
async function getUserProfile(req,res){

    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId},'email username');
    if(user)
    {
        res.json({"message":user});
    }
    else{

        res.json({"message":"user not found"});
    }

}

//function to fetch all reviews of given user using ID
async function getReveiwOfUser(req,res){

    const userId = req.params.userId;

    try {
        // Find all books and filter reviews by user ID
        const books = await book.find({ 'reviews.user': userId }).populate('reviews.user', 'username email');

        // Extract reviews made by the specific user
        const userReviews = [];
        books.forEach(book => {
            const reviewsByUser = book.reviews.filter(review => review.user.toString() === userId);
            reviewsByUser.forEach(review => {
                userReviews.push({
                    bookTitle: book.title,
                    bookAuthor: book.author,
                    reviewText: review.reviewText,
                    rating: review.rating,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt
                });
            });
        });

        res.status(200).json(userReviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews', error });
        console.error(error);
    }



}

//function to update the User details
async function updateUserDetails(req,res)
{

    const userId = req.params.userId; // Extract user ID from request parameters
    const { username, email } = req.body; // Extract username and email from request body

    try {
        // Find user by ID and update username and email
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email }, // Update only username and email
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User details updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user details', error });
    }


}


module.exports = {getUserProfile,updateUserDetails, getReveiwOfUser}