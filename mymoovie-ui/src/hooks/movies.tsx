import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getPopularMovies, searchMovies } from "../services/moviesService";
import { MoviesProps } from "../types/movies";

interface ContextProps {
  movies: MoviesProps[];
  isError: boolean;
  searchMovie: (searcher: string) => Promise<MoviesProps[]>;
  selectedMovie: MoviesProps | undefined;
  setSelectedMovie: React.Dispatch<React.SetStateAction<MoviesProps | undefined>>
}

interface ProviderProps {
  children: JSX.Element;
}

const defaultProps: ContextProps = {
  movies: [],
  isError: false,
  searchMovie: async () => [],
  selectedMovie: undefined,
  setSelectedMovie: () => {}
}

export const MoviesContext = React.createContext<ContextProps>(defaultProps);

export const MoviesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MoviesProps>();
  const [isError, setIsError] = useState<boolean>(false);

  const searchMovie = async (searcher: string): Promise<MoviesProps[]> => {
    const data = await searchMovies(searcher);
    return data.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularMovies();
      if (data.personalError) {
        setIsError(data.personalError);
      } else {
        setMovies(data.results);
      }
    };
    fetchData();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        isError,
        searchMovie,
        selectedMovie,
        setSelectedMovie
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => React.useContext(MoviesContext);