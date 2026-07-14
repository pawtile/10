function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.sharingContainer = document.querySelector(".score-sharing");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continue = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 999999999999999999999999999999999999999999999) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;
  if (tile.value === 370) inner.textContent = 37;
  if (tile.value === 371) inner.textContent = 37;
  if (tile.value === 372) inner.textContent = 37;
  if (tile.value === 373) inner.textContent = 37;
  if (tile.value === 374) inner.textContent = 37;
  if (tile.value === 375) inner.textContent = 37;
  if (tile.value === 376) inner.textContent = 37;
  if (tile.value === 377) inner.textContent = 37;
  if (tile.value === 378) inner.textContent = 37;
  if (tile.value === 379) inner.textContent = 37;
  if (tile.value === 3710) inner.textContent = 37;
  if (tile.value === 3711) inner.textContent = 37;
  if (tile.value === -5) inner.textContent = "W";
  if (tile.value === -8) inner.textContent = 8;
  if (tile.value === -9) inner.textContent = 9;
  if (tile.value === -17) inner.textContent = 17;
  if (tile.value === -18) inner.textContent = 18;
  if (tile.value === -20) inner.textContent = 20;
  if (tile.value === -21) inner.textContent = 21;
  if (tile.value === -22) inner.textContent = 22;
  if (tile.value === -23) inner.textContent = 23;
  if (tile.value === -24) inner.textContent = 24;
  if (tile.value === -25) inner.textContent = 25;
  if (tile.value === -27) inner.textContent = 27;
  if (tile.value === -28) inner.textContent = 28;
  if (tile.value === -30) inner.textContent = 30;
  if (tile.value === -31) inner.textContent = 31;
  if (tile.value === -32) inner.textContent = 32;
  if (tile.value === -33) inner.textContent = "3 3";
  if (tile.value === -34) inner.textContent = 34;
  if (tile.value === -48) inner.textContent = 48;
  if (tile.value === -49) inner.textContent = 49;
  if (tile.value === -55) inner.textContent = 55;
  if (tile.value === -61) inner.textContent = 61;
  if (tile.value === -63) inner.textContent = 63;
  if (tile.value === -66) inner.textContent = 66;
  if (tile.value === -70) inner.textContent = 70;
  if (tile.value === -75) inner.textContent = 75;
  if (tile.value === 775) inner.textContent = 75;
  if (tile.value === -82) inner.textContent = 82;


  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

  this.clearContainer(this.sharingContainer);
  this.sharingContainer.appendChild(this.scoreTweetButton());
  twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.scoreTweetButton = function () {
  var tweet = document.createElement("a");
  tweet.classList.add("twitter-share-button");
  tweet.setAttribute("href", "https://twitter.com/share");
  tweet.setAttribute("data-via", "fluff");
  tweet.textContent = "Tweet";

  var text = "My score ended up as " + this.score + " this on 10, a game where you " +
             "join numbers to get 10s! #10game";
  tweet.setAttribute("data-text", text);

  return tweet;
};
