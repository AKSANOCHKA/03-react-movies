import axios from "axios";
import type { Movie } from "../types/movie";

// API ключ из .env (должен начинаться с VITE_ в Vite проектах)
const moviedbKey = import.meta.env.VITE_MOVIEDB_KEY;

export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

interface FetchMovies {
    results: Movie[];
}

export async function fetchMovies(userQuery: string): Promise<FetchMovies> {
    const response = await axios.get<FetchMovies>(
        'https://api.themoviedb.org/3/search/movie',
        {
            params: {
                query: userQuery,
                include_adult: false,
                page: 1,
                language: 'en-US',
            },
            headers: {
                Authorization: `Bearer ${moviedbKey}`,
                accept: 'application/json'
            }
        }
    );

    return response.data;
}
