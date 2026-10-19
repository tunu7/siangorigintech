import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Material,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  QuadraticBezierCurve3,
  RingGeometry,
  SphereGeometry,
  Points,
  Scene,
  ShaderMaterial,
  Shape,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Brand palette (see app/globals.css).
const C = {
  forest: new Color("#08180f"),
  ink: new Color("#101a14"),
  brand: new Color("#0b4d2c"),
  leaf: new Color("#3f9a4a"),
  mint: new Color("#a8d5b4"),
  lime: new Color("#c8f27a"),
};

export type SceneVariant = "hero" | "pillars" | "field" | "globe";

type Frame = { time: number; delta: number; pointer: Vector2 };

type World = {
  update: (frame: Frame) => void;
  resize: (width: number, height: number) => void;
};

// Visible size of the camera's view at a given distance.
function viewSize(camera: PerspectiveCamera, distance: number) {
  const height = 2 * Math.tan(MathUtils.degToRad(camera.fov) / 2) * distance;
  return { width: height * camera.aspect, height };
}

// Places a focal object beside the headline on wide screens and in the
// space above it on narrow ones (see the hero and PageHeader padding),
// with the dawn glow rising directly behind it.
function placeFocus(
  camera: PerspectiveCamera,
  width: number,
  height: number,
  anchor: Group,
  naturalWidth: number,
  sun?: ReturnType<typeof dawn>
) {
  const view = viewSize(camera, camera.position.z);
  const unit = view.width / width; // World units per CSS pixel.
  const wide = width >= 1024;

  const x = wide ? width * 0.74 : width / 2;
  const y = wide ? Math.min(height * 0.45, 420) : Math.min(width * 0.39, 176);
  const size = wide ? Math.min(width * 0.3, 440) : Math.min(width * 0.5, 230);

  anchor.position.set((x - width / 2) * unit, 0.6 + (height / 2 - y) * unit, 0);
  anchor.scale.setScalar((size * unit) / naturalWidth);

  if (sun) {
    const depth =
      (camera.position.z - sun.object.position.z) / camera.position.z;
    sun.object.position.x = anchor.position.x * depth;
    sun.object.position.y = 1.2 + (anchor.position.y - 1.2) * depth;
    sun.object.scale.setScalar(anchor.scale.x * 1.4);
  }
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

const NOISE = /* glsl */ `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }
`;

// Wireframe mountains on either side of a flat valley, scrolling towards
// the camera — the Siang valley, endlessly unfolding.
function terrain({
  height = 3.2,
  speed = 0.6,
  fade = 46,
}: { height?: number; speed?: number; fade?: number } = {}) {
  const geometry = new PlaneGeometry(90, 70, 180, 140);
  geometry.rotateX(-Math.PI / 2);

  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uHeight: { value: height },
      uFade: { value: fade },
      uLow: { value: C.leaf.clone() },
      uHigh: { value: C.lime.clone() },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSpeed;
      uniform float uHeight;
      varying vec3 vWorld;
      varying vec2 vGrid;
      varying float vLift;
      ${NOISE}
      void main() {
        vec3 p = position;
        vGrid = vec2(p.x, p.z - uTime * uSpeed);
        float valley = smoothstep(1.5, 14.0, abs(p.x));
        float lift = fbm(vGrid * 0.11) * (0.15 + valley * 1.4);
        p.y += lift * uHeight;
        vLift = lift;
        vec4 world = modelMatrix * vec4(p, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uFade;
      uniform vec3 uLow;
      uniform vec3 uHigh;
      varying vec3 vWorld;
      varying vec2 vGrid;
      varying float vLift;
      void main() {
        vec2 g = vGrid * 0.9;
        vec2 cell = abs(fract(g - 0.5) - 0.5) / fwidth(g);
        float line = 1.0 - min(min(cell.x, cell.y), 1.0);
        float dist = distance(vWorld.xz, cameraPosition.xz);
        float fade = 1.0 - smoothstep(uFade * 0.25, uFade, dist);
        float near = smoothstep(1.0, 7.0, dist);
        vec3 color = mix(uLow, uHigh, smoothstep(0.25, 1.1, vLift));
        float alpha = line * fade * near * (0.18 + vLift * 0.75);
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

  const mesh = new Mesh(geometry, material);
  return {
    object: mesh,
    update: (time: number) => {
      material.uniforms.uTime.value = time;
    },
  };
}

// Soft particles drifting upwards — growth, quietly.
function risingParticles({
  count = 900,
  width = 30,
  height = 14,
  depth = 22,
  size = 34,
  speed = 0.35,
}: {
  count?: number;
  width?: number;
  height?: number;
  depth?: number;
  size?: number;
  speed?: number;
} = {}) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * width;
    positions[i * 3 + 1] = Math.random() * height;
    positions[i * 3 + 2] = (Math.random() - 0.5) * depth;
    seeds[i] = Math.random();
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));

  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: height },
      uSpeed: { value: speed },
      uSize: { value: size },
      uPixelRatio: { value: 1 },
      uA: { value: C.mint.clone() },
      uB: { value: C.lime.clone() },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uHeight;
      uniform float uSpeed;
      uniform float uSize;
      uniform float uPixelRatio;
      attribute float aSeed;
      varying float vSeed;
      varying float vLife;
      void main() {
        vec3 p = position;
        float rise = uTime * uSpeed * (0.4 + aSeed);
        p.y = mod(p.y + rise, uHeight);
        p.x += sin(uTime * 0.3 + aSeed * 40.0) * 0.25;
        vLife = p.y / uHeight;
        vSeed = aSeed;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = uSize * uPixelRatio * (0.35 + aSeed) / -view.z;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uA;
      uniform vec3 uB;
      varying float vSeed;
      varying float vLife;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float glow = smoothstep(0.5, 0.0, d);
        float life = smoothstep(0.0, 0.15, vLife) * (1.0 - smoothstep(0.6, 1.0, vLife));
        gl_FragColor = vec4(mix(uA, uB, vSeed), glow * life * 0.85);
      }
    `,
  });

  const points = new Points(geometry, material);
  return {
    object: points,
    setPixelRatio: (ratio: number) => {
      material.uniforms.uPixelRatio.value = ratio;
    },
    update: (time: number) => {
      material.uniforms.uTime.value = time;
    },
  };
}

// The dawn glow behind the mountains; `disc` 0 leaves only the halo.
function dawn(radius = 9, disc = 1) {
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uDisc: { value: disc },
      uCore: { value: C.lime.clone() },
      uHalo: { value: C.leaf.clone() },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uDisc;
      uniform vec3 uCore;
      uniform vec3 uHalo;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float pulse = 0.92 + sin(uTime * 0.6) * 0.08;
        float disc = smoothstep(0.32, 0.29, d) * 0.55 * uDisc;
        float ring = smoothstep(0.045, 0.0, abs(d - 0.31)) * 0.6 * uDisc;
        float halo = pow(max(1.0 - d, 0.0), 2.6) * 0.75 * pulse;
        float glow = clamp(halo + disc + ring, 0.0, 1.0);
        vec3 color = (uHalo * halo + uCore * (disc + ring)) / max(glow, 0.001);
        gl_FragColor = vec4(color, glow);
      }
    `,
  });

  const mesh = new Mesh(new PlaneGeometry(radius * 2, radius * 2), material);
  return {
    object: mesh,
    update: (time: number) => {
      material.uniforms.uTime.value = time;
    },
  };
}

