import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MortalityMap from './MortalityMap.jsx';
import colorScaleData from '../helpers/colorScaleData.js';

let App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [map, setMap] = useState(false);

  let handleButtonClick = () => {
    setMap(true);
  }

  let renderButton = () => {
    if (isLoading) {
      return <button>Data Loading Please Wait...</button>;
    }

    return <button onClick={handleButtonClick}>Render Map!</button>;
  }

  let renderMap = () => {
    if (!map) {
      return null;
    }

    return (
      <MortalityMap stateMortalityScores={colorScaleData(data)}
                    handleButtonClick={handleButtonClick}
      />
    );
  }

  useEffect(() => {
    axios.get('/api/heartFailures')
      .then((res) => {
        console.log('API Data:', res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Axios GET error: ${err}`)
      })
  }, [])

  return (
    <div>
      <div className="nav">
        {renderButton()}
      </div>
      <div className="map">
        {renderMap()}
      </div>
    </div>
  );
}

export default App;
