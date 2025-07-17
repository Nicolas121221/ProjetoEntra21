import models from "../models/index.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await models.Song.findAll({ order: [["id", "ASC"]] });
    if (!songs || songs.length < 1)
      return res.status(204).send({ message: "no data Found" });

    res.status(200).send(songs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getSongById = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const song = await models.Song.findByPk(id);
    if (!song || song.length < 1)
      return res.status(200).send({ message: "no data Found" });

    res.status(200).send(song);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const song = await models.Song.destroy({ where: { id } });

    if (song === 0)
      return res.status(409).send({ message: "item could not be deleted" });

    res.status(200).send({ message: "item deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateSong = async (req, res) => {
  try {
    const id = req.params.id | 0;
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const {
      name,
      track_number,
      bpm,
      duration_ms,
      chords,
      tuning,
      measure_id,
      album_id,
      key_id
    } = req.body;
    if (
      !name &&
      !track_number &&
      !bpm &&
      !duration_ms &&
      !chords &&
      !tuning &&
      !measure_id &&
      !key_id &&
      !album_id
    ) {
      return res
        .status(400)
        .send({ message: "body doesn't match with the table columns" });
    }

    const song = await models.Song.update(
      {
        name,
        track_number,
        bpm,
        duration_ms,
        chords,
        tuning,
        measure_id,
        album_id,
        key_id
      },
      { where: { id } }
    );

    if (song[0] === 0)
      return res.status(409).send({ message: "item could not be updated" });
    res.status(200).send({ message: "song updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const createSong = async (req, res) => {
  try {
    const {
      name,
      track_number,
      bpm,
      duration_ms,
      chords,
      tuning,
      measure_id,
      album_id,
      key_id
    } = req.body;

    if (
      !name &&
      !track_number &&
      !bpm &&
      !duration_ms &&
      !chords &&
      !tuning &&
      !measure_id &&
      !key_id &&
      !album_id
    ) {
      return res
        .status(400)
        .send({ message: "body doesn't match with the table columns" });
    }

    const song = await models.Song.create({ name,
      track_number,
      bpm,
      duration_ms,
      chords,
      tuning,
      measure_id,
      album_id,
      key_id,})

      if(!song.id) return res.status(200).send({message: 'item could not be created'})
      res.status(201).send({message: 'item Created', ...song })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
