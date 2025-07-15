import { Router } from 'express';
import keysRoutes from './keys.routes.js';
import playlistRoutes from './playlists.routes.js'
import artistsRoutes from './artists.routes.js'
import usersRoutes from './usuarios.routes.js'
import musicasRoutes from './musicas.routes.js'
import albumRoutes from './albuns.routes.js'
import albumArtistaRoutes from './albumArtista.routes.js'
import spotifyUserRoutes from './spotifyUser.routes.js'
import playlistMusicaRoutes from './playlistMusica.routes.js'
import cifraRoutes from './cifras.routes.js'
import spotifyRoutes from './spotify.routes.js'
import measureRoutes from './measures.routes.js'

const router = Router();

router.use('/artists', artistsRoutes);
router.use('/keys', keysRoutes);
router.use('/measures', measureRoutes)



router.use('/playlist', playlistRoutes);
router.use('/usuarios', usersRoutes)
router.use('/musicas', musicasRoutes)
router.use('/album', albumRoutes)
router.use('/albumArtista', albumArtistaRoutes)
router.use('/spotifyUser',spotifyUserRoutes)
router.use('/playlistMusica',playlistMusicaRoutes)
router.use('/cifra', cifraRoutes)
router.use('/',spotifyRoutes)

export default router;