import models from "../models/index.js";
import validator from "validator";

export const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    if (!users) return res.status(204);

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number")
      return res.status(400).send({ message: "Id param is invalid" });

    const user = await models.User.findByPk(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, hashedPassword } = req.body;

    const user = await models.User.create({ email, password: hashedPassword });

    if (user[0] === 0)
      return res.status(500).send({ message: "user was not created" });

    console.log(user)
    res.status(201).send({ message: "user Created", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !validator.isEmail(email))
      return res.status(400).send({ message: "email is invalid" });

    const user = await models.User.findOne({ where: {email} });
    if(!user) return res.status(204).send({message: "No user found"})

    res.status(200).send(user)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};
