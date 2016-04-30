// start slingin' some d3 here.

//create the board
var board = d3.select('.board').append('svg')
                        .attr('height', 400)
                        .attr('width', 700);

//create data of enemies
var createEnemies = function() {
  var listOfEnemies = [];
  for (var i = 0; i < 20; i++) {
    var enemy = {
      id: i,
      x: Math.random() * 700,
      y: Math.random() * 400
    };
    listOfEnemies.push(enemy);
  }
  return listOfEnemies;
};

var enemies = board.selectAll('enemies')
                   .data(createEnemies())
                   .enter()
                   .append('svg:image')
                   .attr('width', 20)
                   .attr('height', 24)
                   .attr('x', function(item) { return item.x; })
                   .attr('y', function(item) { return item.y; })
                   .attr('class', 'enemies')
                   .attr('xlink:href', 'img/123.png');



var moveEnemies = function() {
  enemies
 .transition()
 .duration(1000)

 // rotate(-60, 150, 130)
 // item.x
 // .attr('transform', function(item) { return 'rotate(' + item.x + ', ' + item.y + ',' + '+360)'; })
 // .attr('transform', function(item) { return 'translate(' + item.x + ', ' + item.y + ')' + 'rotate (+360)'; })
 .attr('x', function(item) { return 700 * Math.random(); })
 .attr('y', function(item) { return 400 * Math.random(); });
 
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


var listOfEnemies = document.getElementsByClassName('enemies');
var playerLocation = document.getElementsByClassName('player');
var collisions = 0;
var highestScore = 0;
var currentScore = 0;
var checkCollision = function() {
  currentScore++;


  //find highest score
  if (currentScore > highestScore) {
    highestScore = currentScore;
  }

  d3.selectAll('.current').select('span').text(currentScore);
  d3.selectAll('.highscore').select('span').text(highestScore);
  
  // grab location for player
  var xPlayer = playerLocation[0].getAttribute('cx');
  var yPlayer = playerLocation[0].getAttribute('cy');

  // grab location for each enemey
  for (var i = 0; i < listOfEnemies.length; i++) {
    var xEnemy = listOfEnemies[i].getAttribute('x');
    var yEnemy = listOfEnemies[i].getAttribute('y');

    var distance = Math.sqrt(Math.pow(xPlayer - xEnemy, 2) - Math.pow(yPlayer - yEnemy, 2));

    // collision occured
    // reset currentScore and increase collision count
    if (distance < 5) {
      currentScore = 0;
      collisions++;
      d3.selectAll('.collisions').select('span').text(collisions);
      
    }
  }
};

setInterval(function() {
  checkCollision();
}, 10);


setInterval(function() {
  moveEnemies();
}, 1000);