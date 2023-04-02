import React from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../utilitario/GlobalContext';
import style from './favoriteDetails.module.css';

const FavoritesDetails = () => {
  const { favorites } = React.useContext(GlobalContext);
  const [personagem, setPersonagem] = React.useState([]);
  const { id } = useParams();
  const [pagination, setPagination] = React.useState(+id);

  const endpoint = `https://rickandmortyapi.com/api/character/${pagination}`;

  React.useEffect(() => {
    async function filterFavorites() {
      const response = await fetch(endpoint).then((data) => data.json());
      setPersonagem([response]);
      console.log(personagem);
    }
    filterFavorites();
  }, [pagination]);

  function nextFav(id) {
    let findObj = favorites.find((char) => char.id === id);
    let findindex = favorites.indexOf(findObj);
    if (findindex === favorites.length - 1) return null;
    let nextFavorite = favorites.filter(
      (char) => char.id === favorites[findindex + 1].id,
    );
    setPagination(nextFavorite[0].id);
    console.log(nextFavorite);
  }
  function prevFav(id) {
    let findObj = favorites.find((char) => char.id === id);
    let findindex = favorites.indexOf(findObj);
    if (findindex === 0) return null;
    let nextFavorite = favorites.filter(
      (char) => char.id === favorites[findindex - 1].id,
    );
    setPagination(nextFavorite[0].id);

    console.log(nextFavorite);
  }
  return (
    <div className={style.container}>
      {personagem &&
        personagem.map((char) => (
          <div className={style.comport} key={char.id}>
            <div className={style.pagination}>
              <input
                type="button"
                onClick={() => {
                  prevFav(char.id);
                }}
                value="back"
                disabled={favorites[0].id === personagem[0].id ? true : false}
              />
            </div>
            <div className={style.char}>
              <div className={style.charConteudo}>
                <h1>{char.name}</h1>
                <img src={char.image} alt={char.name} />
                <ul>
                  <li>
                    <p>
                      <b>Presente em: </b>
                      {char.episode.length}
                      {char.episode.length > 1 ? ' episódios' : ' episódio'}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Gênero: </b>
                      {char.gender}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Origem: </b>
                      {char.location.name}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Espécie: </b>
                      {char.species}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Status: </b>
                      {char.status}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.pagination}>
              <input
                type="button"
                value="next"
                onClick={() => {
                  nextFav(char.id);
                }}
                disabled={
                  favorites[favorites.length - 1].id === personagem[0].id
                    ? true
                    : false
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FavoritesDetails;
