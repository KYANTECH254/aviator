let multiplier = 1;
let maxMultiplier = 1;

function AnimateCanvasBackGround(speed) {
    const canvas = document.getElementById('aviatorCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const totalBeams = 72;
    const beamLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
    let rotationAngle = 0;

    function drawRotatingBeams() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let angleStep = (2 * Math.PI) / totalBeams;
        let isDark = true;

        for (let i = 0; i < totalBeams; i++) {
            ctx.beginPath();

            let startAngle = rotationAngle + i * angleStep;
            let endAngle = startAngle + angleStep;

            ctx.moveTo(0, canvas.height);

            ctx.lineTo(
                Math.cos(startAngle) * beamLength,
                canvas.height + Math.sin(startAngle) * beamLength
            );
            ctx.lineTo(
                Math.cos(endAngle) * beamLength,
                canvas.height + Math.sin(endAngle) * beamLength
            );
            ctx.lineTo(0, canvas.height);

            ctx.fillStyle = isDark ? '#000000' : '#0c0c0c';
            isDark = !isDark;

            ctx.fill();
            ctx.closePath();
        }

        rotationAngle += speed;
        if (rotationAngle >= 2 * Math.PI) {
            rotationAngle = 0;
        }

        requestAnimationFrame(drawRotatingBeams);
    }

    drawRotatingBeams();
}

