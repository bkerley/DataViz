(function() {
  var barWidth, datasette, scale, svg;

  datasette = [6, 48, 31, 39, 5, 17, 5, 46, 37, 22];

  svg = d3.select('body').append('svg').attr('width', 800).attr('height', 600);

  scale = 600.0 / 48;

  barWidth = 800 / datasette.length;

  svg.selectAll('rect').data(datasette).enter().append('rect').attr('width', barWidth - 5).attr('height', function(d, i) {
    return "" + (d * scale) + "px";
  }).attr('x', function(d, i) {
    return i * barWidth;
  }).attr('y', function(d, i) {
    return "" + (600 - (d * scale));
  }).style('fill', function(d, i) {
    return "rgb(64, " + (d * 5) + ", " + (i * 25) + ")";
  });

}).call(this);
