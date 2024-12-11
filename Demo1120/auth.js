// 用户数据存储
let users = JSON.parse(localStorage.getItem('users')) || [];

// 当前登录用户
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// 注册函数
function register(name, email, password) {
    // 检查邮箱是否已被注册
    if (users.find(user => user.email === email)) {
        alert('该邮箱已被注册');
        return false;
    }

    // 创建新用户
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('注册成功');
    return true;
}

// 登录函数
function login(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('登录成功');
        return true;
    } else {
        alert('邮箱或密码错误');
        return false;
    }
}

// 登出函数
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('已登出');
}

// 更新UI函数
function updateUI() {
    const loginStatus = document.getElementById('login-status');
    if (currentUser) {
        loginStatus.textContent = `欢迎，${currentUser.name}`;
        document.getElementById('logout-btn').style.display = 'inline-block';
    } else {
        loginStatus.textContent = '未登录';
        document.getElementById('logout-btn').style.display = 'none';
    }
}

// 页面加载时更新UI
document.addEventListener('DOMContentLoaded', updateUI);

// 注册表单提交事件
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }

        if (register(name, email, password)) {
            window.location.href = 'login.html';
        }
    });
}

// 登录表单提交事件
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (login(email, password)) {
            window.location.href = 'index.html';
        }
    });
}

// 登出按钮点击事件
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        logout();
        updateUI();
    });
}