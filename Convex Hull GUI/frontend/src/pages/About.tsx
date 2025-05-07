import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a torus knot
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4CAF50,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 25, 25);
    scene.add(pointLight);

    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 container mx-auto p-8"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">About Convex Hull GUI</h1>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97, rotate: -1 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-2xl shadow-xl text-xl font-bold tracking-wide border-2 border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:from-blue-800 hover:to-blue-950">
              Made by Param Varsha
            </span>
          </motion.div>
          
          <div className="space-y-6 text-lg text-gray-300">
            <p>
              The Convex Hull GUI is an innovative web application designed to help users visualize and define territorial boundaries using the Convex Hull algorithm. This tool combines advanced computational geometry with modern web technologies to create an intuitive and powerful interface for geographic analysis.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Interactive map interface with real-time point plotting</li>
              <li>Automatic convex hull calculation and visualization</li>
              <li>Support for manual coordinate input and map-based point selection</li>
              <li>3D visualization effects for enhanced user experience</li>
              <li>Responsive design that works on all devices</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">How It Works</h2>
            <p>
              The application uses the Convex Hull algorithm to determine the smallest convex polygon that contains all given points. This is particularly useful for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Defining approximate country borders</li>
              <li>Creating territorial boundaries</li>
              <li>Analyzing geographic regions</li>
              <li>Visualizing spatial relationships</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Technology Stack</h2>
            <p>
              Built with modern web technologies including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>React with TypeScript for the frontend</li>
              <li>Node.js and Express for the backend</li>
              <li>Google Maps API for geographic visualization</li>
              <li>Three.js for 3D effects</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 