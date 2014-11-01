(function() {
  var datasette;

  datasette = [6, 48, 31, 39, 5, 17, 5, 46, 37, 22];

  d3.select('body').selectAll('div').data(datasette).enter().append('div').attr('class', 'bar').style('height', function(datum, index) {
    return "" + (datum * 4) + "px";
  }).style('background-color', function(datum, index) {
    return "rgb(" + (4 * datum) + ", " + (25 * index) + ", " + (15 * index) + ")";
  });

}).call(this);
