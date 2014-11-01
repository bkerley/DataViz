chart = undefined
chart = ->
  margin =
    top: 20
    right: 20
    bottom: 30
    left: 40

  width = 960 - margin.left - margin.right
  height = 500 - margin.top - margin.bottom
  formatPercent = d3.format(".0%")
  x = d3.scale
    .ordinal()
    .rangeRoundBands([0, width], .1, 1)
  
  y = d3.scale
    .linear()
    .range([height, 0])
  
  xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom")
  yAxis = d3.svg
    .axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent)
  
  svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.json "https://arcane-anchorage-4736.herokuapp.com/", (error, data) ->
    change = ->
      clearTimeout sortTimeout
      
      # Copy-on-write since tweens are evaluated after a delay.
      x0 = x.domain(data.sort((if @checked then (a, b) ->
        b.frequency - a.frequency
       else (a, b) ->
        d3.ascending a.letter, b.letter
      )).map((d) ->
        d.letter
      )).copy()
      transition = svg.transition().duration(500)
      delay = (d, i) ->
        i * 20

      transition.selectAll(".bar")
        .delay(delay)
        .attr "x", (d) ->
          x0 d.letter

      transition.select(".x.axis")
        .call(xAxis)
        .selectAll("g")
        .delay delay

    data.forEach (d) ->
      d.frequency = +d.frequency
      return

    x.domain data.map((d) ->
      d.letter
    )
    
    y.domain [
      0
      d3.max(data, (d) ->
        d.frequency
      )
    ]
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call xAxis

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6).attr("dy", ".71em")
      .style("text-anchor", "end")
      .text "Frequency"
      
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr "x", (d) ->
        x d.letter
      .attr("width", x.rangeBand())
      .attr "y", (d) ->
        y d.frequency
      .attr "height", (d) ->
        height - y(d.frequency)

    d3.select("input").on "change", change
    sortTimeout = setTimeout(->
      d3.select("input").property("checked", true).each change
      return
    , 2000)
    return

  return

$(document).on "ready", chart
