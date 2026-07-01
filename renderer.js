// Renderer file: form data ko resume preview ke HTML me convert karta hai.
const ResumeRenderer = (() => {
  const { $, escapeHTML, normalizeUrl, getInitials, avatarColor } = ResumeUtils;
  const { fields, tagFields, listFields, state } = ResumeData;

  // Uploaded photo show karta hai, warna initials wala fallback avatar banata hai.
  function renderAvatar(data) {
    if (state.photo) {
      return `<img class="avatar" src="${state.photo}" alt="${escapeHTML(data.name || "Profile photo")}">`;
    }
    return `<div class="avatar fallback" style="background:${avatarColor(data.name)}">${getInitials(data.name)}</div>`;
  }

  // Resume header ke niche "Contacts:" ke saath clickable email/phone/location/social links banata hai.
  function renderContactLine(data) {
    const items = [
      data.email && `<a href="mailto:${escapeHTML(data.email)}">Email</a>`,
      data.phone && `<a href="tel:${escapeHTML(data.phone)}">Phone</a>`,
      data.location && `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}" target="_blank">Location</a>`,
      data.github && `<a href="${escapeHTML(normalizeUrl(data.github))}" target="_blank">GitHub</a>`,
      data.linkedin && `<a href="${escapeHTML(normalizeUrl(data.linkedin))}" target="_blank">LinkedIn</a>`,
    ].filter(Boolean);
    return items.length ? `<div class="contact-line"><strong>Contacts:</strong>${items.join("")}</div>` : "";
  }

  // Generic resume section wrapper; empty content ho to section hide ho jata hai.
  function section(title, content) {
    if (!content || !String(content).trim()) return "";
    return `<section class="resume-section"><h3>${title}</h3>${content}</section>`;
  }

  // Array items ko bullet list me convert karta hai.
  function list(items) {
    return items.length ? `<ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : "";
  }

  // Array items ko small pill/badge UI me convert karta hai, mostly skills ke liye.
  function pills(items) {
    return items.length ? `<div class="pill-list">${items.map((item) => `<span class="pill">${escapeHTML(item)}</span>`).join("")}</div>` : "";
  }

  // College aur 12th details ko education cards me render karta hai.
  function education(data) {
    const degree = data.course || data.college || data.cgpa || data.gradYear;
    const school = data.stream || data.school12 || data.marks12 || data.passYear;
    return [
      degree && `<div class="item-card"><strong>${escapeHTML(data.course || "Degree")}</strong><p>${escapeHTML([data.college, data.cgpa, data.gradYear].filter(Boolean).join(" | "))}</p></div>`,
      school && `<div class="item-card"><strong>Senior Secondary ${data.stream ? `- ${escapeHTML(data.stream)}` : ""}</strong><p>${escapeHTML([data.school12, data.marks12, data.passYear].filter(Boolean).join(" | "))}</p></div>`
    ].filter(Boolean).join("");
  }

  // Project lines ko title + description cards me convert karta hai.
  function projects(items) {
    return items.map((item) => {
      const [name, detail] = item.split(/\s+-\s+(.+)/);
      return `<div class="item-card"><strong>${escapeHTML(name || item)}</strong>${detail ? `<p>${escapeHTML(detail)}</p>` : ""}</div>`;
    }).join("");
  }

  // Main render function: selected template apply karke complete resume preview update karta hai.
  function render(data) {
    const preview = $("#resumePreview");
    const name = data.name || "Your Name";
    const role = data.role || data.course || "Student / Fresher";

    preview.className = `resume-paper template-${state.template}`;
    preview.innerHTML = `
      <div class="resume-inner">
        <header class="resume-header">
          ${renderAvatar(data)}
          <div>
            <div class="resume-name">${escapeHTML(name)}</div>
            <div class="resume-role">${escapeHTML(role)}</div>
            ${renderContactLine(data)}
          </div>
        </header>
        <div class="resume-grid">
          <aside>
            ${section("Skills", pills(data.skills))}
            ${section("Certifications", list(data.certs))}
            ${section("Languages", pills(data.langs))}
            ${section("Strengths", list(data.strengths))}
            ${section("Hobbies", pills(data.hobbies))}
          </aside>
          <main>
            ${section("Career Objective", `<p>${escapeHTML(data.objective || "Write a clear objective that matches your target role.")}</p>`)}
            ${section("Education", education(data))}
            ${section("Projects", projects(data.projects))}
            ${section("Experience", list(data.experienceList))}
            ${section("Achievements", list(data.achievements))}
            ${section("Declaration", `<p>I hereby declare that the information above is true and correct to the best of my knowledge.</p><p><strong>${escapeHTML(name)}</strong></p>`)}
          </main>
        </div>
      </div>
    `;
    updateProgress(data);
  }

  // Form completion percentage calculate karke circular progress ring update karta hai.
  function updateProgress(data) {
    const values = [
      ...fields.map((id) => data[id]),
      ...tagFields.map((id) => data[id].length),
      ...listFields.map((id) => data[id].length),
      state.photo
    ];
    const percent = Math.round((values.filter(Boolean).length / values.length) * 100);
    $("#progressValue").textContent = `${percent}%`;
    $(".progress").style.setProperty("--angle", `${percent * 3.6}deg`);
  }

  // Sirf render function expose kiya hai, baaki helper functions private rakhe hain.
  return { render };
})();
