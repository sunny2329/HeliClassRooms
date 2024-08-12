import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['principal', 'student', 'teacher'],
        required: true
    },
    contact: {
        type: String,
    },
    dob: {
        type: Date,
    },
    assignedClassroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    enrolledClassroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)