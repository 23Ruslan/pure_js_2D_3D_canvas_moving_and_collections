const COLOR_CUBE = "yellow",
        COLOR_BG = "black",
        SPEED_X = 0.01, // radians per second
        SPEED_Z = 0.01,
        SPEED_Y = 0.01;


function moveTo(
    from = [ 150, 150, 150], // x, y, z
    to = [350, 350, 350],    // x, y, z
    velocity  = 40           // velocity in pixels per second
){
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    cx = positionX = from[0], cy = positionY = from[1], cz = positionZ = from[2]; // starting positions, c is center
    vertices = [
        new POINT3D(cx - size, cy - size, cz - size),
        new POINT3D(cx + size, cy - size, cz - size),
        new POINT3D(cx + size, cy + size, cz - size),
        new POINT3D(cx - size, cy + size, cz - size),
        new POINT3D(cx - size, cy - size, cz + size),
        new POINT3D(cx + size, cy - size, cz + size),
        new POINT3D(cx + size, cy + size, cz + size),
        new POINT3D(cx - size, cy + size, cz + size)
    ];
    var coordinates = [
            {
                x : positionX,
                y : positionY,
                z : positionZ
            }
        ]
        lx = to[0] - positionX, // projections
        ly = to[1] - positionY,
        lz = to[2] - positionZ,
        l = Math.sqrt( lx**2 + ly**2 + lz**2 ); // total way length
        velocityX = velocity * lx / l,          // projections, according to similar triangles and to vector direction (lx and ly sign)
        velocityY = velocity * ly / l,
        velocityZ = velocity * lz / l;
        time = performance.now();
        myTimer = setInterval(function() {
            if ( Math.abs(to[0] - positionX) < 1 && Math.abs(to[1] - positionY) < 1 && Math.abs(to[2] - positionZ) < 1 ) {
                time =  performance.now() - time;
                console.log('script running time is ', time, 'milliseconds');
                document.getElementById('b1').disabled = false;
                document.getElementById('b2').disabled = false;
                clearInterval(myTimer); // exit from setInterval
            }
            // console.log(positionX + ' ' + positionY + ' ' + positionZ); // for testing and debugging
            positionY = cy += velocityY * duration;
            positionX = cx += velocityX * duration;
            positionZ = cz += velocityZ * duration;
            for (let v of vertices) {
                v.x += velocityX * duration;
                v.y += velocityY * duration;
                v.z += velocityZ * duration;
                if ( v.x < -20 || v.x > canvas.width + 20 || v.y < -20 || v.y > canvas.height + 20 || v.z < -20 || v.z > canvas.height + 20 ){
                    location.reload();
                    clearInterval(myTimer);  // exit from setInterval
                }
            }
            coordinates.push({
                x : positionX,
                y : positionY,
                z : positionZ
            });

        }, duration * 1000); // every frame, just send milliseconds to the setInterval function
    return coordinates;
}


function moveWithAcceleration(
    from = [ 150, 150, 150], // x, y, z
    to = [450, 450, 450],    // x, y
    startingVelocity = -120, // velocity in pixels per second
    acceleration = 40        // acceleration in pixels per square second
    ){
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    cx = positionX = from[0], cy = positionY = from[1], cz = positionZ = from[2]; // starting positions
    vertices = [
        new POINT3D(cx - size, cy - size, cz - size),
        new POINT3D(cx + size, cy - size, cz - size),
        new POINT3D(cx + size, cy + size, cz - size),
        new POINT3D(cx - size, cy + size, cz - size),
        new POINT3D(cx - size, cy - size, cz + size),
        new POINT3D(cx + size, cy - size, cz + size),
        new POINT3D(cx + size, cy + size, cz + size),
        new POINT3D(cx - size, cy + size, cz + size)
    ];
    var coordinates = [
            {
                x : positionX,
                y : positionY,
                z : positionZ
            }
        ]
        lx = to[0] - positionX, // projections 
        ly = to[1] - positionY,
        lz = to[2] - positionZ,
        l = Math.sqrt( lx ** 2 + ly ** 2 + lz ** 2);   // total way length
        startingVelocityX = startingVelocity * lx / l, // projections, according to similar triangles and to vector direction (lx and ly sign)
        startingVelocityY = startingVelocity * ly / l,
        startingVelocityZ = startingVelocity * lz / l,
        accelrationX = acceleration * lx / l,
        accelrationY = acceleration * ly / l,
        accelrationZ = acceleration * lz / l,
        velocityX = startingVelocityX,
        velocityY = startingVelocityY,
        velocityZ = startingVelocityZ;
        time = performance.now();
        myTimer = setInterval(function() {
            if ( Math.abs(to[0] - positionX) < 1 && Math.abs(to[1] - positionY) < 1 && Math.abs(to[2] - positionZ) < 1 ) {
                time =  performance.now() - time;
                console.log('script running time is ', time, 'milliseconds');
                document.getElementById('b1').disabled = false;
                document.getElementById('b2').disabled = false;
                clearInterval(myTimer); // exit from setInterval
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing the area before drawing a new frame
            //console.log(positionX + ' ' + positionY + ' ' + positionZ + ' ' + velocityX + ' ' + velocityY + ' ' + velocityZ); // for testing and debugging
            velocityX += accelrationX * duration; // velocity projection change according to acceleration
            velocityY += accelrationY * duration;
            velocityZ += accelrationZ * duration;
            positionY = cy += velocityY * duration;
            positionX = cx += velocityX * duration;
            positionZ = cz += velocityZ * duration;
            for (let v of vertices) {
                v.x += velocityX * duration;
                v.y += velocityY * duration;
                v.z += velocityZ * duration;
                if ( v.x < -20 || v.x > canvas.width + 20 || v.y < -20 || v.y > canvas.height + 20 || v.z < -20 || v.z > canvas.height + 20 ){
                    location.reload();
                    clearInterval(myTimer);  // exit from setInterval
                }
            }
            coordinates.push({
                x : positionX,
                y : positionY,
                z : positionZ
            });
        }, duration * 1000); // every frame, just send milliseconds to the setInterval function
    return coordinates;
}

let MOVEMENT_VELOCITY = 1;
const POINT3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };
var canvas = document.getElementById("canvas3d"),
    ctx = canvas.getContext("2d");
