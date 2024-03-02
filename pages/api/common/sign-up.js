import Response from "../../../database/helper/response";
import {
  CustomMessages,
  HttpStatus,
} from "../../../database/helper/statusCode";
import User from "../../../database/models/User.model";
import jwt from "jsonwebtoken";
require("dotenv").config();
const bcrypt = require("bcrypt");
import { validationHandler } from "../../../database/helper/function";

export default async function handler(req, res) {
  let hashPassword;
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      password,
      status,
      email,
      phoneNumber,
      sddress,
      userType,
    } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(HttpStatus.OK.code)
          .send(
            new Response(false, `USER ${CustomMessages.MESSAGE.alreadyExist}`)
          );
      }

      try {
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(password, salt);
      } catch (error) {
        // Handle the error, e.g., log it or send an error response
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              false,
              `${CustomMessages.MESSAGE.errorHashingPassword}`
            )
          );
      }

      // Create a new user
      const user = await User.create({
        firstName,
        lastName,
        password: hashPassword,
        status,
        email,
        phoneNumber,
        sddress,
        userType,
      });

      const token = jwt.sign(
        { userId: user.id },
        process.env.TOKEN_SECRECT_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        }
      );

      res.status(HttpStatus.OK.code).send(
        new Response(true, `${HttpStatus.CREATED.message}`, {
          user: user,
          access_token: token,
        })
      );
    } catch (error) {
      if (error.name.includes("Sequelize")) {
        //Validation errors
        return validationHandler(res, error);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        success: false,
        message: error,
      });
    }
  }
}
