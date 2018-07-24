var rat = function (map) {
  var rat = this;
  this.start = findChar('S');
  this.finish = findChar('F');
  this.pos = this.start;
  this.moves = 0;
  this.success = false;
  this.heading = 'n';
  this.concurrentTurns = 0;
  
  /**
   * Handle the rat's move.
   */
  this.move = function () {
    rat.moves++;
    if (rat.moves < 2) return;
    var status = estStatus();
    if (status == 'move') {
      if (canMove()) {
        doMove();
      }
      else {
        turn();
      }
    }
    
    return status;
  }
  
  /**
   * Perform a move.
   */
  function doMove() {
    rat.concurrentTurns = 0;
    switch (rat.heading) {
      case 'n':
        rat.pos.y--;
        break;
      case 'e':
        rat.pos.x++;
        break;
      case 's':
        rat.pos.y++;
        break;
      case 'w':
        rat.pos.x--;
        break;
    }
  }
  
  /**
   * Perform a turn.
   */
  function turn() {
    switch (rat.heading) {
      case 'n':
        rat.heading = 'e';
        break;
      case 'e':
        rat.heading = 's';
        break;
      case 's':
        rat.heading = 'w';
        break;
      case 'w':
        rat.heading = 'n';
        break;
    }
    this.concurrentTurns++;
  }
  
  /**
   * Estimate whether move forward is possible.
   */
  function canMove() {
    switch (rat.heading) {
      case 'n':
        return isNavigable(rat.pos.x, rat.pos.y - 1);
      case 'e':
        return isNavigable(rat.pos.x + 1, rat.pos.y);
      case 's':
        return isNavigable(rat.pos.x, rat.pos.y + 1);
      case 'w':
        return isNavigable(rat.pos.x - 1, rat.pos.y);
    }
  }
  
  /**
   * Checks whether a position is navigable.
   */
  function isNavigable(x, y) {
    if (x < 0 || y < 0) {
      return false;
    }
    var item = map.map[y][x];
    switch (item) {
      case ' ':
      case 'S':
      case 'F':
        return true;
        break;
      default:
        return false;
    }
  }
  
  /**
   * Estimates the current rat status.
   */
  function estStatus() {
    
    // Success or panic.
    if (rat.pos.x == rat.start.x && rat.pos.y == rat.start.y && rat.moves > 5) {
      return 'panic';
    }
    else if (rat.pos.x == rat.finish.x && rat.pos.y == rat.finish.y) {
      return 'success';
    }
    
    return 'move';
  }
  
  /**
   * Finds a unique char, like start or finish.
   */
  function findChar(char) {
    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        if (map.map[y][x].toLowerCase() == char.toLowerCase()) {
          return {
            x: x,
            y: y
          }
        }
      }
    }
    return FALSE;
  }
  
}  
