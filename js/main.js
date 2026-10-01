/* main.js : ฟังก์ชันที่ใช้ร่วมกันทุกหน้า
   - ตัวแปรคีย์ของ localStorage
   - ฟังก์ชันช่วยอ่าน/เขียนข้อมูล
   - จัดการ navbar ตามสถานะการล็อกอิน */

/* คีย์ที่ใช้เก็บข้อมูลใน localStorage */
var KEY_USERS = 'kmutnb_users';             // บัญชีผู้ใช้ที่ลงทะเบียนทั้งหมด
var KEY_SESSION = 'kmutnb_session';         // ผู้ใช้ที่ล็อกอินอยู่ในขณะนี้
var KEY_APPLICATIONS = 'kmutnb_applications'; // ใบสมัคร แยกตามเลขบัตรประชาชน
var KEY_DRAFT = 'kmutnb_draft';             // ข้อมูลฟอร์มที่บันทึกร่างไว้
var KEY_COUNTER = 'kmutnb_counter';         // ตัวนับเลขที่ใบสมัคร

/* ชื่อเดือนภาษาไทย ใช้แปลงวันที่เป็น พ.ศ. */
var THAI_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

/* ฟังก์ชันช่วยอ่านข้อมูลจาก localStorage */
function getData(key, defaultValue) {
  var raw = localStorage.getItem(key);
  if (!raw) {
    return defaultValue;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return defaultValue;
  }
}

/* ฟังก์ชันช่วยบันทึกข้อมูลลง localStorage */
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* วันที่ปัจจุบันในรูปแบบไทย เช่น 1 ตุลาคม 2569 */
function formatThaiDate(date) {
  var day = date.getDate();
  var monthName = THAI_MONTHS[date.getMonth()];
  var year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.
  return day + ' ' + monthName + ' ' + year;
}

/* ดึงผู้ใช้ที่ล็อกอินอยู่ (คืนค่า null ถ้ายังไม่ล็อกอิน) */
function getCurrentUser() {
  return getData(KEY_SESSION, null);
}

/* ออกจากระบบแล้วกลับไปหน้าแรก */
function logout() {
  localStorage.removeItem(KEY_SESSION);
  window.location.href = 'index.html';
}

/* แสดงพื้นที่ด้านขวาของ navbar ตามสถานะการล็อกอิน */
function renderNavbar() {
  var actions = document.getElementById('navbarActions');
  if (!actions) {
    return;
  }

  var user = getCurrentUser();

  if (user) {
    actions.innerHTML =
      '<div class="nav-user">' +
        '<span class="nav-avatar"></span>' +
        '<span class="nav-username"></span>' +
        '<button class="btn btn-outline btn-sm" type="button" id="logoutBtn">ออกจากระบบ</button>' +
      '</div>';

    actions.querySelector('.nav-avatar').textContent = user.fullname.charAt(0);
    actions.querySelector('.nav-username').textContent = user.fullname;
    document.getElementById('logoutBtn').addEventListener('click', logout);
  } else {
    actions.innerHTML =
      '<a class="btn btn-outline" href="login.html">เข้าสู่ระบบ</a>' +
      '<a class="btn btn-primary" href="register.html">สมัครเรียน</a>';
  }
}

/* เน้นเมนูของหน้าที่กำลังเปิดอยู่ */
function markActiveNav() {
  var currentPage = window.location.pathname.split('/').pop();
  if (!currentPage) {
    currentPage = 'index.html';
  }

  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === currentPage) {
      links[i].classList.add('active');
    }
  }
}

/* หน้าที่ต้องล็อกอินก่อน (apply.html, status.html) */
function requireLogin() {
  if (!getCurrentUser()) {
    window.location.href = 'login.html';
  }
}

/* ฟังก์ชันช่วยตรวจสอบข้อมูล (ใช้ร่วมกันหลายหน้า) */

/* เลขบัตรประชาชน : ตัวเลข 13 หลัก */
function isCitizenId(value) {
  return /^[0-9]{13}$/.test(value);
}

/* อีเมล : รูปแบบพื้นฐาน example@email.com */
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* เบอร์โทรศัพท์ : 10 หลัก ขึ้นต้นด้วย 0 */
function isPhone(value) {
  return /^0[0-9]{9}$/.test(value);
}

/* อ่านค่าจากช่องกรอก แล้วตัดช่องว่างหัวท้ายออก */
function getFieldValue(fieldId) {
  var field = document.getElementById(fieldId);
  return field ? field.value.trim() : '';
}

/* แสดงข้อความ error ใต้ช่องกรอก */
function showError(fieldId, message) {
  var field = document.getElementById(fieldId);
  var errorText = document.getElementById(fieldId + 'Error');

  if (field) {
    field.classList.add('input-error');
  }
  if (errorText) {
    errorText.textContent = message;
    errorText.classList.add('show');
  }
}

/* ล้างข้อความ error ของช่องกรอกหลายช่องพร้อมกัน */
function clearErrors(fieldIds) {
  for (var i = 0; i < fieldIds.length; i++) {
    var field = document.getElementById(fieldIds[i]);
    var errorText = document.getElementById(fieldIds[i] + 'Error');

    if (field) {
      field.classList.remove('input-error');
    }
    if (errorText) {
      errorText.textContent = '';
      errorText.classList.remove('show');
    }
  }
}

/* เริ่มทำงานเมื่อโหลดหน้าเสร็จ */
document.addEventListener('DOMContentLoaded', function () {
  renderNavbar();
  markActiveNav();
});
