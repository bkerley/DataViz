datasette = [6, 48, 31, 39, 5, 17, 5, 46, 37, 22]

svg = d3.select 'body'
  .append 'svg'
  .attr 'width', 800
  .attr 'height', 600

svg.selectAll 'rect'
  .data datasette
  .enter()
  .append 'rect'
  .attr 'width', 10
  .attr 'height', (d, i) ->
    "#{d * 6}px"
  .attr 'x', (d, i) ->
    i * 10
  .attr 'y', (d, i) ->
    "#{300 - (d * 6)}"
  .style 'fill', (d, i) ->
    "rgb(64, #{d * 5}, #{i * 25})"
