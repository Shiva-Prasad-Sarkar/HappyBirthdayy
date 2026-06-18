// ─── Read configuration from URL params or BDAY_CONFIG block ───
(function applyConfig() {
    const p   = new URLSearchParams(window.location.search);
    const cfg = window.BDAY_CONFIG || {};

    const to     = p.get('to')     || cfg.to     || 'Friend';
    const from   = p.get('from')   || cfg.from   || 'Someone Special';
    const bday   = p.get('bday')   || cfg.bday   || '05-01';
    const msg    = p.get('msg')    || cfg.msg    || '';
    const link   = p.get('link')   || cfg.link   || '';
    const theme  = p.get('theme')  || cfg.theme  || 'purple';
    const gender = p.get('gender') || cfg.gender || 'female';
    const rel    = p.get('rel')    || cfg.rel    || 'friend';
    const age    = p.get('age')    || cfg.age    || '';
    const photo  = p.get('photo')  || cfg.photo  || '';
    const music  = p.get('music')  || cfg.music  || '';

    // Apply theme
    if (theme !== 'purple') document.documentElement.setAttribute('data-theme', theme);
    // Apply gender to body for CSS overrides (always — only male/female supported)
    document.body.setAttribute('data-gender', gender === 'male' ? 'male' : 'female');

    // Parse birthday MM-DD
    const [bdMonth, bdDay] = bday.split('-').map(Number);
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), bdMonth - 1, bdDay);
    if (now > targetDate) targetDate = new Date(now.getFullYear() + 1, bdMonth - 1, bdDay);

    document.title = `🎂 Happy Birthday, ${to}!`;
    window._BD = { to, from, msg, link, theme, gender, rel, age: parseInt(age)||0, photo, music, targetDate, bdMonth, bdDay };
})();

