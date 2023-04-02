import React from 'react';
import style from './character.module.css';
import Aviso from '../../utilitario/Aviso';
import { GlobalContext } from '../../utilitario/GlobalContext';
import { Link } from 'react-router-dom';

const Characters = () => {
  const { filteredData } = React.useContext(GlobalContext);
  const { handleFavorite } = React.useContext(GlobalContext);
  const { handleSearch } = React.useContext(GlobalContext);
  const { setEndpoint } = React.useContext(GlobalContext);
  const { prev } = React.useContext(GlobalContext);
  const { error } = React.useContext(GlobalContext);

  const { next } = React.useContext(GlobalContext);
  const [species, setSpecies] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [showFilter, setShowFilter] = React.useState(false);

  function filtrar(event) {
    event.preventDefault();

    setEndpoint(
      `https://rickandmortyapi.com/api/character/?species=${species}&status=${status}&gender=${gender}`,
    );
  }
  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <div className={style.search}>
          <input
            className={style.inputSearch}
            id="search"
            placeholder="Search characters by name"
            type="text"
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <input
            className={style.inputFilter}
            type="button"
            value="Filters"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>

        {showFilter && (
          <>
            <form className={style.formFilter} onSubmit={filtrar}>
              <div>
                <label htmlFor="species">SPECIE</label>
                <select
                  name="species"
                  id="species"
                  value={species}
                  onChange={(event) => setSpecies(event.target.value)}
                >
                  <option autoFocus value="">
                    Selecione
                  </option>
                  <option value="human">Human</option>
                  <option value="alien">Alien</option>
                  <option value="poopybutthole">Poopybutthole</option>
                  <option value="mythologicalcreature">
                    Mythological Creature
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="status">STATUS</label>
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option autoFocus value="">
                    Selecione
                  </option>
                  <option value="alive">alive</option>
                  <option value="dead">dead</option>
                  <option value="unknown">unknown</option>
                </select>
              </div>
              <div>
                <label htmlFor="gender">GENDER</label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option autoFocus value="">
                    Selecione
                  </option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="genderless">genderless</option>
                  <option value="unknown">unknown</option>
                </select>
              </div>
              <button type="submit">Filter</button>
              {error && <p>{error}</p>}
            </form>
          </>
        )}
      </div>
      <div className={style.charsContainer}>
        {filteredData &&
          filteredData.map((char) => (
            <div className={style.char} key={char.id}>
              {char.favorito && (
                <Aviso
                  className={style.jaFavorito}
                  message="
                It's already favorite"
                />
              )}

              <div className={style.charBtn}>
                <button
                  onClick={() => {
                    handleFavorite(char);
                  }}
                >
                  {char.favorito ? 'go to fav list' : 'add favorite'}
                </button>
              </div>
              <div className={style.charConteudo}>
                <Link to={`/details/${char.id}`}>
                  <img src={char.image} alt={char.name} />
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className={style.pagination}>
        <input
          type="button"
          value="back"
          onClick={() => {
            setEndpoint(prev);
          }}
          disabled={prev ? false : true}
        />
        <input
          type="button"
          value="next"
          onClick={() => {
            setEndpoint(next);
          }}
          disabled={next ? false : true}
        />
      </div>
    </div>
  );
};

export default Characters;
