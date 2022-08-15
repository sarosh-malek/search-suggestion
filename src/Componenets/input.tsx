import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { debounce } from '../Utilities/debouncer';
import { Menu } from './menu';
import { Movie } from './movie';

export const Input = () => {
  const [firstMovieList, setfirstMovies] = useState([]);
  const [secondMovieList, setSecondMovies] = useState([]);
  const [firstMovie, setFirstMovie] = useState('');
  const [secondMovie, setSecondMovie] = useState('');
  const [singleFirstMovie, setSingleFirstMovie] = useState('');
  const [singleSecondMovie, setSingleSecondMovie] = useState('');

  useEffect(() => {
    fetchMovies(firstMovie, setfirstMovies);
  }, [firstMovie]);

  useEffect(() => {
    fetchMovies(secondMovie, setSecondMovies);
  }, [secondMovie]);

  const fetchMovies = async (moiveName: string, fn: Function) => {
    try {
      const movies = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: 'fd42c80d',
          s: moiveName,
        },
      });
      fn(movies.data.Search);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e: any) => {
    if (e.target.id === 'grid-first-name') {
      debounce(setFirstMovie, e.target.value, 1000);
    }
    if (e.target.id === 'grid-second-name') {
      debounce(setSecondMovie, e.target.value, 1000);
    }
  };

  const handleFirstListClick = (imdbID: string) => {
    const input = document.querySelector('#grid-first-name');
    if (input) input.value = '';
    setSingleFirstMovie(imdbID);
    setFirstMovie('');
  };

  const handleSecondListClick = (imdbID: string) => {
    const input = document.querySelector('#grid-second-name');
    if (input) input.value = '';
    setSingleSecondMovie(imdbID);
    setSecondMovie('');
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap py-10">
        <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            First Movie
          </label>
          <input
            className="appearance-none block bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight  focus:bg-white"
            id="grid-first-name"
            type="text"
            onChange={(e) => handleOnChange(e)}
          />
          <Menu
            movieList={firstMovieList}
            handleListClick={handleFirstListClick}
          />
          <Movie imdbId={singleFirstMovie} />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Second Movie
          </label>
          <input
            className="appearance-none block bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight  focus:bg-white"
            id="grid-second-name"
            type="text"
            onChange={(e) => handleOnChange(e)}
          />
          <Menu
            movieList={secondMovieList}
            handleListClick={handleSecondListClick}
          />
          <Movie imdbId={singleSecondMovie} />
        </div>
      </div>
    </React.Fragment>
  );
};
