import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import {
  createCuteTeddyBear,
  createHeartGeometry,
  createFlowerMesh,
  createButterfly,
  createCloudMesh,
  TeddyBearParts,
  ButterflyInstance,
} from './ProceduralModels';

export interface ComfortWorldHandle {
  triggerVirtualHug: () => void;
}

interface ComfortWorldSceneProps {
  onHugTriggered?: () => void;
  onObjectClicked?: (name: string) => void;
}

export const ComfortWorldScene = forwardRef<ComfortWorldHandle, ComfortWorldSceneProps>(
  ({ onHugTriggered, onObjectClicked }, ref) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const teddyRef = useRef<TeddyBearParts | null>(null);
    const triggerHugRef = useRef<() => void>(() => {});

    useImperativeHandle(ref, () => ({
      triggerVirtualHug: () => {
        triggerHugRef.current();
      },
    }));

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
      camera.position.set(0, 0.5, 7);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.3);
      scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xfff8f0, 1.6);
      sunLight.position.set(5, 8, 6);
      sunLight.castShadow = true;
      scene.add(sunLight);

      const softLavenderLight = new THREE.PointLight(0xd8c9f5, 1.4, 12);
      softLavenderLight.position.set(-4, 2, 3);
      scene.add(softLavenderLight);

      const softBlushLight = new THREE.PointLight(0xf8c8dc, 1.4, 12);
      softBlushLight.position.set(4, -1, 3);
      scene.add(softBlushLight);

      // Teddy Bear in center
      const teddy = createCuteTeddyBear();
      teddy.group.position.set(0, -0.9, 0);
      scene.add(teddy.group);
      teddyRef.current = teddy;

      // Floating Interactive Heart following cursor
      const heartGeom = createHeartGeometry(0.55, 0.3);
      const heartMat = new THREE.MeshStandardMaterial({
        color: 0xff4d79,
        roughness: 0.2,
        metalness: 0.15,
        emissive: 0xff2a5f,
        emissiveIntensity: 0.4,
      });
      const cursorHeart = new THREE.Mesh(heartGeom, heartMat);
      cursorHeart.position.set(0, 1.5, 1.5);
      scene.add(cursorHeart);

      const cursorHeartLight = new THREE.PointLight(0xff4d79, 1.5, 4);
      cursorHeart.add(cursorHeartLight);

      // Dreamy Animated Clouds in background
      const clouds: { group: THREE.Group; initialX: number; speed: number; y: number }[] = [];
      for (let i = 0; i < 5; i++) {
        const cloud = createCloudMesh(i % 2 === 0 ? 0xfff8f0 : 0xfdf0f5);
        const x = (i - 2) * 2.8 + (Math.random() - 0.5) * 1;
        const y = 1.6 + (Math.random() - 0.5) * 1.5;
        const z = -2.5 - Math.random() * 2;
        cloud.position.set(x, y, z);
        cloud.scale.setScalar(0.9 + Math.random() * 0.4);
        scene.add(cloud);
        clouds.push({
          group: cloud,
          initialX: x,
          speed: 0.25 + Math.random() * 0.2,
          y,
        });
      }

      // Floating Flowers
      const flowers: { group: THREE.Group; initialPos: THREE.Vector3; speed: number }[] = [];
      const flowerColors = [0xf8c8dc, 0xd8c9f5, 0xffb6c1, 0xffe4e1];
      for (let i = 0; i < 7; i++) {
        const flower = createFlowerMesh(flowerColors[i % flowerColors.length]);
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          -1.5 + Math.random() * 3.5,
          (Math.random() - 0.5) * 3
        );
        flower.position.copy(pos);
        flower.scale.setScalar(0.4 + Math.random() * 0.3);
        scene.add(flower);
        flowers.push({
          group: flower,
          initialPos: pos.clone(),
          speed: 0.8 + Math.random() * 1.2,
        });
      }

      // Fluttering 3D Butterflies
      const butterflies: { instance: ButterflyInstance; angle: number; radius: number; height: number; speed: number }[] = [];
      const bColors = [0xd8c9f5, 0xf8c8dc, 0xffd1dc];
      for (let i = 0; i < 3; i++) {
        const b = createButterfly(bColors[i % bColors.length]);
        scene.add(b.group);
        butterflies.push({
          instance: b,
          angle: (i / 3) * Math.PI * 2,
          radius: 1.8 + i * 0.7,
          height: 0.2 + i * 0.6,
          speed: 0.6 + i * 0.3,
        });
      }

      // Floating upward hearts when hug is triggered
      interface HugHeart {
        mesh: THREE.Mesh;
        vy: number;
        rotSpeed: number;
        life: number;
      }
      const hugHearts: HugHeart[] = [];

      function spawnHugHearts() {
        for (let i = 0; i < 8; i++) {
          const hMesh = new THREE.Mesh(createHeartGeometry(0.3 + Math.random() * 0.25, 0.2), heartMat);
          hMesh.position.set(
            (Math.random() - 0.5) * 1.2,
            -0.2 + (Math.random() - 0.5) * 0.4,
            0.8 + Math.random() * 0.5
          );
          scene.add(hMesh);
          hugHearts.push({
            mesh: hMesh,
            vy: 0.03 + Math.random() * 0.03,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            life: 1.0,
          });
        }
      }

      let hugTimeoutId: number | null = null;

      const triggerVirtualHug = () => {
        teddy.setHugState(true);
        spawnHugHearts();

        if (hugTimeoutId) clearTimeout(hugTimeoutId);
        hugTimeoutId = window.setTimeout(() => {
          teddy.setHugState(false);
        }, 5500);

        if (onHugTriggered) onHugTriggered();
      };

      triggerHugRef.current = triggerVirtualHug;

      // Mouse tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetHeartX = 0;
      let targetHeartY = 1.5;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseX = normX;
        mouseY = normY;

        // Position heart in 3D world near cursor
        targetHeartX = normX * 2.8;
        targetHeartY = normY * 1.8 + 0.5;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Interactive Click on 3D elements
      const raycaster = new THREE.Raycaster();
      const mouseVec = new THREE.Vector2();

      const handleClick = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseVec.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        raycaster.setFromCamera(mouseVec, camera);
        
        // Check teddy
        const teddyHits = raycaster.intersectObjects(teddy.group.children, true);
        if (teddyHits.length > 0) {
          triggerVirtualHug();
          if (onObjectClicked) onObjectClicked('teddy');
          return;
        }

        // Check flowers
        for (const f of flowers) {
          const hits = raycaster.intersectObjects(f.group.children, true);
          if (hits.length > 0) {
            f.group.scale.multiplyScalar(1.3);
            setTimeout(() => f.group.scale.divideScalar(1.3), 300);
            if (onObjectClicked) onObjectClicked('flower');
            return;
          }
        }

        // Check butterflies
        for (const b of butterflies) {
          const hits = raycaster.intersectObjects(b.instance.group.children, true);
          if (hits.length > 0) {
            b.height += 0.5;
            if (onObjectClicked) onObjectClicked('butterfly');
            return;
          }
        }
      };

      container.addEventListener('click', handleClick);

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

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isVisible) return;

        const time = clock.getElapsedTime();

        // Update Teddy
        teddy.updateAnimation(time);

        // Subtle camera parallax
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.3 + 0.5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Floating Cursor Heart
        cursorHeart.position.x += (targetHeartX - cursorHeart.position.x) * 0.08;
        cursorHeart.position.y += (targetHeartY - cursorHeart.position.y) * 0.08;
        cursorHeart.rotation.y = time * 1.5;
        cursorHeart.rotation.z = Math.sin(time * 2) * 0.2;
        const pulse = 1 + Math.sin(time * 4) * 0.1;
        cursorHeart.scale.set(pulse, pulse, pulse);

        // Update Clouds
        clouds.forEach((c) => {
          c.group.position.x += c.speed * 0.005;
          if (c.group.position.x > 5) {
            c.group.position.x = -5;
          }
          c.group.position.y = c.y + Math.sin(time * 0.8 + c.initialX) * 0.1;
        });

        // Update Flowers
        flowers.forEach((f) => {
          f.group.position.y = f.initialPos.y + Math.sin(time * f.speed) * 0.3;
          f.group.rotation.y += 0.01;
          f.group.rotation.x = Math.sin(time * 0.8) * 0.2;
        });

        // Update Butterflies
        butterflies.forEach((b) => {
          b.angle += b.speed * 0.015;
          const bx = Math.cos(b.angle) * b.radius;
          const bz = Math.sin(b.angle) * b.radius;
          const by = b.height + Math.sin(time * 3 + b.angle) * 0.3;

          b.instance.group.position.set(bx, by, bz);
          // Face direction of movement
          b.instance.group.rotation.y = -b.angle - Math.PI / 2;
          b.instance.update(time, 14);
        });

        // Update Hug Hearts
        for (let i = hugHearts.length - 1; i >= 0; i--) {
          const hh = hugHearts[i];
          hh.mesh.position.y += hh.vy;
          hh.mesh.position.x += Math.sin(time * 4 + i) * 0.01;
          hh.mesh.rotation.y += hh.rotSpeed;
          hh.life -= 0.008;

          const s = Math.max(0, hh.life);
          hh.mesh.scale.set(s, s, s);

          if (hh.life <= 0) {
            scene.remove(hh.mesh);
            hugHearts.splice(i, 1);
          }
        }

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
        if (hugTimeoutId) clearTimeout(hugTimeoutId);
        observer.disconnect();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('click', handleClick);
        cancelAnimationFrame(animationFrameId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }, [onHugTriggered, onObjectClicked]);

    return (
      <div
        ref={mountRef}
        className="w-full h-full min-h-[420px] sm:min-h-[500px] md:min-h-[600px] relative cursor-pointer select-none"
        title="Interact with the teddy, flowers, or butterflies! 🌸"
      />
    );
  }
);

ComfortWorldScene.displayName = 'ComfortWorldScene';
