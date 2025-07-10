import axios from "axios";
import * as cheerio from "cheerio";

function formataNome(nome) {
  return nome
  .split("-")[0]                           
  .replace(/\b(a)\b/gi, "")                
  .replace(/\s+/g, "-")                    
  .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚçÇ-]/g, "")
  .replace(/-+/g, "-")                     
  .replace(/^-|-$/g, "")                   
  .toLowerCase();   
}

export const getCifra = async (req, res) => {
  try {
    let { artist, song } = req.params;

    if (!artist || !song) {
      return res.status(400).send("Sem dados do artista ou da música.");
    }

    artist = formataNome(artist);
    song = formataNome(song);

    const url = `https://www.cifraclub.com.br/${artist}/${song}/`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const pre = $(".cifra-mono pre").first();

    const tablaturas = [];
    const letras = [];

    pre.contents().each((_, elem) => {

      const el = $(elem);

      if (el.hasClass && el.hasClass("tablatura")) {
        tablaturas.push($.html(el));
      } else {

        letras.push($.html(elem) || elem.data || "");
      }
    });

    return res.status(200).json({
      tablaturas: tablaturas.join("\n"),
      letras: letras.join("").trim()
    });

  } catch (error) {
    console.error("Erro ao buscar a cifra:", error.message);
    return res.status(500).send("Erro ao buscar cifra.");
  }
};
console.log(formataNome('About A Girl - Live'))