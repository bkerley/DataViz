(function() {
  var chart;

  chart = void 0;

  chart = function() {
    var formatPercent, height, margin, svg, width, x, xAxis, y, yAxis;
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    formatPercent = d3.format(".0%");
    x = d3.scale.ordinal().rangeRoundBands([0, width], .1, 1);
    y = d3.scale.linear().range([height, 0]);
    xAxis = d3.svg.axis().scale(x).orient("bottom");
    yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(formatPercent);
    svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.json("https://arcane-anchorage-4736.herokuapp.com/", function(error, data) {
      var change, sortTimeout;
      change = function() {
        var delay, transition, x0;
        clearTimeout(sortTimeout);
        x0 = x.domain(data.sort((this.checked ? function(a, b) {
          return b.frequency - a.frequency;
        } : function(a, b) {
          return d3.ascending(a.letter, b.letter);
        })).map(function(d) {
          return d.letter;
        })).copy();
        transition = svg.transition().duration(500);
        delay = function(d, i) {
          return i * 20;
        };
        transition.selectAll(".bar").delay(delay).attr("x", function(d) {
          return x0(d.letter);
        });
        transition.select(".x.axis").call(xAxis).selectAll("g").delay(delay);
      };
      data.forEach(function(d) {
        d.frequency = +d.frequency;
      });
      x.domain(data.map(function(d) {
        return d.letter;
      }));
      y.domain([
        0, d3.max(data, function(d) {
          return d.frequency;
        })
      ]);
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
      svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Frequency");
      svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
        return x(d.letter);
      }).attr("width", x.rangeBand()).attr("y", function(d) {
        return y(d.frequency);
      }).attr("height", function(d) {
        return height - y(d.frequency);
      });
      d3.select("input").on("change", change);
      sortTimeout = setTimeout(function() {
        d3.select("input").property("checked", true).each(change);
      }, 2000);
    });
  };

  $(document).on("ready", chart);

}).call(this);
