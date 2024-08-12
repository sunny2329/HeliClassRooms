import mongoose from "mongoose";


const classroomSchema = new mongoose.Schema({
    classroomName: {
        type: String,
        required: true,
        trim: true,
    },
    classroomCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    schedule: [{
        day: {
            type: String,  // e.g., 'Monday'
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true,
        },
        startTime: {
            type: String,  // Store as 'HH:mm' (e.g., '12:00')
            required: true,
        },
        endTime: {
            type: String,  // Store as 'HH:mm' (e.g., '18:00')
            required: true,
        },
    }],
    assignedTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model (teacher)
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model (students)
    }],
    subjects: [{
        subjectName: {
            type: String,
            required: true,
        },
    }],
    timetable: [{
        subjectName: {
            type: String,
            required: true,
        },
        day: {
            type: String,  // e.g., 'Monday'
            required: true,
        },
        startPeriod: {
            type: String,  // Store as 'HH:mm' (e.g., '14:00')
            required: true,
        },
        endPeriod: {
            type: String,  // Store as 'HH:mm' (e.g., '15:00')
            required: true,
        },
    }]
}, {
    timestamps: true,
});


export const Classroom = mongoose.model('Classroom', classroomSchema);