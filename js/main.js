 
var Level = new level('levels/level2.txt');
var map = {};
map.map = Level.getMap();
map.width = map.map[0].length;
map.height = map.map.length;
var Rat = new rat(map);
var Renderer = new renderer(Level, Rat);

var timer = window.setInterval(function() {
  var res = Rat.move();
  Renderer.render();
  if (res == 'success') {
    clearInterval(timer);
  }
    if (res == 'panic') {
    clearInterval(timer);
  }
}, 100);

