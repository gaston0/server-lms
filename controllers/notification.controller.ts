import NotificationModel from "../models/notification.model";
import { Response, NextFunction, Request } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import cron from"node-cron";

//get all notfifications -- only admin
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdat: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update notification status -- only for admin
export const updateNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notfification = await NotificationModel.findById(req.params.id);

      if (!notfification) {
        return next(new ErrorHandler("Notifications not found", 404));
      } else {
        notfification.status
          ? (notfification.status = "read")
          : notfification?.status;
      }

      await notfification.save();

      const notifications = await NotificationModel.find().sort({
        createdat: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete notifications
cron.schedule("0 0 0 * * *",async()=>{
  const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({status:"read",createdat:{slet :thirtyDayAgo}});
  console.log('DELETED READ NOTIFICATIONS');
})