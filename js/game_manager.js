function GameManager(size, InputManager, Actuator, ScoreManager) {
  this.size         = size; // Size of the grid
  this.inputManager = new InputManager;
  this.scoreManager = new ScoreManager;
  this.actuator     = new Actuator;

  this.startTiles   = 1;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.actuator.continue();
  this.setup();
};

// Keep playing after winning
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continue();
};

GameManager.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid        = new Grid(this.size);

  this.score       = 0;
  this.over        = false;
  this.won         = false;
  this.keepPlaying = false;

  // Add the initial tiles
  this.addStartTiles();

  // Update the actuator
  this.actuate();
};

// Set up the initial tiles to start the game with
GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomTile();
  }
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var value = Math.random() < 0.99999999 ? Math.random() < 0.999999975 ? Math.random() < 0.99999995 ? Math.random() < 0.9999999 ? Math.random() < 0.9999998 ? Math.random() < 0.99999975 ? Math.random() < 0.999999699996999969999699 ? Math.random() < 0.9999995 ? Math.random() < 0.999999 ? Math.random() < 0.999998958333333333333333333 ? Math.random() < 0.99999888888888888888888 ? Math.random() < 0.99999884259259259259259259 ? Math.random() < 0.99999879256218304757304 ? Math.random() < 0.99999876543209876543209 ? Math.random() < 0.99999875 ? Math.random() < 0.99999869791666666666666666666 ? Math.random() < 0.999998666666666666666666 ? Math.random() < 0.9999986111111111111111111 ? Math.random() < 0.99999857142857142857142 ? Math.random() < 0.99999851851851851851851 ? Math.random() < 0.9999984375 ? Math.random() < 0.999998333333333333333333 ? Math.random() < 0.999998263888888888888888888 ? Math.random() < 0.99999814814814814814814 ? Math.random() < 0.999998046875 ? Math.random() < 0.999998 ? Math.random() < 0.99999791666666666666666666 ? Math.random() < 0.99999777777777777777777 ? Math.random() < 0.9999976851851851851851851 ? Math.random() < 0.9999975 ? Math.random() < 0.9999973958333333333333333333 ? Math.random() < 0.999997222222222222222222 ? Math.random() < 0.99999699969996999699969 ? Math.random() < 0.999996875 ? Math.random() < 0.99999666666666666666666 ? Math.random() < 0.99999652777777777777777777 ? Math.random() < 0.99999629629629629629629 ? Math.random() < 0.99999609375 ? Math.random() < 0.999996 ? Math.random() < 0.9999958333333333333333333 ? Math.random() < 0.99999555555555555555555 ? Math.random() < 0.999995370370370370370370 ? Math.random() < 0.999995 ? Math.random() < 0.99999479166666666666666666 ? Math.random() < 0.99999444444444444444444 ? Math.random() < 0.99999375 ? Math.random() < 0.99999333333333333333333 ? Math.random() < 0.9999930555555555555555555 ? Math.random() < 0.99999259259259259259259 ? Math.random() < 0.9999921875 ? Math.random() < 0.999991666666666666666666 ? Math.random() < 0.99999074074074074074074 ? Math.random() < 0.99999 ? Math.random() < 0.99998958333333333333333333 ? Math.random() < 0.9999890109890109890109 ? Math.random() < 0.99998809523809523809523 ? Math.random() < 0.9999876543209876543209 ? Math.random() < 0.9999875 ? Math.random() < 0.99998666666666666666666 ? Math.random() < 0.999986111111111111111111 ? Math.random() < 0.9999857142857142857142 ? Math.random() < 0.999984375 ? Math.random() < 0.9999841269841269841269 ? Math.random() < 0.99998333333333333333333 ? Math.random() < 0.999982142857142857142857 ? Math.random() < 0.9999814814814814814814 ? Math.random() < 0.99998 ? Math.random() < 0.9999791666666666666666666 ? Math.random() < 0.9999761904761904761904 ? Math.random() < 0.999975 ? Math.random() < 0.99997222222222222222222 ? Math.random() < 0.9999699699699699699699 ? Math.random() < 0.99996875 ? Math.random() < 0.9999666666666666666666 ? Math.random() < 0.99996428571428571428571 ? Math.random() < 0.9999629629629629629629 ? Math.random() < 0.99996 ? Math.random() < 0.999958333333333333333333 ? Math.random() < 0.9999523809523809523809 ? Math.random() < 0.99995 ? Math.random() < 0.9999375 ? Math.random() < 0.9999333333333333333333 ? Math.random() < 0.9999285714285714285714 ? Math.random() < 0.99991666666666666666666 ? Math.random() < 0.9999 ? Math.random() < 0.999875 ? Math.random() < 0.999857142857142857142 ? Math.random() < 0.9998333333333333333333 ? Math.random() < 0.99975 ? Math.random() < 0.999666666666666666666 ? Math.random() < 0.9995 ? Math.random() < 0.999 ? 1 : 0 : 33 : -34 : 35 : 56 : 67 : 70 : 54 : 79 : 69 : 22 : 80 : Math.random() < 0.5 ? 20 : 25 : 21 : 38 : Math.random() < 0.5 ? 71 : 72 : 83 : 86 : 23 : 40 : 333 : 62 : Math.random() < 0.5 ? 18 : 19 : 42 : 63 : 73 : 32 : 64 : 24 : -63 : 88 : 26 : -27 : Math.random() < 0.5 ? 76 : 77 : -70 : 82 : 84 : 140 : 90 : 91 : 28 : 29 : 39 : 116 : 85 : Math.random() < 0.5 ? 74 : 78 : 34 : 60 : 58 : 92 : 43 : 66 : -30 : 27 : 61 : 118 : 68 : 93 : 31 : 3333 : 81 : 46 : 94 : 44 : -45 : 53 : 95 : 57 : 115 : 51 : 96 : 89 : 65 : 97 : 45 : 75 : 30 : 98 : 111 : 82828282 : 48 : 99 : 100 : -1 : -2 : 33333 : 41 : 5000 : 10000 : 20000 : 40000 : Math.random() < 0.5 ? 161 : 162; 
    var tile = new Tile(this.grid.randomAvailableCell(), value);
    
    this.grid.insertTile(tile);
    this.score += 1;
  }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  if (this.scoreManager.get() < this.score) {
    this.scoreManager.set(this.score);
  }

  this.actuator.actuate(this.grid, {
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.scoreManager.get(),
    terminated: this.isGameTerminated()
  });

};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  // 0: up, 1: right, 2:down, 3: left
  var self = this;

  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) { 
          var merged = new Tile(positions.next, tile.value * 1);
           if (tile.value === 204)
            var merged = new Tile(positions.next, tile.value = 1);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // The mighty 10 tile
          if (merged.value === 10) self.won = true;
          if (merged.value === 110) self.over = true;
        } else {
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  if (moved) {
    this.addRandomTile();

    if (!this.movesAvailable()) {
      this.over = true; // Game over!
    }

    this.actuate();
  }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // up
    1: { x: 1,  y: 0 },  // right
    2: { x: 0,  y: 1 },  // down
    3: { x: -1, y: 0 }   // left
  };

  return map[direction];
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};
