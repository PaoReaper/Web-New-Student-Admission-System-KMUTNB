/* apply.js : ทำงานเฉพาะหน้า apply.html (ฟอร์มสมัคร 4 ขั้นตอน) */

/* ข้อมูลวิทยาเขต คณะ และสาขาวิชา/ภาควิชา ของ มจพ.
   โครงสร้าง : วิทยาเขต -> คณะ -> [ { department, programs } ]
   - ถ้า programs ว่าง แปลว่าใช้ชื่อภาควิชาเป็นสาขาวิชา
   - ถ้า department ว่าง แปลว่าคณะนั้นมีแต่สาขาวิชา ไม่มีภาควิชา */
var ACADEMIC_DATA = {

  /* ===== วิทยาเขตกรุงเทพมหานคร (วิทยาเขตหลัก) ===== */
  'มจพ. วิทยาเขตกรุงเทพมหานคร (วิทยาเขตหลัก)': {

    'คณะวิศวกรรมศาสตร์': [
      { department: 'ภาควิชาวิศวกรรมเครื่องกลและอวกาศ', programs: ['วิศวกรรมเครื่องกล', 'วิศวกรรมการบินและอวกาศ'] },
      { department: 'ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์', programs: ['วิศวกรรมไฟฟ้า', 'วิศวกรรมคอมพิวเตอร์'] },
      { department: 'ภาควิชาวิศวกรรมการผลิต', programs: ['วิศวกรรมการผลิต', 'วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ'] },
      { department: 'ภาควิชาวิศวกรรมเคมี', programs: ['วิศวกรรมเคมี'] },
      { department: 'ภาควิชาวิศวกรรมอุตสาหการ', programs: ['วิศวกรรมอุตสาหการ'] },
      { department: 'ภาควิชาวิศวกรรมโยธา', programs: ['วิศวกรรมโยธา'] },
      { department: 'ภาควิชาวิศวกรรมเครื่องมือวัดและอิเล็กทรอนิกส์', programs: ['วิศวกรรมระบบเครื่องมือวัด', 'วิศวกรรมไฟฟ้าอุตสาหกรรมและพลังงาน'] },
      { department: 'ภาควิชาวิศวกรรมการขนส่งและโลจิสติกส์', programs: ['วิศวกรรมขนถ่ายวัสดุ', 'วิศวกรรมโลจิสติกส์'] },
      { department: 'ภาควิชาวิศวกรรมวัสดุและเทคโนโลยีการผลิต', programs: ['วิศวกรรมวัสดุ', 'วิศวกรรมวัสดุนวัตกรรม'] }
    ],
    'วิทยาลัยเทคโนโลยีอุตสาหกรรม (วทอ.)': [
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมเครื่องกล', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมการผลิต', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมไฟฟ้า', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมโยธาและสิ่งแวดล้อม', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมอุตสาหการ', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมการเชื่อม', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีวิศวกรรมระบบราง', programs: [] }
    ],

    'คณะวิทยาศาสตร์ประยุกต์': [
      { department: 'ภาควิชาคณิตศาสตร์ประยุกต์', programs: [] },
      { department: 'ภาควิชาเคมีอุตสาหกรรม', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีอุตสาหกรรมเกษตร จุลชีววิทยา และวิทยาศาสตร์การอาหาร', programs: [] },
      { department: 'ภาควิชาฟิสิกส์อุตสาหกรรมและอุปกรณ์การแพทย์', programs: [] },
      { department: 'ภาควิชาสถิติประยุกต์', programs: [] },
      { department: 'ภาควิชาวิทยาศาสตร์และเทคโนโลยีการยาง', programs: [] }
    ],

    'คณะเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล (ITDI)': [
      { department: 'ภาควิชาเทคโนโลยีสารสนเทศ', programs: [] },
      { department: 'ภาควิชาการจัดการเครือข่ายคอมพิวเตอร์และสารสนเทศ', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีสารสนเทศและการสื่อสารเพื่อการบริการ', programs: [] }
    ],

    'คณะครุศาสตร์อุตสาหกรรม': [
      { department: 'ภาควิชาครุศาสตร์เครื่องกล', programs: [] },
      { department: 'ภาควิชาครุศาสตร์ไฟฟ้า', programs: [] },
      { department: 'ภาควิชาครุศาสตร์โยธา', programs: [] },
      { department: 'ภาควิชาครุศาสตร์อุตสาหการ', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีสารสนเทศและการศึกษา', programs: [] },
      { department: 'ภาควิชาบริหารเทคโนโลยีและนวัตกรรม', programs: [] }
    ],

    'คณะสถาปัตยกรรมและการออกแบบ': [
      { department: '', programs: ['สถาปัตยกรรม', 'การออกแบบภายใน', 'การออกแบบผลิตภัณฑ์'] }
    ],

    'คณะศิลปศาสตร์ประยุกต์': [
      { department: 'ภาควิชาภาษา', programs: ['ภาษาอังกฤษเพื่อการสื่อสารเชิงธุรกิจ/เทคโนโลยี'] },
      { department: 'ภาควิชามนุษยศาสตร์', programs: [] },
      { department: 'ภาควิชาสังคมศาสตร์', programs: ['จิตวิทยาอุตสาหกรรมและองค์การ'] }
    ],

    'คณะพัฒนาธุรกิจและอุตสาหกรรม': [
      { department: 'ภาควิชาการพัฒนาธุรกิจอุตสาหกรรมและทรัพยากรมนุษย์', programs: [] }
    ],

    'บัณฑิตวิทยาลัยวิศวกรรมศาสตร์นานาชาติสิรินธร ไทย-เยอรมัน (TGGS)': [
      { department: '', programs: ['หลักสูตรนานาชาติระดับปริญญาโท-เอก ด้านวิศวกรรมศาสตร์แบบเยอรมัน'] }
    ],

    'วิทยาลัยนานาชาติ (STIC)': [
      { department: '', programs: ['หลักสูตรนานาชาติด้านการจัดการ วิศวกรรม และเทคโนโลยี'] }
    ]
  },

  /* ===== วิทยาเขตปราจีนบุรี ===== */
  'มจพ. วิทยาเขตปราจีนบุรี': {
    'คณะเทคโนโลยีและการจัดการอุตสาหกรรม (ITM)': [
      { department: 'ภาควิชาเทคโนโลยีสารสนเทศ', programs: ['เทคโนโลยีสารสนเทศ', 'การจัดการเครือข่ายคอมพิวเตอร์'] },
      { department: 'ภาควิชาการจัดการอุตสาหกรรม', programs: ['การจัดการอุตสาหกรรม', 'ธุรกิจบริการ'] },
      { department: 'ภาควิชาการออกแบบและบริหารงานก่อสร้าง', programs: [] },
      { department: 'ภาควิชาวิศวกรรมเกษตรเพื่ออุตสาหกรรม', programs: [] },
      { department: 'สาขาวิชาวิศวกรรมระบบเครื่องมือวัด', programs: [] }
    ],

    'คณะบริหารธุรกิจและอุตสาหกรรมบริการ (BAS)': [
      { department: 'ภาควิชาบริหารธุรกิจอุตสาหกรรมและการค้า', programs: ['การบริหารธุรกิจอุตสาหกรรม', 'การท่องเที่ยวและโรงแรม', 'การจัดการธุรกิจการค้า'] }
    ],

    'คณะอุตสาหกรรมเกษตรดิจิทัล (DAI)': [
      { department: 'ภาควิชาเทคโนโลยีอุตสาหกรรมเกษตรและจัดการ', programs: [] },
      { department: 'ภาควิชาเทคโนโลยีนวัตกรรมและพัฒนาผลิตภัณฑ์', programs: ['นวัตกรรมอาหาร', 'วิทยาศาสตร์การประกอบอาหาร'] }
    ]
  },

  /* ===== วิทยาเขตระยอง ===== */
  'มจพ. วิทยาเขตระยอง': {

    'คณะวิศวกรรมศาสตร์และเทคโนโลยี (EAT)': [
      { department: 'ภาควิชาวิศวกรรมศาสตร์และเทคโนโลยี', programs: ['วิศวกรรมยานยนต์และระบบอัตโนมัติ', 'วิศวกรรมกระบวนการเคมี', 'วิศวกรรมหุ่นยนต์', 'เทคโนโลยีวิศวกรรมโยธา', 'เทคโนโลยีวิศวกรรมไฟฟ้าและคอมพิวเตอร์'] }
    ],

    'คณะวิทยาศาสตร์ พลังงานและสิ่งแวดล้อม (SEEN)': [
      { department: 'ภาควิชาวิทยาศาสตร์ประยุกต์และสิ่งแวดล้อม', programs: ['เทคโนโลยีสิ่งแวดล้อม', 'วิทยาศาสตร์ข้อมูลและการวิเคราะห์'] },
      { department: 'ภาควิชาเทคโนโลยีพลังงาน', programs: ['เทคโนโลยีพลังงานและการจัดการ'] }
    ],

    'คณะบริหารธุรกิจ (FBA)': [
      { department: 'ภาควิชาบริหารธุรกิจ', programs: ['การบัญชี', 'การคอมพิวเตอร์ธุรกิจ', 'การจัดการโลจิสติกส์', 'การจัดการอุตสาหกรรม'] }
    ]
  }
};

/* รายการเอกสารที่ต้องอัปโหลด (เอกสารแต่ละชนิด) */
var DOCUMENT_LIST = [
  { key: 'idCard', name: 'บัตรประจำตัวประชาชน', inputId: 'fileIdCard', badgeId: 'badgeIdCard', nameId: 'nameIdCard', allowed: ['pdf'], maxMB: 5 },
  { key: 'houseReg', name: 'สำเนาทะเบียนบ้าน', inputId: 'fileHouseReg', badgeId: 'badgeHouseReg', nameId: 'nameHouseReg', allowed: ['pdf'], maxMB: 5 },
  { key: 'transcript', name: 'ใบแสดงผลการศึกษา (ปพ.1)', inputId: 'fileTranscript', badgeId: 'badgeTranscript', nameId: 'nameTranscript', allowed: ['pdf', 'jpg', 'jpeg'], maxMB: 10 },
  { key: 'photo', name: 'รูปถ่ายนักศึกษา', inputId: 'filePhoto', badgeId: 'badgePhoto', nameId: 'namePhoto', allowed: ['jpg', 'jpeg', 'png'], maxMB: 2 }
];

/* สถานะของฟอร์มในหน้านี้ */
var currentStep = 1;      // ขั้นตอนที่กำลังเปิดอยู่
var uploadedDocs = {};    // เก็บชื่อไฟล์ที่อัปโหลดสำเร็จของแต่ละเอกสาร

/* ส่วนที่ 1 : การสลับขั้นตอน */

/* สลับไปยังขั้นตอนที่กำหนด และอัปเดต sidebar ให้ตรงกัน */
function goToStep(step) {
  currentStep = step;

  var steps = document.querySelectorAll('.form-step');
  for (var i = 0; i < steps.length; i++) {
    steps[i].classList.remove('active');
  }

  var targetStep = document.getElementById('step' + step);
  if (targetStep) {
    targetStep.classList.add('active');
  }

  var sideSteps = document.querySelectorAll('.side-step');
  for (var j = 0; j < sideSteps.length; j++) {
    var sideStep = sideSteps[j];
    var sideNumber = parseInt(sideStep.getAttribute('data-step'), 10);
    var sideDot = sideStep.querySelector('.side-dot');

    sideStep.classList.remove('active');
    sideStep.classList.remove('done');

    if (sideNumber === step) {
      sideStep.classList.add('active');
      sideDot.textContent = sideNumber;
    } else if (sideNumber < step) {
      sideStep.classList.add('done');
      sideDot.textContent = '\u2713'; // เครื่องหมายถูก
    } else {
      sideDot.textContent = sideNumber;
    }
  }

  window.scrollTo(0, 0);
}

/* ส่วนที่ 2 : เติมข้อมูลเริ่มต้น และแถบความก้าวหน้า */

/* นำชื่อ อีเมล และเบอร์โทร จากข้อมูลที่ลงทะเบียนมาเติมให้อัตโนมัติ */
function prefillPersonalData() {
  var user = getCurrentUser();
  if (!user) {
    return;
  }

  // แยกชื่อกับนามสกุลออกจากกันด้วยช่องว่างช่องแรก
  var nameParts = user.fullname.trim().split(' ');
  document.getElementById('firstName').value = nameParts[0] || '';
  if (nameParts.length > 1) {
    document.getElementById('lastName').value = nameParts.slice(1).join(' ');
  }

  document.getElementById('phone').value = user.phone || '';
  document.getElementById('email').value = user.email || '';
}

/* คำนวณเปอร์เซ็นต์ความก้าวหน้าการกรอกข้อมูลของขั้น 1 */
function updateProgress() {
  var step1 = document.getElementById('step1');
  if (!step1) {
    return;
  }

  var fields = step1.querySelectorAll('input, select, textarea');
  var filledCount = 0;

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value.trim() !== '') {
      filledCount = filledCount + 1;
    }
  }

  var percent = 0;
  if (fields.length > 0) {
    percent = Math.round((filledCount / fields.length) * 100);
  }

  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('progressFill').style.width = percent + '%';
}

/* ส่วนที่ 3 : ตรวจสอบข้อมูลของแต่ละขั้นตอน */

/* ขั้น 1 : ตรวจข้อมูลส่วนตัว */
function validateStep1() {
  var fields = ['title', 'firstName', 'lastName', 'birthDate', 'nationality', 'religion', 'phone', 'email', 'address'];
  clearErrors(fields);

  var messages = {
    title: 'กรุณาเลือกคำนำหน้านาม',
    firstName: 'กรุณากรอกชื่อตัว',
    lastName: 'กรุณากรอกนามสกุล',
    birthDate: 'กรุณากรอกวัน/เดือน/ปีเกิด',
    nationality: 'กรุณาเลือกสัญชาติ',
    religion: 'กรุณาเลือกศาสนา',
    phone: 'กรุณากรอกเบอร์โทรศัพท์',
    email: 'กรุณากรอกอีเมล',
    address: 'กรุณากรอกที่อยู่ปัจจุบัน'
  };

  var isValid = true;

  for (var i = 0; i < fields.length; i++) {
    if (getFieldValue(fields[i]) === '') {
      showError(fields[i], messages[fields[i]]);
      isValid = false;
    }
  }

  var birthDate = getFieldValue('birthDate');
  if (birthDate !== '' && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthDate)) {
    showError('birthDate', 'กรุณาเลือกวัน/เดือน/ปีเกิดจากปฏิทิน');
    isValid = false;
  }

  var phone = getFieldValue('phone');
  if (phone !== '' && !isPhone(phone)) {
    showError('phone', 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก และขึ้นต้นด้วย 0');
    isValid = false;
  }

  var email = getFieldValue('email');
  if (email !== '' && !isEmail(email)) {
    showError('email', 'รูปแบบอีเมลไม่ถูกต้อง เช่น example@email.com');
    isValid = false;
  }

  return isValid;
}

/* ขั้น 2 : ตรวจข้อมูลการศึกษา */
function validateStep2() {
  var fields = ['schoolName', 'schoolProvince', 'educationLevel', 'studyPlan', 'gpax', 'graduationYear'];
  clearErrors(fields.concat(['studyPlanOther']));

  var messages = {
    schoolName: 'กรุณากรอกชื่อโรงเรียน',
    schoolProvince: 'กรุณากรอกจังหวัดของโรงเรียน',
    educationLevel: 'กรุณาเลือกระดับการศึกษา',
    studyPlan: 'กรุณาเลือกแผนการเรียน',
    gpax: 'กรุณากรอกเกรดเฉลี่ยสะสม',
    graduationYear: 'กรุณากรอกปีที่จบการศึกษา'
  };

  var isValid = true;

  for (var i = 0; i < fields.length; i++) {
    if (getFieldValue(fields[i]) === '') {
      showError(fields[i], messages[fields[i]]);
      isValid = false;
    }
  }

  var gpax = getFieldValue('gpax');
  if (gpax !== '' && !/^[0-4](\.[0-9]{1,2})?$/.test(gpax)) {
    showError('gpax', 'กรุณากรอกเกรดเฉลี่ยเป็นตัวเลข เช่น 3.25');
    isValid = false;
  }

  var graduationYear = getFieldValue('graduationYear');
  if (graduationYear !== '' && !/^[0-9]{4}$/.test(graduationYear)) {
    showError('graduationYear', 'กรุณากรอกปี พ.ศ. 4 หลัก เช่น 2569');
    isValid = false;
  }

  // ถ้าเลือกแผนการเรียน "อื่น ๆ" ต้องระบุชื่อแผนการเรียนด้วย
  if (getFieldValue('studyPlan') === 'อื่นๆ' && getFieldValue('studyPlanOther') === '') {
    showError('studyPlanOther', 'กรุณาระบุแผนการเรียนอื่น ๆ');
    isValid = false;
  }

  return isValid;
}

/* ขั้น 3 : ตรวจการเลือกสาขาวิชา (อันดับ 1 บังคับ) */
function validateStep3() {
  clearErrors(['program1']);

  var campus1 = getFieldValue('campus1');
  var faculty1 = getFieldValue('faculty1');
  var program1 = getFieldValue('program1');

  if (program1 === '') {
    var message = 'กรุณาเลือกสาขาวิชาอันดับ 1';

    if (campus1 === '') {
      message = 'กรุณาเลือกวิทยาเขต คณะ และสาขาวิชาอันดับ 1';
    } else if (faculty1 === '') {
      message = 'กรุณาเลือกคณะและสาขาวิชาอันดับ 1';
    }

    showError('program1', message);
    return false;
  }

  return true;
}


/* ส่วนที่ 4 : รวมข้อมูลจากฟอร์มแต่ละขั้นตอน */

/* ข้อมูลส่วนตัว (ขั้น 1) */
function getPersonalData() {
  return {
    title: getFieldValue('title'),
    firstName: getFieldValue('firstName'),
    lastName: getFieldValue('lastName'),
    birthDate: getFieldValue('birthDate'),
    nationality: getFieldValue('nationality'),
    religion: getFieldValue('religion'),
    phone: getFieldValue('phone'),
    email: getFieldValue('email'),
    address: getFieldValue('address')
  };
}

/* ข้อมูลการศึกษา (ขั้น 2) */
function getEducationData() {
  return {
    schoolName: getFieldValue('schoolName'),
    schoolProvince: getFieldValue('schoolProvince'),
    educationLevel: getFieldValue('educationLevel'),
    studyPlan: getFieldValue('studyPlan'),
    studyPlanOther: getFieldValue('studyPlanOther'),
    gpax: getFieldValue('gpax'),
    graduationYear: getFieldValue('graduationYear')
  };
}

/* สาขาวิชาที่เลือก 3 อันดับ (ขั้น 3) */
function getProgramData() {
  var programs = [];
  for (var rank = 1; rank <= 3; rank++) {
    programs.push({
      rank: rank,
      campus: getFieldValue('campus' + rank),
      faculty: getFieldValue('faculty' + rank),
      department: getSelectedDepartment(rank),
      program: getFieldValue('program' + rank)
    });
  }
  return programs;
}

/* ส่วนที่ 5 : บันทึกร่าง / กู้คืนร่าง */

/* บันทึกข้อมูลที่กรอกไว้ลง localStorage */
function saveDraft() {
  var draft = {
    personal: getPersonalData(),
    education: getEducationData(),
    programs: getProgramData(),
    savedAt: formatThaiDate(new Date())
  };

  saveData(KEY_DRAFT, draft);
  alert('บันทึกข้อมูลร่างเรียบร้อยแล้ว');
}

/* นำข้อมูลร่างที่เคยบันทึกไว้กลับมาใส่ในฟอร์ม */
function loadDraft() {
  var draft = getData(KEY_DRAFT, null);
  if (!draft) {
    return;
  }

  var personal = draft.personal || {};
  for (var key in personal) {
    var field = document.getElementById(key);
    if (field) {
      field.value = personal[key];
    }
  }

  var education = draft.education || {};
  for (var studyKey in education) {
    var studyField = document.getElementById(studyKey);
    if (studyField) {
      studyField.value = education[studyKey];
    }
  }

  // ถ้าร่างที่บันทึกไว้เลือกแผนการเรียน "อื่น ๆ" ให้แสดงช่องกรอกกลับมาด้วย
  updateStudyPlanOtherVisibility();

  // เติมสาขาวิชาที่เลือก (ต้องเลือกวิทยาเขต แล้วเลือกคณะ จึงจะเติมสาขาได้)
  var programs = draft.programs || [];
  for (var i = 0; i < programs.length; i++) {
    var item = programs[i];
    if (!item.campus || !item.faculty) {
      continue;
    }

    document.getElementById('campus' + item.rank).value = item.campus;
    fillFacultyOptions(item.rank, item.campus);

    document.getElementById('faculty' + item.rank).value = item.faculty;
    fillProgramOptions(item.rank, item.campus, item.faculty);

    if (item.program) {
      document.getElementById('program' + item.rank).value = item.program;
    }
  }
}

/* ส่วนที่ 6 : ตัวเลือกวิทยาเขต / คณะ / สาขาวิชา */

/* เติมรายชื่อวิทยาเขตลงใน select ทั้ง 3 อันดับ และผูก event ให้ช่องวิทยาเขต/คณะ */
function setupAcademicSelects() {
  var campusSelects = document.querySelectorAll('.campus-select');

  for (var i = 0; i < campusSelects.length; i++) {
    var select = campusSelects[i];

    for (var campusName in ACADEMIC_DATA) {
      var option = document.createElement('option');
      option.value = campusName;
      option.textContent = campusName;
      select.appendChild(option);
    }

    select.addEventListener('change', handleCampusChange);
  }

  // ผูก event ให้ช่องคณะ เพื่อเติมสาขาวิชาเมื่อเลือกคณะ (ส่วนที่แก้ไข)
  var facultySelects = document.querySelectorAll('.faculty-select');
  for (var k = 0; k < facultySelects.length; k++) {
    facultySelects[k].addEventListener('change', handleFacultyChange);
  }
}

/* เมื่อเลือกวิทยาเขต ให้เติมรายชื่อคณะของวิทยาเขตนั้น */
function handleCampusChange(event) {
  var select = event.target;
  var rank = select.getAttribute('data-rank');

  fillFacultyOptions(rank, select.value);

  // เปลี่ยนวิทยาเขตแล้ว ต้องล้างสาขาวิชาเดิมออกก่อน
  document.getElementById('program' + rank).innerHTML = '<option value="">-- เลือกสาขาวิชา --</option>';
}

/* เมื่อเลือกคณะ ให้เติมสาขาวิชาของคณะนั้น */
function handleFacultyChange(event) {
  var select = event.target;
  var rank = select.getAttribute('data-rank');
  var campusName = getFieldValue('campus' + rank);

  fillProgramOptions(rank, campusName, select.value);
}

/* เติมรายชื่อคณะตามวิทยาเขตที่เลือก */
function fillFacultyOptions(rank, campusName) {
  var facultySelect = document.getElementById('faculty' + rank);
  facultySelect.innerHTML = '<option value="">-- เลือกคณะ --</option>';

  var faculties = ACADEMIC_DATA[campusName];
  if (!faculties) {
    return;
  }

  for (var facultyName in faculties) {
    var option = document.createElement('option');
    option.value = facultyName;
    option.textContent = facultyName;
    facultySelect.appendChild(option);
  }
}

/* เติมรายชื่อสาขาวิชาตามวิทยาเขตและคณะ (จัดกลุ่มตามภาควิชาด้วย optgroup) */
function fillProgramOptions(rank, campusName, facultyName) {
  var programSelect = document.getElementById('program' + rank);
  programSelect.innerHTML = '<option value="">-- เลือกสาขาวิชา --</option>';

  var faculties = ACADEMIC_DATA[campusName];
  if (!faculties) {
    return;
  }

  var departments = faculties[facultyName];
  if (!departments) {
    return;
  }

  for (var i = 0; i < departments.length; i++) {
    var item = departments[i];

    // ถ้าภาควิชาไม่มีสาขาย่อย ให้ใช้ชื่อภาควิชาเป็นสาขาวิชา
    var programNames = item.programs;
    if (programNames.length === 0) {
      programNames = [item.department];
    }

    // ถ้าภาควิชามีหลายสาขา ให้จัดกลุ่มด้วย optgroup เพื่อให้เห็นโครงสร้าง
    var container = programSelect;
    if (item.programs.length > 0 && item.department !== '') {
      container = document.createElement('optgroup');
      container.label = item.department;
      programSelect.appendChild(container);
    }

    for (var j = 0; j < programNames.length; j++) {
      var option = document.createElement('option');
      option.value = programNames[j];
      option.textContent = programNames[j];
      container.appendChild(option);
    }
  }
}

/* ดึงชื่อภาควิชาของสาขาวิชาที่เลือกอยู่ (อ่านจาก optgroup) */
function getSelectedDepartment(rank) {
  var programSelect = document.getElementById('program' + rank);
  if (!programSelect || programSelect.selectedIndex < 0) {
    return '';
  }

  var selectedOption = programSelect.options[programSelect.selectedIndex];
  if (selectedOption && selectedOption.parentNode && selectedOption.parentNode.tagName === 'OPTGROUP') {
    return selectedOption.parentNode.label;
  }

  return '';
}


/* ส่วนที่ 7 : ช่อง "ระบุแผนการเรียนอื่น ๆ" */

/* ซ่อนหรือแสดงช่องกรอกเพิ่มเติมตามแผนการเรียนที่เลือก */
function updateStudyPlanOtherVisibility() {
  var studyPlan = document.getElementById('studyPlan');
  var otherGroup = document.getElementById('studyPlanOtherGroup');

  if (!studyPlan || !otherGroup) {
    return;
  }

  if (studyPlan.value === 'อื่นๆ') {
    otherGroup.hidden = false;
  } else {
    otherGroup.hidden = true;
  }
}

/* ผูกเหตุการณ์ให้ช่องเลือกแผนการเรียน */
function setupStudyPlanField() {
  var studyPlan = document.getElementById('studyPlan');
  if (!studyPlan) {
    return;
  }

  studyPlan.addEventListener('change', function () {
    updateStudyPlanOtherVisibility();

    // ถ้าเปลี่ยนไปเลือกแผนอื่น ให้ล้างค่าที่เคยกรอกไว้ในช่อง "อื่น ๆ"
    if (studyPlan.value !== 'อื่นๆ') {
      document.getElementById('studyPlanOther').value = '';
      clearErrors(['studyPlanOther']);
    }
  });
}

/* ส่วนที่ 8 : อัปโหลดเอกสาร (ขั้น 4) */

/* ผูกเหตุการณ์ให้ช่องเลือกไฟล์ทั้ง 4 รายการ */
function setupUploads() {
  for (var i = 0; i < DOCUMENT_LIST.length; i++) {
    var input = document.getElementById(DOCUMENT_LIST[i].inputId);
    if (input) {
      input.addEventListener('change', handleFileChange);
    }
  }
}

/* ดึงนามสกุลไฟล์ออกมาเป็นตัวพิมพ์เล็ก เช่น photo.JPG -> jpg */
function getFileExtension(fileName) {
  var parts = fileName.split('.');
  if (parts.length < 2) {
    return '';
  }
  return parts[parts.length - 1].toLowerCase();
}

/* เมื่อผู้ใช้เลือกไฟล์ : ตรวจชนิดและขนาดไฟล์ */
function handleFileChange(event) {
  var input = event.target;
  var doc = findDocumentConfig(input.id);

  if (!doc || !input.files || input.files.length === 0) {
    return;
  }

  var file = input.files[0];
  var extension = getFileExtension(file.name);
  var alertBox = document.getElementById('uploadAlert');

  if (doc.allowed.indexOf(extension) === -1) {
    alertBox.textContent = '"' + doc.name + '" ต้องเป็นไฟล์ ' + doc.allowed.join(', ').toUpperCase() + ' เท่านั้น';
    alertBox.hidden = false;
    input.value = ''; // ล้างไฟล์ที่เลือกผิดออก
    return;
  }

  // ตรวจขนาดไฟล์ (MB -> byte)
  var maxBytes = doc.maxMB * 1024 * 1024;
  if (file.size > maxBytes) {
    alertBox.textContent = '"' + doc.name + '" มีขนาดไฟล์เกิน ' + doc.maxMB + ' MB';
    alertBox.hidden = false;
    input.value = '';
    return;
  }

  alertBox.hidden = true;
  markDocumentUploaded(doc, file.name);
}

/* ค้นหาการตั้งค่าของเอกสารจาก id ของช่องเลือกไฟล์ */
function findDocumentConfig(inputId) {
  for (var i = 0; i < DOCUMENT_LIST.length; i++) {
    if (DOCUMENT_LIST[i].inputId === inputId) {
      return DOCUMENT_LIST[i];
    }
  }
  return null;
}

/* เปลี่ยนสถานะเอกสารเป็นอัปโหลดสำเร็จ */
function markDocumentUploaded(doc, fileName) {
  uploadedDocs[doc.key] = fileName;

  var badge = document.getElementById(doc.badgeId);
  badge.textContent = 'สำเร็จ';
  badge.classList.remove('badge-danger');
  badge.classList.add('badge-success');

  document.getElementById(doc.nameId).textContent = fileName;

  checkAllDocuments();
}

/* เปิดปุ่มยืนยันการส่งใบสมัครเมื่อเอกสารครบทั้ง 4 รายการ */
function checkAllDocuments() {
  var uploadedCount = 0;
  for (var i = 0; i < DOCUMENT_LIST.length; i++) {
    if (uploadedDocs[DOCUMENT_LIST[i].key]) {
      uploadedCount = uploadedCount + 1;
    }
  }

  var submitButton = document.getElementById('submitApplicationBtn');
  if (uploadedCount === DOCUMENT_LIST.length) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

/* ส่วนที่ 9 : ส่งใบสมัคร */

/* สร้างเลขที่ใบสมัครรูปแบบ 2570-000001 */
function generateApplicationNo() {
  var counter = getData(KEY_COUNTER, 0) + 1;
  saveData(KEY_COUNTER, counter);

  var paddedNumber = ('000000' + counter).slice(-6);
  return '2570-' + paddedNumber;
}

/* รวมข้อมูลทั้งหมด บันทึกเป็นใบสมัคร แล้วไปหน้าสถานะ */
function submitApplication() {
  var user = getCurrentUser();
  if (!user) {
    return;
  }

  var application = {
    applicationNo: generateApplicationNo(),
    citizenId: user.citizenId,
    submittedAt: formatThaiDate(new Date()),
    status: 'รอตรวจสอบ',
    personal: getPersonalData(),
    education: getEducationData(),
    programs: getProgramData(),
    documents: uploadedDocs
  };

  // เก็บใบสมัครแยกตามเลขบัตรประชาชนของผู้สมัคร
  var applications = getData(KEY_APPLICATIONS, {});
  applications[user.citizenId] = application;
  saveData(KEY_APPLICATIONS, applications);

  // ล้างข้อมูลร่างเมื่อส่งใบสมัครเรียบร้อยแล้ว
  localStorage.removeItem(KEY_DRAFT);

  alert('ส่งใบสมัครเรียบร้อยแล้ว เลขที่ใบสมัคร ' + application.applicationNo);
  window.location.href = 'status.html';
}

/* ส่วนที่ 10 : เริ่มทำงานเมื่อโหลดหน้าเสร็จ */
document.addEventListener('DOMContentLoaded', function () {
  requireLogin();

  // ถ้าไม่ได้ล็อกอิน ระบบกำลังพาไปหน้า login จึงหยุดทำงานตรงนี้
  if (!getCurrentUser()) {
    return;
  }

  prefillPersonalData();
  setupAcademicSelects();
  setupStudyPlanField();
  loadDraft();
  setupUploads();
  updateProgress();

  var step1 = document.getElementById('step1');
  step1.addEventListener('input', updateProgress);
  step1.addEventListener('change', updateProgress);

  document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);

  document.getElementById('nextFromStep1').addEventListener('click', function () {
    if (validateStep1()) {
      goToStep(2);
    }
  });

  document.getElementById('nextFromStep2').addEventListener('click', function () {
    if (validateStep2()) {
      goToStep(3);
    }
  });

  document.getElementById('nextFromStep3').addEventListener('click', function () {
    if (validateStep3()) {
      goToStep(4);
    }
  });

  var backButtons = document.querySelectorAll('[data-back]');
  for (var i = 0; i < backButtons.length; i++) {
    backButtons[i].addEventListener('click', function (event) {
      var targetStep = parseInt(event.target.getAttribute('data-back'), 10);
      goToStep(targetStep);
    });
  }

  document.getElementById('submitApplicationBtn').addEventListener('click', submitApplication);
});
