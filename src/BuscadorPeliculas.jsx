import { useState } from "react";

export const BuscadorPeliculas = () => {
  const API_KEY = "f4600ab66f7e53a1119943cdc41f824a";
  const URL_BASE = "https://api.themoviedb.org/3/search/movie";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  const onInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${URL_BASE}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribi una pelicula"
          value={busqueda}
          onChange={onInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <hr />
      <div className="movie-list">
        {peliculas?.map((pelicula) => {
          return (
            <div key={pelicula.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                alt={pelicula.title}
              />
              <h2>{pelicula.title}</h2>
              <p>{pelicula.overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
