var rat = function (map) {
  var rat = this;
  this.start = findChar('S');
  this.pos = findChar('S');
  this.prevPos = {x: -1, y: -1};
  this.finish = findChar('F');
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
    rat.prevPos.x = rat.pos.x;
    rat.prevPos.y = rat.pos.y;
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
   * Checks if left wall is present.
   */
  function isLeftWall() {
    var res = false;
    switch (rat.heading) {
      case 'n':
        res = isNavigable(rat.pos.x - 1, rat.pos.y - 1);
        break;
      case 'e':
        res = isNavigable(rat.pos.x + 1, rat.pos.y - 1);
        break;
      case 's':
        res = isNavigable(rat.pos.x + 1, rat.pos.y + 1);
        break;
      case 'w':
        res = isNavigable(rat.pos.x - 1, rat.pos.y + 1);
        break;
    }
    return !res;
  }
  
  /**
   * Perform a turn.
   */
  function turn() {
    var newHeading = '';
    switch (rat.heading) {
      case 'n':
        newHeading = 'e';
        break;
      case 'e':
        newHeading = 's';
        break;
      case 's':
        newHeading = 'w';
        break;
      case 'w':
        newHeading = 'n';
        break;
    }

    rat.heading = newHeading;
    rat.concurrentTurns++;
  }
  
  /**
   * Estimate whether move forward is possible.
   */
  function canMove() {
    var res = false;
    var newPos = {x: -2, y: -2};
    switch (rat.heading) {
      case 'n':
        newPos = {x: rat.pos.x, y: rat.pos.y - 1};
        res = isNavigable(rat.pos.x, rat.pos.y - 1);
        break;
      case 'e':
        newPos = {x: rat.pos.x + 1, y: rat.pos.y};
        res = isNavigable(rat.pos.x + 1, rat.pos.y);
        break;
      case 's':
        newPos = {x: rat.pos.x, y: rat.pos.y + 1};
        res = isNavigable(rat.pos.x, rat.pos.y + 1);
        break;
      case 'w':
        newPos = {x: rat.pos.x - 1, y: rat.pos.y};
        res = isNavigable(rat.pos.x - 1, rat.pos.y);
        break;
    }
    if (newPos.x == rat.prevPos.x && newPos.y == rat.prevPos.y && rat.concurrentTurns < 5) {
      res = false;
    }
    return res;
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
    else if (rat.concurrentTurns > 10) {
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
    return false;
  }
  
}  
