var renderer = function (map, rat) {
  var renderer = this;
  this.canvas = document.getElementById('main');
  this.ctx = this.canvas.getContext('2d');
  this.viewPort = {};
  getContext();
  
  // Handle resize event.
  window.onresize = function(event) {
    windowChange();
  };
 
  /**
   * Renders the map.
   */
  this.render = function() {
    renderer.renderMap();
    renderer.renderRat();
  }
  
  /**
   * Renders the map.
   */
  this.renderMap = function () {
    var mapArray = map.getMap();
    for (var y = 0; y < renderer.viewPort.mapHeight; y++) {
      for (var x = 0; x < renderer.viewPort.mapWidth; x++) {
        var item = mapArray[y][x];
        switch (item) {
          case '0':
            renderer.ctx.fillStyle = 'black';
            break;
          case 'S':
          case 's':
            renderer.ctx.fillStyle = 'green';
            break;
          case 'F':
          case 'f':
            renderer.ctx.fillStyle = 'yellow';
            break;
          default:
            renderer.ctx.fillStyle = 'white';
        }
        renderer.ctx.fillRect(x * renderer.viewPort.pixelsPerChar, 
                     y * renderer.viewPort.pixelsPerChar, 
                     renderer.viewPort.pixelsPerChar, 
                     renderer.viewPort.pixelsPerChar);
      }
    }
  }
  
  /**
   * Renders the rat.
   */
  this.renderRat = function () {
    dx = 0;
    dy = 0;
    switch (rat.heading) {
      case 'n':
        dy = renderer.viewPort.pixelsPerChar / 2;
      case 'e':
        dx = renderer.viewPort.pixelsPerChar / 2;
      case 's':
        dy = renderer.viewPort.pixelsPerChar / 8;
      case 'w':
        dx = renderer.viewPort.pixelsPerChar / 8;
    }
    
    // Rat.
    var ratDrawX = (rat.pos.x * renderer.viewPort.pixelsPerChar) + (renderer.viewPort.pixelsPerChar / 4);
    var ratDrawY = (rat.pos.y * renderer.viewPort.pixelsPerChar) + (renderer.viewPort.pixelsPerChar / 4)
    renderer.ctx.fillStyle = 'grey';
    renderer.ctx.fillRect(ratDrawX , ratDrawY,
                     renderer.viewPort.pixelsPerChar / 2, 
                     renderer.viewPort.pixelsPerChar / 2);
    
    // Head.
    renderer.ctx.fillStyle = 'black';
    renderer.ctx.fillRect(ratDrawX + dx, 
                     ratDrawY + dy, 
                     renderer.viewPort.pixelsPerChar / 8, 
                     renderer.viewPort.pixelsPerChar / 8);
  }
  
  /**
   * Gets the app context.
   */
  function getContext() {
    var mapArray = map.getMap();
    renderer.viewPort.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    renderer.viewPort.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (renderer.viewPort.width >= renderer.viewPort.height) {
      renderer.viewPort.orientation = 'hor';
      renderer.viewPort.pixelsPerChar = Math.round(renderer.viewPort.height / mapArray.length);
    }
    else {
      renderer.viewPort.orientation = 'ver';
      renderer.viewPort.pixelsPerChar = Math.round(renderer.viewPort.width / mapArray[0].length);
    }
    renderer.viewPort.mapWidth = mapArray[0].length;
    renderer.viewPort.mapHeight = mapArray.length;
    renderer.canvas.setAttribute('width', mapArray[0].length * renderer.viewPort.pixelsPerChar);
    renderer.canvas.setAttribute('height', mapArray.length * renderer.viewPort.pixelsPerChar);
    renderer.canvas.style.width = (mapArray[0].length * renderer.viewPort.pixelsPerChar) + 'px';
    renderer.canvas.style.height = (mapArray.length * renderer.viewPort.pixelsPerChar) + 'px';
  }

  /**
   * React to window change.
   */
  function windowChange() {
    getContext();
    renderer.render();
  }
  
} 
