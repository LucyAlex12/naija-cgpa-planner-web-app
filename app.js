const points = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
let courses = JSON.parse(localStorage.getItem("naijaCgpaCourses")) || [
  { code: "CSC 201", unit: 3, grade: "A" },
  { code: "MTH 203", unit: 3, grade: "B" }
];

function standing(gpa) {
  if (gpa >= 4.5) return "First Class pace";
  if (gpa >= 3.5) return "Second Class Upper";
  if (gpa >= 2.4) return "Second Class Lower";
  if (gpa > 0) return "Needs a comeback plan";
  return "Start";
}

function save() {
  localStorage.setItem("naijaCgpaCourses", JSON.stringify(courses));
}

function render() {
  const totalUnits = courses.reduce((sum, course) => sum + course.unit, 0);
  const totalPoints = courses.reduce((sum, course) => sum + course.unit * points[course.grade], 0);
  const gpa = totalUnits ? totalPoints / totalUnits : 0;
  document.querySelector("#gpa").textContent = gpa.toFixed(2);
  document.querySelector("#units").textContent = totalUnits;
  document.querySelector("#standing").textContent = standing(gpa);
  document.querySelector("#courses").innerHTML = courses.length ? courses.map((course, index) => `
    <article class="course">
      <strong>${course.code}</strong>
      <span>${course.unit} units</span>
      <span>Grade ${course.grade}</span>
      <button data-index="${index}">Remove</button>
    </article>
  `).join("") : "<p>No courses added yet.</p>";
}

document.querySelector("#courseForm").addEventListener("submit", event => {
  event.preventDefault();
  courses.push({
    code: document.querySelector("#code").value.toUpperCase(),
    unit: Number(document.querySelector("#unit").value),
    grade: document.querySelector("#grade").value
  });
  save();
  event.target.reset();
  render();
});

document.querySelector("#courses").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  courses.splice(Number(button.dataset.index), 1);
  save();
  render();
});

render();
