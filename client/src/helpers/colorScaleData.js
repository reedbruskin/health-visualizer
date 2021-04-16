import _ from 'underscore';

const colorScaleData = (data) => {
  const onlyScores = _.map(data, (item) => item.mortalityScore);
  const minValue = Math.min.apply(null, onlyScores);
  const maxValue = Math.max.apply(null, onlyScores);
  const paletteScale = d3.scale.linear().domain([minValue, maxValue]).range(['#C4F8BF', '#126D09']);

  let finalData = Object.assign({}, data);
  _.each(finalData, (item) => { item.fillColor = paletteScale(item.mortalityScore); });

  return finalData;
};

export default colorScaleData;
