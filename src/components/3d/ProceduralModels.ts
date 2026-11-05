import * as THREE from 'three';

/**
 * Creates an extruded 3D Heart geometry with smooth bevels
 */
export function createHeartGeometry(size: number = 1, depth: number = 0.4): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  // Centered heart shape
  const s = size * 0.5;
  shape.moveTo(0, s * 0.3);
  shape.bezierCurveTo(0, s * 0.7, -s * 0.8, s * 0.7, -s * 0.8, s * 0.2);
  shape.bezierCurveTo(-s * 0.8, -s * 0.3, -s * 0.3, -s * 0.65, 0, -s);
  shape.bezierCurveTo(s * 0.3, -s * 0.65, s * 0.8, -s * 0.3, s * 0.8, s * 0.2);
  shape.bezierCurveTo(s * 0.8, s * 0.7, 0, s * 0.7, 0, s * 0.3);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: depth * size,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.12 * size,
    bevelThickness: 0.12 * size,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}

/**
 * Creates a cute 3D Teddy Bear group with articulable arms and heart
 */
export interface TeddyBearParts {
  group: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  heart: THREE.Mesh;
  head: THREE.Group;
  heartLight: THREE.PointLight;
  setHugState: (open: boolean) => void;
  updateAnimation: (time: number) => void;
}

