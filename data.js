// Central data/config file: app ke fields, default state aur demo sample yahin rakhe hain.
const ResumeData = {
  // Normal text inputs jinko form se read karke resume me show kiya jata hai.
  fields: [
    "name", "role", "email", "phone", "location", "github", "linkedin", "objective",
    "course", "college", "cgpa", "gradYear", "stream", "marks12", "school12", "passYear"
  ],
  // Comma separated inputs: user ek line me multiple values add kar sakta hai.
  tagFields: ["skills", "certs", "langs", "strengths", "hobbies"],
  // Multi-line inputs: har new line ek separate resume item ban jati hai.
  listFields: ["projects", "experienceList", "achievements"],
  // Runtime state: selected template, uploaded photo aur login/signup mode.
  state: {
    template: "classic",
    photo: "",
    authMode: "signup",
  },
  // Demo data: Sample button click karne par presentation ke liye form auto-fill hota hai.
  sample: {
    name: "Aarav Sharma",
    role: "Frontend Developer",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Indore, India",
    github: "github.com/aaravsharma",
    linkedin: "linkedin.com/in/aaravsharma",
    objective: "Motivated computer science student with strong fundamentals in web development, problem solving, and clean UI implementation. Looking for an opportunity to build reliable products and learn with an engineering team.",
    course: "B.Tech in Computer Science",
    college: "Acropolis Institute of Technology",
    cgpa: "8.7 CGPA",
    gradYear: "2026",
    stream: "PCM",
    marks12: "86%",
    school12: "St. Paul Higher Secondary School",
    passYear: "2022",
    projects: "Resume Generator - Built a live preview resume builder with multiple templates\nLibrary Management System - Created CRUD screens for books, students and issue records\nWeather App - Integrated API data with responsive UI",
    experienceList: "Web Development Intern - Converted designs into responsive pages and improved form validation\nFreelance Portfolio Website - Delivered a personal portfolio with SEO friendly structure",
    achievements: "College hackathon finalist\nSolved 150+ coding problems\nCompleted JavaScript certification",
    skills: "HTML, CSS, JavaScript, React, Git, Bootstrap",
    certs: "JavaScript Basics, Responsive Web Design, Git and GitHub",
    langs: "Hindi, English",
    strengths: "Quick Learner, Team Player, Problem Solver",
    hobbies: "Cricket, Reading, UI Design"
  }
};
