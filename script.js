const roles = ["개발자", "기획하는 메이커", "바이브코딩 실험가", "랜딩 페이지 빌더"];
const rotatingRole = document.getElementById("rotating-role");
let roleIndex = 0;

function rotateRole() {
  if (!rotatingRole) return;
  roleIndex = (roleIndex + 1) % roles.length;
  rotatingRole.textContent = roles[roleIndex];
}

setInterval(rotateRole, 2200);

const projects = [
  {
    title: "My Link Landing",
    category: "identity",
    tag: "Identity",
    description:
      "개인 소개와 작업 방식을 한 페이지에 담는 마이링크 랜딩 페이지입니다.",
    points: [
      "나에 대한 소개를 중심으로 화면 흐름 재설계",
      "HTML, CSS, JS 분리 구조로 정적 배포에 맞춤",
      "과제 제출용 링크를 개인 브랜딩 페이지로 확장",
    ],
  },
  {
    title: "Vibe Coding Workflow",
    category: "build",
    tag: "Build",
    description:
      "AI와 함께 빠르게 초안을 만들고, 직접 구조를 다듬는 작업 방식을 정리한 블록입니다.",
    points: [
      "프롬프트 기반 초안 생성",
      "결과 검토 후 수동 수정",
      "목적에 맞는 UI와 카피로 재구성",
    ],
  },
  {
    title: "Static Deploy Setup",
    category: "deploy",
    tag: "Deploy",
    description:
      "Vercel로 바로 배포 가능한 가벼운 정적 사이트 구조를 기준으로 유지합니다.",
    points: [
      "별도 빌드 없이 배포 가능",
      "파일 분리형 구조로 유지보수 단순화",
      "모바일과 데스크톱에서 모두 동작",
    ],
  },
];

const projectGrid = document.getElementById("project-grid");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProjects(filter = "all") {
  if (!projectGrid) return;

  const visibleProjects =
    filter === "all" ? projects : projects.filter((project) => project.category === filter);

  projectGrid.innerHTML = visibleProjects
    .map(
      (project) => `
        <article class="project-card reveal visible">
          <div class="card-top">
            <span class="tag">${project.tag}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <ul>
            ${project.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

renderProjects();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});
