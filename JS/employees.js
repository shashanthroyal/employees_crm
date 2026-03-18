const employees = [
  {
    id: "101",
    name: "Rahul Sharma",
    department: "Sales",
    role: "Manager",
    clients: 5,
    active: true
  },
  {
    id: "102",
    name: "Ananya Gupta",
    department: "Marketing",
    role: "Executive",
    clients: 3,
    active: true
  },
  {
    id: "103",
    name: "Rohit Verma",
    department: "IT",
    role: "Developer",
    clients: 2,
    active: false
  }
];

let allEmployees = [];

$(document).ready(function() {
  initializeData();
  displayEmployees(allEmployees);
  setupEventListeners();
});

function initializeData() {
  let data = JSON.parse(localStorage.getItem("employees"));
  if (!data) {
    localStorage.setItem("employees", JSON.stringify(employees));
    allEmployees = employees;
  } else {
    allEmployees = data;
  }
}

function displayEmployees(employeeList) {
  let rows = "";
  employeeList.forEach(emp => {
    const statusBadge = emp.active 
      ? '<span class="badge bg-success">Active</span>' 
      : '<span class="badge bg-danger">Inactive</span>';
    
    rows += `
      <tr class="animate-fade-in">
        <td>${emp.id}</td>
        <td><strong>${emp.name}</strong></td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td><span class="badge bg-info">${emp.clients} Clients</span></td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-primary btn-sm viewProfile" data-id="${emp.id}"> View</button>
          <button class="btn btn-warning btn-sm toggleStatus" data-id="${emp.id}">Toggle</button>
          <button class="btn btn-danger btn-sm deleteEmployee" data-id="${emp.id}"> Delete</button>
        </td>
      </tr>
    `;
  });
  $("#employeeTable").html(rows || '<tr><td colspan="7" class="text-center text-muted">No employees found</td></tr>');
}

function setupEventListeners() {
  $("#searchInput").on("keyup", function() {
    filterAndDisplayEmployees();
  });

  $("#filterDept").on("change", function() {
    filterAndDisplayEmployees();
  });

  $(document).on("click", ".toggleStatus", function() {
    let id = $(this).data("id");
    let emp = allEmployees.find(e => e.id == id);
    emp.active = !emp.active;
    localStorage.setItem("employees", JSON.stringify(allEmployees));
    displayEmployees(allEmployees);
    showNotification("Status updated!", "success");
  });

  $(document).on("click", ".viewProfile", function() {
    let id = $(this).data("id");
    localStorage.setItem("selectedEmployee", id);
    window.location = "profile.html";
  });

  $(document).on("click", ".deleteEmployee", function() {
    let id = $(this).data("id");
    if (confirm("Delete this employee?")) {
      allEmployees = allEmployees.filter(e => e.id != id);
      localStorage.setItem("employees", JSON.stringify(allEmployees));
      displayEmployees(allEmployees);
      showNotification("Employee deleted!", "success");
    }
  });

  $("#saveEmployeeBtn").on("click", function() {
    let newEmployee = {
      id: String(Math.max(...allEmployees.map(e => parseInt(e.id))) + 1),
      name: $("#empName").val(),
      department: $("#empDept").val(),
      role: $("#empRole").val(),
      clients: parseInt($("#empClients").val()),
      active: true
    };

    if (newEmployee.name && newEmployee.department && newEmployee.role) {
      allEmployees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(allEmployees));
      displayEmployees(allEmployees);
      $("#addEmployeeForm")[0].reset();
      $("#addEmployeeModal").modal("hide");
      showNotification("Employee added!", "success");
    } else {
      showNotification("Fill all fields!", "danger");
    }
  });
}

function filterAndDisplayEmployees() {
  const searchTerm = $("#searchInput").val().toLowerCase();
  const dept = $("#filterDept").val();

  let filtered = allEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm) ||
                         emp.department.toLowerCase().includes(searchTerm) ||
                         emp.role.toLowerCase().includes(searchTerm);
    const matchesDept = !dept || emp.department === dept;
    return matchesSearch && matchesDept;
  });

  displayEmployees(filtered);
}

function showNotification(message, type) {
  const alertClass = type === "success" ? "alert-success" : "alert-danger";
  const alertHtml = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>`;
  
  $("body").prepend(alertHtml);
  setTimeout(() => $(".alert").fadeOut("slow"), 3000);
}