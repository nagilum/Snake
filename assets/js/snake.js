/**
 * @file
 * Snake
 *
 * @author
 * Stian Hanger <pdnagilum@gmail.com>
 */

'use strict';

(function () {
  var width       = window.innerWidth,
      height      = window.innerHeight,
      canvas      = document.getElementById('stage'),
      ctx         = canvas.getContext('2d'),
      bgColor     = '#000',
      fps         = 0,
      fpsColor    = '#fff',
      calcFPS     = true,
      showFPS     = true,
      updateFPS   = 0,
      updateFPSth = 10,
      lastRun     = 0,
      delta       = 0;

  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
    };

  canvas.width = width;
  canvas.height = height;

  /**
   * Calculate FPS based on each animation frame.
   */
  function calculateFPS(timestamp) {
    if (lastRun === 0) {
      lastRun = timestamp;
      return;
    }

    updateFPS++;

    if (updateFPS === updateFPSth) {
      delta = (timestamp - lastRun) / 1000;
      lastRun = timestamp;
      fps = Math.round(1/delta);

      if (fps > 60)
        fps = 60;

      updateFPS = 0;
    }
    else {
      lastRun = timestamp;
    }
  }

  /**
   * Clear the screen.
   */
  function clearScreen() {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fill();
  }

  /**
   * The main game loop as executed by the animation frame.
   */
  function gameLoop(timestamp) {
    // Request the next available animation frame.
    window.requestAnimationFrame(gameLoop);

    // Calculate FPS based on each animation frame.
    if (calcFPS)
      calculateFPS(timestamp);

    // Clear the canvas.
    clearScreen();

    // Draw the FPS counter in the upper right corner.
    if (showFPS)
      drawFPS();
  }

  /**
   * Draw the FPS counter in the upper right corner.
   */
  function drawFPS() {
    if (fps === 0)
      return;

    ctx.font = '16px Arial';
    ctx.fillStyle = fpsColor;
    ctx.textAlign = 'right';
    ctx.fillText(fps, width - 10, 20);
  }

  // Request the next available animation frame.
  window.requestAnimationFrame(gameLoop);
})();
