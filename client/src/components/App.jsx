import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MortalityMap from './MortalityMap.jsx';
import colorScaleData from '../helpers/colorScaleData.js';

let App = (props) => {
  const [data, setData] = useState(props.dummyData);
  const [renderMap, setRenderMap] = useState(false);

  let render = () => {
    if (!renderMap) {
      return null;
    }

    return (
      <MortalityMap stateMortalityScores={colorScaleData(data)}
                    handleButtonClick={() => {setRenderMap(true)}}
      />
    );
  }

  useEffect(() => {
    axios.get('/api/heartFailures')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(`Axios GET error: ${err}`)
      })
  }, [])

  return (
    <div>
      <div className="nav">
        <button onClick={() => {setRenderMap(true)}}>Render Map!</button>
      </div>
      <div className="map">
        {render()}
      </div>
    </div>
  );
}

export default App;
