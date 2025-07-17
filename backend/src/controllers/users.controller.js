import models from "../models/index.js";
export const getAllUsers = (req, res) => {


};

export const createUser = async (req,res) =>{
try {
    const {email, hashedPassword } = req.body
    
    const user = models.User.create({email, password: hashedPassword})

    const uuid = models.User.findOne({where:{email}})

    if(!uuid) return res.status(500).send({message:"user was not created"})
    res.status(201).send({message:"user Created", uuid})
} catch (error) {
    console.log(error)
    res.status(500).send({message:"internal server error"})
}
};
