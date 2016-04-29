// start slingin' some d3 here.

//create the board
var board = d3.select('.board').append('svg')
                        .attr('height', 700)
                        .attr('width', 300);

//create data of enemies
var createEnemies = function() {
  var allEnemies = [];

  for (var i = 0; i < 20; i++) {
    var enemy = {
      id: i,
      x: Math.random() * 700,
      y: Math.random() * 300
    };
    allEnemies.push(enemy);
  }
  return allEnemies;
};

var enemies = board.selectAll('circles')
                   .data(createEnemies())
                   .enter()
                   .append('circle')
                   .attr('cx', function(item) { return item.x; })
                   .attr('cy', function(item) { return item.y; })
                   .attr('r', 5)
                   .attr('class', 'circles')
                   .attr('fill', 'blue');