function AnimateLeftAndBottomCanvasBorder(animate) {
    if (animate === true) {
        const canvas = document.getElementById('aviatorCanvas');
        const ctx = canvas.getContext('2d');

        let dotPositionY = 0;
        const dotSpacingY = 20;
        const borderOffset = 30;
        const dotSpeed = 0.5;
        const disappearOffsetY = 30;

        let whiteDotPositions = [];
        const dotSpacingX = 100;
        const xAxisOffset = 30;
        const initialDotPositionX = canvas.width;

        function initWhiteDots() {
            for (let i = 0; i < canvas.width / dotSpacingX + 1; i++) {
                whiteDotPositions.push(initialDotPositionX - i * dotSpacingX);
            }
        }

        function drawBorders() {
            ctx.beginPath();
            ctx.moveTo(borderOffset, 0);
            ctx.lineTo(borderOffset, canvas.height - borderOffset);
            ctx.strokeStyle = '#cdcdcd';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(borderOffset, canvas.height - borderOffset + 1);
            ctx.lineTo(canvas.width, canvas.height - borderOffset - 1);
            ctx.strokeStyle = '#cdcdcd';
            ctx.lineWidth = 1;
            ctx.stroke();
        }


        function drawDotsY() {
            for (let i = dotPositionY; i < canvas.height - disappearOffsetY; i += dotSpacingY) {
                ctx.beginPath();
                ctx.arc(borderOffset - 15, i, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgb(8, 180, 228)';
                ctx.fill();
                ctx.closePath();
            }

            dotPositionY += dotSpeed;

            if (dotPositionY >= dotSpacingY) {
                dotPositionY = 0;
            }
        }

        function drawDotsX() {
            for (let i = 0; i < whiteDotPositions.length; i++) {
                let posX = whiteDotPositions[i];

                if (posX > xAxisOffset) {
                    ctx.beginPath();
                    ctx.arc(posX, canvas.height - borderOffset + 15, 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.closePath();
                }

                whiteDotPositions[i] -= dotSpeed;

                if (whiteDotPositions[i] <= xAxisOffset) {
                    let maxPosX = Math.max(...whiteDotPositions);
                    whiteDotPositions[i] = maxPosX + dotSpacingX;
                }
            }
        }

        function animate() {
            drawBorders();
            drawDotsY();
            drawDotsX();
            requestAnimationFrame(animate);
        }

        initWhiteDots();
        animate();
    }
}

function AnimateWaitingForBets() {
    AnimateCanvasBackGround(0.0);

    const canvas = document.getElementById('aviatorCanvas');
    const ctx = canvas.getContext('2d');

    let progressWidth = 150;
    const fullWidth = 150;
    const duration = 5000;
    const startTime = performance.now();
    const loaderHeight = 7;
    const loaderYPosition = 185;
    const backgroundColor = '#21232a';

    function drawRoundedRect(x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    function drawLoader() {
        ctx.font = '25px Poppins';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('WAITING FOR NEXT ROUND', canvas.width / 2, 160);

        ctx.fillStyle = backgroundColor;
        drawRoundedRect((canvas.width - fullWidth) / 2, loaderYPosition, fullWidth, loaderHeight, 5);
        ctx.fill();

        ctx.fillStyle = '#c80432';
        drawRoundedRect((canvas.width - fullWidth) / 2, loaderYPosition, progressWidth, loaderHeight, 5);
        ctx.fill();
    }

    function animateLoader(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.max(0, fullWidth - (fullWidth * (elapsed / duration)));

        progressWidth = progress;

        drawLoader();

        if (elapsed < duration) {
            requestAnimationFrame(animateLoader);
        } else {
            hideloader()
            setTimeout(hideplane, 3000)
            progressWidth = fullWidth;
        }
    }

    function showplane() {
        const plane = document.querySelector("#aviator-static-plane")
        if (plane) {
            plane.style.display = 'flex'
        }
    }
    function showloader() {
        const loader = document.querySelector("#aviator-static-loader")
        if (loader) {
            loader.style.display = 'flex'
        }
    }
    function hideplane() {
        const plane = document.querySelector("#aviator-static-plane")
        if (plane) {
            plane.style.display = 'none'
        }
    }
    function hideloader() {
        const loader = document.querySelector("#aviator-static-loader")
        if (loader) {
            loader.style.display = 'none'
        }
    }

    showloader()
    showplane()
    animateLoader(performance.now());

}

function AnimateFlewAwayText(maxMultiplier) {
    AnimateCanvasBackGround(0.0);

    const canvas = document.getElementById('aviatorCanvas');
    const ctx = canvas.getContext('2d');

    const displayTime = 5000;
    let startTime = null;

    const text = `${maxMultiplier}x`;

    function drawText(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const fontSizeSmall = Math.max(20, canvas.width * 0.03);
        ctx.font = `${fontSizeSmall}px Poppins`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('FLEW AWAY!', canvas.width / 2, 60);

        const fontSizeLarge = Math.max(50, canvas.width * 0.08);
        ctx.font = `900 ${fontSizeLarge}px Poppins`;
        ctx.fillStyle = '#d0021b';
        ctx.fillText(text, canvas.width / 2, 140);

        if (elapsed < displayTime) {
            requestAnimationFrame(drawText);
        }
    }

    requestAnimationFrame(drawText);
}

function AnimateFlyingPlaneBackground(size) {
    function drawSmall() {
        const loader = document.querySelector("#aviator-static-blue")
        if (loader) {
            loader.style.display = 'flex';
        }
    }
    function drawMedium() {
        const loader = document.querySelector("#aviator-static-purple")
        if (loader) {
            loader.style.display = 'flex';
        }
    }
    function drawLarge() {
        const loader = document.querySelector("#aviator-static-pink")
        if (loader) {
            loader.style.display = 'flex';
        }
    }

    switch (size) {
        case 'small':
            drawSmall();
            break;
        case 'medium':
            drawMedium();
            break;
        case 'large':
            drawLarge();
            break;
        default:
            console.error('Invalid size parameter. Use "small", "medium", or "large".');
            return;
    }

}

function toggleAnimation() {
    const animationToggle = document.getElementById('toggle3');
    if (!animationToggle) return;
    if (localStorage.getItem('animationPlaying') === null) {
        localStorage.setItem('animationPlaying', true);
        animationToggle.checked = true;
    }

    const isAnimating = JSON.parse(localStorage.getItem('animationPlaying'));
    animationToggle.checked = isAnimating;
    if (isAnimating) {
        AnimateCanvasBackGround(0.003)
        AnimateLeftAndBottomCanvasBorder(true);
    } else {
        AnimateLeftAndBottomCanvasBorder(false);
        AnimateCanvasBackGround(0.0)
    }

    animationToggle.addEventListener('change', () => {
        if (animationToggle.checked) {
            AnimateCanvasBackGround(0.003)
            AnimateLeftAndBottomCanvasBorder(true);
            localStorage.setItem('animationPlaying', true);
        } else {
            AnimateCanvasBackGround(0.0)
            AnimateLeftAndBottomCanvasBorder(false);
            localStorage.setItem('animationPlaying', false);
        }
    });
}

function animateFlyingPlane() {
    const canvas = document.getElementById('aviatorCanvas');
    const ctx = canvas.getContext('2d');
    const plane = document.getElementById('plane');
    const trailPath = document.getElementById('trailPath');
    const fillPath = document.getElementById('fillPath');

    let planeX = 35;
    let planeY = 35;

    // Path for the trail and fill
    let trailD = `M ${planeX} ${window.innerHeight - planeY + 35}`; // Starting point for trail
    let fillD = `M ${planeX} ${window.innerHeight - planeY + 35}`;  // Starting point for fill

    const canvasHeight = window.innerHeight;
    const targetLiftStartX = canvas.width * 0.2;
    const targetX = canvas.width * 0.75;
    const targetHeight = 160;
    let isFloating = false;

    let lastTime = null;
    let pauseTime = 500;
    let planeTargetBottom = targetHeight;
    let descentTarget = planeTargetBottom - 130;
    let isDescending = false;
    let waitingAtTop = false;
    let goingUp = false;

    function getExponentialY(x) {
        const normalizedX = (x - targetLiftStartX) / (targetX - targetLiftStartX);
        return 35 + Math.pow(normalizedX, 2) * (targetHeight - 35); // Exponential-like growth
    }

    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;

        // Move the plane to the right until it reaches the target X position
        if (planeX < targetX) {
            planeX += 1;

            if (planeX < targetLiftStartX) {
                planeY = 35; // Stay flat until lift-off point
            } else if (planeX >= targetLiftStartX && planeX <= targetX) {
                planeY = getExponentialY(planeX); // Ascending curve
            }

            plane.style.left = planeX + 'px';
            plane.style.bottom = planeY + 'px';

            // Update the trail path for ascent
            trailD += ` L ${planeX} ${canvasHeight - planeY + 35}`; // Draw line from previous to new point
            if (planeY > 35) {
                fillD += ` L ${planeX} ${canvasHeight - planeY + 35}`; // Add point to fill path only when above 35px
            }
        } else if (!isFloating) {
            planeY = planeTargetBottom; // Keep plane at the target height
            plane.style.bottom = planeY + 'px';

            if (timestamp - lastTime >= pauseTime) {
                isFloating = true;
                waitingAtTop = true;
                lastTime = timestamp;
            }
        }

        // Floating behavior: handle waiting, lowering, and returning
        if (isFloating) {
            if (waitingAtTop) {
                if (timestamp - lastTime >= pauseTime) {
                    waitingAtTop = false;
                    isDescending = true;
                }
            } else if (isDescending) {
                // During descent, keep the trail flat (horizontal)
                if (planeY > 35) {
                    planeY -= 0.5; // Move the plane down
                    plane.style.bottom = planeY + 'px';

                    // Keep the trail flat at the height of 35
                    trailD += ` L ${planeX} ${canvasHeight - planeTargetBottom + 35}`; // Extend the line horizontally at the constant height
                    fillD += ` L ${planeX} ${canvasHeight - planeTargetBottom + 35}`;  // Keep the fill path flat too
                } else {
                    isDescending = false;
                    goingUp = true;
                }
            } else if (goingUp) {
                // During ascent, keep the trail flat as well at the lower height (35)
                if (planeY < planeTargetBottom) {
                    planeY += 0.5; // Move the plane up
                    plane.style.bottom = planeY + 'px';

                    // Keep the trail flat during ascent to the height of 35
                    trailD += ` L ${planeX} ${canvasHeight - planeTargetBottom + 35}`; // Extend the line horizontally at the constant height
                    fillD += ` L ${planeX} ${canvasHeight - planeTargetBottom + 35}`; // Keep the fill path flat too

                    // Optionally, you can also add a slight upward movement before returning to the curvy path if desired
                } else {
                    goingUp = false;
                    waitingAtTop = true;
                    lastTime = timestamp;
                }
            }
        }

        // Update the paths' data
        trailPath.setAttribute('d', trailD);
        fillPath.setAttribute('d', fillD + ` L ${planeX} ${canvasHeight} L 35 ${canvasHeight} Z`); // Fill the area under the curve

        requestAnimationFrame(animate);
    }

    animate();
}

function animateMultiplier() {
    const multiplierElement = document.getElementById('multiplier');

    // Determine the speed based on the current multiplier value
    let multiplierSpeed = 0;

    if (multiplier < 2) {
        multiplierSpeed = 0.001; // Very low speed
        AnimateFlyingPlaneBackground('small');
    } else if (multiplier < 10) {
        AnimateFlyingPlaneBackground('medium');
        multiplierSpeed = 0.0015; // Low speed
    } else if (multiplier < 20) {
        AnimateFlyingPlaneBackground('large');
        multiplierSpeed = 0.002; // Moderate speed
    } else if (multiplier < 50) {
        AnimateFlyingPlaneBackground('large');
        multiplierSpeed = 0.003; // Fast speed
    } else if (multiplier < 100) {
        AnimateFlyingPlaneBackground('large');
        multiplierSpeed = 0.005; // Even faster
    } else {
        AnimateFlyingPlaneBackground('large');
        multiplierSpeed = 1; // Maximum speed
    }

    // Increment the multiplier based on the calculated speed
    multiplier += multiplierSpeed;

    // Update multiplier text
    multiplierElement.innerText = multiplier.toFixed(2) + "x";

    if (multiplier >= maxMultiplier) {
        AnimateFlewAwayText(maxMultiplier)
    }

    // Continue the animation
    requestAnimationFrame(animateMultiplier);
}

function serverData() {
    // Assuming you're using a script in your HTML file
    const socket = new WebSocket('ws://localhost:3000');

    // When the socket connection is opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WebSocket server');

    });

    // When a message is received from the server
    socket.addEventListener('message', function (event) {
        const response = JSON.parse(event.data);

        if (response.type === 'multiplier_update') {
            multiplier = response.data.multiplier;
            console.log('Multiplier:', response.data);
        } else if (response.type === 'maxmultiplier_update') {
            maxMultiplier = response.data.maxmultiplier;
            console.log('Max Multiplier:', response.data);
        }
    });

}


animateMultiplier();
animateFlyingPlane();
animateMultiplier();
// AnimateWaitingForBets(0.0);
AnimateCanvasBackGround(0.003);
// AnimateFlewAwayText("2.1");
// AnimateFlyingPlaneBackground('small');
toggleAnimation();
document.addEventListener("DOMContentLoaded", function () {
    serverData();
})