import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type CameraKeyframe = {
  progress: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
};

const cameraRoute: CameraKeyframe[] = [
  { progress: 0, position: new THREE.Vector3(2.6, 1.35, 8.9), target: new THREE.Vector3(1.45, 0.35, -0.8) },
  { progress: 0.18, position: new THREE.Vector3(-1.7, 1.15, 6.2), target: new THREE.Vector3(0, 0.15, -0.5) },
  { progress: 0.36, position: new THREE.Vector3(2.8, 1.2, 5.25), target: new THREE.Vector3(0.2, 0.2, -1.2) },
  { progress: 0.62, position: new THREE.Vector3(-2.6, 1.55, 5.8), target: new THREE.Vector3(0, 0.1, -2.1) },
  { progress: 1, position: new THREE.Vector3(0.8, 1.35, 7.4), target: new THREE.Vector3(0, 0.2, -0.2) }
];

const smoothstep = (value: number) => value * value * (3 - 2 * value);

const createTextTexture = (text: string, options?: { size?: number; accent?: string; width?: number; height?: number }) => {
  const canvas = document.createElement('canvas');
  canvas.width = options?.width ?? 512;
  canvas.height = options?.height ?? 512;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(5,5,5,0.62)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(246,239,229,0.14)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  ctx.fillStyle = options?.accent ?? '#F6EFE5';
  ctx.font = `700 ${options?.size ?? 220}px Inter, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

const createLabelTexture = (eyebrow: string, title: string, accent: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 432;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(246,239,229,0.12)');
  gradient.addColorStop(0.55, 'rgba(10,10,13,0.92)');
  gradient.addColorStop(1, 'rgba(125,211,252,0.12)');

  ctx.fillStyle = '#070707';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(246,239,229,0.18)';
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  ctx.fillStyle = accent;
  ctx.font = '700 24px ui-monospace, SFMono-Regular, Consolas, monospace';
  ctx.letterSpacing = '8px';
  ctx.fillText(eyebrow.toUpperCase(), 56, 92);

  ctx.fillStyle = '#f6efe5';
  ctx.font = '700 56px Inter, Arial, sans-serif';
  const lines = title.split('\n');
  lines.forEach((line, index) => ctx.fillText(line, 56, 188 + index * 64));

  ctx.fillStyle = 'rgba(246,239,229,0.45)';
  ctx.font = '500 22px Inter, Arial, sans-serif';
  ctx.fillText('scroll-linked command surface', 56, 358);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

export default function CommandWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

    if (!canvas || reducedMotion || saveData) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let scrollProgress = window.commandLenis?.progress ?? 0;
    let scrollVelocity = 0;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.082);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 80);
    camera.position.copy(cameraRoute[0].position);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.45));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const disposables: Array<{ dispose: () => void }> = [];
    const world = new THREE.Group();
    scene.add(world);

    const ambient = new THREE.AmbientLight(0xf6efe5, 0.75);
    const keyLight = new THREE.PointLight(0xd8a84e, 8, 18);
    keyLight.position.set(-2.8, 2.8, 3.6);
    const cyanLight = new THREE.PointLight(0x7dd3fc, 5, 16);
    cyanLight.position.set(3.5, 1.4, 1.5);
    scene.add(ambient, keyLight, cyanLight);

    const grid = new THREE.GridHelper(18, 34, 0xd8a84e, 0x27333a);
    grid.position.y = -1.15;
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.22;
    world.add(grid);

    const backGrid = new THREE.GridHelper(18, 28, 0x7dd3fc, 0x22262b);
    backGrid.position.set(0, 2.1, -5.2);
    backGrid.rotation.x = Math.PI / 2;
    const backGridMaterial = backGrid.material as THREE.Material;
    backGridMaterial.transparent = true;
    backGridMaterial.opacity = 0.12;
    world.add(backGrid);

    const sideGridMaterial = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.075
    });
    const roomLineMaterial = new THREE.LineBasicMaterial({
      color: 0xd8a84e,
      transparent: true,
      opacity: 0.22
    });
    disposables.push(sideGridMaterial, roomLineMaterial);

    const createRoomGrid = (x: number, rotationZ: number) => {
      const helper = new THREE.GridHelper(10, 12, 0x7dd3fc, 0x293138);
      helper.position.set(x, 1.2, -2.4);
      helper.rotation.z = rotationZ;
      helper.rotation.x = Math.PI / 2;
      const material = helper.material as THREE.Material;
      material.transparent = true;
      material.opacity = 0.1;
      world.add(helper);
      return helper;
    };

    createRoomGrid(-5.4, Math.PI / 2);
    createRoomGrid(5.4, -Math.PI / 2);

    const roomGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-5.4, -1.15, 1.8),
      new THREE.Vector3(-5.4, 3.15, -5.8),
      new THREE.Vector3(5.4, 3.15, -5.8),
      new THREE.Vector3(5.4, -1.15, 1.8),
      new THREE.Vector3(-5.4, -1.15, 1.8)
    ]);
    const roomLine = new THREE.Line(roomGeometry, roomLineMaterial);
    world.add(roomLine);
    disposables.push(roomGeometry);

    const core = new THREE.Group();
    core.position.set(0, 0.15, -1.25);
    world.add(core);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf6efe5,
      emissive: 0xd8a84e,
      emissiveIntensity: 0.18,
      roughness: 0.32,
      metalness: 0.72
    });
    const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 2), coreMaterial);
    core.add(coreMesh);
    disposables.push(coreMesh.geometry, coreMaterial);

    const coreLabelTexture = createTextTexture('K', { size: 255, accent: '#F6EFE5' });
    const coreLabelMaterial = new THREE.MeshBasicMaterial({
      map: coreLabelTexture ?? undefined,
      transparent: true,
      opacity: 0.78,
      depthWrite: false
    });
    const coreLabel = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), coreLabelMaterial);
    coreLabel.position.z = 0.66;
    core.add(coreLabel);
    disposables.push(coreLabel.geometry, coreLabelMaterial);
    if (coreLabelTexture) disposables.push(coreLabelTexture);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8a84e,
      transparent: true,
      opacity: 0.38
    });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.012, 10, 120), ringMaterial);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.01, 10, 120), ringMaterial.clone());
    ringB.rotation.set(Math.PI / 2.8, 0.25, 0.4);
    core.add(ringA, ringB);
    disposables.push(ringA.geometry, ringB.geometry, ringMaterial, ringB.material as THREE.Material);

    const screenGeometry = new THREE.PlaneGeometry(2.75, 1.55);
    const frameGeometry = new THREE.BoxGeometry(2.95, 1.75, 0.06);
    disposables.push(screenGeometry, frameGeometry);

    const frameMaterial = new THREE.MeshBasicMaterial({
      color: 0x111116,
      transparent: true,
      opacity: 0.88
    });
    disposables.push(frameMaterial);

    const createScreen = (texture: THREE.Texture | null, position: THREE.Vector3, rotationY: number) => {
      const group = new THREE.Group();
      group.position.copy(position);
      group.rotation.y = rotationY;

      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frameMesh.position.z = -0.04;
      const material = new THREE.MeshBasicMaterial({
        map: texture ?? undefined,
        color: texture ? 0xffffff : 0x15151a,
        transparent: true,
        opacity: 0.92
      });
      const screen = new THREE.Mesh(screenGeometry, material);

      group.add(frameMesh, screen);
      world.add(group);
      disposables.push(material);
      if (texture) disposables.push(texture);
      return group;
    };

    const loader = new THREE.TextureLoader();
    const battleTexture = loader.load('/projects/blaster/preview-battle.png');
    const bossTexture = loader.load('/projects/blaster/preview-boss.png');
    battleTexture.colorSpace = THREE.SRGBColorSpace;
    bossTexture.colorSpace = THREE.SRGBColorSpace;

    const screens = [
      createScreen(battleTexture, new THREE.Vector3(-3.25, 1.1, -2.25), 0.48),
      createScreen(createLabelTexture('price monitor', 'Trendyol\nTracker', '#D8A84E'), new THREE.Vector3(2.65, 1.05, -2.1), -0.45),
      createScreen(bossTexture, new THREE.Vector3(-2.35, -0.55, -3.55), 0.28),
      createScreen(createLabelTexture('source proof', 'Portfolio\nSystem', '#7DD3FC'), new THREE.Vector3(2.15, -0.45, -3.45), -0.34)
    ];
    const screenBaseY = screens.map((screen) => screen.position.y);

    const beaconMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8a84e,
      transparent: true,
      opacity: 0.65
    });
    const beaconGeometry = new THREE.SphereGeometry(0.055, 12, 12);
    const beaconPositions = [
      new THREE.Vector3(-3.8, -1.05, 0.5),
      new THREE.Vector3(-1.6, -1.03, -1.2),
      new THREE.Vector3(0.1, -1.02, -2.1),
      new THREE.Vector3(2.25, -1.03, -2.9),
      new THREE.Vector3(3.8, -1.05, -1.1)
    ];
    const beacons = beaconPositions.map((position, index) => {
      const material = index % 2 === 0 ? beaconMaterial : beaconMaterial.clone();
      if (index % 2 === 1) material.color = new THREE.Color(0x7dd3fc);
      const beacon = new THREE.Mesh(beaconGeometry, material);
      beacon.position.copy(position);
      world.add(beacon);
      if (index % 2 === 1) disposables.push(material);
      return beacon;
    });
    disposables.push(beaconGeometry, beaconMaterial);

    const createRoute = (points: THREE.Vector3[], color: number, opacity: number) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(96));
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const line = new THREE.Line(geometry, material);
      world.add(line);
      disposables.push(geometry, material);
      return line;
    };

    const lines = [
      createRoute([new THREE.Vector3(-2.7, 1.1, -1.7), core.position, new THREE.Vector3(2.65, 1.05, -2.1)], 0xd8a84e, 0.34),
      createRoute([new THREE.Vector3(-2.35, -0.55, -3.55), core.position, new THREE.Vector3(2.15, -0.45, -3.45)], 0x7dd3fc, 0.28)
    ];

    const particleCount = 90;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 10;
      particlePositions[index * 3 + 1] = Math.random() * 4 - 1.1;
      particlePositions[index * 3 + 2] = Math.random() * -7;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf6efe5,
      size: 0.018,
      transparent: true,
      opacity: 0.42
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);
    disposables.push(particleGeometry, particleMaterial);

    const resolveCameraFrame = (progress: number) => {
      const currentIndex = cameraRoute.findIndex((frameItem, index) => {
        const next = cameraRoute[index + 1];
        return next ? progress >= frameItem.progress && progress <= next.progress : false;
      });
      const index = Math.max(0, currentIndex);
      const current = cameraRoute[index];
      const next = cameraRoute[Math.min(cameraRoute.length - 1, index + 1)];
      const distance = Math.max(0.0001, next.progress - current.progress);
      const local = smoothstep(Math.min(1, Math.max(0, (progress - current.progress) / distance)));

      return {
        position: current.position.clone().lerp(next.position, local),
        target: current.target.clone().lerp(next.target, local)
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTargetX = (event.clientX / width - 0.5) * 2;
      pointerTargetY = (event.clientY / height - 0.5) * 2;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 900 ? 1 : 1.45));
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      const time = performance.now() * 0.001;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const nativeProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const progress = window.commandLenis ? scrollProgress : nativeProgress;
      const frameTarget = resolveCameraFrame(progress);

      pointerX += (pointerTargetX - pointerX) * 0.055;
      pointerY += (pointerTargetY - pointerY) * 0.055;

      camera.position.lerp(frameTarget.position, 0.075);
      camera.position.x += pointerX * 0.018 + scrollVelocity * 0.0008;
      camera.position.y += -pointerY * 0.012;
      camera.lookAt(frameTarget.target);

      world.rotation.y = pointerX * 0.035 + progress * 0.18 + scrollVelocity * 0.00055;
      world.rotation.x = -pointerY * 0.025;
      core.rotation.y = time * 0.42 + progress * 1.6;
      core.rotation.x = Math.sin(time * 0.6) * 0.08;
      ringA.rotation.z = time * 0.32;
      ringB.rotation.z = -time * 0.22;
      particles.rotation.y = time * 0.035;

      screens.forEach((screen, index) => {
        screen.position.y = screenBaseY[index] + Math.sin(time * 0.75 + index) * 0.045;
      });

      lines.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.22 + Math.sin(time * 1.4 + index) * 0.08 + progress * 0.08 + Math.min(0.12, Math.abs(scrollVelocity) * 0.0015);
      });

      beacons.forEach((beacon, index) => {
        const pulse = 1 + Math.sin(time * 1.8 + index * 0.7) * 0.28 + Math.min(0.55, Math.abs(scrollVelocity) * 0.006);
        beacon.scale.setScalar(pulse);
      });

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    const unsubscribeLenis = window.commandLenis?.on('scroll', (lenis) => {
      scrollProgress = lenis.progress;
      scrollVelocity = lenis.velocity;
    });

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    onResize();
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      unsubscribeLenis?.();
      scene.remove(world);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="command-world-canvas" aria-hidden="true" />;
}
