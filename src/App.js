import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/movielist';
import MovieListHeading from './components/movielistheading';
import SearchBox from './components/searchbox';
import AddFavourites from './components/addfavourites';
import RemoveFavourites from './components/remotefavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-favourites'));

    setFavourites(movieFavourites);
  },[]);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie = (movie) => {
    const newFavourList = [...favourites, movie];
    setFavourites(newFavourList);
    saveToLocalStorage(newFavourList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavourList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);

    setFavourites(newFavourList);
    saveToLocalStorage(newFavourList);
  }



  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
      <div className="row">
        <MovieList movies={movies} favouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList movies={favourites} favouriteComponent={RemoveFavourites} handleFavouritesClick={removeFavouriteMovie}/>
			</div>
    </div>
  )
}

export default App;