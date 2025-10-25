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
  {
    title: "terrible-renderer.cpp",
    desc: "couldn't bother myself finding a better name",
    tags: ["cpp", "ascii", "raymarching", "rendering", "cli"],
    github: "https://github.com/Muhammed-Rajab/terrible-renderer.cpp",
    under_development: false,
    new_project: true,
  },
  {
    title: "terrible-renderer.cpp",
    desc: "couldn't bother myself finding a better name",
    tags: ["cpp", "ascii", "raymarching", "rendering", "cli"],
    github: "https://github.com/Muhammed-Rajab/terrible-renderer.cpp",
    under_development: false,
    new_project: true,
  },
];

//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* WORKS SECTIONS HANDLING
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const prevWorksButton = document.querySelector(".prev-btn");
const nextWorksButton = document.querySelector(".next-btn");
const worksContainer = document.querySelector(".works-container");
const pageNumberPara = document.querySelector(".works-pagination");
const worksPageNoPara = document.querySelector(".works-pagination");
const worksCategoriesContainer = document.querySelector(".works-categories");

const categories = [
  "all",
  ...new Set(
    works.map((work) => work.tags).reduce((acc, curr) => [...acc, ...curr]),
  ),
];

let currentPageIndex = 0;
let currentCategory = "go";
const MAX_WORKS_PER_PAGE = 5;
const PAGE_COUNT = Math.ceil(works.length / MAX_WORKS_PER_PAGE);

function updatePageNumner(currentPageNo, pageCount) {
  pageNumberPara.innerHTML = `${currentPageNo} out of ${pageCount}`;
}

function generateProject({
  title = "",
  desc = "",
  tags = [],
  github = "",
  under_development = false,
  new_project = false,
}) {
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

  // WARN: might have to remove this in future.
  // Create the 'p' element for the tags
  // const tagsP = document.createElement("p");
  // tagsP.classList.add("tags");
  // tagsP.appendChild(
  //   document.createTextNode(tags.length > 1 ? "Tags: " : "Tag: "),
  // );
  //
  // // Create the 'a' elements for the tags
  // tags.forEach((tag) => {
  //   const tagEl = document.createElement("span");
  //   tagEl.disabled = true;
  //   tagEl.href = "";
  //   // tagEl.classList.add("");
  //   tagEl.textContent = tag;
  //   tagsP.appendChild(tagEl);
  //   tagsP.innerHTML += "&nbsp;".repeat(2);
  // });

  // Append all the elements to the project div
  projectDiv.appendChild(titleP);
  projectDiv.appendChild(descriptionP);
  // projectDiv.appendChild(tagsP);

  // Append the project div to the body (or another container element)
  return projectDiv;
}

// * FUNCTION TO SHOW WORKS BASED ON PAGE NUMBER AND CATEGORY
function updateWorksContainer(pageIndex = 0, category = "all") {
  worksContainer.innerHTML = "";
  const slicingStartIndex = pageIndex * MAX_WORKS_PER_PAGE;
  const slicingEndIndex = pageIndex * MAX_WORKS_PER_PAGE + MAX_WORKS_PER_PAGE;

  if (category == "all") {
    works.slice(slicingStartIndex, slicingEndIndex).forEach((work) => {
      worksContainer.appendChild(generateProject(work));
      worksContainer.appendChild(document.createElement("hr"));
    });
  } else {
    works
      .filter((work) => work.tags.includes(category))
      .slice(slicingStartIndex, slicingEndIndex)
      .forEach((work) => {
        worksContainer.appendChild(generateProject(work));
        worksContainer.appendChild(document.createElement("hr"));
      });
  }
}

// * ADD EACH CATEGORY TO WORKS CATEGORY
categories.forEach((category) => {
  const btn = document.createElement("button");
  btn.innerText = `${category}`;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    currentCategory = category;

    worksCategoriesContainer.querySelectorAll("button").forEach((button) => {
      button.classList.remove("bold-button");
    });

    btn.classList.add("bold-button");
    updateWorksContainer(0, currentCategory);
  });
  if (category === "all") {
    btn.classList.add("bold-button");
  }
  worksCategoriesContainer.appendChild(btn);

  // TODO: add tooltip hover data
  worksCategoriesContainer.appendChild(
    document.createTextNode("\u00A0".repeat(2)),
  );
});

prevWorksButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPageIndex != 0) {
    currentPageIndex -= 1;
    updateWorksContainer(currentPageIndex, currentCategory);
  }

  // * DISABLE PREV BTN
  if (currentPageIndex == 0) {
    prevWorksButton.disabled = true;
  }

  // * ENABLE NEXT BTN
  if (currentPageIndex < PAGE_COUNT - 1) {
    nextWorksButton.disabled = false;
  }

  updatePageNumner(currentPageIndex + 1, PAGE_COUNT);
});

nextWorksButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentPageIndex < PAGE_COUNT - 1) {
    currentPageIndex += 1;
    updateWorksContainer(currentPageIndex, currentCategory);
  }

  // * DISABLE NEXT
  if (currentPageIndex == PAGE_COUNT - 1) {
    nextWorksButton.disabled = true;
  }

  // * ENABLE PREV BTN
  if (currentPageIndex > 0) {
    prevWorksButton.disabled = false;
  }

  updatePageNumner(currentPageIndex + 1, PAGE_COUNT);
});

//* ENABLING/DISABLING PREV/NEXT BTNS BASED ON INDEX
prevWorksButton.disabled = true;
if (currentPageIndex == PAGE_COUNT - 1) {
  nextWorksButton.disabled = true;
}
updatePageNumner(currentPageIndex + 1, PAGE_COUNT);
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function main() {
  updateWorksContainer(0, "all");
}

window.addEventListener("DOMContentLoaded", main);
