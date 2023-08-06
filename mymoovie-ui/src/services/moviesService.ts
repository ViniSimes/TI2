import axios from "axios";
import { MoviesProps } from "../types/movies";

export const getPopularMovies = async () => {
  return await (
    await axios.post(
      `https://api.themoviedb.org/3/movie/popular?api_key=1cfadb28323ab18e34fd51ef1d3dc3f4&language=pt-br`
    )
  ).data;
};

export const searchMovies = async (searchTerm: string) => {
  return await (
    await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=1cfadb28323ab18e34fd51ef1d3dc3f4&query=${searchTerm}&page=1&include_adult=true&language=pt-BR`
    )
  ).data;
};

export const getMovie = async (movieId: number): Promise<MoviesProps> => {
  return await (
    await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=1cfadb28323ab18e34fd51ef1d3dc3f4&language=pt-BR`
    )
  ).data;
};