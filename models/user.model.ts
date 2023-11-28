require ('dotenv').config();
import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { promises } from "dns";
import jwt from 'jsonwebtoken';

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseID: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "please enter your password"],
      minlength: [8, "password must be at last 8 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [{
      courseId: String
      
  }],
  },
  { timestamps: true }
);

//Hash password before saving(crypted)

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified(`password`)) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// sign access Token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({id: this._id},process.env.ACCESS_TOKEN || '',{
    expiresIn:'5m'
  });
};

// sign refresh Token 
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({id: this._id},process.env.REFRESH_Token || '',{
    expiresIn:'3d'
  });
};

//Compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
