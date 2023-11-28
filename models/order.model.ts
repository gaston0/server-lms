import mongoose, { Document, Model, Schema } from "mongoose";
import CourseModel from "./course.model";
import userModel from "./user.model";

export interface IOrder extends Document{
    courseId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    payment_info: object;
}

const orderSchema = new Schema<IOrder>({
    courseId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : CourseModel
    },userId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : userModel
    },payment_info:{
        type: Object,
    },

},{timestamps:true});

const OrderModel: Model<IOrder> = mongoose.model("Order",orderSchema);

export default OrderModel;