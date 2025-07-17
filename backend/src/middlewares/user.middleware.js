import bcrypt from "bcryptjs";
import validator from "validator";
import models from "../models/index.js";

export const generatePasswordMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const DBemail = await models.User.findOne({where:{email}})

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!validator.isEmail(email) || DBemail)
      return res.status(400).send({ message: "Email is invalid" });

    req.body = { email, hashedPassword };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};
