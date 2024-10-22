//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const works = [
  {
    title: "file-boy",
    desc: "a no-BS encryption/decryption CLI, made with golang. It allows you to encrypt and decrypt files or entire directories with ease",
    tags: ["go", "cli"],
    github: "https://github.com/Muhammed-Rajab/file-boy",
    under_development: false,
    new_project: false,
  },
  {
    title: "img2ascii.cpp",
    desc: "convert your images🖼️ to ASCII art🎨 instantly with img2ascii.cpp!",
    tags: ["cpp", "cli"],
    github: "https://github.com/Muhammed-Rajab/img2ascii.cpp/",
    under_development: false,
    new_project: false,
  },
  {
    title: "camouflage.cpp",
    desc: "a fun and visual🦎 way to see natural selection in action!",
    tags: ["cpp", "raylib", "genetic algoritm"],
    github: "https://github.com/Muhammed-Rajab/camouflage.cpp",
    under_development: false,
    new_project: false,
  },
  {
    title: "terrible-renderer.cpp",
    desc: "couldn't bother myself finding a better name",
    tags: ["cpp", "ascii", "raymarching", "rendering", "cli"],
    github: "https://github.com/Muhammed-Rajab/terrible-renderer.cpp",
    under_development: false,
    new_project: true,
  },

  // * DUMMY PROJECTS TO TEST
  {
    title: "ascii-painter.cpp",
    desc: "An ASCII art generator with customizable color palettes",
    tags: ["cpp", "ascii", "art", "cli", "graphics"],
    github: "https://github.com/Muhammed-Rajab/ascii-painter.cpp",
    under_development: false,
    new_project: true,
  },
  {
    title: "noise-generator.cpp",
    desc: "A noise generation tool using Simplex and Perlin algorithms",
    tags: ["cpp", "noise", "perlin", "simplex", "rendering"],
    github: "https://github.com/Muhammed-Rajab/noise-generator.cpp",
    under_development: false,
    new_project: false,
  },
  {
    title: "terminal-animation.cpp",
    desc: "Creates smooth animations using ASCII characters in the terminal",
    tags: ["cpp", "ascii", "animation", "terminal", "cli"],
    github: "https://github.com/Muhammed-Rajab/terminal-animation.cpp",
    under_development: true,
    new_project: false,
  },
  {
    title: "cli-game-engine.cpp",
    desc: "A simple game engine for terminal-based games with 2D ASCII graphics",
    tags: ["cpp", "game-engine", "ascii", "cli", "2D"],
    github: "https://github.com/Muhammed-Rajab/cli-game-engine.cpp",
    under_development: true,
    new_project: true,
  },

  {
    title: "physics-sim.cpp",
    desc: "A basic 2D physics simulation in the terminal",
    tags: ["cpp", "physics", "simulation", "ascii", "cli"],
    github: "https://github.com/Muhammed-Rajab/physics-sim.cpp",
    under_development: false,
    new_project: true,
  },
  {
    title: "raylib-wrappers.cpp",
    desc: "Lightweight wrappers for using Raylib in C++ projects",
    tags: ["cpp", "raylib", "game-dev", "graphics", "tools"],
    github: "https://github.com/Muhammed-Rajab/raylib-wrappers.cpp",
    under_development: true,
    new_project: false,
  },
  {
    title: "cli-sound-player.cpp",
    desc: "A command-line tool to play audio files with basic controls",
    tags: ["cpp", "audio", "cli", "sound", "tools"],
    github: "https://github.com/Muhammed-Rajab/cli-sound-player.cpp",
    under_development: true,
    new_project: true,
  },
  {
    title: "terrain-generator.cpp",
    desc: "Generates procedural terrain using noise functions and ASCII rendering",
    tags: ["cpp", "terrain", "procedural", "noise", "cli"],
    github: "https://github.com/Muhammed-Rajab/terrain-generator.cpp",
    under_development: false,
    new_project: false,
  },
  {
    title: "multi-threaded-renderer.cpp",
    desc: "A multithreaded ASCII rendering engine for faster processing",
    tags: ["cpp", "multi-threading", "rendering", "performance", "cli"],
    github: "https://github.com/Muhammed-Rajab/multi-threaded-renderer.cpp",
    under_development: true,
    new_project: false,
  },
];

//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* WORKS SECTIONS HANDLING
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const worksContainer = document.querySelector(".works-container");
const worksCategoriesContainer = document.querySelector(".works-categories");
const categories = [
  "all",
  ...new Set(
    works.map((work) => work.tags).reduce((acc, curr) => [...acc, ...curr])
  ),
];

// * FUNCTION TO SHOW WORKS BASED ON PAGE NUMBER AND CATEGORY

