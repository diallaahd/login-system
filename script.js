// 🔥 stockage users
let users = JSON.parse(localStorage.getItem("users")) || [];

let currentScore = 0;

/* =========================
   🔐 CHECK PASSWORD (force)
========================= */
function checkPassword(){
  let value = document.getElementById("newPass").value;

  let score = 0;

  if(value.length >= 8) score++;
  if(/[A-Z]/.test(value)) score++;
  if(/[0-9]/.test(value)) score++;
  if(/[@#!?]/.test(value)) score++;

  currentScore = score;

  let bar = document.getElementById("progress-bar");
  let text = document.getElementById("strength");

  if(!bar) return;

  if(score <= 1){
    bar.style.width = "25%";
    bar.style.background = "red";
    text.innerText = "❌ Faible";
  }
  else if(score <= 3){
    bar.style.width = "70%";
    bar.style.background = "orange";
    text.innerText = "⚠️ Moyen";
  }
  else{
    bar.style.width = "100%";
    bar.style.background = "green";
    text.innerText = "✅ Fort";
  }
}

/* =========================
   🟢 INSCRIPTION
========================= */
function register(){

  let username = document.getElementById("newUser").value;
  let password = document.getElementById("newPass").value;

  if(!username || !password){
    return showMessage("❌ Champs vides");
  }

  if(currentScore < 3){
    return showMessage("❌ Mot de passe trop faible");
  }

  let exist = users.find(u => u.username === username);

  if(exist){
    return showMessage("❌ Compte déjà existant");
  }

  users.push({username, password});
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("✅ Compte créé !");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

/* =========================
   🔵 CONNEXION
========================= */
function login(){

  let username = document.getElementById("loginUser").value;
  let password = document.getElementById("loginPass").value;

  let user = users.find(u =>
    u.username === username && u.password === password
  );

  if(!user){
    return showMessage("❌ Identifiants incorrects");
  }

  localStorage.setItem("currentUser", username);

  window.location.href = "dashboard.html";
}

/* =========================
   👋 DASHBOARD
========================= */
function loadUser(){
  let user = localStorage.getItem("currentUser");

  if(document.getElementById("userDisplay")){
    document.getElementById("userDisplay").innerText = user;
  }
}

/* =========================
   🚪 LOGOUT
========================= */
function logout(){
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* =========================
   📢 MESSAGE
========================= */
function showMessage(msg){
  let el = document.getElementById("message");
  if(el) el.innerText = msg;
}

/* auto load dashboard user */
window.onload = loadUser;
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transform = "translateY(20px)";

  setTimeout(() => {
    document.body.style.transition = "0.5s ease";
    document.body.style.opacity = "1";
    document.body.style.transform = "translateY(0)";
  }, 50);
});