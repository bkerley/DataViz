(function() {
  var barPadding, barWidth, colorScale, datasette, datum, maxDatum, scale, svg, _i, _len;

  datasette = [14, 48, 82, 25, 75, 27, 41, 46, 86, 29, 98, 8, 11, 10, 57, 99, 85, 19, 46, 41];

  svg = d3.select('body').append('svg').attr('width', 800).attr('height', 600);

  maxDatum = -1;

  for (_i = 0, _len = datasette.length; _i < _len; _i++) {
    datum = datasette[_i];
    if (datum > maxDatum) {
      maxDatum = datum;
    }
  }

  colorScale = 255.0 / maxDatum;

  scale = 600.0 / maxDatum;

  barWidth = 800 / datasette.length;

  barPadding = 5;

  svg.selectAll('rect').data(datasette).enter().append('rect').attr('width', barWidth - barPadding).attr('height', function(d, i) {
    return "" + (d * scale) + "px";
  }).attr('x', function(d, i) {
    return i * barWidth;
  }).attr('y', function(d, i) {
    return "" + (600 - (d * scale));
  }).style('fill', function(d, i) {
    return "rgb(64, " + (parseInt(d * colorScale)) + ", " + (parseInt(i * 10.0)) + ")";
  });

  svg.selectAll('text').data(datasette).enter().append('text').text(function(d, i) {
    return d;
  }).attr('x', function(d, i) {
    return (i * barWidth) + (barWidth / 4);
  }).attr('y', 600 - 10).attr('fill', 'white');

}).call(this);