export function createCuteTeddyBear(): TeddyBearParts {
  const group = new THREE.Group();

  // Materials
  const furMaterial = new THREE.MeshStandardMaterial({
    color: 0xdeb887, // Soft warm caramel/latte
    roughness: 0.85,
    metalness: 0.05,
  });

  const bellyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffedd5, // Soft cream belly
    roughness: 0.9,
    metalness: 0.0,
  });

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d1a29, // Deep plum eyes & nose
    roughness: 0.3,
    metalness: 0.1,
  });

  const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  const heartMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4d79, // Vibrant soft rose
    roughness: 0.25,
    metalness: 0.1,
    emissive: 0xff1744,
    emissiveIntensity: 0.35,
  });

  // BODY
  const bodyGroup = new THREE.Group();
  const bodyGeom = new THREE.SphereGeometry(0.9, 32, 32);
  bodyGeom.scale(1, 1.1, 0.9);
  const bodyMesh = new THREE.Mesh(bodyGeom, furMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyGroup.add(bodyMesh);

  // Belly patch
  const bellyGeom = new THREE.SphereGeometry(0.65, 32, 32);
  bellyGeom.scale(0.85, 0.95, 0.45);
  const bellyMesh = new THREE.Mesh(bellyGeom, bellyMaterial);
  bellyMesh.position.set(0, -0.05, 0.55);
  bodyGroup.add(bellyMesh);

  bodyGroup.position.y = 0;
  group.add(bodyGroup);

  // HEAD GROUP
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.35, 0);

  const headGeom = new THREE.SphereGeometry(0.85, 32, 32);
  headGeom.scale(1.05, 0.98, 1);
  const headMesh = new THREE.Mesh(headGeom, furMaterial);
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  // Muzzle
  const muzzleGeom = new THREE.SphereGeometry(0.42, 32, 32);
  muzzleGeom.scale(1, 0.75, 0.85);
  const muzzleMesh = new THREE.Mesh(muzzleGeom, bellyMaterial);
  muzzleMesh.position.set(0, -0.15, 0.65);
  headGroup.add(muzzleMesh);

  // Nose
  const noseGeom = new THREE.SphereGeometry(0.12, 16, 16);
  noseGeom.scale(1.2, 0.8, 0.8);
  const noseMesh = new THREE.Mesh(noseGeom, darkMaterial);
  noseMesh.position.set(0, -0.07, 0.98);
  headGroup.add(noseMesh);

  // Eyes (Left & Right)
  const eyeGeom = new THREE.SphereGeometry(0.09, 16, 16);
  
  // Left eye
  const leftEye = new THREE.Mesh(eyeGeom, darkMaterial);
  leftEye.position.set(-0.28, 0.08, 0.72);
  const leftSparkle = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), eyeHighlightMaterial);
  leftSparkle.position.set(-0.25, 0.11, 0.79);
  headGroup.add(leftEye, leftSparkle);

  // Right eye
  const rightEye = new THREE.Mesh(eyeGeom, darkMaterial);
  rightEye.position.set(0.28, 0.08, 0.72);
  const rightSparkle = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), eyeHighlightMaterial);
  rightSparkle.position.set(0.25, 0.11, 0.79);
  headGroup.add(rightEye, rightSparkle);

  // Blush cheeks
  const cheekMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa4b6,
    roughness: 0.9,
    transparent: true,
    opacity: 0.55,
  });
  const cheekGeom = new THREE.SphereGeometry(0.16, 16, 16);
  cheekGeom.scale(1, 0.5, 0.2);

  const leftCheek = new THREE.Mesh(cheekGeom, cheekMaterial);
  leftCheek.position.set(-0.48, -0.1, 0.65);
  leftCheek.rotation.y = -0.3;
  const rightCheek = new THREE.Mesh(cheekGeom, cheekMaterial);
  rightCheek.position.set(0.48, -0.1, 0.65);
  rightCheek.rotation.y = 0.3;
  headGroup.add(leftCheek, rightCheek);

  // Ears
  const earGeom = new THREE.SphereGeometry(0.32, 24, 24);
  earGeom.scale(1, 1, 0.5);
  const innerEarGeom = new THREE.SphereGeometry(0.2, 16, 16);
  innerEarGeom.scale(1, 1, 0.4);

  // Left ear
  const leftEar = new THREE.Group();
  leftEar.position.set(-0.72, 0.68, 0.1);
  leftEar.rotation.z = -0.35;
  const leftEarOuter = new THREE.Mesh(earGeom, furMaterial);
  const leftEarInner = new THREE.Mesh(innerEarGeom, bellyMaterial);
  leftEarInner.position.set(0, 0, 0.05);
  leftEar.add(leftEarOuter, leftEarInner);
  headGroup.add(leftEar);

  // Right ear
  const rightEar = new THREE.Group();
  rightEar.position.set(0.72, 0.68, 0.1);
  rightEar.rotation.z = 0.35;
  const rightEarOuter = new THREE.Mesh(earGeom, furMaterial);
  const rightEarInner = new THREE.Mesh(innerEarGeom, bellyMaterial);
  rightEarInner.position.set(0, 0, 0.05);
  rightEar.add(rightEarOuter, rightEarInner);
  headGroup.add(rightEar);

  group.add(headGroup);

  // LEGS / PAWS
  const legGeom = new THREE.SphereGeometry(0.45, 24, 24);
  legGeom.scale(0.85, 0.8, 1.2);
  
  const leftLeg = new THREE.Mesh(legGeom, furMaterial);
  leftLeg.position.set(-0.6, -0.9, 0.35);
  leftLeg.rotation.x = -0.2;
  const rightLeg = new THREE.Mesh(legGeom, furMaterial);
  rightLeg.position.set(0.6, -0.9, 0.35);
  rightLeg.rotation.x = -0.2;

  // Foot pads
  const padGeom = new THREE.SphereGeometry(0.22, 16, 16);
  padGeom.scale(1, 0.85, 0.2);
  const leftPad = new THREE.Mesh(padGeom, bellyMaterial);
  leftPad.position.set(-0.6, -0.88, 0.82);
  leftPad.rotation.x = -0.2;
  const rightPad = new THREE.Mesh(padGeom, bellyMaterial);
  rightPad.position.set(0.6, -0.88, 0.82);
  rightPad.rotation.x = -0.2;

  group.add(leftLeg, rightLeg, leftPad, rightPad);

  // ARMS
  // Pivot points at shoulders
  const armGeom = new THREE.CapsuleGeometry(0.22, 0.65, 8, 16);

  // Left arm group
  const leftArm = new THREE.Group();
  leftArm.position.set(-0.82, 0.5, 0.1);
  const leftArmMesh = new THREE.Mesh(armGeom, furMaterial);
  leftArmMesh.position.set(0, -0.35, 0);
  leftArm.add(leftArmMesh);
  group.add(leftArm);

  // Right arm group
  const rightArm = new THREE.Group();
  rightArm.position.set(0.82, 0.5, 0.1);
  const rightArmMesh = new THREE.Mesh(armGeom, furMaterial);
  rightArmMesh.position.set(0, -0.35, 0);
  rightArm.add(rightArmMesh);
  group.add(rightArm);

  // HEART HELD IN PAWS
  const heartGeom = createHeartGeometry(0.7, 0.35);
  const heart = new THREE.Mesh(heartGeom, heartMaterial);
  heart.position.set(0, 0.1, 0.8);
  heart.rotation.x = 0.1;
  group.add(heart);

  const heartLight = new THREE.PointLight(0xff4d79, 1.8, 3.5);
  heartLight.position.set(0, 0.1, 1.0);
  group.add(heartLight);

  // Default holding state rotations
  let isHugging = false;
  let hugProgress = 0; // 0 (holding heart) to 1 (arms wide open)

  function setHugState(open: boolean) {
    isHugging = open;
  }

  function updateAnimation(time: number) {
    // Smooth transition between holding and hugging
    const target = isHugging ? 1 : 0;
    hugProgress += (target - hugProgress) * 0.08;

    // Breathing motion
    const breath = Math.sin(time * 2.2) * 0.03;
    bodyGroup.scale.set(1 + breath * 0.5, 1.1 + breath, 0.9 + breath * 0.5);
    headGroup.position.y = 1.35 + breath * 0.8;
    headGroup.rotation.z = Math.sin(time * 1.1) * 0.04;
    headGroup.rotation.y = Math.sin(time * 0.7) * 0.06;

    // Heartbeat
    const heartPulse = 1 + (Math.sin(time * 6) > 0.6 ? 0.12 : 0) + Math.sin(time * 3) * 0.04;
    heart.scale.set(heartPulse, heartPulse, heartPulse);
    heartLight.intensity = 1.4 * heartPulse;

    // Arms interpolation
    // Closed (holding heart):
    const closedLeftRotX = 0.6;
    const closedLeftRotY = 0.5;
    const closedLeftRotZ = 0.5;

    const closedRightRotX = 0.6;
    const closedRightRotY = -0.5;
    const closedRightRotZ = -0.5;

    // Open (warm big hug):
    const openLeftRotX = 0.1;
    const openLeftRotY = -0.4;
    const openLeftRotZ = 1.1;

    const openRightRotX = 0.1;
    const openRightRotY = 0.4;
    const openRightRotZ = -1.1;

    leftArm.rotation.x = THREE.MathUtils.lerp(closedLeftRotX, openLeftRotX, hugProgress) + Math.sin(time * 2) * 0.03;
    leftArm.rotation.y = THREE.MathUtils.lerp(closedLeftRotY, openLeftRotY, hugProgress);
    leftArm.rotation.z = THREE.MathUtils.lerp(closedLeftRotZ, openLeftRotZ, hugProgress);

    rightArm.rotation.x = THREE.MathUtils.lerp(closedRightRotX, openRightRotX, hugProgress) + Math.sin(time * 2) * 0.03;
    rightArm.rotation.y = THREE.MathUtils.lerp(closedRightRotY, openRightRotY, hugProgress);
    rightArm.rotation.z = THREE.MathUtils.lerp(closedRightRotZ, openRightRotZ, hugProgress);

    // If hugging, heart floats slightly upward with extra glow
    if (hugProgress > 0.01) {
      heart.position.y = 0.1 + hugProgress * 0.5 + Math.sin(time * 3) * 0.08;
      heart.position.z = 0.8 + hugProgress * 0.4;
    } else {
      heart.position.y = 0.1 + Math.sin(time * 2.2) * 0.02;
      heart.position.z = 0.8;
    }
  }

  return {
    group,
    leftArm,
    rightArm,
    heart,
    head: headGroup,
    heartLight,
    setHugState,
    updateAnimation,
  };
}

