import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createHeartGeometry } from './ProceduralModels';

export const NightSkyScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Deep starry lighting
    const ambientLight = new THREE.AmbientLight(0x2a1e35, 1.5);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    moonLight.position.set(5, 5, 4);
    scene.add(moonLight);

    const purpleGlow = new THREE.PointLight(0xd8c9f5, 1.8, 15);
    purpleGlow.position.set(-4, -2, 3);
    scene.add(purpleGlow);

    // 3D Crescent Moon
    const moonGroup = new THREE.Group();
    moonGroup.position.set(3.2, 2.0, -1.5);

    // Moon geometry using torus / arc or sculpted shape
    const moonShape = new THREE.Shape();
    moonShape.absarc(0, 0, 1.0, 0, Math.PI * 2, false);
    const moonHole = new THREE.Path();
    moonHole.absarc(0.4, 0.25, 0.88, 0, Math.PI * 2, true);
    moonShape.holes.push(moonHole);

    const moonGeom = new THREE.ExtrudeGeometry(moonShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    moonGeom.center();

    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xfff4d6,
      roughness: 0.35,
      metalness: 0.1,
      emissive: 0xffe6aa,
      emissiveIntensity: 0.45,
    });
    const moonMesh = new THREE.Mesh(moonGeom, moonMat);
    moonMesh.rotation.z = -0.3;
    moonGroup.add(moonMesh);

    const moonGlowLight = new THREE.PointLight(0xffe6aa, 1.8, 8);
    moonGroup.add(moonGlowLight);
    scene.add(moonGroup);

    // Central Glowing 3D Heart
    const heartGeom = createHeartGeometry(1.4, 0.6);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff4d79,
      roughness: 0.2,
      metalness: 0.15,
      emissive: 0xd91448,
      emissiveIntensity: 0.45,
    });
    const heartMesh = new THREE.Mesh(heartGeom, heartMat);
    heartMesh.position.set(0, -0.2, 0);
    scene.add(heartMesh);

    const heartCenterLight = new THREE.PointLight(0xff4d79, 2.2, 6);
    heartMesh.add(heartCenterLight);

    // Floating Stars (Points & 3D Star Geometries)
    const starCount = 180;
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 2] = -5 + (Math.random() - 0.5) * 8;
      starScales[i] = Math.random();
    }

    const starBuffer = new THREE.BufferGeometry();
    starBuffer.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    // Star texture
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 32;
    sCanvas.height = 32;
    const sCtx = sCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(235, 220, 255, 0.8)');
      grad.addColorStop(1, 'rgba(200, 180, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(sCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 0.35,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starBuffer, starMat);
    scene.add(starPoints);

    // Subtle Shooting Stars
    interface ShootingStar {
      mesh: THREE.Line;
      vx: number;
      vy: number;
      life: number;
    }
    const shootingStars: ShootingStar[] = [];

    function spawnShootingStar() {
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-0.8, 0.4, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      line.position.set(
        1 + Math.random() * 5,
        2 + Math.random() * 3,
        -2 + Math.random() * 2
      );
      scene.add(line);
      shootingStars.push({
        mesh: line,
        vx: -0.15 - Math.random() * 0.1,
        vy: -0.08 - Math.random() * 0.05,
        life: 1.0,
      });
    }

    // Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();
    let nextShootingStarTime = 2.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Moon gentle rocking & float
      moonGroup.position.y = 2.0 + Math.sin(time * 0.8) * 0.12;
      moonGroup.rotation.y = Math.sin(time * 0.5) * 0.15;

      // Heart breathing & rotation
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      heartMesh.scale.set(pulse, pulse, pulse);
      heartMesh.rotation.y = Math.sin(time * 0.8) * 0.35 + mouseX * 0.25;
      heartMesh.rotation.x = Math.sin(time * 0.6) * 0.15 - mouseY * 0.2;
      heartMesh.position.y = -0.2 + Math.sin(time * 1.5) * 0.1;

      // Stars twinkling
      starPoints.rotation.y = time * 0.015;
      starPoints.rotation.x = time * 0.008;

      // Shooting stars spawn
      if (time > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = time + 3.0 + Math.random() * 4.0;
      }

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.mesh.position.x += ss.vx;
        ss.mesh.position.y += ss.vy;
        ss.life -= 0.02;
        (ss.mesh.material as THREE.LineBasicMaterial).opacity = ss.life;

        if (ss.life <= 0) {
          scene.remove(ss.mesh);
          shootingStars.splice(i, 1);
        }
      }

      // Parallax camera
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[540px] relative pointer-events-none select-none"
    />
  );
};
