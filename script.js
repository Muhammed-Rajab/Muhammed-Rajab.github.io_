/* [[ BLOGS: i rarely write, lol]] */
(() => {
  /*
   * NOTE: update this list to add or remove blogs from homepage.
   * yes, i know it's too much manual work.
   *
   * SCHEMA:
   * {
   *  title:  string,     // title of the blog
   *  link:   string,     // link to blog
   *  new:    boolean?    // whether the blog is new or not (adds gif to the end of title)
   * }
   *
   * try adding new blogs to the beginning. or you can add a timestamp field, which is unnecessary.
   */
  const blogs = [
    {
      title: "I Miss The Good Ol' Telnet Days - So I Built My Own Server",
      link: "lol",
      new: true,
    },
    {
      title: "How I wrote a silly CHIP-8 emulator in C++",
      link: "so-silly",
    },
    {
      title: "Ray Tracing isn't that hard - if you do it the right way!",
      link: "duh",
      new: true,
    },
  ];

  const blogsList = document.querySelector(".blogs-list");

  function createBlogItem(href, text, new_post = false) {
    const li = document.createElement("li");
    li.className = "blog";

    const a = document.createElement("a");
    a.href = href;
    a.className = "blog-link";
    a.target = "_blank";
    a.textContent = text;

    li.appendChild(a);

    if (new_post) {
      const gif = document.createElement("img");
      gif.src = "./assets/images/new-gif-smol.gif";
      gif.alt = "";
      gif.setAttribute("aria-hidden", "true");

      gif.style.width = "32px";
      gif.style.height = "auto";

      li.appendChild(gif);
    }

    return li;
  }

  function updateBlogsList() {
    // NOTE: unnecessary optimisation #1
    blogsList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    blogs.forEach((blog) => {
      fragment.appendChild(createBlogItem(blog.link, blog.title, blog.new));
    });

    blogsList.appendChild(fragment);
  }

  // update the list after all the dom content is loaded
  window.addEventListener("DOMContentLoaded", updateBlogsList);
})();

/* [[Projects: lol, a bunch of jr. DEV projects]] */
(() => {
  /*
   * NOTE: update this array to add or remove projects.
   *
   * SCHEMA:
   * {
   *  title:              string,   // project title
   *  desc:               string,   // project description
   *  tags:               string[], // tags associated
   *  github:             string,   // github repo url
   *  under_development:  boolean?, // whether it's still under development  TODO: add gif
   *  new_project:        boolean?  // whether it's a new project (adds gif)
   * }
   * */

  /**************************************
   * PROJECTS
   *************************************/
  const projects = [
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
    {
      title: "terrible-renderer.cpp",
      desc: "couldn't bother myself finding a better name",
      tags: ["cpp", "ascii", "raymarching", "rendering", "cli"],
      github: "https://github.com/Muhammed-Rajab/terrible-renderer.cpp",
      under_development: false,
      new_project: true,
    },
  ];

  /**************************
   * CONSTANTS & UI ELEMENTS
   *************************/
  const prevWorksButton = document.querySelector(".prev-btn");
  const nextWorksButton = document.querySelector(".next-btn");
  const worksContainer = document.querySelector(".works-container");
  const pageNumberPara = document.querySelector(".works-pagination");
  const worksCategoriesContainer = document.querySelector(".works-categories");

  const categories = [
    "all",
    ...new Set(
      works.map((work) => work.tags).reduce((acc, curr) => [...acc, ...curr]),
    ),
  ];

  let currentPageIndex = 0;
  let currentCategory = "all";
  const MAX_WORKS_PER_PAGE = 4;
  let PAGE_COUNT = Math.ceil(works.length / MAX_WORKS_PER_PAGE);

  function updatePageNumber(currentPageNo, pageCount) {
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

    const lspan = document.createElement("span");
    lspan.innerText = "⚞";
    titleP.appendChild(lspan);

    // Create the 'a' element with the link
    const linkA = document.createElement("a");
    linkA.classList.add("work-link");
    if (under_development) {
      linkA.classList.add("under-dev-work");
    }
    linkA.href = github;
    linkA.target = "_blank";
    linkA.textContent = `${title}`;

    titleP.appendChild(linkA);

    const rspan = document.createElement("span");
    rspan.innerText = "⚟";
    titleP.appendChild(rspan);

    // Append the 'a' element to the title paragraph
    if (new_project) {
      // const newTag = document.createElement("img");
      // newTag.src = "/assets/images/new.gif";
      // newTag.classList.add("new-tag");
      // titleP.appendChild(newTag);

      // Create a new image element
      const gif = document.createElement("img");
      gif.src = "./assets/images/new-gif-smol.gif";
      gif.alt = "new gif";

      // Optional: add some styles
      gif.style.width = "32px"; // set width
      gif.style.height = "auto"; // keep aspect ratio

      titleP.appendChild(gif);
    }

    // Create the 'p' element for the description
    const descriptionP = document.createElement("p");
    descriptionP.classList.add("description");
    descriptionP.textContent = desc;

    // WARN: might have to remove this in future.
    // Create the 'p' element for the tags
    const tagsP = document.createElement("p");
    tagsP.classList.add("tags");
    tagsP.appendChild(
      document.createTextNode(tags.length > 1 ? "tags: " : "tag: "),
    );

    // Create the 'a' elements for the tags
    tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.href = "";
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
  }

  // * FUNCTION TO SHOW WORKS BASED ON PAGE NUMBER AND CATEGORY
  function updateWorksContainer(pageIndex = 0, category = "all") {
    worksContainer.innerHTML = "";
    const slicingStartIndex = pageIndex * MAX_WORKS_PER_PAGE;
    const slicingEndIndex = pageIndex * MAX_WORKS_PER_PAGE + MAX_WORKS_PER_PAGE;

    const filteredWorks =
      category === "all"
        ? works
        : works.filter((work) => work.tags.includes(category));

    // WARN: update page count here?
    PAGE_COUNT = Math.ceil(filteredWorks.length / MAX_WORKS_PER_PAGE);

    filteredWorks
      .slice(slicingStartIndex, slicingEndIndex)
      .forEach((work, i, arr) => {
        worksContainer.appendChild(generateProject(work));
        if (i < arr.length - 1)
          worksContainer.appendChild(document.createElement("hr"));
      });
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

    updatePageNumber(currentPageIndex + 1, PAGE_COUNT);
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

    updatePageNumber(currentPageIndex + 1, PAGE_COUNT);
  });

  function main() {
    updateWorksContainer(currentPageIndex, currentCategory);
    //* ENABLING/DISABLING PREV/NEXT BTNS BASED ON INDEX
    prevWorksButton.disabled = true;
    if (currentPageIndex == PAGE_COUNT - 1) {
      nextWorksButton.disabled = true;
    }
    updatePageNumber(currentPageIndex + 1, PAGE_COUNT);
  }

  window.addEventListener("DOMContentLoaded", main);
})();
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
