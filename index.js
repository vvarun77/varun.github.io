document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  function createThreeAnimation() {
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Text geometry
    const loader = new THREE.FontLoader();
    const letters = "VARUN".split("");
    const letterMeshes = [];
    const letterSpacing = 1.2;

    loader.load(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/fonts/helvetiker_regular.typeface.json",
      function (font) {
        letters.forEach((letter, index) => {
          const geometry = new THREE.TextGeometry(letter, {
            font: font,
            size: 1,
            height: 0.2,
          });

          const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x0000ff,
            emissiveIntensity: 0,
            shininess: 100,
          });

          const mesh = new THREE.Mesh(geometry, material);
          geometry.computeBoundingBox();
          const letterWidth =
            geometry.boundingBox.max.x - geometry.boundingBox.min.x;
          mesh.position.x =
            (index - letters.length / 2) * letterWidth * letterSpacing;
          mesh.position.z = -5;

          letterMeshes.push(mesh);
          scene.add(mesh);
        });
      },
    );

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

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
          mesh.rotation.y = Math.sin(t) * 0.1;
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

  // Create splash screen component with Three.js animation
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
