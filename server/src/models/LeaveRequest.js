const mongoose = require('mongoose');

const leaveReqObj = {
    staffId: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
    email: {type: String, ref: 'Staff', required: true},
    role: {type: String, ref: 'Staff', required: true},
    phone: {type: String, ref: 'Staff', required: true},
    fullName: {type: String, required: true},
    status: {type: String, enum: ['Requested', 'Pending', 'Accepted', 'Rejected', 'Draft'], default: 'Requested'},
    duration: {type: Number, required: true},
    currentBalance: {type: Number, required: true},
    newBalance: {type: Number, required: true},
    leaveType: {
        type: String,
        enum: [
            "Annual",
            "Casual",
            "Compassionate",
            "Emergency",
            "Maternity",
            "Paternity",
            "Sick",
            "Study",
            "Leave without Pay",
            "Others",
        ],
        required: true
    },
    leaveReason: {
        type: String,
        enum: [
            "Accident",
            "Annual",
            "Appointment",
            "Bereavement",
            "Burial",
            "Emergency",
            "Family Related",
            "Personal",
            "Medical CheckUp",
            "Medical",
            "Surgery",
            "Wedding",
            "Confidential",
        ],
        required: true
    },
    startDate: {type: String, default: Date, require: true},
    endDate: {type: String, default: Date, require: true},
    saveAsDraft: {type: Boolean, default: false},
}

const leaveRequestSchema = new mongoose.Schema(leaveReqObj, {timestamps: true});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;