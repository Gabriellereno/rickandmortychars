import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [next, setNext] = React.useState(false);
  const [prev, setPrev] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(
    'https://rickandmortyapi.com/api/character/',
  );
  const [chars, setChars] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [charsAmount, setCharsAmount] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const message = 'Ocorreu o erro: ' + response.status;
        setError('No results found');
        throw new Error(message);
      }
      const data = await response.json();
      setError(false);
      setChars(data.results);
      setFilteredData(data.results);
      setNext(data.info.next);
      setPrev(data.info.prev);
      setCharsAmount(data.info.count);
    }
    fetchData();
  }, [endpoint]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = chars.filter((names) => {
      return names.name.toLowerCase().search(value) !== -1;
    });
    setFilteredData(result);
  };

  function handleFavorite(char) {
    const verifJaFavorito = favorites.find((item) => item.id === char.id);

    if (verifJaFavorito) {
      const verifEpisodioExist = chars.some(
        (episodio) => episodio.id === char.id,
      );

      if (verifEpisodioExist) {
        const episodiosEditados = filteredData.map((episodio) => {
          let valorDeFavorito = { ...episodio };
          if (episodio.id === char.id) {
            if (episodio.favorito) {
              valorDeFavorito = {
                ...episodio,
                favorito: false,
              };
            } else {
              valorDeFavorito = {
                ...episodio,
                favorito: true,
              };
            }
          }
          return valorDeFavorito;
        });
        setFilteredData(episodiosEditados);
      }
    } else {
      const novoFavorito = {
        id: char.id,
        name: char.name,
        image: char.image,
        type: char.type,
        status: char.status,
        species: char.species,
        gender: char.gender,
        episode: char.episode,
        location: char.location,
        url: char.url,
      };
      setFavorites([...favorites, novoFavorito]);
      saveLocalStorage(char.id, JSON.stringify(novoFavorito));
    }
  }

  function saveLocalStorage(name, value) {
    localStorage[name] = value;
  }

  React.useEffect(() => {
    function setLocalStorage() {
      const valoresSalvos = Object.keys(localStorage);
      if (valoresSalvos) {
        let acumuladorEpisodios = [];
        valoresSalvos.forEach((id) => {
          let episodiosLocal = localStorage.getItem(id);

          acumuladorEpisodios.push(JSON.parse(episodiosLocal));
        });
        setFavorites(acumuladorEpisodios);
      }
    }
    setLocalStorage();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        filteredData,
        handleFavorite,
        handleSearch,
        favorites,
        next,
        prev,
        setEndpoint,
        charsAmount,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
