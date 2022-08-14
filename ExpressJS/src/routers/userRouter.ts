import Express from "express";
import {authHandler} from "../middleware/auth-handler";
import {getProfile, signIn, signOut, signOutAll, signUp, deleteOne, updateOne} from "../controllers/userController";


export const userRouter = Express.Router();

userRouter
    .route("/")
    .post(signUp)

userRouter
    .route(`/login`)
    .post(signIn)

userRouter
    .route(`/logout`)
    .post(authHandler, signOut)

userRouter
    .route(`/logoutAll`)
    .post(authHandler, signOutAll)

userRouter
    .route(`/me`)
    .get(authHandler, getProfile)
    .delete(authHandler, deleteOne)
    .patch(authHandler, updateOne)