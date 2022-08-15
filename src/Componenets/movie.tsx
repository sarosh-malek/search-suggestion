import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Prop {
  imdbId: string;
}
export const Movie = (prop: Prop) => {
  const [movie, SetMovie] = useState({});

  const fetchMovie = async () => {
    try {
      const movies = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: 'fd42c80d',
          i: prop.imdbId,
        },
      });
      if (!movies.data.Error) {
        console.log(movies.data);
        SetMovie(movies.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [prop.imdbId]);

  return (
    <React.Fragment>
      {movie && (
        <div className="p-6 w-1/2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <img className="rounded-t-lg h-30" src={`${movie.Poster}`} />
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.Title}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {movie.BoxOffice}
          </span>
          <ul>
            {movie.Ratings &&
              movie.Ratings.map((d, i) => {
                return (
                  <li key={i}>
                    {' '}
                    {d.Source} {d.Value}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};