/**
 * Creates a delicate 3D flower blossom with petals and golden center
 */
export function createFlowerMesh(color: number = 0xf8c8dc): THREE.Group {
  const flower = new THREE.Group();

  const petalGeom = new THREE.SphereGeometry(0.25, 16, 16);
  petalGeom.scale(0.5, 1, 0.15);
  petalGeom.translate(0, 0.25, 0);

  const petalMat = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });

  const petalCount = 5;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const petal = new THREE.Mesh(petalGeom, petalMat);
    petal.rotation.z = angle;
    petal.rotation.x = 0.15;
    flower.add(petal);
  }

  // Center
  const centerGeom = new THREE.SphereGeometry(0.12, 16, 16);
  const centerMat = new THREE.MeshStandardMaterial({
    color: 0xffe082, // Warm golden pistil
    roughness: 0.3,
    metalness: 0.2,
    emissive: 0xffb74d,
    emissiveIntensity: 0.2,
  });
  const center = new THREE.Mesh(centerGeom, centerMat);
  center.position.z = 0.04;
  flower.add(center);

  return flower;
}

/**
 * Creates a delicate 3D butterfly with flapping wings
 */
export interface ButterflyInstance {
  group: THREE.Group;
  leftWing: THREE.Group;
  rightWing: THREE.Group;
  update: (time: number, speed?: number) => void;
}

