import axios from "axios";
import * as cheerio from "cheerio";

export const getCifra = async (req, res) => {
  try {
    let { artist, song } = req.params;

    if (!artist || !song) {
      return res.status(400).send("Sem dados do artista ou da música.");
    }

    artist = artist
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚçÇ-]/g, "")
      .toLowerCase();

    song = song
      .trim()
      .replace(/\s+/g, "-")
      .replace("-a-", "-")
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚçÇ-]/g, "")
      .toLowerCase();

    const url = `https://www.cifraclub.com.br/${artist}/${song}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const cifra = [];

    $(".cifra-mono pre").each((_, element) => {
      const el = $(element).html();
      cifra.push(el)
    });

    const rawText = cifra.join("\n");

    const regex = /\[(.*?)\]/g;

    const sections = [];
    let match;
    let lastIndex = 0;
    let lastTitle = "Intro"; 

    while ((match = regex.exec(rawText)) !== null) {
      const currentTitle = match[1].trim(); 
      const start = match.index;

      if (start > lastIndex) {
        const sectionText = rawText.slice(lastIndex, start).trim();
        if (sectionText) {
          sections.push({
            title: lastTitle,
            content: sectionText,
          });
        }
      }

      lastTitle = currentTitle;
      lastIndex = regex.lastIndex;
    }

    const finalContent = rawText.slice(lastIndex).trim();
    if (finalContent) {
      sections.push({
        title: lastTitle,
        content: finalContent,
      });
    }


    return res.status(200).json(sections);
  } catch (error) {
    console.error("Erro ao buscar a página:", error.message);
    return res.status(500).send("Erro ao buscar cifra.");
  }
};

