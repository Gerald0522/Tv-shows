const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

export const getShowData = async (id) => {
  const url = `https://api.tvmaze.com/shows/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al obtener la serie`);
  }

  const data = await response.json();

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  };
};

export const getEpisodeList = async (id) => {
  const url = `https://api.tvmaze.com/shows/${id}/episodes`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al obtener episodios`);
  }

  const episodes = await response.json();
  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating?.average ?? null
  }));

  return Object.groupBy
    ? Object.groupBy(episodeList, (episode) => episode.season)
    : episodeList.reduce((grouped, episode) => {
        (grouped[episode.season] ??= []).push(episode);
        return grouped;
      }, {});
};
