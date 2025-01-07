document.addEventListener('DOMContentLoaded', () => {
    const results = [
        {
            rollNumber: '7374',
            name: 'Shiva Rajpoot',
            tests: [
                {
                    testNumber: 1,
                    subjects: [
                        { subject: 'Biology', score: 39, passingMarks: 37 },
                        { subject: 'Physics', score: 44, passingMarks: 44 }
                    ],
                    maxMarks: 50
                },
                // {
                //     testNumber: 2,
                //     subjects: [
                //         { subject: 'Biology', score: 42, passingMarks: 37 },
                //         { subject: 'Physics', score: 40, passingMarks: 44 }
                //     ],
                //     maxMarks: 50
                // }
            ]
        },
        // Add more student data as needed
    ];

    const rollForm = document.getElementById('rollForm');
    const rollNumberInput = document.getElementById('rollNumber');
    const studentNameInput = document.getElementById('studentNameInput');
    const marksheet = document.getElementById('marksheet');
    const marksheetContainer = document.getElementById('marksheetContainer');
    const studentName = document.getElementById('studentName');
    const studentRoll = document.getElementById('studentRoll');
    const resultsBody = document.getElementById('resultsBody');
    const totalMarks = document.getElementById('totalMarks');
    const percentage = document.getElementById('percentage');
    const resultStatus = document.getElementById('resultStatus');
    const downloadBtn = document.getElementById('downloadBtn');
    let selectedTest = 1;

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalBtn = document.getElementById('closeModalBtn');

    window.showTestForm = (testNumber) => {
        selectedTest = testNumber;
        document.getElementById('testTitle').textContent = `Test ${testNumber} Result`;
        rollForm.style.display = 'block';
        marksheetContainer.style.display = 'block';
        marksheet.style.display = 'none';
        document.getElementById('homeSection').style.display = 'none';
    };

    window.showHome = () => {
        document.getElementById('homeSection').style.display = 'block';
        marksheetContainer.style.display = 'none';
    };

    window.showAbout = () => {
        showModal('Content is managed by MR Suraj singh');
    };

    window.showContact = () => {
        showModal('For any queries, please contact us at: surajmudaisk@gmail.com');
    };

    rollForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const rollNumber = rollNumberInput.value.trim();
        const name = studentNameInput.value.trim();

        const result = results.find(r => r.rollNumber === rollNumber && r.name === name);

        // Clear previous results
        resultsBody.innerHTML = '';
        totalMarks.textContent = '';
        percentage.textContent = '';
        resultStatus.textContent = '';

        if (result) {
            const testResult = result.tests.find(t => t.testNumber === selectedTest);

            if (testResult) {
                studentName.textContent = result.name;
                studentRoll.textContent = result.rollNumber;

                let obtainedMarks = 0;
                let totalMaxMarks = testResult.subjects.length * testResult.maxMarks;
                let allPass = true;

                testResult.subjects.forEach(subject => {
                    const row = document.createElement('tr');

                    const subjectCell = document.createElement('td');
                    subjectCell.textContent = subject.subject;
                    row.appendChild(subjectCell);

                    const scoreCell = document.createElement('td');
                    scoreCell.textContent = subject.score;
                    row.appendChild(scoreCell);

                    const maxMarksCell = document.createElement('td');
                    maxMarksCell.textContent = testResult.maxMarks;
                    row.appendChild(maxMarksCell);

                    const passingMarksCell = document.createElement('td');
                    passingMarksCell.textContent = subject.passingMarks;
                    row.appendChild(passingMarksCell);

                    resultsBody.appendChild(row);

                    obtainedMarks += subject.score;

                    if (subject.score < subject.passingMarks) {
                        allPass = false;
                    }
                });

                const percentageCalc = (obtainedMarks / totalMaxMarks) * 100;
                const resultCalc = allPass ? 'Pass' : 'Fail';

                totalMarks.textContent = obtainedMarks;
                percentage.textContent = `${percentageCalc.toFixed(2)}%`;
                resultStatus.textContent = resultCalc;

                rollForm.style.display = 'none';
                marksheet.style.display = 'block';
            } else {
                showModal('Result is not declared yet.');
                marksheet.style.display = 'none';
            }
        } else {
            showModal('No results found for the entered details. Please check the roll number and name.');
            marksheet.style.display = 'none';
        }
    });

    downloadBtn.addEventListener('click', () => {
        html2canvas(marksheetContainer).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('marksheet.pdf');
        });
    });

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
