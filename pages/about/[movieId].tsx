import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";

export default function MoviePage() {
  const { movieId } = useRouter().query;
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (movieId) {
      getMovieById();
    }
  }, [movieId])

  async function getMovieById() {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBlMjM1ODBhZWMzMWIxY2VlNDY5ZDNkNmI4ZjE4NyIsIm5iZiI6MTc1NzcwNzYyNC4xMjgsInN1YiI6IjY4YzQ3ZDY4N2ZhNzA5NGU1MGMzYjFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GLyE88Fli13FhSZAuNTIVZpKtxNV_ip1_xEqnRGGum8'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovie(json))
      .catch(err => console.error(err));
  }

  if (!movie) return <DefaultLayout><div>Carregando...</div></DefaultLayout>;

  return (
    <DefaultLayout>
      <div className="relative">
        <div className="relative h-[70vh] overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 max-w-2xl z-10">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
              <p className="text-lg text-white/90 mb-6 line-clamp-3">{movie.overview}</p>
              
              <div className="flex gap-4 mb-6">
                <Button size="lg" className="bg-white text-black font-semibold hover:bg-gray-200">
                  ▶ Assistir
                </Button>
                <Button size="lg" className="bg-gray-600/80 text-white border border-gray-400 hover:bg-gray-500/80">
                  + Minha Lista
                </Button>
              </div>
              
              <div className="flex gap-4 items-center text-white/80">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.runtime} min</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Sobre o filme</h2>
            <p className="text-gray-300 mb-6">{movie.overview}</p>
            
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Gêneros: </span>
                <div className="flex gap-2 mt-2">
                  {movie.genres?.map((genre: any) => (
                    <Chip key={genre.id} variant="flat">{genre.name}</Chip>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-gray-400">Data de lançamento: </span>
                <span>{new Date(movie.release_date).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Duração: </span>
                <span>{movie.runtime} minutos</span>
              </div>
            </div>
          </div>
          
          <div>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}