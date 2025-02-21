document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  function createThreeAnimation() {
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // Match your dark background

    // Camera setup with offset position
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(3, 1, 8); // Positioned slightly to the right and up
    camera.lookAt(-1, 0, 0); // Looking slightly left at the text

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Text geometry
    const loader = new THREE.FontLoader();
    const letters = "VARUN".split("");
    const letterMeshes = [];
    const letterSpacing = 1.5; // Increased spacing for better 3D view

    loader.load(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/fonts/helvetiker_regular.typeface.json",
      function (font) {
        letters.forEach((letter, index) => {
          const geometry = new THREE.TextGeometry(letter, {
            font: font,
            size: 1.2, // Slightly larger
            height: 0.4, // More depth
            curveSegments: 12, // Smoother curves
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          // Create material with more dramatic lighting properties
          const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x0000ff,
            emissiveIntensity: 0,
            shininess: 100,
            specular: 0x444444,
          });

          const mesh = new THREE.Mesh(geometry, material);
          geometry.computeBoundingBox();
          const letterWidth =
            geometry.boundingBox.max.x - geometry.boundingBox.min.x;
          mesh.position.x =
            (index - letters.length / 2) * letterWidth * letterSpacing;

          // Slight rotation for each letter
          mesh.rotation.y = -Math.PI * 0.05; // Initial rotation to match camera angle

          letterMeshes.push(mesh);
          scene.add(mesh);
        });
      },
    );

    // Enhanced lighting setup
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 3, 4); // Adjusted for new camera angle
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight2.position.set(-5, 1, 4); // Secondary light for better depth
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Animation
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);

      time += 0.02;
      letterMeshes.forEach((mesh, index) => {
        if (mesh && mesh.material) {
          const delay = index * 0.2;
          const t = Math.max(0, time - delay);
          mesh.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
          // Subtle floating animation
          mesh.position.y = Math.sin(t * 2 + index) * 0.05;
          mesh.rotation.y = -Math.PI * 0.05 + Math.sin(t) * 0.05; // Oscillate around base rotation
        }
      });

      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return container;
  }

  // Create splash screen component
  function Splash() {
    const splash = document.createElement("div");
    splash.id = "splash";
    splash.className = "splash";
    splash.appendChild(createThreeAnimation());
    return splash;
  }

  // Create main content component
  function MainContent() {
    const content = document.createElement("div");
    content.id = "mainContent";
    content.className = "content";

    const h1 = document.createElement("h1");
    h1.textContent = "Welcome to Varun's Personal Website";

    const p = document.createElement("p");
    p.textContent = "This is where your content goes. Enjoy your stay!";

    content.appendChild(h1);
    content.appendChild(p);
    return content;
  }

  // Add components to the page
  app.appendChild(Splash());
  app.appendChild(MainContent());

  // Handle animation timing and transitions
  const animationDuration = 3350;
  setTimeout(() => {
    const splash = document.getElementById("splash");
    const mainContent = document.getElementById("mainContent");
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.classList.add("show");
      document.body.style.overflow = "auto";
    }, 500);
  }, animationDuration);
});
