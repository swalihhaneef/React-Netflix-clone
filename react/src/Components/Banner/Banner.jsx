import React, { useEffect, useState } from 'react';
import { API_key, imageUrl } from '../../Constants/constants';
import axios from '../../axios';
import './Banner.css';

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_key}&language=en-US`)
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => {
        if (prevIndex >= movies.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentMovieIndex];
  

  return (
    <div
      style={{
        backgroundImage: `url(${currentMovie ? imageUrl + currentMovie.backdrop_path : ''})`,
      }}
      className='banner'
    >
      <div className='content'>
        <h1 className='title'>{currentMovie ? currentMovie.title : ''}</h1>
        <div className='banner_button'>
          <button className='button'>Play</button>
          <button className='button'>My List</button>
        <h2 className='description'>{currentMovie ? currentMovie.overview : ''}</h2>
        </div>
      </div>
      <div className='fade_bottom'></div>
    </div>
  );
}

export default Banner;
