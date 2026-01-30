const express = require('express');
const app = express();

const landingPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHANTOM SENTINEL | AI CYBERSECURITY</title>
    <style>
        :root {
            --bg: #0a0a0a;
            --fg: #ffffff;
            --accent: #444;
            --dither: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQImWP8//8/AwXg5cuX/zGADEZGRmSBaAGIBf///wcA968SC9U899oAAAAASUVORK5CYII=');
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border-radius: 0 !important;
            font-family: 'Courier New', Courier, monospace;
        }

        body {
            background-color: var(--bg);
            color: var(--fg);
            overflow-x: hidden;
            font-size: 13px;
            line-height: 1.4;
        }

        .dither-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: var(--dither);
            opacity: 0.15;
            pointer-events: none;
            z-index: 100;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            border-bottom: 1px solid var(--accent);
        }

        .logo {
            font-weight: 900;
            letter-spacing: -1px;
            text-transform: uppercase;
            font-size: 16px;
        }

        .nav-links a {
            color: var(--fg);
            text-decoration: none;
            margin-left: 25px;
            font-size: 11px;
            text-transform: uppercase;
        }

        header {
            padding: 80px 40px;
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 40px;
            align-items: center;
            border-bottom: 1px solid var(--accent);
        }

        .hero-content h1 {
            font-size: 42px;
            line-height: 0.9;
            text-transform: uppercase;
            margin-bottom: 20px;
            font-weight: 800;
        }

        .hero-content p {
            max-width: 400px;
            margin-bottom: 30px;
            color: #888;
            font-size: 12px;
        }

        .btn {
            background: var(--fg);
            color: var(--bg);
            padding: 10px 20px;
            border: none;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            font-size: 11px;
        }

        #coding-canvas {
            width: 100%;
            height: 300px;
            background: #111;
            border: 1px solid var(--accent);
            position: relative;
        }

        .bento-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 200px;
            gap: 1px;
            background: var(--accent);
            border-bottom: 1px solid var(--accent);
        }

        .bento-item {
            background: var(--bg);
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
        }

        .bento-item:hover {
            background: #111;
        }

        .span-2 { grid-column: span 2; }
        .row-2 { grid-row: span 2; }

        .bento-item h3 {
            font-size: 12px;
            text-transform: uppercase;
            z-index: 2;
        }

        .bento-item p {
            font-size: 10px;
            color: #666;
            z-index: 2;
        }

        .illustration {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background-image: var(--dither);
            opacity: 0.3;
            mask-image: linear-gradient(to top right, black, transparent);
        }

        .dither-block {
            width: 60px;
            height: 60px;
            background: #fff;
            mask-image: var(--dither);
            margin-bottom: 10px;
        }

        footer {
            padding: 40px;
            text-align: center;
            font-size: 10px;
            color: #444;
            text-transform: uppercase;
        }

        .tag {
            display: inline-block;
            padding: 2px 6px;
            border: 1px solid var(--accent);
            font-size: 9px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="dither-overlay"></div>
    
    <nav>
        <div class="logo">PHANTOM_SENTINEL.sys</div>
        <div class="nav-links">
            <a href="#">Network</a>
            <a href="#">Nodes</a>
            <a href="#">Protocol</a>
            <a href="#">Terminal</a>
        </div>
    </nav>

    <header>
        <div class="hero-content">
            <div class="tag">SECURE_LAYER_V4.0</div>
            <h1>NEURAL <br> DEFENSE <br> PROTOCOL.</h1>
            <p>Autonomous AI security clusters protecting your infrastructure with sub-millisecond dither-encrypted responses.</p>
            <button class="btn">INITIALIZE SYSTEM</button>
        </div>
        <div id="coding-canvas-container">
            <canvas id="coding-canvas"></canvas>
        </div>
    </header>

    <section class="bento-grid">
        <div class="bento-item span-2">
            <h3>Automated Threat Hunting</h3>
            <p>Scanning 1.2M nodes per second via neural pathways.</p>
            <div class="illustration"></div>
        </div>
        <div class="bento-item">
            <div class="dither-block"></div>
            <h3>Zero Trust</h3>
            <p>Implicit deny by default.</p>
        </div>
        <div class="bento-item row-2">
            <h3>Kernel Protection</h3>
            <p>Hardware-level AI monitoring for sensitive memory blocks.</p>
            <div class="illustration" style="width: 100%; height: 60%;"></div>
        </div>
        <div class="bento-item">
            <h3>Dither Encryption</h3>
            <p>Chaos-pattern bit distribution.</p>
        </div>
        <div class="bento-item span-2">
            <h3>Real-time Forensics</h3>
            <p>Immediate snapshotting of hostile runtime environments.</p>
            <div class="illustration" style="width: 50%;"></div>
        </div>
    </section>

    <footer>
        &copy; 2024 PHANTOM SENTINEL AI - ALL RIGHTS RESERVED - ENCRYPTED BY DITHER_CORE
    </footer>

    <script>
        const canvas = document.getElementById('coding-canvas');
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        window.onresize = resize;
        resize();

        const lines = [];
        for(let i=0; i<20; i++) {
            lines.push({
                x: 20,
                y: 30 + (i * 15),
                text: '',
                full: '0x' + Math.random().toString(16).substr(2, 24).toUpperCase(),
                speed: Math.random() * 2 + 1
            });
        }

        function draw() {
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = '10px "Courier New"';
            
            lines.forEach((line, i) => {
                if (line.text.length < line.full.length) {
                    line.text = line.full.substr(0, line.text.length + 1);
                } else {
                    if (Math.random() > 0.98) line.text = '';
                }

                ctx.fillStyle = i % 2 === 0 ? '#444' : '#888';
                ctx.fillText(line.text, line.x, line.y);
                
                // Dithered square animation
                if (Math.random() > 0.9) {
                    ctx.fillStyle = '#222';
                    ctx.fillRect(canvas.width - 100 + (Math.random()*80), line.y - 10, 5, 5);
                }
            });

            requestAnimationFrame(draw);
        }
        draw();
    </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(landingPage);
});

app.get('/health', (req, res) => {
  res.json({ msg: 'ok' });
});

app.listen(3000, () => {
    console.log('Phantom Sentinel System Online on Port 3000');
});