import models from "../models/index.js";

export const getAllMeaures = async (req, res) => {
  try {
    const data = await models.Measure.findAll({ order: [["id", "ASC"]] });
    if (data.length === 0) {
      return res;
    }
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

export const getMeasureById = async (req, res) => {
  const id = req.params.id | 0;
  try {
    if (!id || typeof id !== "number") {
      return res
        .status(400)
        .send({ message: "ID param doesn't match to the id column" });
    }

    const data = await models.Measure.findOne({ where: { id } });
    if (!data || data.length < 1)
      return res.status(200).send({ message: "No data found" });

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
