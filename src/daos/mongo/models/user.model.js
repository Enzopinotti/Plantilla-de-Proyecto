import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: {type: String, require:true},
    lastName: {type: String, require:true},
    email: {
        type: String,
        unique: true,
        require: true,
        index: true, 
    },
    password: {type: String , require:true},
    birthDate: {type: Date, require:true},
    phone: {type: String},
    avatar: {type: String},
    cart:{ type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    rol: {type: String, require:true, default:'usuario'},
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;