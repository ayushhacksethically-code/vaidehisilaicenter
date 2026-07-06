/* ==========================================================================
   ADMIN PORTAL PORTAL LOGIC (Vaidehi Silai Center)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const courseNameSelect = document.getElementById("course-name");
  const customCourseWrapper = document.getElementById("custom-course-wrapper");
  const customCourseInput = document.getElementById("custom-course");
  const btnGenerate = document.getElementById("btn-generate-preview");
  const certForm = document.getElementById("cert-form");

  if (courseNameSelect && customCourseWrapper && customCourseInput) {
    // Show custom text input if 'Custom Course' option is active
    courseNameSelect.addEventListener("change", () => {
      if (courseNameSelect.value === "Custom Course") {
        customCourseWrapper.style.display = "block";
        customCourseInput.setAttribute("required", "required");
        customCourseInput.focus();
      } else {
        customCourseWrapper.style.display = "none";
        customCourseInput.removeAttribute("required");
      }
    });
  }

  if (btnGenerate && certForm) {
    btnGenerate.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Perform basic HTML5 validity checks
      if (!certForm.checkValidity()) {
        certForm.reportValidity();
        return;
      }

      // Gather input nodes
      const studentName = document.getElementById("student-name").value.trim();
      const courseSelectValue = courseNameSelect.value;
      const courseName = courseSelectValue === "Custom Course" 
        ? customCourseInput.value.trim() 
        : courseSelectValue;
      const gradeSecured = document.getElementById("grade-secured").value;
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;

      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        alert("The course Start Date cannot be later than the End Date.");
        return;
      }

      // Store certificate details in sessionStorage for transition
      sessionStorage.setItem("cert_student_name", studentName);
      sessionStorage.setItem("cert_course_name", courseName);
      sessionStorage.setItem("cert_grade", gradeSecured);
      sessionStorage.setItem("cert_start_date", startDate);
      sessionStorage.setItem("cert_end_date", endDate);

      // Redirect to the dedicated certificate preview and printing page
      window.location.href = "certificate.html";
    });
  }
});
