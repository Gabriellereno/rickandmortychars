import React from 'react';
import { GlobalContext } from '../../utilitario/GlobalContext';
import style from './favorites.module.css';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = React.useContext(GlobalContext);
  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>
          <h1>Favorite </h1> List
        </span>
      </div>

      <div className={style.charsContainer}>
        {favorites &&
          favorites.map((favorito) => (
            <div key={favorito.id} className={style.char}>
              <div className={style.charConteudo}>
                <Link to={`/favoritesdetails/${favorito.id}`}>
                  <img src={favorito.image} alt={favorito.name} />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
