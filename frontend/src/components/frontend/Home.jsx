import { React } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import ListDonut from './ListDonut';
import carousel1 from '../../assets/carousel1.jpg';
import carousel2 from '../../assets/carousel2.jpg';
import carousel3 from '../../assets/carousel3.jpg';
import Button from 'react-bootstrap/Button';

import '../../styles/frontend/Home.css'

const Home = () => {

  return (
    <div>
      <div>
        <Carousel data-bs-theme="dark" interval={1000}>
          <Carousel.Item>
            <img style={{ height: '80vh', objectFit: 'cover', }}
              className="d-block w-100"
              src={carousel1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ height: '80vh', objectFit: 'cover', }}
              className="d-block w-100"
              src={carousel2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ objectFit: 'cover', height: '80vh' }}
              className="d-block w-100"
              src={carousel3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        {/* <Button href="/menu" className="btn btn-order">Order Online</Button> */}
        <section id='donut' className='block donut-block'>
          <Container fluid>
            <div className='title-holder'>
              <h2>Most popular donuts</h2>
              <div className='subtitle'>get your most favorite donuts from here</div>
            </div>
            <ListDonut numberOfDonuts={3} />
          </Container>
          <div className='btn-holder'>
            <Button className="btn btn-view " type="submit" href='/menu'>View all donuts</Button>
          </div>
        </section>
      </div>
      {/* <a href="/menu" className="btn btn-view" role="button" data-bs-toggle="button">View all donuts</a> */}


    </div>
  );
};

export default Home;
