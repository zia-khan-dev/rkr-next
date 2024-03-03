import Response from "../../../database/helper/response";
import {
  CustomMessages,
  HttpStatus,
} from "../../../database/helper/statusCode";
import User from "../../../database/models/User.model";
import jwt from "jsonwebtoken";
require("dotenv").config();
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      if (email || password) {
        const user = await User.findOne({
          where: { email },
        });

        if (user) {
          const passwordCheck = await bcrypt.compare(
            password,
            user.password
          );
          console.log("passwordCheck", passwordCheck);
          if (passwordCheck) {
            const token = jwt.sign(
              { userId: user.id },
              process.env.TOKEN_SECRECT_KEY,
              {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
              }
            );

            return res
              .status(HttpStatus.OK.code)
              .send(
                new Response(       
                  true,
                  `USER ${CustomMessages.MESSAGE.loginSuccess}`,
                  { user: user, access_token: token }
                )
              );
          }

          return res
            .status(HttpStatus.UNAUTHORIZED.code)
            .send(
              new Response(false, `${CustomMessages.MESSAGE.inValid} PASSWORD`)
            );
        }
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST.code)
          .send(
            new Response(false, CustomMessages.MESSAGE.emailPasswordNotFound)
          );
      }

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`));
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(false, `${err}`));
    }
  }
}
