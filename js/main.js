/* Renders everything from js/projects.js. You rarely need to edit this file. */
const $ = (s) => document.querySelector(s);
// Fills in links on any element with data-link="github|linkedin|email|resume"
document.querySelectorAll("[data-link]").forEach((a) => (a.href = SITE.links[a.dataset.link]));
// Replaces a missing image with a labeled placeholder so you know what to add
window.ph = (img) => {
  const d = document.createElement("div");
  d.className = "ph";
  d.textContent = "Add image: " + img.getAttribute("src");
  return d;
};
const ul = (a, tag = "ul") => (a && a.length ? `<${tag}${tag === "ol" ? ' class="steps"' : ""}>${a.map((i) => `<li>${i}</li>`).join("")}</${tag}>` : "");
const tags = (a) => `<div class="tags">${(a || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>`;

/* ---------- HOME PAGE ---------- */
if ($("#grid")) {
  $("#name").firstChild.textContent = SITE.name;
  $("#tagline").textContent = SITE.tagline;
  $("#about-text").textContent = SITE.about;
  $("#glance").innerHTML = SITE.glance.map((g) => `<div><dt>${g.k}</dt><dd>${g.v}</dd></div>`).join("");
  $("#skill-list").innerHTML = Object.entries(SITE.skills).map(([k, v]) => `<h3>${k}</h3>${tags(v)}`).join("");
  $("#learning").innerHTML = SITE.learning.map((l) => `<li>${l}</li>`).join("");

  const draw = (cat) => {
    const shown = PROJECTS.filter((p) => cat === "All" || p.tags.includes(cat));
    $("#grid").innerHTML = shown.map((p) => `<a class="card" href="project.html?id=${p.id}">
      <span class="status">${p.status || ""}</span><h3>${p.title}</h3><p>${p.summary}</p>${tags(p.tags)}</a>`).join("");
    document.querySelectorAll("#filters button").forEach((b) => b.setAttribute("aria-pressed", b.textContent === cat));
  };
  // Filter buttons are built from the tags used in PROJECTS
  const cats = ["All", ...new Set(PROJECTS.flatMap((p) => p.tags))];
  $("#filters").innerHTML = cats.map((c) => `<button type="button">${c}</button>`).join("");
  $("#filters").onclick = (e) => e.target.tagName === "BUTTON" && draw(e.target.textContent);
  draw("All");
}

/* ---------- PROJECT PAGE ---------- */
if ($("#project")) {
  const i = PROJECTS.findIndex((p) => p.id === new URLSearchParams(location.search).get("id"));
  const p = PROJECTS[i];
  if (!p) {
    $("#project").innerHTML = '<section class="pj-head"><h1>Project not found</h1><p>Check the id in the link against js/projects.js.</p></section>';
  } else {
    document.title = p.title + " | Portfolio";
    // Each entry is [section id, heading, html]; empty sections are skipped
    const secs = [
      ["problem", "Problem", p.problem && `<p>${p.problem}</p>`],
      ["goals", "Goals and constraints", (p.goals ? "<h3>Goals</h3>" + ul(p.goals) : "") + (p.constraints ? "<h3>Constraints</h3>" + ul(p.constraints) : "")],
      ["decisions", "Design decisions", (p.decisions || []).map((d) => `<div class="decision"><h3>${d.title}</h3><p>${d.why}</p>${d.alt ? `<p><em>${d.alt}</em></p>` : ""}</div>`).join("")],
      ["process", "Process: from idea to final product", ul(p.process, "ol")],
      ["math", "The math", (p.math || []).map((m) => `<div class="math"><small>${m.label}</small><span data-tex="${m.tex}">${m.tex}</span><small>${m.note || ""}</small></div>`).join("")],
      ["results", "Testing and results", ul(p.results)],
      ["gallery", "Schematics, graphs, and photos", (p.images || []).map((m) => `<figure><img src="${m.src}" alt="${m.caption}" onerror="this.replaceWith(ph(this))"><figcaption>${m.caption}</figcaption></figure>`).join("")],
      ["lessons", "Lessons learned", ul(p.lessons)],
      ["next", "Next steps", ul(p.next)],
      ["links", "Links", ul((p.links || []).map((l) => `<a href="${l.url}">${l.label}</a>`))]
    ].filter((s) => s[2]);
    const prev = PROJECTS[i - 1], next = PROJECTS[i + 1];
    $("#project").innerHTML = `<div class="pj"><div class="pj-head">
      <a href="index.html#projects">All projects</a><h1>${p.title}</h1>${tags(p.tags)}
      <div class="tldr"><p><strong>${p.status}.</strong> ${p.summary}</p><p>Role: ${p.role} | Timeline: ${p.timeline} | Tools: ${(p.tools || []).join(", ")}</p></div>
      <nav class="toc" aria-label="On this page">${secs.map((s) => `<a href="#${s[0]}">${s[1]}</a>`).join("")}</nav></div>
      ${secs.map((s) => `<section id="${s[0]}"><h2>${s[1]}</h2>${s[2]}</section>`).join("")}
      <div class="pager">${prev ? `<a href="project.html?id=${prev.id}">Previous: ${prev.title}</a>` : "<span></span>"}${next ? `<a href="project.html?id=${next.id}">Next: ${next.title}</a>` : ""}</div></div>`;
    // Render LaTeX once KaTeX has loaded (scripts are deferred, so it is ready by now)
    document.querySelectorAll("[data-tex]").forEach((el) => window.katex && katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: false }));
  }
}
