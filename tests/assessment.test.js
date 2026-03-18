function getGrade(percentage) {
  if (percentage >= 90) return "A+ (Outstanding)";
  else if (percentage >= 80) return "A (Excellent)";
  else if (percentage >= 70) return "B (Good)";
  else if (percentage >= 60) return "C (Pass)";
  else return "F (Needs Improvement)";
}

function isPassed(score) {
  return score >= 50;
}

describe("Grade Calculation Tests", () => {
  test("Grade A+ for score 90 or above", () => {
    expect(getGrade(95)).toBe("A+ (Outstanding)");
  });

  test("Grade A for score 80-89", () => {
    expect(getGrade(85)).toBe("A (Excellent)");
  });

  test("Grade B for score 70-79", () => {
    expect(getGrade(75)).toBe("B (Good)");
  });

  test("Grade C for score 60-69", () => {
    expect(getGrade(65)).toBe("C (Pass)");
  });

  test("Grade F for score below 60", () => {
    expect(getGrade(45)).toBe("F (Needs Improvement)");
  });
});

describe("Percentage Calculation Tests", () => {
  test("Calculate percentage correctly for 4 out of 5", () => {
    let percent = (4 / 5) * 100;
    expect(percent).toBe(80);
  });

  test("Calculate percentage correctly for 3 out of 3", () => {
    let percent = (3 / 3) * 100;
    expect(percent).toBe(100);
  });

  test("Calculate percentage correctly for 1 out of 2", () => {
    let percent = (1 / 2) * 100;
    expect(percent).toBe(50);
  });

  test("Calculate percentage correctly for 0 out of 5", () => {
    let percent = (0 / 5) * 100;
    expect(percent).toBe(0);
  });
});

describe("Pass/Fail Logic Tests", () => {
  test("Pass fail logic - score 50 should pass", () => {
    expect(isPassed(50)).toBe(true);
  });

  test("Pass fail logic - score above 50 should pass", () => {
    expect(isPassed(75)).toBe(true);
  });

  test("Pass fail logic - score below 50 should fail", () => {
    expect(isPassed(45)).toBe(false);
  });

  test("Pass fail logic - score 0 should fail", () => {
    expect(isPassed(0)).toBe(false);
  });
});