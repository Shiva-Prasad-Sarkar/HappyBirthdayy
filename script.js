document.addEventListener('DOMContentLoaded', () => {
    // Set the target date to May 1st
    const now = new Date();
    let targetYear = now.getFullYear();
    let targetDate = new Date(targetYear, 4, 1); // Month is 0-indexed, so 4 is May

    // If today is past May 1st of the current year, set the target to next year's May 1st
    if (now.getTime() > targetDate.getTime() && now.getDate() !== 1) {
        targetYear++;
        targetDate = new Date(targetYear, 4, 1);
    } else if (now.getMonth() === 4 && now.getDate() === 1) {
        // Today is the birthday!
        targetDate = now;
    }

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');
    const greetingEl = document.getElementById('greeting');
    const titleEl = document.querySelector('.title');
    let confettiInterval;

    function updateDivs(days, hours, minutes, seconds) {
        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    function updateCountdown() {
        const currentTime = new Date().getTime();
        const difference = targetDate.getTime() - currentTime;

        // If the date is today (May 1st)
        const currentNow = new Date();
        if (currentNow.getMonth() === 4 && currentNow.getDate() === 1) {
            countdownEl.classList.add('hidden');
            titleEl.classList.add('hidden');
            greetingEl.classList.remove('hidden');
            
            if (!confettiInterval) {
                createConfetti();
                confettiInterval = setInterval(createConfetti, 2000);
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        updateDivs(days, hours, minutes, seconds);
    }

    function updateTimeline() {
        const girl = document.getElementById('timeline-girl');
        const progress = document.getElementById('timeline-progress');
        const startDate = new Date(targetDate.getFullYear(), 3, 1); // April 1st of the target year
        const totalDuration = targetDate.getTime() - startDate.getTime();
        const currentTime = new Date().getTime() - startDate.getTime();

        let percentage = (currentTime / totalDuration) * 100;
        
        // Clamp percentage between 0 and 100
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        // Apply smooth transition CSS
        setTimeout(() => {
            girl.style.left = `${percentage}%`;
            progress.style.width = `${percentage}%`;
        }, 500);

        const timelineMessage = document.getElementById('timeline-message');
        if (percentage >= 100) {
            girl.style.animation = 'none'; // Stop walking animation
            timelineMessage.innerText = "You made it! Happy Birthday! 🎉";
        } else if (percentage > 80) {
            timelineMessage.innerText = "Almost there, getting so close! 🏃‍♀️✨";
        } else if (percentage > 50) {
            timelineMessage.innerText = "Halfway to the best day of the year! 🌸";
        } else {
            timelineMessage.innerText = "Walking towards your special day... 👧🏻";
        }
    }

    function createConfetti() {
        const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#ffd700', '#00ff00', '#00ffff'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Randomize size and animation
            const size = Math.random() * 8 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            const duration = Math.random() * 3 + 2;
            confetti.style.animationDuration = duration + 's';
            
            document.body.appendChild(confetti);
            
            // Cleanup confetti after it falls
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }

    // Daily Quotes Setup
    const dailyQuotes = [
        { quote: "A friend is someone who knows all about you and still loves you.", wish: "- Have a bright and wonderful day!" },
        { quote: "Count your age by friends, not years. Count your life by smiles, not tears.", wish: "- Keep smiling today!" },
        { quote: "Every day is an opportunity to create something beautiful.", wish: "- Make today another beautiful memory." },
        { quote: "The secret of staying young is to live honestly, eat slowly, and lie about your age.", wish: "- Sending joy and laughter your way!" },
        { quote: "You are never too old to set another goal or to dream a new dream.", wish: "- May your day be filled with inspiration." },
        { quote: "Life is a journey, and your birthday is a reminder of how far you've come.", wish: "- Have a peaceful and blessed day." },
        { quote: "The more you praise and celebrate your life, the more there is in life to celebrate.", wish: "- Hope your day is as special as you are!" },
        { quote: "Let us never know what old age is. Let us know the happiness time brings.", wish: "- Wishing you moments of pure joy today." },
        { quote: "Today you are you, that is truer than true. There is no one alive who is youer than you.", wish: "- Have an absolutely fantastic day!" },
        { quote: "You bring so much light into the world.", wish: "- Shine bright today!" },
        { quote: "Another day, another chance to sparkle.", wish: "- Have a positively radiant day!" },
        { quote: "There are chapters in your life yet to be written.", wish: "- Wishing you a day full of grand adventures." }
    ];

    function updateDailyQuote() {
        const today = new Date();
        // A simple formula to pick a quote based on the current day of the year
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = (today - start) + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        const index = dayOfYear % dailyQuotes.length;
        
        document.getElementById('daily-quote').innerText = dailyQuotes[index].quote;
        document.getElementById('daily-wish').innerText = dailyQuotes[index].wish;
    }

    // Scratch Card Logic
    function setupScratchCard() {
        const canvas = document.getElementById('scratch-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // Ensure explicit canvas dimensions match CSS dimensions
        const width = 300;
        const height = 150;
        canvas.width = width;
        canvas.height = height;
        
        function fillCanvas() {
            // Fill canvas with a "scratch-off" layer (e.g., metallic gradient)
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#757575');
            gradient.addColorStop(0.5, '#9e9e9e');
            gradient.addColorStop(1, '#424242');
            
            ctx.globalCompositeOperation = 'source-over'; // Default
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Add some instruction text on the canvas layer
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Poppins';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Scratch Here!', width / 2, height / 2);
        }

        fillCanvas();
        
        let isDrawing = false;
        
        function getBrushPos(clientX, clientY) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (clientX - rect.left) / (rect.right - rect.left) * canvas.width,
                y: (clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
            };
        }
        
        function drawDot(mouseX, mouseY) {
            ctx.globalCompositeOperation = 'destination-out'; // This erases
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 20, 0, 2 * Math.PI, false); // 20px blast radius
            ctx.fill();
        }
        
        // Mouse Events
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const pos = getBrushPos(e.clientX, e.clientY);
            drawDot(pos.x, pos.y);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getBrushPos(e.clientX, e.clientY);
            drawDot(pos.x, pos.y);
        });
        
        canvas.addEventListener('mouseup', () => { 
            isDrawing = false; 
            handleScratchEnd();
        });
        canvas.addEventListener('mouseleave', () => { 
            isDrawing = false; 
            handleScratchEnd();
        });
        
        // Touch Events
        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const touch = e.touches[0];
            const pos = getBrushPos(touch.clientX, touch.clientY);
            drawDot(pos.x, pos.y);
            e.preventDefault(); // Prevent scrolling
        }, { passive: false });
        
        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            e.preventDefault(); // Prevent scrolling while scratching
            const touch = e.touches[0];
            const pos = getBrushPos(touch.clientX, touch.clientY);
            drawDot(pos.x, pos.y);
        }, { passive: false });
        
        canvas.addEventListener('touchend', () => { 
            isDrawing = false; 
            handleScratchEnd();
        });

        function handleScratchEnd() {
            if (!ctx) return;
            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;
            let transparent = 0;
            
            // Check alpha channel of every 4th element
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) {
                    transparent++;
                }
            }
            
            const transparentPercentage = (transparent / (pixels.length / 4)) * 100;
            // If scratched more than 35%, fade it out and make link clickable
            if (transparentPercentage > 35) {
                canvas.style.pointerEvents = 'none';
                canvas.style.transition = 'opacity 0.6s ease';
                canvas.style.opacity = '0';
            }
        }
    }

    // Initial calls
    updateCountdown();
    updateTimeline();
    updateDailyQuote();
    setupScratchCard();
    createFallingElements();
    startCannons();
    
    // Update every second
    setInterval(updateCountdown, 1000);

    // Loading Screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }, 3000);

    // Falling Pearls & Petals
    function createFallingElements() {
        const container = document.getElementById('falling-elements');
        if (!container) return;

        const types = ['pearl', 'petal'];
        
        setInterval(() => {
            const el = document.createElement('div');
            const type = types[Math.floor(Math.random() * types.length)];
            el.classList.add(type);
            
            el.style.left = Math.random() * 100 + 'vw';
            const duration = Math.random() * 6 + 4; // 4s to 10s
            el.style.animationDuration = duration + 's';
            
            // Random sizes
            const size = Math.random() * 15 + 10;
            if (type === 'petal') {
                el.style.width = size + 'px';
                el.style.height = size + 'px';
            } else { // pearl
                el.style.width = (size * 0.6) + 'px';
                el.style.height = (size * 0.6) + 'px';
            }

            container.appendChild(el);
            
            setTimeout(() => {
                el.remove();
            }, duration * 1000);
        }, 300); // create a new element every 300ms
    }

    // Bottom Corner Cannons
    function startCannons() {
        const container = document.getElementById('cannon-particles');
        if (!container) return;

        const emojis = ['🌸', '🌺', '🌼', '✨', '🎉', '💖'];

        function shootParticle(side) {
            const particle = document.createElement('div');
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            particle.classList.add('cannon-particle');
            
            // Base positioning (near the cannon muzzles)
            if (side === 'left') {
                particle.style.left = '60px'; // near left cannon barrel
                particle.style.bottom = '80px';
            } else {
                particle.style.right = '60px'; // near right cannon barrel
                particle.style.bottom = '80px';
            }

            // Calculate varied trajectory
            const horizontalForce = side === 'left' ? (Math.random() * 40 + 20) : -(Math.random() * 40 + 20); // 20vw to 60vw inwards
            const verticalForce = -(Math.random() * 50 + 50); // -50vh to -100vh upwards
            const rotation = Math.random() * 360 + 360;

            particle.style.setProperty('--tx', `${horizontalForce}vw`);
            particle.style.setProperty('--ty', `${verticalForce}vh`);
            particle.style.setProperty('--rot', `${rotation}deg`);

            // Random size
            const size = Math.random() * 1.5 + 1; // 1rem to 2.5rem
            particle.style.fontSize = `${size}rem`;

            container.appendChild(particle);

            // Remove particle after animation ends
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }

        // Click on cannon triggers burst and shows cake model
        const leftCannon = document.getElementById('cannon-left');
        const rightCannon = document.getElementById('cannon-right');
        const cakeModal = document.getElementById('cake-modal');
        const closeCake = document.getElementById('close-cake');

        function cannonClick(side) {
            // Burst 20 flowers instantly
            for (let i = 0; i < 20; i++) {
                setTimeout(() => shootParticle(side), i * 50);
            }
            // Show the cake modal after a short delay
            setTimeout(() => {
                cakeModal.classList.remove('hidden');
            }, 500);
        }

        if (leftCannon) {
            leftCannon.addEventListener('click', () => cannonClick('left'));
        }
        if (rightCannon) {
            rightCannon.addEventListener('click', () => cannonClick('right'));
        }

        if (closeCake) {
            closeCake.addEventListener('click', () => {
                cakeModal.classList.add('hidden');
            });
        }
        // Click outside of modal content to close
        window.addEventListener('click', (e) => {
            if (e.target === cakeModal) {
                cakeModal.classList.add('hidden');
            }
        });
    }
});