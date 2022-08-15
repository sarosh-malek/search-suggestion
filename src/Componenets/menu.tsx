import React, { useEffect, useState } from 'react';

interface Props {
  movieList: Array<any>;
  handleListClick: Function;
}

export const Menu = (props: Props) => {
  const [movie, setMovie] = useState<Array<any>>([]);

  useEffect(() => {
    setMovie(props.movieList);
  }, [props.movieList]);

  const handleClick = (imdbID: string) => {
    setMovie([]);
    props.handleListClick(imdbID);
  };
  return (
    <React.Fragment>
      {movie && (
        <aside className="w-30" aria-label="Sidebar">
          <div className=" py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
            <ul className="space-y-2">
              {movie.map((data, index) => {
                return (
                  <a key={index}>
                    <li
                      onClick={() => handleClick(data.imdbID)}
                      className="flex py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img className="w-10 h-10" src={`${data.Poster}`} />
                      <span className="ml-3">{data.Title}</span>
                    </li>
                  </a>
                );
              })}
            </ul>
          </div>
        </aside>
      )}
    </React.Fragment>
  );
};