// The Siang Origin mountain mark (app/components/Logo.tsx), extruded.
function brandMark() {
  const shape = (points: [number, number][]) =>
    new Shape(points.map(([x, y]) => new Vector2(x - 50, 31 - y)));

  const extrude = {
    depth: 12,
    bevelEnabled: true,
    bevelThickness: 1.6,
    bevelSize: 1.1,
    bevelSegments: 4,
    curveSegments: 1,
  };
  const dark = new MeshPhysicalMaterial({
    color: C.ink,
    metalness: 0.75,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const green = new MeshPhysicalMaterial({
    color: C.leaf,
    emissive: C.brand,
    emissiveIntensity: 1.2,
    metalness: 0.45,
    roughness: 0.28,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.5,
  });
  const edges = new LineBasicMaterial({
    color: C.lime,
    transparent: true,
    opacity: 0.45,
  });

  const group = new Group();
  const parts: [Shape, Material][] = [
    [
      shape([
        [40, 0],
        [0, 62],
        [18, 62],
        [40, 28],
        [62, 62],
        [80, 62],
      ]),
      dark,
    ],
    [
      shape([
        [40, 41],
        [26.5, 62],
        [53.5, 62],
      ]),
      dark,
    ],
    [
      shape([
        [64, 14],
        [100, 62],
        [66, 62],
      ]),
      green,
    ],
  ];

  for (const [outline, material] of parts) {
    const geometry = new ExtrudeGeometry(outline, extrude);
    geometry.translate(0, 0, -extrude.depth / 2);
    const mesh = new Mesh(geometry, material);
    mesh.add(new LineSegments(new EdgesGeometry(geometry, 30), edges));
    group.add(mesh);
  }

  group.scale.setScalar(0.05);
  return group;
}

function lights(scene: Scene) {
  const key = new DirectionalLight("#ffffff", 2.2);
  key.position.set(4, 6, 8);
  const rim = new DirectionalLight(C.lime, 3);
  rim.position.set(-6, 3, -6);
  const fill = new PointLight(C.leaf, 30, 30);
  fill.position.set(0, -1, 4);
  scene.add(key, rim, fill, new AmbientLight("#ffffff", 0.15));
}

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

function heroWorld(
  scene: Scene,
  camera: PerspectiveCamera,
  particles: ReturnType<typeof risingParticles>
): World {
  camera.position.set(0, 1.2, 12);
  camera.lookAt(0, 0.6, 0);
  lights(scene);

  const ground = terrain();
  ground.object.position.set(0, -2.6, -18);
  const sun = dawn(16);
  sun.object.position.z = -40;
  particles.object.position.set(0, -2.5, -4);

  const mark = brandMark();
  const anchor = new Group();
  anchor.add(mark);

  scene.add(ground.object, sun.object, particles.object, anchor);

  return {
    resize(width, height) {
      placeFocus(camera, width, height, anchor, 5, sun); // The mark is 5 units wide.
    },
    update({ time, pointer }) {
      ground.update(time);
      sun.update(time);
      particles.update(time);
      mark.rotation.y = -0.35 + pointer.x * 0.45 + Math.sin(time * 0.35) * 0.18;
      mark.rotation.x = 0.1 - pointer.y * 0.2;
      mark.position.y = Math.sin(time * 0.8) * 0.15;
      camera.position.x = pointer.x * 0.5;
      camera.position.y = 1.2 + pointer.y * 0.25;
      camera.lookAt(0, 0.6, 0);
    },
  };
}

// Four glass pillars rising in steps — the four pillars of growth.
function pillarsWorld(
  scene: Scene,
  camera: PerspectiveCamera,
  particles: ReturnType<typeof risingParticles>
): World {
  camera.position.set(0, 2.4, 15);
  camera.lookAt(0, 2.4, 0);
  lights(scene);

  const floor = terrain({ height: 0.6, speed: 0.25, fade: 34 });
  floor.object.position.set(0, -0.05, -10);
  particles.object.position.set(0, 0, 0);

  const heights = [2.2, 3.4, 4.6, 5.8];
  // Translucent rather than refractive glass: cheaper, and it shows the
  // glowing core through every face.
  const glass = new MeshPhysicalMaterial({
    color: C.leaf,
    emissive: C.brand,
    emissiveIntensity: 0.6,
    metalness: 0.1,
    roughness: 0.15,
    clearcoat: 1,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: DoubleSide,
  });
  const core = new MeshBasicMaterial({ color: C.lime });
  const cap = new MeshBasicMaterial({
    color: C.lime,
    transparent: true,
    opacity: 0.9,
  });
  const edge = new LineBasicMaterial({
    color: C.lime,
    transparent: true,
    opacity: 0.55,
  });

  const pillars = heights.map((height) => {
    const group = new Group();
    const body = new CylinderGeometry(0.85, 0.85, 1, 6);
    body.translate(0, 0.5, 0);
    const shell = new Mesh(body, glass);
    shell.add(new LineSegments(new EdgesGeometry(body), edge));
    const inner = new CylinderGeometry(0.08, 0.08, 1, 8);
    inner.translate(0, 0.5, 0);
    const glow = new Mesh(inner, core);
    const top = new Mesh(new TorusGeometry(0.7, 0.035, 8, 6), cap);
    top.rotation.x = Math.PI / 2;
    top.rotation.z = Math.PI / 6;
    group.add(shell, glow, top);
    scene.add(group);
    return { group, shell, glow, top, height };
  });

  scene.add(floor.object, particles.object);

  // The pillars grow in once, the first time the scene is seen.
  // Timed by the wall clock so slow devices still see them fully grown.
  let started = 0;

  return {
    resize(width) {
      const view = viewSize(camera, camera.position.z);
      // Line each pillar up with one of the four columns underneath.
      const span = view.width;
      pillars.forEach((pillar, index) => {
        pillar.group.position.x = ((index + 0.5) / 4 - 0.5) * span;
      });
      const scale = width < 640 ? 0.6 : 1;
      pillars.forEach((pillar) => pillar.group.scale.set(scale, 1, scale));
    },
    update({ time, delta, pointer }) {
      floor.update(time);
      particles.update(time);
      started ||= performance.now();
      const grow =
        delta >= 1 ? 1 : Math.min(1, (performance.now() - started) / 2400);

      pillars.forEach((pillar, index) => {
        const local = MathUtils.clamp(grow * 1.6 - index * 0.2, 0, 1);
        const eased = 1 - Math.pow(1 - local, 4);
        const height = Math.max(0.001, pillar.height * eased);
        pillar.shell.scale.y = height;
        pillar.glow.scale.y = height;
        pillar.top.position.y = height;
        pillar.group.rotation.y = time * 0.15 + index * 0.6;
      });

      camera.position.x = pointer.x * 0.8;
      camera.position.y = 2.4 + pointer.y * 0.4;
      camera.lookAt(0, 2.4, 0);
    },
  };
}

// Mountains, dawn and rising particles without the mark.
function fieldWorld(
  scene: Scene,
  camera: PerspectiveCamera,
  particles: ReturnType<typeof risingParticles>
): World {
  camera.position.set(0, 1.4, 12);
  camera.lookAt(0, 0.4, 0);

  const ground = terrain({ speed: 0.45 });
  ground.object.position.set(0, -2.4, -18);
  const sun = dawn(22, 0);
  sun.object.position.set(0, -4, -42);
  particles.object.position.set(0, -2.4, -4);

  scene.add(ground.object, sun.object, particles.object);

  return {
    resize() {},
    update({ time, pointer }) {
      ground.update(time);
      sun.update(time);
      particles.update(time);
      camera.position.x = pointer.x * 0.6;
      camera.lookAt(0, 0.4, 0);
    },
  };
}

/* ------------------------------------------------------------------ */
/* Globe                                                               */
/* ------------------------------------------------------------------ */

const DEG = Math.PI / 180;

// Itanagar, and some of the places we work with.
const ORIGIN: [number, number] = [27.08, 93.61];
const DESTINATIONS: [number, number][] = [
  [28.61, 77.21], // Delhi
  [19.08, 72.88], // Mumbai
  [12.97, 77.59], // Bengaluru
  [25.2, 55.27], // Dubai
  [51.51, -0.13], // London
  [40.71, -74.01], // New York
  [1.35, 103.82], // Singapore
  [-33.87, 151.21], // Sydney
  [35.68, 139.69], // Tokyo
];

function latLon([lat, lon]: [number, number], radius: number) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// A dotted globe with arcs travelling out from Itanagar — local roots,
// international reach.
function globe(radius = 2.5) {
  const group = new Group();

  // Evenly spread dots (Fibonacci sphere), brighter on the side facing us.
  const count = 2600;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    positions[i * 3] = Math.cos(golden * i) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(golden * i) * r * radius;
    seeds[i] = Math.random();
  }
  const dotGeometry = new BufferGeometry();
  dotGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  dotGeometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
  const dotMaterial = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uColor: { value: C.mint.clone() },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute float aSeed;
      varying float vFacing;
      varying float vTwinkle;
      void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        vFacing = normalize(normalMatrix * position).z;
        vTwinkle = 0.65 + 0.35 * sin(uTime * 1.5 + aSeed * 30.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = 26.0 * uPixelRatio / -view.z;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vFacing;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float dot = smoothstep(0.5, 0.15, d);
        float facing = mix(0.08, 0.85, smoothstep(-0.3, 0.7, vFacing));
        gl_FragColor = vec4(uColor, dot * facing * vTwinkle);
      }
    `,
  });
  group.add(new Points(dotGeometry, dotMaterial));

  // Atmosphere: a soft rim of light.
  const atmosphere = new Mesh(
    new SphereGeometry(radius * 1.04, 48, 48),
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uColor: { value: C.leaf.clone() } },
      vertexShader: /* glsl */ `
        varying float vRim;
        void main() {
          vec3 n = normalize(normalMatrix * normal);
          vec4 view = modelViewMatrix * vec4(position, 1.0);
          vRim = 1.0 - abs(dot(n, normalize(-view.xyz)));
          gl_Position = projectionMatrix * view;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vRim;
        void main() {
          float glow = pow(vRim, 3.0);
          gl_FragColor = vec4(uColor, glow * 0.9);
        }
      `,
    })
  );
  group.add(atmosphere);

  // Arcs out from Itanagar, each with a light travelling along it.
  const origin = latLon(ORIGIN, radius);
  const arcPositions: number[] = [];
  const arcT: number[] = [];
  const arcPhase: number[] = [];
  const steps = 64;
  DESTINATIONS.forEach((destination, index) => {
    const end = latLon(destination, radius);
    const lift = 1.15 + origin.distanceTo(end) / radius / 3.2;
    const control = origin
      .clone()
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(radius * lift);
    const points = new QuadraticBezierCurve3(origin, control, end).getPoints(
      steps
    );
    for (let i = 0; i < steps; i++) {
      arcPositions.push(...points[i].toArray(), ...points[i + 1].toArray());
      arcT.push(i / steps, (i + 1) / steps);
      arcPhase.push(index / DESTINATIONS.length, index / DESTINATIONS.length);
    }
  });
  const arcGeometry = new BufferGeometry();
  arcGeometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(arcPositions), 3)
  );
  arcGeometry.setAttribute(
    "aT",
    new BufferAttribute(new Float32Array(arcT), 1)
  );
  arcGeometry.setAttribute(
    "aPhase",
    new BufferAttribute(new Float32Array(arcPhase), 1)
  );
  const arcMaterial = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: C.lime.clone() } },
    vertexShader: /* glsl */ `
      attribute float aT;
      attribute float aPhase;
      varying float vT;
      varying float vPhase;
      void main() {
        vT = aT;
        vPhase = aPhase;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      varying float vT;
      varying float vPhase;
      void main() {
        float head = fract(uTime * 0.22 + vPhase) * 1.4;
        float trail = smoothstep(head - 0.4, head, vT) * step(vT, head);
        gl_FragColor = vec4(uColor, 0.12 + trail * 0.9);
      }
    `,
  });
  group.add(new LineSegments(arcGeometry, arcMaterial));

  // Itanagar: a bright point with a pulsing ring.
  const marker = new Mesh(
    new SphereGeometry(radius * 0.025, 16, 16),
    new MeshBasicMaterial({ color: C.lime })
  );
  marker.position.copy(origin);
  const ringMaterial = new MeshBasicMaterial({
    color: C.lime,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
  });
  const ring = new Mesh(
    new RingGeometry(radius * 0.05, radius * 0.065, 48),
    ringMaterial
  );
  ring.position.copy(origin.clone().multiplyScalar(1.002));
  ring.lookAt(origin.clone().multiplyScalar(2));
  group.add(marker, ring);

  // Turn the globe so Itanagar faces us, tilted towards its latitude.
  const facing = -Math.atan2(origin.x, origin.z);

  return {
    object: group,
    facing,
    setPixelRatio: (ratio: number) => {
      dotMaterial.uniforms.uPixelRatio.value = ratio;
    },
    update: (time: number) => {
      dotMaterial.uniforms.uTime.value = time;
      arcMaterial.uniforms.uTime.value = time;
      const pulse = (time * 0.6) % 1;
      ring.scale.setScalar(1 + pulse * 2.2);
      ringMaterial.opacity = 0.9 * (1 - pulse);
    },
  };
}

function globeWorld(
  scene: Scene,
  camera: PerspectiveCamera,
  particles: ReturnType<typeof risingParticles>,
  pixelRatio: number
): World {
  camera.position.set(0, 1.2, 12);
  camera.lookAt(0, 0.6, 0);

  const sun = dawn(16, 0);
  sun.object.position.z = -40;
  particles.object.position.set(0, -4, -6);

  const earth = globe();
  earth.setPixelRatio(pixelRatio);
  const anchor = new Group();
  anchor.add(earth.object);
  earth.object.rotation.x = ORIGIN[0] * DEG * 0.7;

  scene.add(sun.object, particles.object, anchor);

  return {
    resize(width, height) {
      placeFocus(camera, width, height, anchor, 6.2, sun); // Globe and rim.
    },
    update({ time, pointer }) {
      sun.update(time);
      particles.update(time);
      earth.update(time);
      // Keep Itanagar facing the camera from wherever the globe sits, and
      // drift gently around it rather than spinning it out of view.
      const toCamera = Math.atan2(
        camera.position.x - anchor.position.x,
        camera.position.z
      );
      const tilt = Math.atan2(
        anchor.position.y - camera.position.y,
        camera.position.z
      );
      earth.object.rotation.y =
        earth.facing + toCamera + Math.sin(time * 0.15) * 0.3 + pointer.x * 0.3;
      earth.object.rotation.x = ORIGIN[0] * DEG * 0.8 + tilt - pointer.y * 0.15;
      camera.position.x = pointer.x * 0.4;
      camera.lookAt(0, 0.6, 0);
    },
  };
}

type Build = (
  scene: Scene,
  camera: PerspectiveCamera,
  particles: ReturnType<typeof risingParticles>,
  pixelRatio: number
) => World;

const WORLDS: Record<SceneVariant, Build> = {
  hero: heroWorld,
  pillars: pillarsWorld,
  field: fieldWorld,
  globe: globeWorld,
};

// Only these scenes have reflective materials that need an environment.
const NEEDS_ENVIRONMENT: SceneVariant[] = ["hero", "pillars"];

/* ------------------------------------------------------------------ */
/* Host                                                                */
/* ------------------------------------------------------------------ */

type Options = { reduceMotion: boolean };

// Mounts a scene into `host` and returns a cleanup function. Renders only
// while on screen; with reduced motion it draws a single still frame.
export function mount(
  host: HTMLElement,
  variant: SceneVariant,
  options: Options
) {
  let cancelled = false;
  let cleanup: (() => void) | undefined;

  setup(host, variant, options, () => cancelled).then((dispose) => {
    if (cancelled) dispose();
    else cleanup = dispose;
  });

  return () => {
    cancelled = true;
    cleanup?.();
  };
}

// Lets the browser handle input and paint between setup steps, so building
// a scene never shows up as one long main-thread task.
const pause = () => new Promise((resolve) => setTimeout(resolve, 0));

async function setup(
  host: HTMLElement,
  variant: SceneVariant,
  { reduceMotion }: Options,
  isCancelled: () => boolean
): Promise<() => void> {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return () => {};
  }

  // Phones get fewer pixels and particles; both are hard to see at that size.
  const small = window.innerWidth < 640;
  const pixelRatio = Math.min(window.devicePixelRatio, small ? 1.5 : 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.style.cssText =
    "display:block;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease";
  host.appendChild(canvas);

  const scene = new Scene();
  let pmrem: PMREMGenerator | undefined;

  // Frees whatever has been built so far.
  const release = () => {
    scene.traverse((object) => {
      const mesh = object as Mesh;
      mesh.geometry?.dispose();
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      materials.forEach((material) => material?.dispose());
    });
    scene.environment?.dispose();
    pmrem?.dispose();
    renderer.dispose();
    canvas.remove();
  };

  await pause();
  if (isCancelled()) return release;

  if (NEEDS_ENVIRONMENT.includes(variant)) {
    // A small environment is plenty for soft reflections, and far cheaper.
    pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04, 0.1, 100, {
      size: 64,
    }).texture;
    await pause();
    if (isCancelled()) return release;
  }

  const camera = new PerspectiveCamera(35, 1, 0.1, 200);
  const particles = risingParticles({
    count: variant === "pillars" || variant === "globe" || small ? 500 : 1100,
  });
  particles.setPixelRatio(pixelRatio);
  const world = WORLDS[variant](scene, camera, particles, pixelRatio);

  await pause();
  if (isCancelled()) return release;

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    world.resize(width, height);
  };

  const pointer = new Vector2();
  const target = new Vector2();
  const onPointer = (event: PointerEvent) => {
    target.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -((event.clientY / window.innerHeight) * 2 - 1)
    );
  };

  let last = 0;
  const tick = () => {
    const now = performance.now() / 1000;
    const delta = last ? now - last : 0;
    last = now;
    return delta;
  };
  let time = 4; // Start mid-motion so the first frame looks settled.
  let frame = 0;
  let visible = false;
  let shown = false;

  const render = (delta: number) => {
    time += delta;
    pointer.lerp(target, Math.min(1, delta * 3));
    world.update({ time, delta, pointer });
    renderer.render(scene, camera);
    if (!shown) {
      shown = true;
      canvas.style.opacity = "1";
    }
  };

  const loop = () => {
    frame = requestAnimationFrame(loop);
    render(Math.min(tick(), 0.05));
  };

  // Nothing renders until the shaders have compiled off the main thread
  // (where the browser supports it), so the first frames don't stutter.
  let ready = false;
  let disposed = false;

  const start = () => {
    if (frame || reduceMotion || !ready) return;
    last = 0;
    loop();
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (ready && (reduceMotion || !visible)) render(0);
  });
  resizeObserver.observe(host);

  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  visibility.observe(host);

  resize();
  renderer
    .compileAsync(scene, camera)
    .catch(() => {})
    .then(() => {
      if (disposed) return;
      ready = true;
      if (reduceMotion)
        render(10); // A still frame with the pillars grown.
      else if (visible) start();
    });
  if (!reduceMotion) {
    window.addEventListener("pointermove", onPointer, { passive: true });
  }

  return () => {
    disposed = true;
    stop();
    resizeObserver.disconnect();
    visibility.disconnect();
    window.removeEventListener("pointermove", onPointer);
    release();
  };
}
