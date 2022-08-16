MOVEMENT_VELOCITY = 1;
duration = 0.01; // every frame in seconds
let canvas = document.getElementById('canvas2d'),
    ctx = canvas.getContext('2d'),
    keyPresses = {},
    positionX = 40, positionY = 40,
    img = new Image(),
    x = [], y = [];


function moveTo(
        from = [ 40, 40], // x, y
        to = [150, 150], // x, y
        velocity  = 50   // velocity  in pixels per second
    ){
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    positionX = from[0], positionY = from[1]; // starting positions
    var coordinates = [
            {
                x : positionX,
                y : positionY
            }
        ]
        lx = to[0] - positionX, // projections
        ly = to[1] - positionY,
        l = Math.sqrt( lx**2 + ly**2 ); // total way length
        velocityX = velocity * lx / l,  // projections, according to similar triangles and to vector direction (lx and ly sign)
        velocityY = velocity * ly / l;
        time = performance.now();
        myTimer = setInterval(function() {
            if ( Math.abs(to[0] - positionX) < 1 && Math.abs(to[1] - positionY) < 1 ) {
                time =  performance.now() - time;
                console.log('script running time is ', time, 'milliseconds');
                document.getElementById('b1').disabled = false;
                document.getElementById('b2').disabled = false;
                clearInterval(myTimer); // exit from setInterval
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing the area before drawing a new frame
            //console.log(positionX + ' ' + positionY + ' ' + velocityX + ' ' + velocityY); // for testing and debugging
            ctx.drawImage(  img,  positionX += velocityX * duration, // calculation for seconds, not milliseconds
                                positionY += velocityY * duration);
            coordinates.push({
                x : positionX,
                y : positionY
            });
            if ( positionX < -20 || positionX > canvas.width + 20 || positionY < -20 || positionY > canvas.height + 20 ){
                location.reload();
                clearInterval(myTimer);  // exit from setInterval
            }
        }, duration * 1000); // every frame, just send milliseconds to the setInterval function
    return coordinates;
}


function moveWithAcceleration(
        from = [ 30, 30], // x, y
        to = [450, 450],  // x, y
        startingVelocity = -40,  // velocity in pixels per second
        acceleration = 20        // acceleration in pixels per square second
    ){
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    positionX = from[0], positionY = from[1]; // starting positions
    var coordinates = [
            {
                x : positionX,
                y : positionY
            }
        ]
        lx = to[0] - positionX, // projections 
        ly = to[1] - positionY,
        l = Math.sqrt( lx ** 2 + ly ** 2 );            // total way length
        startingVelocityX = startingVelocity * lx / l, // projections, according to similar triangles and to vector direction (lx and ly sign)
        startingVelocityY = startingVelocity * ly / l,
        accelrationX = acceleration * lx / l,
        accelrationY = acceleration * ly / l,
        velocityX = startingVelocityX,
        velocityY = startingVelocityY;
        time = performance.now();
        myTimer = setInterval(function() {
            if ( Math.abs(to[0] - positionX) < 1 && Math.abs(to[1] - positionY) < 1 ) {
                time = performance.now() - time;
                console.log('script running time is ', time, 'milliseconds');
                document.getElementById('b1').disabled = false;
                document.getElementById('b2').disabled = false;
                clearInterval(myTimer); // exit from setInterval
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing the area before drawing a new frame
            //console.log(positionX + ' ' + positionY + ' ' + velocityX + ' ' + velocityY); // for testing and debugging
            velocityX += accelrationX * duration; // velocity projection change according to acceleration
            velocityY += accelrationY * duration;
            ctx.drawImage(  img,  positionX += velocityX * duration, // calculation for seconds, not milliseconds
                                positionY += velocityY * duration);
            coordinates.push({
                x : positionX,
                y : positionY
            });
            if ( positionX < -20 || positionX > canvas.width + 20 || positionY < -20 || positionY > canvas.height + 20 ){
                location.reload();
                clearInterval(myTimer);  // exit from setInterval
            }
        }, duration * 1000); // every frame, just send milliseconds to the setInterval function
    return coordinates;
}

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (keyPresses.w)
      moveCharacter(0, -MOVEMENT_VELOCITY);
    if (keyPresses.s)
      moveCharacter(0, MOVEMENT_VELOCITY);
    if (keyPresses.a)
      moveCharacter( -MOVEMENT_VELOCITY, 0);
    if (keyPresses.d)
      moveCharacter( MOVEMENT_VELOCITY, 0);
    ctx.drawImage(img, positionX, positionY);
    window.requestAnimationFrame(gameLoop);
}
  
function moveCharacter(deltaX, deltaY) {
    positionX += deltaX;
    positionY += deltaY;
}

function loadImage() {
  img.src = 'img.png';
  img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}

loadImage();