// dimensions
var h = canvas.height;
    w = canvas.width;
// colours and lines
ctx.strokeStyle = COLOR_CUBE;
ctx.lineWidth = w / 250;
cx = cy = cz = 150; // cube parameters (center)
size = h / 20;
vertices = [
    new POINT3D(cx - size, cy - size, cz - size),
    new POINT3D(cx + size, cy - size, cz - size),
    new POINT3D(cx + size, cy + size, cz - size),
    new POINT3D(cx - size, cy + size, cz - size),
    new POINT3D(cx - size, cy - size, cz + size),
    new POINT3D(cx + size, cy - size, cz + size),
    new POINT3D(cx + size, cy + size, cz + size),
    new POINT3D(cx - size, cy + size, cz + size)
];
const duration = 0.01; // every frame in seconds
var edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7] // connecting sides
];
// set up the animation loop
var timeDelta, timeLast = 0;
requestAnimationFrame(loop);

let keyPresses = {};

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

gameLoop();

function gameLoop() {
  if (keyPresses.w)
    moveCharacter(0, -MOVEMENT_VELOCITY);
  if (keyPresses.s)
    moveCharacter(0, MOVEMENT_VELOCITY);
  if (keyPresses.a)
    moveCharacter( -MOVEMENT_VELOCITY, 0);
  if (keyPresses.d)
    moveCharacter( MOVEMENT_VELOCITY, 0);
  window.requestAnimationFrame(gameLoop);
}

function moveCharacter(deltaX, deltaY, deltaZ = 0) {
    cx += deltaX;
    cy += deltaY;
    cz += deltaZ;
  for (let v of vertices) {
        v.x += deltaX;
        v.y += deltaY;
        v.z += deltaZ;
   }
}

function loop(timeNow) {
    timeDelta = timeNow - timeLast; // the time difference
    timeLast = timeNow;

    ctx.fillRect(0, 0, w, h); // BG
    
    let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
        for (let v of vertices) { // rotate along the z
            let dx = v.x - cx;
            let dy = v.y - cy;
            let x = dx * Math.cos(angle) - dy * Math.sin(angle);
            let y = dx * Math.sin(angle) + dy * Math.cos(angle);
            v.x = x + cx;
            v.y = y + cy;
        }
    angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
        for (let v of vertices) { // rotate along the x
            let dy = v.y - cy;
            let dz = v.z - cz;
            let y = dy * Math.cos(angle) - dz * Math.sin(angle);
            let z = dy * Math.sin(angle) + dz * Math.cos(angle);
            v.y = y + cy;
            v.z = z + cz;
        }
    angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
        for (let v of vertices) { // rotate along the y
            let dx = v.x - cx;
            let dz = v.z - cz;
            let x = dz * Math.sin(angle) + dx * Math.cos(angle);
            let z = dz * Math.cos(angle) - dx * Math.sin(angle);
            v.x = x + cx;
            v.z = z + cz;
        }
    for (let edge of edges) { // draw edges
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }
    
    requestAnimationFrame(loop); // next frame
}    