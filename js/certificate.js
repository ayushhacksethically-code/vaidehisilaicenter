/* ==========================================================================
   DYNAMIC CERTIFICATE RENDERER & PRINT CONTROLLER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Target DOM fields for printing content
  const certViewName = document.getElementById("cert-view-name");
  const certViewCourse = document.getElementById("cert-view-course");
  const certViewStart = document.getElementById("cert-view-start");
  const certViewEnd = document.getElementById("cert-view-end");
  const certViewGrade = document.getElementById("cert-view-grade");

  const btnPrint = document.getElementById("btn-print-action");
  const btnBack = document.getElementById("btn-back-action");

  // Helper: Get ordinal suffix for dates (e.g. 1st, 2nd, 3rd, 4th)
  const getOrdinalSuffix = (day) => {
    const j = day % 10, k = day % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
  };

  // Helper: Format YYYY-MM-DD into "1st October 2025"
  const formatDateString = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;

    const day = dateObj.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  // Helper: Retrieve query string variables
  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  // Resolve Student Info: sessionStorage first, URL parameter fallback second
  const studentName = sessionStorage.getItem("cert_student_name") || getQueryParam("name") || "Jane Doe";
  const courseName = sessionStorage.getItem("cert_course_name") || getQueryParam("course") || "Advanced Tailoring & Dress Designing";
  const gradeSecured = sessionStorage.getItem("cert_grade") || getQueryParam("grade") || "A+";
  const startDate = sessionStorage.getItem("cert_start_date") || getQueryParam("start") || "2025-10-01";
  const endDate = sessionStorage.getItem("cert_end_date") || getQueryParam("end") || "2026-03-31";

  // Bind values to UI Nodes
  if (certViewName) certViewName.textContent = studentName;
  if (certViewCourse) certViewCourse.textContent = courseName;
  if (certViewStart) certViewStart.textContent = formatDateString(startDate);
  if (certViewEnd) certViewEnd.textContent = formatDateString(endDate);
  if (certViewGrade) certViewGrade.textContent = gradeSecured;

  // Print button actions
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  // Go back to Courses page
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      // If history exists, go back, else redirect to courses.html
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "courses.html";
      }
    });
  }

  // Auto-trigger print modal if query string contains 'print=true'
  if (getQueryParam("print") === "true") {
    setTimeout(() => {
      window.print();
    }, 500);
  }
});
