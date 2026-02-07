import { Carousel, Figure } from "react-bootstrap"

function BooksItemImgs({ images }: { images: string[] }) {
  return (
    <Carousel data-bs-theme="dark">
      {images.length === 0 ? (
        <Carousel.Item>
          <Figure>
            <Figure.Image
              className="rounded"
              width={550}
              height={350}
              alt="Book Image"
              src="https://ami.by/thumbs/getthumb.php?w%5Cu003d200%5Cu0026h%5Cu003d267%5Cu0026src%5Cu003dimages/catalogue/items/stenka-stefgold-0.jpg"
            />
          </Figure>
        </Carousel.Item>
      ) : (
        images.map((elem, i) =>
          <Carousel.Item key={i}>
            <Figure>
              <Figure.Image
                className="rounded"
                width={550}
                height={350}
                alt="Book Image"
                src={window.location.origin + '/libraries/' + elem}
              />
            </Figure>
          </Carousel.Item>
        )
      )}
    </Carousel>
  )
}

export default BooksItemImgs
