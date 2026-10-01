/* status.js : ทำงานเฉพาะหน้า status.html (แสดงสถานะใบสมัคร) */

/* เติมข้อความลงใน element ถ้าไม่มีข้อมูลให้แสดง "-" */
function setText(elementId, value) {
  var element = document.getElementById(elementId);
  if (!element) {
    return;
  }

  if (value === undefined || value === null || value === '') {
    element.textContent = '-';
  } else {
    element.textContent = value;
  }
}

/* แสดงชื่อสาขาวิชา และข้อมูลวิทยาเขต/คณะ/ภาควิชา ของแต่ละอันดับ */
function renderPrograms(programs) {
  for (var rank = 1; rank <= 3; rank++) {
    var programText = '';
    var metaText = '';

    for (var i = 0; i < programs.length; i++) {
      var item = programs[i];

      if (item.rank !== rank || item.program === '') {
        continue;
      }

      programText = item.program;

      var parts = [];
      if (item.campus) { parts.push(item.campus); }
      if (item.faculty) { parts.push(item.faculty); }
      if (item.department) { parts.push(item.department); }
      metaText = parts.join(' • ');

      break;
    }

    setText('program' + rank, programText);
    setText('programMeta' + rank, metaText);
  }
}

/* แสดงข้อมูลของใบสมัครทั้งหมดลงในหน้าเว็บ */
function renderApplication() {
  var user = getCurrentUser();
  if (!user) {
    return;
  }

  var applications = getData(KEY_APPLICATIONS, {});
  var application = applications[user.citizenId];

  // ถ้ายังไม่เคยส่งใบสมัคร ให้แสดง "-" ทั้งหมด
  if (!application) {
    setText('applicationNo', '-');
    setText('submittedAt', '-');
    renderPrograms([]);
    return;
  }

  var personal = application.personal || {};
  var education = application.education || {};

  setText('applicationNo', application.applicationNo);
  setText('submittedAt', application.submittedAt);
  setText('statusBadge', application.status || 'รอตรวจสอบ');
  setText('timelineSubmitted', 'ส่งใบสมัครเมื่อ ' + (application.submittedAt || '-'));

  renderPrograms(application.programs || []);

  var fullName = '';
  if (personal.firstName || personal.lastName) {
    fullName = (personal.title || '') + ' ' + (personal.firstName || '') + ' ' + (personal.lastName || '');
  }
  setText('applicantName', fullName.trim());
  setText('applicantCitizenId', user.citizenId);
  setText('applicantSchool', education.schoolName);
}

/* ปุ่มพิมพ์ใบสมัคร */
function setupPrintButton() {
  var printButton = document.getElementById('printBtn');
  if (printButton) {
    printButton.addEventListener('click', function () {
      window.print();
    });
  }
}

/* เริ่มทำงานเมื่อโหลดหน้าเสร็จ */
document.addEventListener('DOMContentLoaded', function () {
  requireLogin();

  // ถ้าไม่ได้ล็อกอิน ระบบกำลังพาไปหน้า login จึงหยุดทำงานตรงนี้
  if (!getCurrentUser()) {
    return;
  }

  renderApplication();
  setupPrintButton();
});
