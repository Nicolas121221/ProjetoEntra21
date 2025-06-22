import models from "../models/index.js"

export const getSpotifyUser = async (req, res) => {
    try {
        const query = await models.SpotifyUser.findAll()
        res.status(200).json(query)
    } catch (error) {
        res.status(500).send('erro interno do servidor')
    };
};

export const getSpotifyUserById = async (req, res) => {
    try {
        const id = req.params.id
        const query = await models.SpotifyUser.findAll({
            where: {
                id
            }
        })
        res.status(200).json(query)
    } catch (error) {
        res.status(500).send('erro interno do servidor')
    };
};

export const createSpotifyUser = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const query = await models.SpotifyUser.create({
            SpotifyUser:1233,
            access_token:data.access_token,
            refresh_token:data.refresh_token,
            usuario_id:3
        })
        res.status(201).json('Usuário criado',query)
    } catch (e) {
        res.status(500).send('erro interno do servidor', e)
    }
};