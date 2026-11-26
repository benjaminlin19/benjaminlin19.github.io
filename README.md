# EECS Portfolio

Plain HTML/CSS/JS site. No build step.

## Edit
- `js/projects.js`: your name, links, skills, and every project. This is the only file most edits need.
- `css/style.css`: colors and fonts live in the `:root` block at the top.
- Images go in `assets/images/` (match the file names in `projects.js`); resume goes at `assets/resume.pdf`.

## Add a project
Copy a project object in `PROJECTS`, give it a new `id`, and edit the fields. Delete fields you don't need.

## Preview locally
Run `python3 -m http.server` in this folder and open http://localhost:8000.

## Deploy
- **Vercel:** push to GitHub, then Add New Project, import the repo, Framework Preset "Other", leave build settings empty, Deploy.
- **GitHub Pages:** Settings, Pages, deploy from the `main` branch root.
