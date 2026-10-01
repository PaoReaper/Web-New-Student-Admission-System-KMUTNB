/* auth.js : ทำงานเฉพาะหน้า login.html และ register.html
   (ฟังก์ชันตรวจสอบรูปแบบข้อมูลและ helper อยู่ใน js/main.js) */

/* ส่วนของหน้าลงทะเบียน (register.html) */
function setupRegisterPage() {
  var form = document.getElementById('registerForm');
  if (!form) {
    return;
  }

  var fields = ['citizenId', 'fullname', 'email', 'phone', 'password', 'confirmPassword'];

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // ไม่ให้ฟอร์มส่งข้อมูลจริง (ระบบไม่มี backend)
    clearErrors(fields);

    var citizenId = document.getElementById('citizenId').value.trim();
    var fullname = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    var isValid = true;

    if (citizenId === '') {
      showError('citizenId', 'กรุณากรอกเลขบัตรประจำตัวประชาชน');
      isValid = false;
    } else if (!isCitizenId(citizenId)) {
      showError('citizenId', 'เลขบัตรประจำตัวประชาชนต้องเป็นตัวเลข 13 หลัก');
      isValid = false;
    }

    if (fullname === '') {
      showError('fullname', 'กรุณากรอกชื่อ-นามสกุล');
      isValid = false;
    }

    // ตรวจอีเมล
    if (email === '') {
      showError('email', 'กรุณากรอกอีเมลสำหรับติดต่อ');
      isValid = false;
    } else if (!isEmail(email)) {
      showError('email', 'รูปแบบอีเมลไม่ถูกต้อง เช่น example@email.com');
      isValid = false;
    }

    if (phone === '') {
      showError('phone', 'กรุณากรอกเบอร์โทรศัพท์มือถือ');
      isValid = false;
    } else if (!isPhone(phone)) {
      showError('phone', 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก และขึ้นต้นด้วย 0');
      isValid = false;
    }

    if (password === '') {
      showError('password', 'กรุณาตั้งรหัสผ่าน');
      isValid = false;
    } else if (password.length < 8) {
      showError('password', 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      isValid = false;
    }

    if (confirmPassword === '') {
      showError('confirmPassword', 'กรุณากรอกรหัสผ่านอีกครั้ง');
      isValid = false;
    } else if (confirmPassword !== password) {
      showError('confirmPassword', 'รหัสผ่านทั้งสองช่องไม่ตรงกัน');
      isValid = false;
    }

    var users = getData(KEY_USERS, []);
    for (var i = 0; i < users.length; i++) {
      if (users[i].citizenId === citizenId) {
        showError('citizenId', 'เลขบัตรประจำตัวประชาชนนี้ถูกลงทะเบียนไว้แล้ว');
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      return;
    }

    users.push({
      citizenId: citizenId,
      fullname: fullname,
      email: email,
      phone: phone,
      password: password
    });
    saveData(KEY_USERS, users);

    alert('ลงทะเบียนสำเร็จ กรุณาเข้าสู่ระบบด้วยเลขบัตรประจำตัวประชาชนและรหัสผ่านของคุณ');
    window.location.href = 'login.html';
  });
}


/* ส่วนของหน้าเข้าสู่ระบบ (login.html) */
function setupLoginPage() {
  var form = document.getElementById('loginForm');
  if (!form) {
    return;
  }

  var alertBox = document.getElementById('loginAlert');
  var fields = ['citizenId', 'password'];

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors(fields);
    alertBox.hidden = true;

    var citizenId = document.getElementById('citizenId').value.trim();
    var password = document.getElementById('password').value;

    var isValid = true;

    if (citizenId === '') {
      showError('citizenId', 'กรุณากรอกเลขบัตรประจำตัวประชาชน');
      isValid = false;
    }
    if (password === '') {
      showError('password', 'กรุณากรอกรหัสผ่าน');
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    // ค้นหาผู้ใช้ที่ตรงกับเลขบัตรและรหัสผ่าน
    var users = getData(KEY_USERS, []);
    var foundUser = null;

    for (var i = 0; i < users.length; i++) {
      if (users[i].citizenId === citizenId && users[i].password === password) {
        foundUser = users[i];
        break;
      }
    }

    // ถ้าไม่พบผู้ใช้ ให้แสดงข้อความแจ้งเตือน
    if (!foundUser) {
      alertBox.textContent = 'เลขบัตรประจำตัวประชาชนหรือรหัสผ่านไม่ถูกต้อง';
      alertBox.hidden = false;
      return;
    }

    // บันทึกสถานะการล็อกอิน (ไม่เก็บรหัสผ่านไว้ใน session)
    saveData(KEY_SESSION, {
      citizenId: foundUser.citizenId,
      fullname: foundUser.fullname,
      email: foundUser.email,
      phone: foundUser.phone
    });

    window.location.href = 'apply.html';
  });
}

/* เริ่มทำงานเมื่อโหลดหน้าเสร็จ */
document.addEventListener('DOMContentLoaded', function () {
  setupRegisterPage();
  setupLoginPage();
});

