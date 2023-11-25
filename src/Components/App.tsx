import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import download from "downloadjs";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Image {
  id: number;
  urls: {
    small: string;
  };
  links: {
    download_location: string;
  };
}

const App = () => {
  const [img, setImg] = useState<Image[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const Base_Url = `https://api.unsplash.com/search/photos`;
  const Api_Key = import.meta.env.VITE_REACT_API_KEY;

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}?query=${search}&per_page=20&page=${currentPage}&client_id=${Api_Key}`
      );
      console.log(response);
      const result = response.data.results;
      console.log(result);
      setImg(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setCurrentPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevClick = async () => {
    try {
      if (currentPage > 1) {
        const newPage = currentPage - 1;
        const response = await axios.get(
          `${Base_Url}?query=${search}&per_page=20&page=${newPage}&client_id=${Api_Key}`
        );

        const result = response.data.results;
        setImg(result);
        setCurrentPage(newPage);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleNextClick = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}?query=${search}&per_page=20&page=${
          currentPage + 1
        }&client_id=${Api_Key}`
      );
      console.log(response);
      const result = response.data.results;
      console.log(result);
      setImg((prevImages) => [...prevImages, ...result]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more data: ", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">Photo Search</h1>
          <input
            className="search"
            type="text"
            placeholder="Search Photos..."
            value={search}
            onChange={handleInputChange}
          />

          <button className="btn-search" onClick={handleSearchClick}>
            Search
          </button>
        </Col>
      </Row>

      <Row>
        <Col>
          <section className="content">
            {img.map((item) => (
              <div key={item.id} className="container">
                <img src={item.urls.small} alt={`Photo ${item.id}`} />
                <button
                  className="btn-download"
                  onClick={() => download(item.links.download_location)}
                >
                  Download
                </button>
              </div>
            ))}
          </section>
        </Col>
        <div className="directions">
          <button className="prev" onClick={handlePrevClick}>
            Anterior
          </button>
          <span>{currentPage}</span>
          <button className="next" onClick={handleNextClick}>
            Proximo
          </button>
          <a href="#" onClick={scrollToTop}>
            <i className="bi bi-arrow-up-circle-fill"></i>
          </a>
        </div>
      </Row>
    </Container>
  );
};

export default App;
