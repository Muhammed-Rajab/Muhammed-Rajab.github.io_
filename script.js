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

  // categories
  const projectCategoriesContainer = document.querySelector(
    ".projects > .categories",
  );

  // project list
  const projectsContainer = document.querySelector(".projects > .container");

  // pagination
  const paginationParagraph = document.querySelector(
    ".projects > .navigator> .pagination",
  );
  const prevProjectsBtn = document.querySelector(
    ".projects > .navigator>.prev-btn",
  );
  const nextProjectsBtn = document.querySelector(
    ".projects > .navigator>.next-btn",
  );

  // extract all tags
  const categories = [
    "all",
    ...new Set(projects.flatMap((project) => project.tags)),
  ];

  let currentPageIndex = 0;
  let currentCategory = "all";
  const MAX_PROJECTS_PER_PAGE = 4;
  let pageCount = Math.ceil(projects.length / MAX_PROJECTS_PER_PAGE);

  /**********************
   * DOM CREATION HELPERS
   *********************/

  // project list item
  function createProjectListItem({
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
      linkA.classList.add("under-development");
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
      const gif = document.createElement("img");
      gif.src = "./assets/images/new-gif-smol.gif";
      gif.alt = "new gif";

      gif.style.width = "32px";
      gif.style.height = "auto";
      titleP.appendChild(gif);
    }

    // Create the 'p' element for the description
    const descriptionP = document.createElement("p");
    descriptionP.classList.add("description");
    descriptionP.textContent = desc;

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

  function createProjectCategoryButton(category, onClick) {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.classList.toggle("bold-button", category === "all");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      onClick(category, btn);
    });
    return btn;
  }

  /*********
   * HELPERS
   ********/
  function filterProjectsByCategory(projects, category) {
    return category === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(category));
  }

  function paginate(projects, pageIndex, perPage) {
    const start = pageIndex * perPage;
    return projects.slice(start, start + perPage);
  }

  /****************
   * EVENT HANDLERS
   ***************/
  function handleCategoryClick(category, btn) {
    currentCategory = category;
    currentPageIndex = 0;

    console.log("current page index:", currentPageIndex);
    console.log("current category:", currentCategory);
    console.log("page count:", pageCount);

    // reset highlight
    projectCategoriesContainer
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("bold-button"));

    btn.classList.add("bold-button");
    updateProjectsContainer(currentPageIndex, currentCategory);

    // TODO: update the page count
    // TODO: update the page numbers?
  }

  /**********************
   * RENDERING & UPDATION
   *********************/

  // page number update
  function updatePageNumber(currentPageIndex, pageCount) {
    paginationParagraph.innerHTML = `${currentPageIndex + 1} out of ${pageCount}`;
  }

  // render the projects
  function renderProjects(projects) {
    // NOTE: unnecessary optimization #2
    const fragment = document.createDocumentFragment();

    projects.forEach((project, i, arr) => {
      fragment.append(createProjectListItem(project));
      // add <hr/> if not the last project
      if (i < arr.length - 1) fragment.append(document.createElement("hr"));
    });

    projectsContainer.innerHTML = "";
    projectsContainer.append(fragment);
  }

  // update projects list based on page number
  function updateProjectsContainer(pageIndex = 0, category = "all") {
    const filtered = filterProjectsByCategory(projects, category);
    const paginated = paginate(filtered, pageIndex, MAX_PROJECTS_PER_PAGE);

    // TODO: update page count here, as it will always be called when changing category or page
    pageCount = Math.ceil(filtered.length / MAX_PROJECTS_PER_PAGE);
    renderProjects(paginated);

    updatePageNumber(pageIndex, pageCount);
  }

  // * render categories buttons
  function renderProjectCategoriesBtns() {
    const fragment = document.createDocumentFragment();

    categories.forEach((category) => {
      const btn = createProjectCategoryButton(category, handleCategoryClick);
      fragment.append(btn, document.createTextNode("\u00A0".repeat(2)));
    });

    projectCategoriesContainer.innerHTML = "";
    projectCategoriesContainer.append(fragment);
  }

  // * handle press on prev and next btn

  // main iife, if __name__ == "__main__": # lol
  (() => {
    window.addEventListener("DOMContentLoaded", () => {
      renderProjectCategoriesBtns();
      updateProjectsContainer(currentPageIndex, currentCategory);
    });
  })(); // main iife
})(); // projects block iife
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
