var level = function (fileName) {
  var level = this;
  var map = [];

  /**
   * Loads the level.
   */ 
  this.load = function () {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function() {
      if(rawFile.readyState === 4) {
        if(rawFile.status === 200 || rawFile.status == 0) {
          var mapString = rawFile.responseText.trim();
          var lines = mapString.split("\n");
          lines.forEach(function(line) {
            var lineArr = [];
            for (var i = 0; i < line.length; i++) {
              lineArr.push(line.charAt(i));
            }
            map.push(lineArr);
          });
        }
      }
    }
    rawFile.send(null);
  }
  
  /**
   * Returns the map.
   */
  this.getMap = function () {
    return map; 
  }
  
  this.load();
  
}
