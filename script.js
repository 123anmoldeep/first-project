document.addEventListener('DOMContentLoaded', function() {
  fetchStudentsFromLocalStorage();
});

function fetchStudentsFromLocalStorage() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  students.forEach(student => {
    addStudentRow(student);
  });
}

function addStudent() {
  const nameInput = document.getElementById('name-input');
  const listeningInput = document.getElementById('listening-input');
  const speakingInput = document.getElementById('speaking-input');
  const readingInput = document.getElementById('reading-input');
  const dateInput = document.getElementById('date-input');

  const name = nameInput.value.trim();
  const listeningScore = parseFloat(listeningInput.value);
  const speakingScore = parseFloat(speakingInput.value);
  const readingScore = parseFloat(readingInput.value);

  if (name && !isNaN(listeningScore) && !isNaN(speakingScore) && !isNaN(readingScore)) {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in yyyy-mm-dd format
    const student = {
      "name": name,
      "listening_score": listeningScore,
      "speaking_score": speakingScore,
      "reading_score": readingScore,
      "submission_date": currentDate
    };

    addStudentRow(student);
    saveStudentToLocalStorage(student);

    // Clear input fields
    nameInput.value = '';
    listeningInput.value = '';
    speakingInput.value = '';
    readingInput.value = '';
    dateInput.value = currentDate; // Set date input field to current date
  } else {
    alert('Please enter valid values for all fields.');
  }
}

function addStudentRow(student) {
  const studentsBody = document.getElementById('students-body');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.listening_score}</td>
    <td>${student.speaking_score}</td>
    <td>${student.reading_score}</td>
    <td>${student.submission_date}</td>
  `;
  studentsBody.appendChild(row);
}

function saveStudentToLocalStorage(student) {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
}
