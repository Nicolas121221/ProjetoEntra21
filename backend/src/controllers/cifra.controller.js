import axios from "axios";
import * as cheerio from "cheerio";

export const getCifra = async (req, res) => {
  try {
    let artist = req.params.artist;
    let song = req.params.song;

    if (!artist || !song) return (response = "sem dados do artista");

    artist = artist
      .trim()
      .replaceAll(" ", "-")
      .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚçÇ-]/g, "")
      .toLowerCase();
    song = song
      .replaceAll(" ", "-")
      .replaceAll("-a-", "-")
      .trim()
      .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚçÇ-]/g, "")
      .toLowerCase();

    const url = `https://www.cifraclub.com.br/${artist}/${song}//#footerChords=false&tabs=false`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const cifra = [];

    $(".cifra-mono pre").each((_, element) => {
      cifra.push($(element).text().trim());
    });

    return res.status(200).send(cifra);
  } catch (error) {
    console.error("Erro ao buscar a página:", error.message);
  }
};
