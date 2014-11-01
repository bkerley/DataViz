datasette = [14, 48, 82, 25, 75, 27, 41, 46, 86, 29, 98, 8, 11, 10, 57, 99, 85, 19, 46, 41]

svg = d3.select 'body'
  .append 'svg'
  .attr 'width', 800
  .attr 'height', 600

maxDatum = -1
for datum in datasette
  maxDatum = datum if datum > maxDatum

colorScale = (255.0 / maxDatum)
scale = (600.0 / maxDatum)
barWidth = 800 / datasette.length
barPadding = 5

svg.selectAll 'rect'
  .data datasette
  .enter()
  .append 'rect'
  .attr 'width', barWidth - barPadding
  .attr 'height', (d, i) ->
    "#{d * scale}px"
  .attr 'x', (d, i) ->
    i * barWidth
  .attr 'y', (d, i) ->
    "#{600 - (d * scale)}"
  .style 'fill', (d, i) ->
    "rgb(64, #{parseInt(d * colorScale)}, #{parseInt(i * 10.0)})"

svg.selectAll 'text'
  .data datasette
  .enter()
  .append 'text'
  .text (d, i) -> d
  .attr 'x', (d, i) ->
    (i * barWidth) + (barWidth / 4)
  .attr 'y', 600 - 10
  .attr 'fill', 'white'
