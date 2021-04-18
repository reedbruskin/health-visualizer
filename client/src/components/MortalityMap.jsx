import React, { useEffect } from 'react';

import Datamap from 'datamaps';
import mapConfig from '../map.config.js';

let MortalityMap = (props) => {
  const myRef = React.createRef();
  mapConfig.data = props.stateMortalityScores;

  useEffect(() => {
    const dataViz = new Datamap(
      Object.assign({}, mapConfig, {
        element: myRef.current,
        responsive: true
      })
    );
    dataViz.labels();
  })

  return (
    <div className="map" ref={myRef}></div>
  );
}

export default MortalityMap;
