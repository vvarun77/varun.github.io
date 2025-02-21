document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const content = `
        <div class="splash" id="splash">
            <svg class="circuit" viewBox="0 0 400 150">
                <!-- V -->
                <path d="M30,30 L60,120 L90,30" />
                <!-- A -->
                <path d="M110,120 L140,30 L170,120 M120,80 L160,80" />
                <!-- R -->
                <path d="M190,30 L190,120 M190,30 Q230,30 230,60 Q230,90 190,75 L230,120" />
                <!-- U -->
                <path d="M250,30 L250,100 Q250,120 270,120 Q290,120 290,100 L290,30" />
                <!-- N -->
                <path d="M310,120 L310,30 L370,120 L370,30" />
                <circle class="light" cx="30" cy="30" r="3" />
                <circle class="light" cx="90" cy="30" r="3" />
                <circle class="light" cx="140" cy="30" r="3" />
                <circle class="light" cx="170" cy="120" r="3" />
                <circle class="light" cx="230" cy="120" r="3" />
                <circle class="light" cx="290" cy="30" r="3" />
                <circle class="light" cx="310" cy="120" r="3" />
                <circle class="light" cx="370" cy="30" r="3" />
            </svg>
        </div>
        <div class="content" id="mainContent">
            <h1>Welcome to Varun's Personal Website</h1>
            <p>This is where your content goes. Enjoy your stay!</p>
        </div>
    `;

  app.innerHTML = content;

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
});
