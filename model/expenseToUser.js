const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otpVerified: { type: Boolean, default: false },
    socialLogin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Expense Schema
const ExpenseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    receiptUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Income Schema
const IncomeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

// Budget Schema
const BudgetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    monthlyLimit: { type: Number, required: true },
    alertThreshold: { type: Number, default: 80 }, // Notify user when 80% of budget is spent
    createdAt: { type: Date, default: Date.now }
});

// Group Schema
const GroupSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Shared Expense Schema
const SharedExpenseSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    splitAmong: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

// Export models
module.exports = {
    User: mongoose.model('User', UserSchema),
    Expense: mongoose.model('Expense', ExpenseSchema),
    Income: mongoose.model('Income', IncomeSchema),
    Budget: mongoose.model('Budget', BudgetSchema),
    Group: mongoose.model('Group', GroupSchema),
    SharedExpense: mongoose.model('SharedExpense', SharedExpenseSchema)
};
