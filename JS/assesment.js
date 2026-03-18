const questions = [
  {
    question: "What does CRM stand for?",
    options: [
      "Customer Resource Manager",
      "Customer Relationship Management",
      "Client Response Management",
      "Corporate Record Management"
    ],
    answer: 1
  },
  {
    question: "Which language adds interactivity to webpages?",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL"
    ],
    answer: 2
  },
  {
    question: "Which library simplifies DOM manipulation?",
    options: [
      "Angular",
      "React",
      "jQuery",
      "Vue"
    ],
    answer: 2
  }
];

$(document).ready(function() {
  generateQuiz();
});

function generateQuiz() {
  let html = "";

  questions.forEach((q, index) => {
    html += `<div class="mb-4 animate-fade-in">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Question ${index + 1} of ${questions.length}</h5>
          <h6 class="mb-3">${q.question}</h6>
          <div class="options">`;

    q.options.forEach((opt, i) => {
      html += `
        <div class="form-check mb-2">
          <input class="form-check-input" type="radio" name="q${index}" id="q${index}opt${i}" value="${i}" required>
          <label class="form-check-label" for="q${index}opt${i}">
            ${String.fromCharCode(65 + i)}. ${opt}
          </label>
        </div>
      `;
    });

    html += `</div>
        </div>
      </div>
    </div>`;
  });

  $("#quizContainer").html(html);
}

$("#submitQuiz").click(function() {
  let score = 0;

  questions.forEach((q, i) => {
    let ans = $(`input[name=q${i}]:checked`).val();
    if (ans == q.answer) {
      score++;
    }
  });

  let percentage = (score / questions.length) * 100;
  let grade = getGrade(percentage);
  let feedback = getFeedback(grade);

  localStorage.setItem("employeeScore", percentage);

  const resultHtml = `
    <div class="text-center">
      <h2 class="mb-3">🎯 Assessment Complete!</h2>
      <div class="progress mb-3" style="height: 2.5rem;">
        <div class="progress-bar" style="width: ${percentage}%">${Math.round(percentage)}%</div>
      </div>
      <h3>Your Score: <span class="badge bg-success">${score}/${questions.length}</span></h3>
      <h4>Grade: <span class="badge bg-warning text-dark">${grade}</span></h4>
      <p class="lead mt-4">${feedback}</p>
      <button class="btn btn-primary mt-3" onclick="location.reload()">🔄 Retake</button>
      <a href="index.html" class="btn btn-secondary mt-3">📊 Dashboard</a>
    </div>
  `;

  $("#result")
    .removeClass("d-none")
    .html(resultHtml);
  
  $("#quizForm").hide();
});

function getGrade(p) {
  if (p >= 90) return "A+ (Outstanding)";
  else if (p >= 80) return "A (Excellent)";
  else if (p >= 70) return "B (Good)";
  else if (p >= 60) return "C (Pass)";
  else return "F (Needs Improvement)";
}

function getFeedback(grade) {
  const firstChar = grade.charAt(0);
  switch (firstChar) {
    case "A":
      return "🌟 Excellent Performance! You have great knowledge. Keep it up!";
    case "B":
      return "✅ Good Work! You're doing well. Focus on the weak areas.";
    case "C":
      return "⚠️ Fair Performance. Please review the concepts and try again.";
    case "F":
      return "❌ Needs More Work. Please study the material thoroughly and retake the assessment.";
    default:
      return "Keep practicing to improve your skills!";
  }
}

