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

  let currentPage = "";
  let md = "";
  let content = "";

  // load index page from pages/index.md
  const req = await fetch("pages/index.md");
  md = await req.text();
  content = window.mkdown.makeHtml(md);
  console.log(req, md, content);
  update(content);


  addEventListener("hashchange", (_) => {
    const hash = window.location.hash;
    let page = hash.slice(1);
    if (page === "index") page = "";
    if (page !== currentPage) {
      //
    }
  });
}

function update(content) {
  const reader = document.getElementById("reader");
  reader.innerHTML = `
  <div class="container">
    ${content}
  </div>
  `;
}