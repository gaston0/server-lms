import { app } from "./app";
import { v2 as cloudinary} from "cloudinary";
require("dotenv").config();
import connectDB from "./utils/db";

// cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_KEY_SECRET,

});

//creation du server
app.listen(process.env.PORT, () => {
    console.log(`server conncter sur le port ${process.env.PORT}`);
    connectDB();
});