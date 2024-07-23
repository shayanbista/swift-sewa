import httpStatusCodes from "http-status-codes";
import { NextFunction } from "express";
import * as userService from "../service/user";
import { Response } from "express";
import { Request } from "../interface/request";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { ConflictError } from "../error/ConflictError";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, password, role, name, address, phoneNumber } = req.body;
  console.log("backend route is hit");
  console.log("body", req.body);

  try {
    const data = await userService.createUser(
      email,
      password,
      role,
      name,
      address,
      phoneNumber
    );
    console.log("data", data);
    res.status(httpStatusCodes.CREATED).json({ message: "signup success" });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id = req.user!?.id;

  const user = await userService.getUserProfile(id);

  if (!user) {
    next(new BadRequestError("user not found"));
    return;
  }
  res
    .status(httpStatusCodes.OK)
    .json({ message: "user fetched successfully", data: user });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("id", id);
  const { email, password, name, address, phoneNumber } = req.body;

  try {
    const updatedProfile = await userService.updateUserProfile(
      parseInt(id),
      email,
      password,
      name,
      address,
      phoneNumber
    );

    if (!updatedProfile) {
      next(new BadRequestError("User not found"));
      return;
    }

    res.status(httpStatusCodes.OK).json({ message: "successfully updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deletedUser = await userService.deleteUser(parseInt(id));
    if (!deletedUser) {
      next(new NotFoundError("User not found"));
      return;
    }
    res.status(httpStatusCodes.OK).json({ message: "deleted successully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
