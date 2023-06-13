import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import './RowPost.css';
import { API_key, imageUrl } from '../../Constants/constants';
import axios from '../../axios';

const opts = {
  playerVars: {
    autoplay: 1,
  },
};

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    axios
      .get(props.url)
      .then(response => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.url]);

  const handleMovie = async id => {
    try {
      const response = await axios.get(`movie/${id}/videos?api_key=${API_key}`);
      const videos = response.data.results;
      if (videos.length > 0) {
        setUrlId(videos[0]);
        setShowVideo(true);
      } else {
        console.log('No videos found.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeYoutube = () => {
    setShowVideo(false);
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map(obj => (
          <div className="container" key={obj.id}>
            <img
              className={props.isSmall ? 'smallposter' : 'poster'}
              src={`${imageUrl}${obj.backdrop_path}`}
              alt=""
            />
            <div className="description">
              <h4>
                {obj.original_title ? obj.original_title : obj.name}
                <br />
                <button className="playButton" onClick={() => handleMovie(obj.id)}>
                  Play Trailer
                </button>
              </h4>
            </div>
          </div>
        ))}
      </div>
      {showVideo && urlId && (
        <div className="youtube">
          <Youtube className="youtubevedio" videoId={urlId.key} opts={opts} />
          <button className="close-button" onClick={closeYoutube}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default RowPost;
