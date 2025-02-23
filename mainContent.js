export function MainContent() {
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
