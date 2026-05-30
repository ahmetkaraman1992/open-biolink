const fallbackConfig = {
  name: "Your Name",
  headline: "Creator, freelancer, developer, or small business owner",
  bio: "A short bio goes here.",
  avatar: "/avatar.png",
  links: [
    {
      title: "Website",
      url: "https://example.com"
    },
    {
      title: "GitHub",
      url: "https://github.com/yourusername"
    },
    {
      title: "Contact",
      url: "mailto:hello@example.com"
    }
  ]
};

async function loadConfig() {
  try {
    const response = await fetch("/config.json");

    if (!response.ok) {
      return fallbackConfig;
    }

    return await response.json();
  } catch {
    return fallbackConfig;
  }
}

function renderProfile(config) {
  document.title = `${config.name} | Open BioLink`;

  document.getElementById("name").textContent = config.name;
  document.getElementById("headline").textContent = config.headline;
  document.getElementById("bio").textContent = config.bio;

  const avatar = document.getElementById("avatar");
  avatar.src = config.avatar || "/avatar.png";
  avatar.alt = `${config.name} avatar`;

  const links = document.getElementById("links");
  links.innerHTML = "";

  config.links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.className = "link";
    anchor.href = link.url;
    anchor.textContent = link.title;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    links.appendChild(anchor);
  });
}

loadConfig().then(renderProfile);
