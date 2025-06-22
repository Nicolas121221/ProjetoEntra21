import qs from 'querystring'
import axios from 'axios';
import models from "../models/index.js"

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

export const spotifyLogin = (req, res) => {
    const scope = 'user-read-email user-read-private';
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
        qs.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope,
            redirect_uri: REDIRECT_URI,
            state: 'xyz'
        })
    );
}

export const spotifyCallback = async (req, res) => {
    const { code } = req.query;
    try {
        const { data } = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
                }
            }
        );

        const query = await models.SpotifyUser.create({
            SpotifyUser: 1233,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            usuario_id: 3
        })

        res.status(201).json('Usuário criado', query)

    } catch (err) {
        res.status(500).send(err);
    }
}

export const getSpotifySongById = async (req, res) => {
    const id = req.params.id
    const userId = req.params.userId
    try {
        const data = await axios.get(`https://5699-186-232-153-194.ngrok-free.app/spotifyUser/${userId}`)
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${data.data[0].access_token}`
            }
        })

        res.status(200).send(response.data)
    } catch (error) {
        res.status(500).send(error)
    }
}
export const spotifySearch = async (req, res) => {
    const {q} = req.query
    const userId = req.params.id
    console.log(qs.stringify(q))

    try {
        const data = await axios.get(`https://5699-186-232-153-194.ngrok-free.app/spotifyUser/${userId}`)
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=track%2Calbum&limit=20`, {
            headers: {
                Authorization: `Bearer ${data.data[0].access_token}`
            }
        })

        res.status(200).send(response.data)
    } catch (error) {
        res.status(500).send(error)
    }
}