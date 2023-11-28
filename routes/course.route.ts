import express from "express";
import { addAnswer, addCourseReview, addQuestion, addReplyInReview, deleteCourse, editCourse, getAllCourses, getCourseById, getCourseByUser, getSingleCourse, getallCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get(
  "/get-single-course/:id",
  getSingleCourse,
)
courseRouter.get(
  "/get-all-course/",
  getallCourse,
)
courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseByUser,
)
courseRouter.get(
  "/get-course-id/:id",
  isAuthenticated,
  getCourseById,
)
courseRouter.put(
  "/add-questions",
  isAuthenticated,
  addQuestion,
)
courseRouter.put(
  "/add-answer",
  isAuthenticated,
  addAnswer,
)
courseRouter.put(
  "/add-review/:id",
  isAuthenticated,
  addCourseReview,
)
courseRouter.put(
  "/add-review/:id",
  isAuthenticated,
  addCourseReview,
)
courseRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyInReview,
)
courseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourses
);
courseRouter.delete('/delete-course/:id',isAuthenticated,authorizeRoles("admin"),deleteCourse);
export default courseRouter;