// ─── Main ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const { to, from, msg, link, gender, rel, age, photo, music, targetDate, bdMonth, bdDay } = window._BD;
    const now = new Date();

    // ── Gender-based settings ─────────────────────────────────
    const genderData = {
        female: {
            walker:       '👸',
            flowers:      ['🌸','🌺','🌹','💐'],
            cannonEmojis: ['🌸','🌺','🌹','🌷','💖','💐','👑','✨','💅','🎀'],
            hearts:       ['💕','💖','💗','💝','🌸','💞'],
            sparkles:     ['✨','💫','🌟','💖','🌸'],
            loadingTxt:   `A queen's celebration is loading... 👑`,
            candleTxt:    `${to}, shine bright like the queen you are! 👑✨`,
            cakeTxt:      `Happy Birthday, princess ${to}! The world is yours! 🌸💖`
        },
        male: {
            walker:       '🤴',
            flowers:      ['⭐','🌟','💫','✨'],
            cannonEmojis: ['⭐','🏆','🎮','🎸','🔥','💪','🎉','🚀','🌟','🎊'],
            hearts:       ['⭐','🌟','💫','✨','🔥','🚀'],
            sparkles:     ['⭐','💫','🌟','✨','🎯'],
            loadingTxt:   `Celebrating a legend... 🏆`,
            candleTxt:    `${to}, keep shining — you're a legend! 🔥🏆`,
            cakeTxt:      `Happy Birthday, ${to}! The world needs more people like you! 🏆🎉`
        },
    };
    const gd = genderData[gender] || genderData.female;

    // ── Relationship-based messages ───────────────────────────
    const relData = {
        mom:     { label:'Mom',        icon:'👩' },
        dad:     { label:'Dad',        icon:'👨' },
        gf:      { label:'Girlfriend', icon:'💕' },
        bf:      { label:'Boyfriend',  icon:'💙' },
        friend:  { label:'Best Friend',icon:'🤝' },
        brother: { label:'Brother',    icon:'👦' },
        sister:  { label:'Sister',     icon:'👧' },
        teacher: { label:'Teacher',    icon:'📚' },
        other:   { label:'Friend',     icon:'🎉' },
    };
    const rd = relData[rel] || relData.other;

    // ── Apply dynamic text ────────────────────────────────────
    document.getElementById('main-title').textContent   = `🎉 Happy Birthday, ${to}! 🎉`;
    document.getElementById('loading-text').textContent = gd.loadingTxt;
    document.getElementById('candle-text').textContent  = gd.candleTxt;
    document.getElementById('cake-modal-message').textContent = gd.cakeTxt;
    document.getElementById('cake-prompt').textContent  = `${to}, please cut the cake! 🎂`;

    // ── Flower emojis (gender-based) ──────────────────────────
    gd.flowers.forEach((emoji, i) => {
        const el = document.getElementById('flower-' + (i + 1));
        if (el) el.textContent = emoji;
    });

    // ── Age badge ─────────────────────────────────────────────
    if (age > 0) {
        const badge = document.getElementById('age-badge');
        badge.textContent = `🎂 Turning ${age} today!`;
        badge.style.display = 'inline-block';
    }

    // ── Photo ─────────────────────────────────────────────────
    if (photo) {
        const img = document.getElementById('birthday-photo');
        img.src = photo;
        img.onerror = () => { document.getElementById('photo-section').style.display = 'none'; };
        document.getElementById('photo-caption').textContent = `Happy Birthday, ${to}! 🎂`;
        document.getElementById('photo-section').style.display = '';
    }

    // ── Music ─────────────────────────────────────────────────
    if (music) {
        document.getElementById('music-src').src = music;
        document.getElementById('bg-music').load();
        document.getElementById('music-section').style.display = '';
    }

    // ── Surprise link (only shown when a link is provided) ───
    const scratchSection = document.querySelector('.scratch-card-section');
    if (!link) {
        if (scratchSection) scratchSection.style.display = 'none';
    } else {
        const linkEl = document.getElementById('surprise-link');
        linkEl.href   = link;
        linkEl.target = '_blank';
        linkEl.rel    = 'noopener noreferrer';
        linkEl.textContent = '🎁 Tap here to open your surprise!';
    }

    // ── Personal message — letter ─────────────────────────────
    if (msg) {
        document.getElementById('personal-msg-text').textContent = msg;
        document.getElementById('msg-from').textContent = `— ${from}`;
        document.getElementById('personal-msg-section').style.display = 'block';
    }

    // ── Name Hero (balloon letters + title ribbon) ────────────
    const balloonColors = [
        'linear-gradient(135deg,#f093fb,#f5576c)',
        'linear-gradient(135deg,#4facfe,#00f2fe)',
        'linear-gradient(135deg,#43e97b,#38f9d7)',
        'linear-gradient(135deg,#f6d365,#fda085)',
        'linear-gradient(135deg,#a18cd1,#fbc2eb)',
        'linear-gradient(135deg,#ff9a9e,#fecfef)',
        'linear-gradient(135deg,#fbc2eb,#a6c1ee)',
        'linear-gradient(135deg,#ffd89b,#19547b)',
    ];
    const balloonEl = document.getElementById('balloon-name');
    if (balloonEl) {
        let ci = 0;
        to.split('').forEach((ch, i) => {
            if (ch === ' ') {
                const sp = document.createElement('div');
                sp.style.cssText = 'width:clamp(10px,2.5vw,18px);flex-shrink:0';
                balloonEl.appendChild(sp);
                return;
            }
            const bl = document.createElement('div');
            bl.classList.add('bl');
            bl.textContent = ch;
            bl.style.background = balloonColors[ci % balloonColors.length];
            bl.style.setProperty('--d', `${i * 0.18}s`);
            balloonEl.appendChild(bl);
            ci++;
        });
    }
    const heroTitles = {
        friend:  { female:'The Radiant',     male:'The Legendary'    },
        mom:     { female:'The Wonderful',   male:'The Wonderful'    },
        dad:     { female:'The Magnificent', male:'The Mighty'       },
        gf:      { female:'The Enchanting',  male:'The Enchanting'   },
        bf:      { female:'The Incredible',  male:'The Incredible'   },
        brother: { female:'The Unstoppable', male:'The Unstoppable'  },
        sister:  { female:'The Brilliant',   male:'The Brilliant'    },
        teacher: { female:'The Inspiring',   male:'The Inspiring'    },
        other:   { female:'The Wonderful',   male:'The Wonderful'    },
    };
    const gKey = gender === 'male' ? 'male' : 'female';
    const titlePrefix = (heroTitles[rel] || heroTitles.other)[gKey];
    const ribbonEl = document.getElementById('hero-title-ribbon');
    if (ribbonEl) ribbonEl.textContent = `✨ ${titlePrefix} ${to} ✨`;
    const relTagEl = document.getElementById('hero-rel-tag');
    if (relTagEl) relTagEl.textContent = `${rd.icon}  ${rd.label}`;

    // ── Confetti ──────────────────────────────────────────────
    function createConfetti() {
        const colors = ['#fce18a','#ff726d','#b48def','#f4306d','#ffd700','#00ff00','#00ffff','#ff9a9e'];
        for (let i = 0; i < 50; i++) {
            const el = document.createElement('div');
            el.classList.add('confetti');
            el.style.left = Math.random() * 100 + 'vw';
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 5;
            el.style.width  = size + 'px';
            el.style.height = size + 'px';
            el.style.borderRadius   = Math.random() > 0.5 ? '50%' : '0';
            const dur = Math.random() * 3 + 2;
            el.style.animationDuration = dur + 's';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), dur * 1000);
        }
    }
    createConfetti();
    setInterval(createConfetti, 2000);

    // ── Daily quotes (relationship-aware) ────────────────────
    const relQuotes = {
        mom: [
            { quote:"A mother's love is the fuel that enables a normal human being to do the impossible.", wish:"— You are that fuel. Happy Birthday, Mom! 💖" },
            { quote:"The best place in the world is in the arms of someone who will hold you when you need it most.", wish:"— Thank you for always being there. 🌹" },
            { quote:"A mother is she who can take the place of all others, but whose place no one else can take.", wish:"— Irreplaceable, today and always. 🌸" }
        ],
        dad: [
            { quote:"A father is neither an anchor to hold us back, nor a sail to take us there, but a guiding light.", wish:"— Thank you for guiding us. Happy Birthday! 🌟" },
            { quote:"Any man can be a father, but it takes someone special to be a dad.", wish:"— You are that someone special. 🏆" },
            { quote:"A father's love is eternal — it never fades and never fails.", wish:"— We feel it every day. 💙" }
        ],
        gf: [
            { quote:"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", wish:"— You are my world. Happy Birthday! 💕" },
            { quote:"You are my today and all of my tomorrows.", wish:"— Forever and always. 🌹" },
            { quote:"Every love story is beautiful, but ours is my favorite.", wish:"— Happy Birthday, my love! 💖" }
        ],
        bf: [
            { quote:"A real man doesn't love a million girls — he loves one girl in a million ways.", wish:"— You are loved beyond measure. ⭐" },
            { quote:"The best thing in my life walked through my door the day you came in.", wish:"— Happy Birthday to my favorite person! 💙" },
            { quote:"You are my best friend, my human diary, and my other half.", wish:"— Cheers to you today! 🌟" }
        ],
        friend: [
            { quote:"A good friend knows all your best stories. A best friend has lived them with you.", wish:"— Here's to more adventures! 🎊" },
            { quote:"Friendship isn't about being inseparable — it's about being separated and knowing nothing will change.", wish:"— You are my forever friend! 💖" },
            { quote:"Good friends are like stars. You don't always see them, but you know they're always there.", wish:"— You shine the brightest! ✨" }
        ],
        brother: [
            { quote:"Brothers are what best friends can never be.", wish:"— Happy Birthday, bro! 💪" },
            { quote:"A brother is a friend given by nature.", wish:"— Glad nature gave me you! 🌟" },
            { quote:"There's no buddy like a brother.", wish:"— Cheers to you today! 🏆" }
        ],
        sister: [
            { quote:"A sister is someone who loves you from the heart — no matter how much you argue, you cannot be drawn apart.", wish:"— Happy Birthday, sis! 💖" },
            { quote:"Sisters are different flowers from the same garden.", wish:"— You are the most beautiful! 🌸" },
            { quote:"A sister is a little bit of childhood that can never be lost.", wish:"— Thank you for being mine! 🌺" }
        ],
        teacher: [
            { quote:"The influence of a great teacher can never be erased.", wish:"— Thank you for the impact you've made! 🌟" },
            { quote:"Teaching is the one profession that creates all other professions.", wish:"— Happy Birthday to an incredible educator! 📚" },
            { quote:"A teacher takes a hand, opens a mind, and touches a heart.", wish:"— You've touched so many hearts. 💖" }
        ],
        other: [
            { quote:"A friend is someone who knows all about you and still loves you.", wish:"— Have a wonderful day! 💖" },
            { quote:"You bring so much light into the world.", wish:"— Shine bright today! ✨" },
            { quote:"Every day is an opportunity to create something beautiful.", wish:"— Make today another beautiful memory. 🌸" }
        ]
    };
    const qList = relQuotes[rel] || relQuotes.other;
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear   = Math.floor((today - startOfYear) / 86400000);
    const q = qList[dayOfYear % qList.length];
    document.getElementById('daily-quote').textContent = q.quote;
    document.getElementById('daily-wish').textContent  = q.wish;

    // ── Scratch card ──────────────────────────────────────────
    const canvas = document.getElementById('scratch-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = 300 * dpr; canvas.height = 150 * dpr;
        ctx.scale(dpr, dpr);
        const g = ctx.createLinearGradient(0,0,300,150);
        g.addColorStop(0,'#757575'); g.addColorStop(.5,'#9e9e9e'); g.addColorStop(1,'#424242');
        ctx.fillStyle = g; ctx.fillRect(0,0,300,150);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 18px Poppins';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('✨ Scratch Here! ✨', 150, 75);
        let drawing = false;
        function getPos(e) {
            const r = canvas.getBoundingClientRect();
            return {
                x: ((e.clientX || e.touches[0].clientX) - r.left) / (r.right - r.left) * 300,
                y: ((e.clientY || e.touches[0].clientY) - r.top)  / (r.bottom - r.top) * 150
            };
        }
        function erase(x,y) { ctx.globalCompositeOperation='destination-out'; ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill(); }
        function check() {
            const px = ctx.getImageData(0,0,canvas.width,canvas.height).data;
            let t = 0; for (let i=3;i<px.length;i+=4) if(px[i]===0) t++;
            if (t/(px.length/4) > 0.35) { canvas.style.transition='opacity .6s'; canvas.style.opacity='0'; canvas.style.pointerEvents='none'; }
        }
        canvas.addEventListener('mousedown',  e=>{drawing=true; erase(...Object.values(getPos(e)));});
        canvas.addEventListener('mousemove',  e=>{if(drawing) erase(...Object.values(getPos(e)));});
        canvas.addEventListener('mouseup',    ()=>{drawing=false;check();});
        canvas.addEventListener('mouseleave', ()=>{drawing=false;check();});
        canvas.addEventListener('touchstart', e=>{drawing=true; erase(...Object.values(getPos(e))); e.preventDefault();},{passive:false});
        canvas.addEventListener('touchmove',  e=>{if(drawing) erase(...Object.values(getPos(e))); e.preventDefault();},{passive:false});
        canvas.addEventListener('touchend',   ()=>{drawing=false;check();});
    }

    // ── Falling petals/pearls ─────────────────────────────────
    const fallingContainer = document.getElementById('falling-elements');
    setInterval(()=>{
        const el   = document.createElement('div');
        const type = Math.random() > 0.5 ? 'petal' : 'pearl';
        el.classList.add(type);
        el.style.left = Math.random() * 100 + 'vw';
        const dur  = Math.random() * 6 + 4;
        el.style.animationDuration = dur + 's';
        const size = Math.random() * 15 + 10;
        el.style.width  = (type==='petal' ? size : size*.6)+'px';
        el.style.height = el.style.width;
        fallingContainer.appendChild(el);
        setTimeout(()=>el.remove(), dur*1000);
    }, 300);

    // ── Floating hearts (gender-based) ───────────────────────
    setInterval(()=>{
        const h = document.createElement('div');
        h.classList.add('bg-heart');
        h.textContent = gd.hearts[Math.floor(Math.random()*gd.hearts.length)];
        h.style.left              = Math.random()*100+'vw';
        h.style.animationDelay    = Math.random()*3+'s';
        h.style.animationDuration = (Math.random()*10+10)+'s';
        document.body.appendChild(h);
        setTimeout(()=>h.remove(), 20000);
    }, 2500);

    // ── Mouse sparkle trail (gender-based) ───────────────────
    document.addEventListener('mousemove', e=>{
        if (Math.random() > 0.25) return;
        const s = document.createElement('div');
        s.classList.add('mouse-sparkle');
        s.textContent = gd.sparkles[Math.floor(Math.random()*gd.sparkles.length)];
        s.style.left  = e.clientX+'px';
        s.style.top   = e.clientY+'px';
        document.body.appendChild(s);
        setTimeout(()=>s.remove(), 1000);
    });

    // ── Cannons (gender-based emojis) ────────────────────────
    const particleContainer = document.getElementById('cannon-particles');
    function shootParticle(side) {
        const p = document.createElement('div');
        p.textContent = gd.cannonEmojis[Math.floor(Math.random()*gd.cannonEmojis.length)];
        p.classList.add('cannon-particle');
        if (side==='left') { p.style.left='60px'; p.style.bottom='80px'; }
        else               { p.style.right='60px'; p.style.bottom='80px'; }
        const h = side==='left' ? (Math.random()*40+20) : -(Math.random()*40+20);
        const v = -(Math.random()*50+50);
        p.style.setProperty('--tx',  `${h}vw`);
        p.style.setProperty('--ty',  `${v}vh`);
        p.style.setProperty('--rot', `${Math.random()*360+360}deg`);
        p.style.fontSize = (Math.random()*1.5+1)+'rem';
        particleContainer.appendChild(p);
        setTimeout(()=>p.remove(), 3000);
    }
    function burst(side, n=20) { for(let i=0;i<n;i++) setTimeout(()=>shootParticle(side),i*50); }

    document.getElementById('cannon-left') .addEventListener('click',()=>burst('left'));
    document.getElementById('cannon-right').addEventListener('click',()=>burst('right'));

    // ── Auto-fire cannons continuously ────────────────────────
    function autoCannons() {
        burst('left', 18);
        setTimeout(() => burst('right', 18), 1200);
    }
    autoCannons();
    setInterval(autoCannons, 4000);
    document.getElementById('interactive-cake-btn').addEventListener('click',()=>{
        for(let i=0;i<50;i++) setTimeout(()=>shootParticle(Math.random()>.5?'left':'right'),i*30);
        document.querySelector('.pulse-text').textContent = `YAY! Happy Birthday, ${to}! 🎉${gd.flowers[0]}`;
    });

    // ── Cake modal (show on birthday) ────────────────────────
    document.getElementById('close-cake').addEventListener('click',()=>document.getElementById('cake-modal').classList.add('hidden'));
    const isBirthday = now.getMonth() === (bdMonth - 1) && now.getDate() === bdDay;
    if (isBirthday) setTimeout(()=>document.getElementById('cake-modal').classList.remove('hidden'), 3500);

    // ── Loading screen ────────────────────────────────────────
    setTimeout(()=>{
        const ls = document.getElementById('loading-screen');
        if (ls) { ls.style.opacity='0'; setTimeout(()=>ls.style.display='none',1000); }
    }, 2500);
});
