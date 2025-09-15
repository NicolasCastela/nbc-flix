
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/react";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieList()
  }, [])

  async function movieList() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=pt-BR&page=1&sort_by=popularity.desc';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBlMjM1ODBhZWMzMWIxY2VlNDY5ZDNkNmI4ZjE4NyIsIm5iZiI6MTc1NzcwNzYyNC4xMjgsInN1YiI6IjY4YzQ3ZDY4N2ZhNzA5NGU1MGMzYjFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GLyE88Fli13FhSZAuNTIVZpKtxNV_ip1_xEqnRGGum8'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovies(json.results))
      .catch(err => console.error(err))
      .finally(() => console.log(movies))
  }



  return (
    <DefaultLayout>
      <div className="flex flex-wrap gap-4">

        {movies.map((item: any, index) => (
          <Card key={index} isFooterBlurred className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] border-none relative" radius="lg">
            <CardHeader className="flex gap-3 h-20">
              <Image
                alt="heroui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md line-clamp-2">{item.title}</p>
                <p className="text-small text-default-500">{item.release_date}</p>
              </div>
            </CardHeader>
            <Image
              className="object-cover object-center" alt="Movie poster"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              width="100%"
              height={250}
            />


            <CardBody >
              <p>{item.overview.slice(0, 100)}...
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between" >
              {/* <Chip variant="solid" color={item.chipColor as any}>{item.status}</Chip> */}
              <Button
                className="text-tiny text-white bg-black /20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Ver detalhes
              </Button>
            </CardFooter>
          </Card>
        ))
        }
      </div >

    </DefaultLayout >
  );
}
