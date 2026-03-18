$(document).ready(function() {
  let id = localStorage.getItem("selectedEmployee");
  let employees = JSON.parse(localStorage.getItem("employees"));
  let emp = employees.find(e => e.id == id);

  if (emp) {
    $("#name").text(emp.name);
    $("#department").text(emp.department);
    $("#clients").text(emp.clients);
    $("#empStatus").text(emp.active ? "Active" : "Inactive").removeClass("bg-success bg-danger").addClass(emp.active ? "bg-success" : "bg-danger");
  }
});

function loadEmployees() {
  return new Promise(resolve => {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem("employees"));
      resolve(data);
    }, 1000);
  });
}

$(document).ready(function() {
  let score = localStorage.getItem("employeeScore") || 0;
  $("#progressBar")
    .css("width", score + "%")
    .text(Math.round(score) + "%");
});

function loadData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data Loaded");
    }, 1000);
  });
}

async function start() {
  let result = await loadData();
  console.log(result);
}

function updateProfile() {
  alert("Profile update feature coming soon!");
}

start();