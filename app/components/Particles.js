'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (!isWebGLAvailable()) {
      console.warn("WebGL not supported → Scene skipped");
      return;
    }

    let renderer;

    try {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.TorusKnotGeometry(6, 2, 80, 12);
      const material = new THREE.MeshStandardMaterial({
        color: 0xff6d00,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const light = new THREE.PointLight(0x9d4edd, 1.5);
      light.position.set(10, 10, 10);
      scene.add(light);

      camera.position.z = 30;

      let animationId;

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.005;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      };
    } catch (err) {
      console.warn("Scene failed:", err);
    }
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}