const generateProject = ({
  title = "",
  desc = "",
  tags = [],
  github = "",
  under_development = false,
  new_project = false,
}) => {
  // Create the 'div' element with the 'project' class
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  // Create the 'p' element for the title
  const titleP = document.createElement("p");
  titleP.classList.add("title");
  titleP.appendChild(document.createTextNode("["));

  // Create the 'a' element with the link
  const linkA = document.createElement("a");
  linkA.classList.add("work-link");
  if (under_development) {
    linkA.classList.add("under-dev-work");
  }
  linkA.href = github;
  linkA.target = "_blank";
  linkA.textContent = `${title}`;

  // Append the 'a' element to the title paragraph
  titleP.appendChild(linkA);
  titleP.appendChild(document.createTextNode("]"));
  if (new_project) {
    const newTag = document.createElement("img");
    newTag.src = "/assets/images/new.gif";
    newTag.classList.add("new-tag");
    titleP.appendChild(newTag);
  }

  // Create the 'p' element for the description
  const descriptionP = document.createElement("p");
  descriptionP.classList.add("description");
  descriptionP.textContent = desc;

  // Create the 'p' element for the tags
  const tagsP = document.createElement("p");
  tagsP.classList.add("tags");
  tagsP.appendChild(
    document.createTextNode(tags.length > 1 ? "Tags: " : "Tag: ")
  );

  // Create the 'a' elements for the tags
  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.disabled = true;
    tagEl.href = "";
    // tagEl.classList.add("");
    tagEl.textContent = tag;
    tagsP.appendChild(tagEl);
    tagsP.innerHTML += "&nbsp;".repeat(2);
  });

  // Append all the elements to the project div
  projectDiv.appendChild(titleP);
  projectDiv.appendChild(descriptionP);
  projectDiv.appendChild(tagsP);

  // Append the project div to the body (or another container element)
  return projectDiv;
};
function updateWorksContainer(pageIndex = 0, category = "all") {
  worksContainer.innerHTML = "";
}

// * ADD EACH CATEGORY TO WORKS CATEGORY
categories.forEach((category) => {
  const btn = document.createElement("button");
  btn.innerText = `${category}`;
  btn.addEventListener("click", (e) => {
    worksCategoriesContainer.querySelectorAll("button").forEach((button) => {
      button.classList.remove("bold-button");
    });

    btn.classList.add("bold-button");

    e.preventDefault();
    // SHOW ONLY THE TAGS
    worksContainer.innerHTML = "";
    if (category === "all") {
      works.forEach((work) => {
        worksContainer.appendChild(generateProject(work));
      });
    } else {
      works
        .filter((work) => work.tags.includes(category))
        .forEach((work) => {
          worksContainer.appendChild(generateProject(work));
        });
    }
  });
  if (category === "all") {
    btn.classList.add("bold-button");
  }
  worksCategoriesContainer.appendChild(btn);
  worksCategoriesContainer.appendChild(
    document.createTextNode("\u00A0".repeat(2))
  );
});

function SetupWorksSection() {
  let currentPageIndex = 3;
  const MAX_WORKS_PER_PAGE = 5;
  const PAGE_COUNT = Math.ceil(works.length / MAX_WORKS_PER_PAGE);

  console.log(`current page index: ${currentPageIndex}`);
  console.log(`max works per page: ${MAX_WORKS_PER_PAGE}`);
  console.log(`work count: ${works.length}`);
  console.log(`page count: ${PAGE_COUNT}`);

  worksContainer.innerHTML = "";
  const slicingStartIndex = currentPageIndex * MAX_WORKS_PER_PAGE;
  const slicingEndIndex =
    currentPageIndex * MAX_WORKS_PER_PAGE + MAX_WORKS_PER_PAGE;
  console.log(`slicing starts at ${slicingStartIndex}`);
  console.log(`slicing ends at ${slicingEndIndex}`);
  works
    .slice(slicingStartIndex, slicingEndIndex)
    .forEach((work) => worksContainer.append(generateProject(work)));

  // Add work categories
  const categories = [
    "all",
    ...new Set(
      works.map((work) => work.tags).reduce((acc, curr) => [...acc, ...curr])
    ),
  ];

  // categories.forEach((category) => {
  //   const btn = document.createElement("button");
  //   btn.innerText = `${category}`;
  //   btn.addEventListener("click", (e) => {
  //     worksCategoriesContainer.querySelectorAll("button").forEach((button) => {
  //       button.classList.remove("bold-button");
  //     });

  //     btn.classList.add("bold-button");

  //     e.preventDefault();
  //     // SHOW ONLY THE TAGS
  //     worksContainer.innerHTML = "";
  //     if (category === "all") {
  //       works.forEach((work) => {
  //         worksContainer.appendChild(generateProject(work));
  //       });
  //     } else {
  //       works
  //         .filter((work) => work.tags.includes(category))
  //         .forEach((work) => {
  //           worksContainer.appendChild(generateProject(work));
  //         });
  //     }
  //   });
  //   if (category === "all") {
  //     btn.classList.add("bold-button");
  //   }
  //   worksCategoriesContainer.appendChild(btn);
  //   worksCategoriesContainer.appendChild(
  //     document.createTextNode("\u00A0".repeat(2))
  //   );
  // });
}

SetupWorksSection();
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
