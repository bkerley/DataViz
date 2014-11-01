datasette = [6, 48, 31, 39, 5, 17, 5, 46, 37, 22]

svg = d3.select 'body'
  .append 'svg'
  .attr 'width', 800
  .attr 'height', 600

scale = (600.0 / 48)
barWidth = 800 / datasette.length

svg.selectAll 'rect'
  .data datasette
  .enter()
  .append 'rect'
  .attr 'width', barWidth - 5
  .attr 'height', (d, i) ->
    "#{d * scale}px"
  .attr 'x', (d, i) ->
    i * barWidth
  .attr 'y', (d, i) ->
    "#{600 - (d * scale)}"
  .style 'fill', (d, i) ->
    "rgb(64, #{d * 5}, #{i * 25})"
