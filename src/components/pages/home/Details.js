import React from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../utilitario/GlobalContext';
import style from './details.module.css';

const Details = () => {
  const { charsAmount } = React.useContext(GlobalContext);
  const [personagem, setPersonagem] = React.useState(false);
  const { id } = useParams();
  const [pagination, setPagination] = React.useState(+id);

  const endpoint = `https://rickandmortyapi.com/api/character/${pagination}`;

  console.log(pagination);
  React.useEffect(() => {
    async function getDetails() {
      const response = await fetch(endpoint);
      const data = await response.json();
      setPersonagem(data);
    }
    getDetails();
  }, [pagination]);
  return (
    <div className={style.container}>
      <div className={style.pagination}>
        <input
          type="button"
          onClick={() => {
            setPagination(pagination - 1);
          }}
          value="back"
          disabled={pagination === 1 ? true : false}
        />
      </div>
      {personagem && (
        <div className={style.char}>
          <div className={style.charConteudo}>
            <h1>{personagem.name}</h1>
            <img src={personagem.image} alt={personagem.name} />
            <ul>
              <li>
                <p>
                  <b>Presente em:</b> {personagem.episode.length}
                  {personagem.episode.length > 1 ? 'episódios' : 'episódio'}
                </p>
              </li>
              <li>
                <p>
                  <b>Gênero: </b>
                  {personagem.gender}
                </p>
              </li>
              <li>
                <p>
                  <b>Origem: </b>
                  {personagem.location.name}
                </p>
              </li>
              <li>
                <p>
                  <b>Espécie: </b>
                  {personagem.species}
                </p>
              </li>
              <li>
                <p>
                  <b>Status: </b>
                  {personagem.status}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className={style.pagination}>
        <input
          type="button"
          value="next"
          onClick={() => {
            setPagination(pagination + 1);
          }}
          disabled={pagination === charsAmount ? true : false}
        />
      </div>
    </div>
  );
};

export default Details;
