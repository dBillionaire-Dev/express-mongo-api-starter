import { type Request, type Response, type NextFunction } from "express";
import User from "../models/user.model.ts";

const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //Find User

        const userToBeDeleted = await User.findByIdAndDelete(req.params.id);

        if(!userToBeDeleted){
            return res.status(404).json({
                success: false,
                message: "User not found!",
            })
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (err) {
        console.log(`Error Message: ${err}`);
        next(err);
    }
}

export {
    deleteUser,
};