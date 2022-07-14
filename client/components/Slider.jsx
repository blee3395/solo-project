import React from "react";
import {useState, useEffect} from 'react';

import Poster from './Poster.jsx'

const Slider = ({type, qty}) => {
  const movieTemplate = {
    "id": "tt10648342",
    "rank": "1",
    "rankUpDown": "+3",
    "title": "Thor: Love and Thunder",
    "fullTitle": "Thor: Love and Thunder (2022)",
    "year": "2022",
    "image": "https://imdb-api.com/images/original/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg",
    "crew": "Taika Waititi (dir.), Chris Hemsworth, Natalie Portman",
    "imDbRating": "7.0",
    "imDbRatingCount": "71027"
  }

  const movieArr = [];

  for (let i = 0; i < qty; i++) {
    movieArr.push(movieTemplate)
  }

  const [movies, setMovies] = useState(movieArr);

  useEffect(() => {
    fetch('/imdb')
      .then(data => data.json())
      .then(formattedData => {
        const newArr = [...movieArr]
        for (let i = 0; i < movieArr.length; i++) {
          newArr[i] = formattedData[i]
        }
        setMovies(newArr)
        console.log('Movies re-rendered: ', movies)
      })
      .catch(error => {
        console.log('Error in Slider UseEffect: ', error)
      })
  }, [])
  
  if (type === 'poster') {    
    const row = []
    console.log('Movies in poster ', movies)
    for (let i = 0; i < qty; i++) {
      row.push(<Poster 
                movie={movies} 
                index={i}
              />)
    }
    return <div className="slider">{row}</div>    
  }
}

export default Slider;