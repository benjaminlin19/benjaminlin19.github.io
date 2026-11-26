/* Builds the pages from js/projects.js. You rarely need to edit this file. */
const $ = (s) => document.querySelector(s), $$ = (s) => document.querySelectorAll(s);
// Fills in links: data-link="github|linkedin|email|resume", names, and email text
$$("[data-link]").forEach((a) => (a.href = SITE.links[a.dataset.link]));
$$("[data-name]").forEach((e) => (e.textContent = SITE.name));
$$("[data-email]").forEach((e) => (e.textContent = SITE.links.email.replace("mailto:", "")));
// Replaces a missing image with a labeled placeholder
window.ph = (img) => { const d = document.createElement("div"); d.className = "ph"; d.textContent = "Add image: " + img.getAttribute("src"); return d; };
const ul = (a, c = "") => (a && a.length ? `<ul class="${c}">${a.map((i) => `<li>${i}</li>`).join("")}</ul>` : "");
const num = (i) => String(i + 1).padStart(2, "0");

/* ---- phone menu ---- */
const btn = $("#menu-btn");
const setMenu = (open) => { $(".bar").classList.toggle("open", open); document.body.classList.toggle("lock", open); btn.setAttribute("aria-expanded", open); btn.textContent = open ? "Close" : "Menu"; };
btn.onclick = () => setMenu(btn.getAttribute("aria-expanded") !== "true");
$$("#menu a").forEach((a) => (a.onclick = () => setMenu(false)));
addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

/* ---- home page ---- */
if ($("#grid")) {
  $("#tagline").textContent = SITE.tagline;
  $("#about-text").textContent = SITE.about;
  $("#glance").innerHTML = SITE.glance.map((g) => `<div><dt>${g.k}</dt><dd>${g.v}</dd></div>`).join("");
  $("#skill-list").innerHTML = Object.entries(SITE.skills).map(([k, v]) => `<h3>${k}</h3><p>${v.join(" / ")}</p>`).join("");
  $("#learning").textContent = SITE.learning.join(" / ");
  // Cover photo path: use a project's cover field, else assets/images/<id>-cover.jpg
  const src = (p) => p.cover || `assets/images/${p.id}-cover.jpg`;
  const draw = (cat) => {
    $("#grid").innerHTML = PROJECTS.map((p, i) => [p, i]).filter(([p]) => cat === "All" || p.tags.includes(cat))
      .map(([p, i]) => `<li><a class="card" href="project.html?id=${p.id}"><span class="photo"><span class="hint">Photo: ${src(p)}</span><img src="${src(p)}" alt="${p.title}" loading="lazy" onerror="this.remove()"></span><span class="num">${num(i)}</span><h3><span class="ul">${p.title}</span></h3><span class="skills">${(p.tools || []).join(" / ")}</span></a></li>`).join("");
    $$("#filters button").forEach((b) => b.setAttribute("aria-pressed", b.textContent === cat));
  };
  // Filter buttons are built from the tags used in PROJECTS
  $("#filters").innerHTML = ["All", ...new Set(PROJECTS.flatMap((p) => p.tags))].map((c) => `<button type="button">${c}</button>`).join("");
  $("#filters").onclick = (e) => e.target.tagName === "BUTTON" && draw(e.target.textContent);
  draw("All");
}

/* ---- project page ---- */
if ($("#project")) {
  const i = PROJECTS.findIndex((p) => p.id === new URLSearchParams(location.search).get("id"));
  const p = PROJECTS[i];
  if (!p) {
    $("#project").innerHTML = '<div class="pj-head wrap"><h1>Not found</h1><p>Check the id in the link against js/projects.js.</p></div>';
  } else {
    document.title = p.title + " | Portfolio";
    // [section id, heading, html]; empty sections are skipped
    const secs = [
      ["problem", "Problem", p.problem && `<p>${p.problem}</p>`],
      ["goals", "Goals and constraints", (p.goals ? "<h3>Goals</h3>" + ul(p.goals) : "") + (p.constraints ? "<h3>Constraints</h3>" + ul(p.constraints) : "")],
      ["decisions", "Design decisions", (p.decisions || []).map((d) => `<div class="decision"><h3>${d.title}</h3><p>${d.why}</p>${d.alt ? `<p>${d.alt}</p>` : ""}</div>`).join("")],
      ["process", "Process", ul(p.process, "steps")],
      ["math", "The math", (p.math || []).map((m) => `<div class="math"><small>${m.label}</small><span data-tex="${m.tex}">${m.tex}</span><small>${m.note || ""}</small></div>`).join("")],
      ["results", "Testing and results", ul(p.results)],
      ["gallery", "Schematics, graphs, photos", (p.images || []).map((m) => `<figure><img src="${m.src}" alt="${m.caption}" loading="lazy" onerror="this.replaceWith(ph(this))"><figcaption>${m.caption}</figcaption></figure>`).join("")],
      ["lessons", "Lessons learned", ul(p.lessons)],
      ["next", "Next steps", ul(p.next)],
      ["links", "Links", ul((p.links || []).map((l) => `<a href="${l.url}">${l.label}</a>`))]
    ].filter((s) => s[2]);
    const prev = PROJECTS[i - 1], next = PROJECTS[i + 1];
    $("#project").innerHTML = `<div class="pj-head wrap"><span class="num">${num(i)}</span>
      <span class="status">${p.status}</span><h1>${p.title}</h1><p class="lead">${p.summary}</p>
      <dl class="meta"><div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Timeline</dt><dd>${p.timeline}</dd></div><div><dt>Tools</dt><dd>${(p.tools || []).join(", ")}</dd></div></dl>
      </div>
      <div class="pj-body wrap"><nav class="toc" aria-label="On this page">${secs.map((s) => `<a href="#${s[0]}">${s[1]}</a>`).join("")}</nav><div class="pj-main">
      ${secs.map((s) => `<section class="sec reveal" id="${s[0]}"><h2>${s[1]}</h2><div>${s[2]}</div></section>`).join("")}</div></div>
      <div class="pager wrap">${prev ? `<a href="project.html?id=${prev.id}">Previous: ${prev.title}</a>` : "<span></span>"}${next ? `<a href="project.html?id=${next.id}">Next: ${next.title}</a>` : ""}</div>`;
    // Render LaTeX (KaTeX scripts are deferred, so they are ready by now)
    $$("[data-tex]").forEach((el) => window.katex && katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: false }));
    // Section menu: highlight the link for the section currently on screen
    const links = [...$$(".toc a")];
    const spy = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && links.forEach((a) => a.classList.toggle("on", a.hash === "#" + e.target.id))), { rootMargin: "-30% 0px -60% 0px" });
    $$(".sec").forEach((s) => spy.observe(s));
    // Reading progress line
    const prog = $("#prog");
    addEventListener("scroll", () => (prog.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`), { passive: true });
  }
}

/* ---- fade in sections as they scroll into view ---- */
const io = "IntersectionObserver" in window && new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.08 });
$$(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
