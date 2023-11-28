import { NextFunction, Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
//create course
export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
export const getSingleCourseByIdService = async (courseId: string, res: Response) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    // Si le cours n'est pas trouvé, retournez une réponse appropriée (par exemple, statut 404 Not Found).
    return res.status(404).json({
      success: false,
      message: 'Course not found',
    });
  }

  res.status(200).json({
    success: true,
    course,
  });
}