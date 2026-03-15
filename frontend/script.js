document.addEventListener("DOMContentLoaded", function () {

const ADMIN_KEY = "yeswanth123";
const isAdmin = new URLSearchParams(window.location.search).get("admin") === ADMIN_KEY;

const BASE_URL = "https://yeswanthkumarportfolio-s-production.up.railway.app";

const API_PROJECT = BASE_URL + "/api/projects";
const API_SKILLS = BASE_URL + "/api/skills";
const API_CERTS = BASE_URL + "/api/certifications";

if (!isAdmin) {
document.querySelectorAll(".btn-add").forEach(btn => {
btn.style.display = "none";
});
}

document.querySelectorAll(".btn-add").forEach(btn => {
btn.addEventListener("click", () => {
const type = btn.dataset.add;
const form = document.getElementById("form-" + type);
if (form) form.hidden = false;
});
});

document.querySelectorAll(".btn-cancel-add").forEach(btn => {
btn.addEventListener("click", () => {
const type = btn.dataset.cancel;
const form = document.getElementById("form-" + type);
if (form) {
form.hidden = true;
form.reset();
}
});
});

async function loadProjects() {
const res = await fetch(API_PROJECT);
const projects = await res.json();


const container = document.getElementById("projects-container");
if (!container) return;

container.innerHTML = "";

projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    ${isAdmin ? `<button class="item-remove" onclick="deleteProject('${p.id}')">✖</button>` : ""}
    <h3>${p.title}</h3>
    <p>${p.description || ""}</p>
    ${p.liveLink ? `<a href="${p.liveLink}" target="_blank">View Project</a>` : ""}
  `;

  container.appendChild(card);
});


}

const projectForm = document.getElementById("form-project");

if (projectForm) {
projectForm.addEventListener("submit", async function (e) {


  e.preventDefault();

  const project = {
    title: projectForm.title.value,
    description: projectForm.description.value,
    liveLink: projectForm.link.value
  };

  await fetch(API_PROJECT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project)
  });

  projectForm.reset();
  projectForm.hidden = true;

  loadProjects();
});

}

window.deleteProject = async function (id) {
if (!confirm("Delete this project?")) return;


await fetch(API_PROJECT + "/" + id, { method: "DELETE" });

loadProjects();


}

async function loadSkills() {
const res = await fetch(API_SKILLS);
const skills = await res.json();


const container = document.getElementById("skills-container");
if (!container) return;

container.innerHTML = "";

skills.forEach(skill => {
  const div = document.createElement("div");
  div.className = "skill-tag";

  div.innerHTML = `
    ${skill.name}
    ${isAdmin ? `<button class="item-remove" onclick="deleteSkill('${skill.id}')">✖</button>` : ""}
  `;

  container.appendChild(div);
});


}

const skillForm = document.getElementById("form-skill");

if (skillForm) {
skillForm.addEventListener("submit", async function (e) {


  e.preventDefault();

  const skill = {
    name: skillForm.skillName.value,
    type: skillForm.skillType.value
  };

  await fetch(API_SKILLS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skill)
  });

  skillForm.reset();
  skillForm.hidden = true;

  loadSkills();
});


}

window.deleteSkill = async function (id) {
if (!confirm("Delete this skill?")) return;


await fetch(API_SKILLS + "/" + id, { method: "DELETE" });

loadSkills();


}

async function loadCertifications() {
const res = await fetch(API_CERTS);
const certs = await res.json();


const container = document.getElementById("certifications-container");
if (!container) return;

container.innerHTML = "";

certs.forEach(cert => {
  const div = document.createElement("div");
  div.className = "cert-item";

  div.innerHTML = `
    <strong>${cert.name}</strong><br>
    <span>${cert.issuer || ""} ${cert.date ? "• " + cert.date : ""}</span>
    ${isAdmin ? `<button class="item-remove" onclick="deleteCert('${cert.id}')">✖</button>` : ""}
  `;

  container.appendChild(div);
});

}

const certForm = document.getElementById("form-certification");

if (certForm) {
certForm.addEventListener("submit", async function (e) {


  e.preventDefault();

  const cert = {
    name: certForm.name.value,
    issuer: certForm.issuer.value,
    date: certForm.date.value
  };

  await fetch(API_CERTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cert)
  });

  certForm.reset();
  certForm.hidden = true;

  loadCertifications();
});


}

window.deleteCert = async function (id) {
if (!confirm("Delete this certification?")) return;


await fetch(API_CERTS + "/" + id, { method: "DELETE" });

loadCertifications();


}

loadProjects();
loadSkills();
loadCertifications();

});
