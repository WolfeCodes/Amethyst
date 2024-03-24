import React from 'react';
import ListDonut from './ListDonut';
import HomepagePicture from '../../assets/HomepagePicture.jpg'; // Import the image file
import '../../styles/frontend/Home.css'

const Home = () => {
  return (
    <div>
      <img src={HomepagePicture} alt="Homepage" className='homepage-picture'></img>
      <button type="button" className="btn btn-order">Order Online</button>
      <ListDonut numberOfDonuts={3} />
      <a href="/menu" className="btn btn-learn-more" role="button" data-bs-toggle="button">Learn more about all donuts</a>
    </div>
  );
};

export default Home;
