import mongoose, {Schema} from 'mongoose';


export interface IBooks {
    _id: string,
    name: string,
    description: string,
    page_count: number
}

const bookSchema = new Schema ({
    name:{
        type: String,
        require: [true, 'please enter book name']
    },
    description:{
       type: String,
       require: [true, 'please provide boook description']
    },
    page_count:{
        type: Number,
        require: [true, 'please provide page count']
    }
},
{
    timestamps: true
}
);

const Books = mongoose.model<IBooks>('Books', bookSchema);

export default Books;