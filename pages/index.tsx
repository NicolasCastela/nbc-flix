
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { BreadcrumbItem, Breadcrumbs, Divider, Pagination } from "@heroui/react";
import router from "next/router";
import { useEffect, useState } from "react";
import apiService from "./api/hello";

export default function IndexPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<{ id: number, name: string }[]>([])
  const [selectedGenrer, setSelectedGenrer] = useState('')
  const [page, setPage] = useState(1)


  useEffect(() => {
    getMoviesByPage()
  }, [selectedGenrer, page])

  useEffect(() => {
    getGenres()
  }, [])


  const filterByGenrer = (id: any) => {
    setSelectedGenrer(id)
    console.log('console.log', selectedGenrer)
  }



  const viewDetailsMovie = (id: number) => {
    router.push(`/about/${id}`);
  };

  async function getMoviesByPage() {
    const response = await apiService.get('/discover/movie', {
      params: {
        include_adult: true,
        include_video: true,
        language: 'pt-BR',
        page: page,
        sort_by: 'popularity.desc',
        with_genres: selectedGenrer
      }
    })
    setMovies(response.data.results)
  }

  async function getGenres() {
    const response = await apiService.get('/genre/movie/list', {
      params: { language: "pt" }
    })
    console.log(response)
    setGenres(response.data.genres)
  }

  return (
    <DefaultLayout>
      <div className=" flex flex-row gap-4 flex-wrap my-8  ">
        {genres.map((itemsGenres: any) => (

          <Button radius="full" variant={selectedGenrer === itemsGenres.id ? "solid" : "light"}
            color={selectedGenrer === itemsGenres.id ? "primary" : "default"} onClick={() => filterByGenrer(itemsGenres.id)}>{itemsGenres.name} </Button>
        ))}
        <Button onClick={() => setSelectedGenrer('')} variant="flat" color='warning' radius="full" >Todos</Button>
      </div>

      <div className="my-6 flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex">
          <Breadcrumbs size="sm">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Filmes</BreadcrumbItem>
            <BreadcrumbItem>{genres.find(g => g.id === Number(selectedGenrer))?.name || 'Todos'}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="flex justify-center sm:justify-end">
          <Pagination
            onChange={(newPage) => setPage(newPage)}
            initialPage={1}
            page={page}
            total={100}
            size="sm"
            showControls
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {movies.map((item: any, index) => (
          <Card key={index} isFooterBlurred className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] border-none relative" radius="lg">
            <CardHeader className="flex  gap-3 h-20">
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
                onClick={() => viewDetailsMovie(item.id)}
              >
                Ver detalhes
              </Button>
            </CardFooter>
          </Card>
        ))
        }
      </div >
      <div className="w-full  flex justify-center my-12">

        {/* <Button
          className="text-tiny text-white bg-black /20"
          color="default"
          radius="lg"
          size="md"
          variant="shadow"
          onClick={() => advancedPageMovies()}
        >
          Ver Mais
        </Button> */}


        <div className="flex justify-center sm:justify-end">
          <Pagination
            onChange={(newPage) => setPage(newPage)}
            initialPage={1}
            page={page}
            total={100}
            size="sm"
            showControls
          />
        </div>
      </div>


    </DefaultLayout >
  );
}