export function createButterfly(wingColor: number = 0xd8c9f5): ButterflyInstance {
  const group = new THREE.Group();

  // Body
  const bodyGeom = new THREE.CapsuleGeometry(0.04, 0.35, 8, 8);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3d2737, roughness: 0.5 });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  // Antennae
  const antennaGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.18, 6);
  const leftAnt = new THREE.Mesh(antennaGeom, bodyMat);
  leftAnt.position.set(-0.04, 0.06, 0.2);
  leftAnt.rotation.z = -0.5;
  leftAnt.rotation.x = 0.4;
  const rightAnt = new THREE.Mesh(antennaGeom, bodyMat);
  rightAnt.position.set(0.04, 0.06, 0.2);
  rightAnt.rotation.z = 0.5;
  rightAnt.rotation.x = 0.4;
  group.add(leftAnt, rightAnt);

  // Wing shape
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.bezierCurveTo(0.2, 0.4, 0.6, 0.6, 0.7, 0.3);
  wingShape.bezierCurveTo(0.75, 0.1, 0.55, -0.2, 0.3, -0.3);
  wingShape.bezierCurveTo(0.4, -0.5, 0.2, -0.6, 0.05, -0.4);
  wingShape.lineTo(0, 0);

  const wingGeom = new THREE.ShapeGeometry(wingShape);
  const wingMat = new THREE.MeshStandardMaterial({
    color: wingColor,
    roughness: 0.3,
    metalness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.88,
  });

  // Left wing
  const leftWing = new THREE.Group();
  leftWing.position.set(-0.02, 0, 0);
  const leftWingMesh = new THREE.Mesh(wingGeom, wingMat);
  leftWingMesh.scale.set(-0.8, 0.8, 0.8);
  leftWingMesh.rotation.x = -Math.PI / 2;
  leftWing.add(leftWingMesh);
  group.add(leftWing);

  // Right wing
  const rightWing = new THREE.Group();
  rightWing.position.set(0.02, 0, 0);
  const rightWingMesh = new THREE.Mesh(wingGeom, wingMat);
  rightWingMesh.scale.set(0.8, 0.8, 0.8);
  rightWingMesh.rotation.x = -Math.PI / 2;
  rightWing.add(rightWingMesh);
  group.add(rightWing);

  function update(time: number, speed: number = 8) {
    const flap = Math.sin(time * speed) * 0.75;
    leftWing.rotation.z = -flap;
    rightWing.rotation.z = flap;
  }

  return { group, leftWing, rightWing, update };
}

/**
 * Creates an interactive 3D Gift Box with opening lid & ribbon
 */
export interface GiftBoxParts {
  group: THREE.Group;
  lidGroup: THREE.Group;
  burstLight: THREE.PointLight;
  openBox: () => void;
  closeBox: () => void;
  update: (time: number) => void;
}

