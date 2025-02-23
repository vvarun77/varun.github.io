function main() {
  const app = document.getElementById("app");

  function createSVGElement(type, attributes) {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const [key, value] of Object.entries(attributes)) {
      elem.setAttribute(key, value);
    }
    return elem;
  }

  function Circuit() {
    const svg = createSVGElement("svg", {
      class: "circuit",
      viewBox: "0 0 400 150",
    });

    const paths = [
      "M30,30 L60,120 L90,30",
      "M110,120 L140,30 L170,120 M120,80 L160,80",
      "M190,30 L190,120 M190,30 Q230,30 230,60 Q230,90 190,75 L230,120",
      "M250,30 L250,100 Q250,120 270,120 Q290,120 290,100 L290,30",
      "M310,120 L310,30 L370,120 L370,30",
    ];

    paths.forEach((d) => {
      svg.appendChild(createSVGElement("path", { d }));
    });

    const lights = [
      [30, 30],
      [90, 30],
      [140, 30],
      [170, 120],
      [230, 120],
      [290, 30],
      [310, 120],
      [370, 30],
    ];

    lights.forEach(([cx, cy]) => {
      svg.appendChild(
        createSVGElement("circle", { class: "light", cx, cy, r: 3 }),
      );
    });

    return svg;
  }

  function MainContent() {
    const content = document.createElement("div");
    content.id = "mainContent";
    content.className = "content";

    const h1 = document.createElement("h1");
    h1.textContent = "I'm Varun :)";

    const p = document.createElement("p");
    p.textContent =
      "I'm an Electrical and Computer Engineering major at the University of Washington. You can view my work below!";

    content.appendChild(h1);
    content.appendChild(p);

    return content;
  }

  function Splash() {
    const splash = document.createElement("div");
    splash.id = "splash";
    splash.className = "splash";
    splash.appendChild(Circuit());
    return splash;
  }

  app.appendChild(Splash());
  app.appendChild(MainContent());

  const animationDuration = 3350; // 2s for drawing + 1.35s for lights

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
}

main();
