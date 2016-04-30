// start slingin' some d3 here.

//create the board
var board = d3.select('.board').append('svg')
                        .attr('height', 400)
                        .attr('width', 700);

//create data of enemies
var createEnemies = function() {
  var allEnemies = [];

  for (var i = 0; i < 20; i++) {
    var enemy = {
      id: i,
      x: Math.random() * 700,
      y: Math.random() * 400
    };
    allEnemies.push(enemy);
  }
  return allEnemies;
};



// Enter
var enemies = board.selectAll('circles')
                   .data(createEnemies())
                   .enter()
                   .append('circle')
                   .attr('cx', function(item) { return item.x; })
                   .attr('cy', function(item) { return item.y; })
                   .attr('r', 10)
                   .attr('class', 'circles')
                   .attr('fill', 'black');

var moveEnemies = function() {
  enemies
 .transition()

 .attr('cx', function(item) { return 700 * Math.random(); })
 .attr('cy', function(item) { return 400 * Math.random(); });
};

setInterval(function() {
  moveEnemies();
}, 1000);