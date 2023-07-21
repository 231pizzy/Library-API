import mongoose, {Schema} from "mongoose";

export interface Iuser{
    _id: string,
    firstname: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    books: [Record<string, string>]
}

const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, 'please enter your first name']
    },
    lastName: {
        type: String,
        require: [true, 'please enter your last name']
    },
    email: {
        type: String,
        require: [true, 'please enter your correct email addrss']
    },
    password: {
        type: String,
        require: [false]
    },
    role: {
        type: String,
        require: [false]
    },
    books: {
        type: Array,
        require: [false]
    },
},
{
    timestamps: true
}
);

const User = mongoose.model<Iuser>('User', userSchema);

export default User;