export function create3DGiftBox(): GiftBoxParts {
  const group = new THREE.Group();

  const boxMat = new THREE.MeshStandardMaterial({
    color: 0xefa6b8, // Rose pink box
    roughness: 0.35,
    metalness: 0.2,
  });

  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xfff8f0, // Cream satin ribbon
    roughness: 0.3,
    metalness: 0.35,
  });

  // Base Box
  const baseGeom = new THREE.BoxGeometry(1.6, 1.4, 1.6);
  const baseMesh = new THREE.Mesh(baseGeom, boxMat);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.position.y = 0.7;
  group.add(baseMesh);

  // Ribbons on base
  const rib1Geom = new THREE.BoxGeometry(1.62, 1.41, 0.32);
  const rib1 = new THREE.Mesh(rib1Geom, ribbonMat);
  rib1.position.y = 0.7;
  const rib2Geom = new THREE.BoxGeometry(0.32, 1.41, 1.62);
  const rib2 = new THREE.Mesh(rib2Geom, ribbonMat);
  rib2.position.y = 0.7;
  group.add(rib1, rib2);

  // LID GROUP (pivoted from the back edge for realistic opening)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 1.4, -0.8); // Pivot point at back top edge

  // The lid content is offset from pivot
  const lidContent = new THREE.Group();
  lidContent.position.set(0, 0.12, 0.8);

  const lidGeom = new THREE.BoxGeometry(1.72, 0.25, 1.72);
  const lidMesh = new THREE.Mesh(lidGeom, boxMat);
  lidMesh.castShadow = true;
  lidContent.add(lidMesh);

  // Ribbons on lid
  const lidRib1 = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.26, 0.33), ribbonMat);
  const lidRib2 = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.26, 1.74), ribbonMat);
  lidContent.add(lidRib1, lidRib2);

  // Bow loops on top of lid
  const bowLoopGeom = new THREE.TorusGeometry(0.28, 0.08, 12, 24);
  const bow1 = new THREE.Mesh(bowLoopGeom, ribbonMat);
  bow1.position.set(-0.2, 0.3, 0);
  bow1.rotation.y = 0.5;
  bow1.rotation.x = 0.4;

  const bow2 = new THREE.Mesh(bowLoopGeom, ribbonMat);
  bow2.position.set(0.2, 0.3, 0);
  bow2.rotation.y = -0.5;
  bow2.rotation.x = -0.4;

  const bowCenter = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), ribbonMat);
  bowCenter.position.set(0, 0.24, 0);

  lidContent.add(bow1, bow2, bowCenter);
  lidGroup.add(lidContent);
  group.add(lidGroup);

  // Glowing burst light inside box
  const burstLight = new THREE.PointLight(0xff69b4, 0, 8);
  burstLight.position.set(0, 1.2, 0);
  group.add(burstLight);

  let isOpen = false;
  let openAngle = 0;

  function openBox() {
    isOpen = true;
  }

  function closeBox() {
    isOpen = false;
  }

  function update(time: number) {
    const targetAngle = isOpen ? -Math.PI * 0.65 : 0;
    openAngle += (targetAngle - openAngle) * 0.1;
    lidGroup.rotation.x = openAngle;

    if (isOpen) {
      burstLight.intensity = THREE.MathUtils.lerp(burstLight.intensity, 3.5, 0.08);
      // Gentle glow pulse
      burstLight.intensity += Math.sin(time * 5) * 0.3;
    } else {
      burstLight.intensity = THREE.MathUtils.lerp(burstLight.intensity, 0, 0.1);
    }
  }

  return {
    group,
    lidGroup,
    burstLight,
    openBox,
    closeBox,
    update,
  };
}

/**
 * Creates 3D Soft Puffy Cloud
 */
export function createCloudMesh(color: number = 0xfff8f0): THREE.Group {
  const cloud = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.95,
    metalness: 0.0,
    transparent: true,
    opacity: 0.85,
  });

  const puffCount = 6;
  for (let i = 0; i < puffCount; i++) {
    const radius = 0.4 + Math.random() * 0.35;
    const geom = new THREE.SphereGeometry(radius, 16, 16);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(
      (i - puffCount / 2) * 0.45 + (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    );
    cloud.add(mesh);
  }

  return cloud;
}
