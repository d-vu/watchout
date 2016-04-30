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
 .duration(1000)
 .attr('cx', function(item) { return 700 * Math.random(); })
 .attr('cy', function(item) { return 400 * Math.random(); });
};

var dragMove = function (d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx', x);
  d3.select(this).attr('cy', y);
};


var drag = d3.behavior.drag()
    .on('drag', dragMove);



var player = board.selectAll('player')
                   .data([{ id: 'player', x: 350, y: 200 }])
                   .enter()
                   .append('circle')
                   .attr('cx', function(d) { return d.x; })
                   .attr('cy', function(d) { return d.y; })
                   .attr('r', 10)
                   .attr('class', 'player')
                   .attr('fill', 'red')
                   .call(drag);


setInterval(function() {
  moveEnemies();
}, 1000);