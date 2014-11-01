(function() {
  var body, datasette, p;

  body = d3.select('body');

  p = body.append('p').text('cool paragraph');

  d3.select('body').append('h1').append('marquee').attr('truespeed', 'truespeed').attr('scrollamount', 4).attr('scrolldelay', 10).text("I'm baaaaack");

  datasette = [6, 48, 31, 39, 5, 17, 5, 46, 37, 22];

  d3.select('tbody').selectAll('tr').data(datasette).enter().append('tr').style('background-color', function(datum, index) {
    var c;
    c = (datum * 4.0) + 192;
    return "rgb(" + c + ", " + (c / 2) + ", " + (c / 4) + ")";
  }).html(function(datum, index) {
    return "<th>" + index + "</th><td>" + datum + "</td>";
  });

}).call(this);
