import { getShowData, getEpisodeList } from "./services/tvmaze.js";

const ID = "2993";
const $header = document.querySelector(".show-header");
const $episodes = document.querySelector(".episodes");

const createEpisodeHTML = (episode) => {
  const rating = episode.rating === null ? 0 : Math.max(0, Math.min(10, Math.floor(episode.rating)));
  const number = episode.number ?? "?";

  return `<div class="episode episode-${number} rating-${rating}"
    title="Episodio ${number} · Valoración: ${episode.rating ?? 'Sin valoración'}">${number}</div>`;
};

const createSeasonHTML = (data, number) => `
  <article class="season">
    <header class="season-header" title="Temporada ${number}">T${number}</header>
    ${data.map(createEpisodeHTML).join("")}
  </article>
`;

const loadShow = async () => {
  try {
    const [show, seasons] = await Promise.all([
      getShowData(ID),
      getEpisodeList(ID)
    ]);

    const poster = document.createElement("img");
    poster.className = "poster";
    poster.src = show.image;
    poster.alt = `Póster de ${show.name}`;

    const title = document.createElement("h1");
    title.textContent = show.name;

    const rating = document.createElement("p");
    rating.textContent = `Valoración general: ${show.rating?.average ?? 'Sin valoración'}`;

    $header.replaceChildren(poster, title, rating);

    const list = Object.entries(seasons)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([number, season]) => createSeasonHTML(season, number));

    $episodes.innerHTML = list.join("");
  } catch (error) {
    $header.textContent = "No se pudo cargar la serie.";
    $episodes.textContent = error.message;
    console.error(error);
  }
};

loadShow();
