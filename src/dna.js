/**
 * Interactive 3D DNA Canvas Engine
 * Dr. Neha Sharma Clinic Website
 * High-performance double-helix visualization with depth projection,
 * glow nodes, and scroll responsiveness.
 */

(function () {
  const canvas = document.getElementById('dnaCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  // DNA Configuration Parameters
  const config = {
    nodesCount: 38,             // Number of base-pair rungs along the strand
    strandRadius: 130,          // Radius of the double helix cylinder
    helixLength: 1050,          // Total pixel height of the helix structure
    rotSpeed: 0.007,            // Baseline ambient rotation speed
    twistFrequency: 0.0075,     // How tight the double helix spirals
    nodeRadius: 4.2,            // Radius of base pair node spheres
    rungLineWidth: 1.2,         // Thickness of connecting base pair lines
    fov: 420,                   // Field of View perspective distance
    scrollInfluence: 0,         // Dynamic scroll speed booster
    globalRotation: 0,          // Current angle of rotation (radians)
    tiltAngle: 0.28,            // 3D tilt axis (radians)
    waveOffset: 0,              // Ambient vertical breathing
    centerXRatio: 0.72,         // Position helix toward center-right initially
    centerYRatio: 0.48
  };

  // Resize handler with high-DPI scaling
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Responsive adjustments
    if (width < 768) {
      config.strandRadius = 85;
      config.nodeRadius = 3.2;
      config.centerXRatio = 0.55;
      config.helixLength = 800;
    } else if (width < 1200) {
      config.strandRadius = 110;
      config.nodeRadius = 3.8;
      config.centerXRatio = 0.68;
      config.helixLength = 950;
    } else {
      config.strandRadius = 135;
      config.nodeRadius = 4.2;
      config.centerXRatio = 0.72;
      config.helixLength = 1100;
    }
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetTiltX = 0.28;
  let targetTiltY = 0.05;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetTiltX = 0.28 + ny * 0.15;
    targetTiltY = nx * 0.2;
  });

  // Public update method for GSAP ScrollTrigger
  window.updateDnaScroll = function (progress, velocity) {
    config.scrollInfluence = (velocity || 0) * 0.0003;
    // Morph center position slightly on scroll
    if (width > 768) {
      config.centerXRatio = 0.72 - progress * 0.35; // moves gently left
    }
  };

  // Main Render Loop
  let lastTime = performance.now();

  function render(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    // Update rotation with ambient + scroll speed
    config.globalRotation += config.rotSpeed + config.scrollInfluence;
    config.scrollInfluence *= 0.92; // smooth decay
    config.waveOffset += 0.015;

    // Smooth tilt interpolation
    config.tiltAngle += (targetTiltX - config.tiltAngle) * 0.05;

    const centerX = width * config.centerXRatio;
    const centerY = height * config.centerYRatio + Math.sin(config.waveOffset) * 12;

    const elementsToDraw = [];

    const startY = -config.helixLength / 2;
    const stepY = config.helixLength / config.nodesCount;

    for (let i = 0; i < config.nodesCount; i++) {
      const yRel = startY + i * stepY;
      const angle = yRel * config.twistFrequency + config.globalRotation;

      // Strand 1 3D coordinates
      const x1 = Math.cos(angle) * config.strandRadius;
      const z1 = Math.sin(angle) * config.strandRadius;
      const y1 = yRel;

      // Strand 2 3D coordinates (180 degrees opposite)
      const x2 = Math.cos(angle + Math.PI) * config.strandRadius;
      const z2 = Math.sin(angle + Math.PI) * config.strandRadius;
      const y2 = yRel;

      // Apply 3D tilt rotation around X axis
      const cosT = Math.cos(config.tiltAngle);
      const sinT = Math.sin(config.tiltAngle);

      // Rotated Strand 1
      const rx1 = x1;
      const ry1 = y1 * cosT - z1 * sinT;
      const rz1 = y1 * sinT + z1 * cosT;

      // Rotated Strand 2
      const rx2 = x2;
      const ry2 = y2 * cosT - z2 * sinT;
      const rz2 = y2 * sinT + z2 * cosT;

      // Perspective projection
      const p1 = project(rx1, ry1, rz1, centerX, centerY);
      const p2 = project(rx2, ry2, rz2, centerX, centerY);

      // Average depth for sorting
      const avgZ = (rz1 + rz2) / 2;

      // Add rung and nodes to element draw list
      elementsToDraw.push({
        type: 'rung',
        p1,
        p2,
        z: avgZ,
        depthFactor: (avgZ + config.strandRadius * 1.5) / (config.strandRadius * 3)
      });

      elementsToDraw.push({
        type: 'node',
        p: p1,
        z: rz1,
        strand: 1,
        depthFactor: (rz1 + config.strandRadius) / (config.strandRadius * 2)
      });

      elementsToDraw.push({
        type: 'node',
        p: p2,
        z: rz2,
        strand: 2,
        depthFactor: (rz2 + config.strandRadius) / (config.strandRadius * 2)
      });
    }

    // Depth sort elements so back is drawn before front
    elementsToDraw.sort((a, b) => a.z - b.z);

    // Draw all sorted elements
    for (let j = 0; j < elementsToDraw.length; j++) {
      const item = elementsToDraw[j];

      if (item.type === 'rung') {
        drawRung(item);
      } else if (item.type === 'node') {
        drawNode(item);
      }
    }

    requestAnimationFrame(render);
  }

  // Perspective 3D -> 2D Projection helper
  function project(x, y, z, cx, cy) {
    const scale = config.fov / (config.fov + z);
    return {
      x: cx + x * scale,
      y: cy + y * scale,
      scale: Math.max(0.2, scale)
    };
  }

  // Draw connecting base-pair rung
  function drawRung(item) {
    const alpha = Math.max(0.12, Math.min(0.7, 0.25 + item.depthFactor * 0.45));
    
    // Gradient stroke across the rung
    const grad = ctx.createLinearGradient(item.p1.x, item.p1.y, item.p2.x, item.p2.y);
    grad.addColorStop(0, `rgba(0, 180, 216, ${alpha * 0.9})`);
    grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.8})`);
    grad.addColorStop(1, `rgba(14, 165, 233, ${alpha * 0.9})`);

    ctx.beginPath();
    ctx.moveTo(item.p1.x, item.p1.y);
    ctx.lineTo(item.p2.x, item.p2.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = config.rungLineWidth * item.p1.scale;
    ctx.stroke();

    // Center hydrogen bond indicator dot
    const midX = (item.p1.x + item.p2.x) / 2;
    const midY = (item.p1.y + item.p2.y) / 2;
    ctx.beginPath();
    ctx.arc(midX, midY, 1.5 * item.p1.scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
    ctx.fill();
  }

  // Draw base pair node sphere with soft cyan glow
  function drawNode(item) {
    const radius = config.nodeRadius * item.p.scale;
    const alpha = Math.max(0.2, Math.min(0.95, 0.35 + item.depthFactor * 0.6));

    // Outer glow for foreground nodes
    if (item.depthFactor > 0.55) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 180, 216, 0.6)';
      ctx.shadowBlur = 12 * item.depthFactor;
      ctx.beginPath();
      ctx.arc(item.p.x, item.p.y, radius + 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 180, 216, ${alpha * 0.35})`;
      ctx.fill();
      ctx.restore();
    }

    // Node core sphere
    ctx.beginPath();
    ctx.arc(item.p.x, item.p.y, radius, 0, Math.PI * 2);
    
    if (item.strand === 1) {
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    } else {
      ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
    }
    ctx.fill();

    // Node ring stroke
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(0, 180, 216, ${alpha * 0.8})`;
    ctx.stroke();
  }

  // Start loop
  requestAnimationFrame(render);
})();
