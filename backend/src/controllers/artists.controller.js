import models from "../models/index.js";

export const getAllArtists = async (req, res) => {
  try {
    const artists = await models.Artist.findAll({ order: [["id", "ASC"]] });
    if (!artists || artists.length < 1)
      return res.status(200).send({ message: "no artist Found" });

    res.status(200).send(artists);
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

    const artist = await models.Artist.findByPk(id);
    if (!artist || artist.length < 1)
      return res.status(200).send({ message: "no data Found" });

    res.status(200).send(artist);
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

    const artist = await models.Artist.destroy({ where: { id: id } });

    if (artist === 1)
      return res.status(409).send({ message: "item could not be deleted" });
    res.status(200).send({ message: "item deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const createArtist = async (req, res) => {
  try {
    const { name, artist_image_url } = req.body;
    if (!name || !artist_image_url)
      return res
        .status(400)
        .send({ message: "body doesn't match with the table" });
    const artist = await models.Artist.create({ name, artist_image_url });
    if (!artist.id)
      return res.status(200).send({ message: "item could not be created" });
    res.status(201).send(artist);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const { name, artist_image_url } = req.body;
    if (!name || !artist_image_url)
      return res
        .status(400)
        .send({ message: "body doesn't match with the table" });

    const data = await models.Artist.update(
      {
        name,
        artist_image_url,
      },
      { where: { id } }
    );

    console.log(data);
    if (data[0] === 1)
      return res.status(200).send({ message: "item could not be updated" });
    res.status(200).send({ message: "item updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
