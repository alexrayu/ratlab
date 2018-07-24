var rat = function (map) {
  var rat = this;
  this.start = findChar('S');
  this.pos = findChar('S');
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
    var res = false;

    var status = estStatus();
    if (status != 'move') {
      return status;
    }

    switch (rat.heading) {
      case 'n':
        res = isNavigable(rat.pos.x - 1, rat.pos.y);
        if (res) {
          rat.pos.x--;
          rat.heading = 'w';
          return;
        }
        res = isNavigable(rat.pos.x, rat.pos.y - 1);
        if (res) {
          rat.pos.y--;
          rat.heading = 'n';
          return;
        }
        res = isNavigable(rat.pos.x + 1, rat.pos.y);
        if (res) {
          rat.pos.x++;
          rat.heading = 'e';
          return;
        }
        turn();
        break;
      case 'e':
        res = isNavigable(rat.pos.x, rat.pos.y - 1);
        if (res) {
          rat.pos.y--;
          rat.heading = 'n';
          return;
        }
        res = isNavigable(rat.pos.x + 1, rat.pos.y);
        if (res) {
          rat.pos.x++;
          rat.heading = 'e';
          return;
        }
        res = isNavigable(rat.pos.x, rat.pos.y + 1);
        if (res) {
          rat.pos.y++;
          rat.heading = 's';
          return;
        }
        turn();
        break;
      case 's':
        res = isNavigable(rat.pos.x + 1, rat.pos.y);
        if (res) {
          rat.pos.x++;
          rat.heading = 'e';
          return;
        }
        res = isNavigable(rat.pos.x, rat.pos.y + 1);
        if (res) {
          rat.pos.y++;
          rat.heading = 's';
          return;
        }
        res = isNavigable(rat.pos.x - 1, rat.pos.y);
        if (res) {
          rat.pos.x--;
          rat.heading = 'w';
          return;
        }
        turn();
        break;
      case 'w':
        res = isNavigable(rat.pos.x, rat.pos.y + 1);
        if (res) {
          rat.pos.y++;
          rat.heading = 's';
          return;
        }
        res = isNavigable(rat.pos.x - 1, rat.pos.y);
        if (res) {
          rat.pos.x--;
          rat.heading = 'w';
          return;
        }
        res = isNavigable(rat.pos.x, rat.pos.y - 1);
        if (res) {
          rat.pos.y--;
          rat.heading = 'n';
          return;
        }
        turn();
        break;
    }

    return status;
  };

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
          };
        }
      }
    }
    return false;
  }
  
};
