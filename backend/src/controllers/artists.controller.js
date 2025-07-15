import models from "../models/index.js";

export const getAllArtists = async (req, res) => {
  try {
    const data = await models.Artist.findAll();
    if (!data || data.length < 1)
      return res.status(204).send({ message: "no data Found" });

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const data = await models.Artist.findOne({ where: { id } });
    if (!data || data.length < 1)
      return res.status(204).send({ message: "no data Found" });

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const data = await models.Artist.destroy({ where: { id: id } });
    if (data === 1) return res.status(200).send({ message: "item deleted" });

    res.status(409).send({ message: "item could not be deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const createArtist = async(req, res)=>{
  try {
    const {name, artist_image_url} = req.body
    if(!name || !artist_image_url) return res.status(400).send({message:"body doesn't match with the table"})
    const data = await models.Artist.create({name, artist_image_url})
    if(data) return res.status(201).send(data)
    res.status
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
