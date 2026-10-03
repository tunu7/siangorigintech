"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BRAND = 0x0b4d2c;
const BRAND_LIGHT = 0x2f7d46;
const MINT = 0xa8d5b4;

// Faceted "origin" crystal with a wireframe shell and an orbiting
// particle ring. Pauses when off-screen and respects reduced motion.
export default function OriginScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // WebGL unavailable — the CSS fallback stays visible.
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "animate-fade-in";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(MINT, 30, 20);
    rim.position.set(-4, -2, 3);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    // Core crystal
    const coreGeometry = new THREE.IcosahedronGeometry(1.45, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: BRAND,
      flatShading: true,
      roughness: 0.35,
      metalness: 0.25,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    // Wireframe shell
    const shellGeometry = new THREE.IcosahedronGeometry(2.05, 1);
    const shellMaterial = new THREE.LineBasicMaterial({
      color: BRAND_LIGHT,
      transparent: true,
      opacity: 0.35,
    });
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(shellGeometry),
      shellMaterial
    );
    group.add(shell);

    // Orbiting particle ring
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.7 + (Math.random() - 0.5) * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const ringMaterial = new THREE.PointsMaterial({
      color: BRAND_LIGHT,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Points(ringGeometry, ringMaterial);
    ring.rotation.x = 0.35;
    ring.rotation.z = -0.2;
    scene.add(ring);

    // Satellites
    const satelliteGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const satelliteMaterial = new THREE.MeshStandardMaterial({
      color: MINT,
      roughness: 0.4,
    });
    const satellites = [0, 1, 2].map((i) => {
      const mesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      mesh.userData = { offset: (i / 3) * Math.PI * 2, radius: 2.4 + i * 0.25 };
      scene.add(mesh);
      return mesh;
    });

    // Sizing
    const resize = () => {
      const { clientWidth: width, clientHeight: height } = mount;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    // Pointer parallax
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Render loop
    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;

    const render = () => {
      const t = clock.getElapsedTime();

      core.rotation.y = t * 0.25;
      core.rotation.x = Math.sin(t * 0.3) * 0.2;
      shell.rotation.y = -t * 0.12;
      shell.rotation.z = t * 0.05;
      ring.rotation.y = t * 0.08;

      satellites.forEach((mesh) => {
        const { offset, radius } = mesh.userData as {
          offset: number;
          radius: number;
        };
        const angle = t * 0.5 + offset;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.3) * 0.6,
          Math.sin(angle) * radius
        );
      });

      group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * 0.05;
      group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.05;
      group.position.y = Math.sin(t * 0.8) * 0.08;

      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      if (visible) frame = requestAnimationFrame(loop);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduceMotion) {
        frame = requestAnimationFrame(loop);
      }
    });
    visibilityObserver.observe(mount);

    if (reduceMotion) {
      render();
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      visible = false;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);

      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shell.geometry.dispose();
      shellMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      satelliteGeometry.dispose();
      satelliteMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="h-full w-full [&>canvas]:h-full! [&>canvas]:w-full!"
    />
  );
}
