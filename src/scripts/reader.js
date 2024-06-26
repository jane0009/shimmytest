addEventListener("DOMContentLoaded", () => {
  load();
});

async function load() {
  if (!window.mkdown) {
    const converter = new showdown.Converter({
      extensions: ["customExt"],
    });
    window.mkdown = converter;
  }
  console.log("reader.js loaded");

  let currentPage = "index";
  if (window.location.hash && window.location.hash !== "#") {
    currentPage = window.location.hash.slice(1);
  }

  // load the home page
  update(currentPage);


  addEventListener("hashchange", (_) => {
    const hash = window.location.hash;
    let page = hash.slice(1);
    if (page === "") page = "index";
    if (page !== currentPage) {
      currentPage = page;
      update(page);
    }
  });
}

async function update(page) {
  const req = await fetch(`pages/${page}.md`);
  const md = await req.text();
  const content = window.mkdown.makeHtml(md);
  const reader = document.getElementById("reader");
  reader.innerHTML = `
  <div class="container">
    ${content}
  </div>
  `;
}