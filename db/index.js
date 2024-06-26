const mongoose = require('mongoose');
import { mongoUrl } from '../config';

// Connect to MongoDB
mongoose.connect(mongoUrl);

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'

    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    imagelink:String,
    price:String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}