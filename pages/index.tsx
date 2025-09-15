
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/react";


export default function IndexPage() {
  const items = [
    {
      urlImage: 'https://app.requestly.io/delay/1000/https://heroui.com/images/fruit-4.jpeg',
      title: 'Filme Maneiro',
      category: 'Ação',
      description: 'Um filme diferente de ação que você vai adorar assistir com seus amigos e familiares.',
      status: 'Assistido',
      chipColor: 'success'
    },
    {
      urlImage: 'https://heroui.com/images/hero-card.jpeg',
      title: 'Filme Maneiro',
      category: 'Ação',
      description: 'Um filme diferente de ação que você vai adorar assistir com seus amigos e familiares.',
      status: 'Pendente',
      chipColor: 'warning'
    },
    {
      urlImage: 'https://heroui.com/images/fruit-1.jpeg',
      title: 'Filme Maneiro',
      category: 'Ação',
      description: 'Um filme diferente de ação que você vai adorar assistir com seus amigos e familiares.',
      status: 'Assistindo',
      chipColor: 'primary'
    },
    {
      urlImage: 'https://heroui.com/images/album-cover.png',
      title: 'Filme Maneiro',
      category: 'Ação',
      description: 'Um filme diferente de ação que você vai adorar assistir com seus amigos e familiares.',
      status: 'Assistido',
      chipColor: 'success'
    },


  ]


  return (
    <DefaultLayout>
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => (
          <Card key={index} isFooterBlurred className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] border-none relative" radius="lg">
            <CardHeader className="flex gap-3">
              <Image
                alt="heroui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{item.title}</p>
                <p className="text-small text-default-500">{item.category}</p>
              </div>
            </CardHeader>
            <Image
              className="object-cover object-center" alt="Woman listing to music"
              src={item.urlImage}
              width="100%"
              height={250}
            />


            <CardBody >
              <p>{item.description}
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between" >
              <Chip variant="solid" color={item.chipColor as any}>{item.status}</Chip>
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
