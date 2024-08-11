document.addEventListener("DOMContentLoaded", function () {
    // Example data from the given JSON
    const patientData = {
        "name": "Jessica Taylor",
        "gender": "Female",
        "age": 28,
        "profile_picture": "https://fedskillstest.ct.digital/4.png",
        "date_of_birth": "1996-08-23",
        "phone_number": "(415) 555-1234",
        "emergency_contact": "(415) 555-5678",
        "insurance_type": "Sunrise Health Assurance",
        "diagnosis_history": [
            {
                "month": "March",
                "year": 2024,
                "blood_pressure": {
                    "systolic": {
                        "value": 160,
                        "levels": "Higher than Average"
                    },
                    "diastolic": {
                        "value": 78,
                        "levels": "Lower than Average"
                    }
                },
                "heart_rate": {
                    "value": 78,
                    "levels": "Lower than Average"
                },
                "respiratory_rate": {
                    "value": 20,
                    "levels": "Normal"
                },
                "temperature": {
                    "value": 98.6,
                    "levels": "Normal"
                }
            }
        ],
        "diagnostic_list": [
            {
                "name": "Hypertension",
                "description": "Chronic high blood pressure",
                "status": "Under Observation"
            }
        ],
        "lab_results": [
            "Blood Tests",
            "CT Scans"
        ]
    };

    // Populate the profile section with the patient data
    document.querySelector('.profile h2').textContent = patientData.name;
    document.querySelector('.profile img').src = patientData.profile_picture;
    const infoList = document.querySelector('.info');
    infoList.innerHTML = `
        <li><strong>Age:</strong> ${patientData.age}</li>
        <li><strong>Phone:</strong> ${patientData.phone_number}</li>
        <li><strong>Emergency Contact:</strong> ${patientData.emergency_contact}</li>
        <li><strong>Insurance:</strong> ${patientData.insurance_type}</li>
    `;

    // Populate diagnostic list
    const diagnosticList = document.querySelector('.diagnostic-list table');
    diagnosticList.innerHTML = `
        <thead>
            <tr>
                <th>Diagnosis</th>
                <th>Description</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${patientData.diagnostic_list.map(diagnosis => `
                <tr>
                    <td>${diagnosis.name}</td>
                    <td>${diagnosis.description}</td>
                    <td>${diagnosis.status}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    // Chart.js configuration for Blood Pressure Chart
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');

    const bloodPressureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: patientData.diagnosis_history.map(entry => `${entry.month} ${entry.year}`),
            datasets: [
                {
                    label: 'Systolic',
                    data: patientData.diagnosis_history.map(entry => entry.blood_pressure.systolic.value),
                    borderColor: '#FF6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#FF6384',
                },
                {
                    label: 'Diastolic',
                    data: patientData.diagnosis_history.map(entry => entry.blood_pressure.diastolic.value),
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#36A2EB',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 180,
                    title: {
                        display: true,
                        text: 'Blood Pressure (mmHg)'
                    },
                    ticks: {
                        stepSize: 20,
                        color: '#666'
                    },
                    grid: {
                        color: '#E0E0E0'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    },
                    ticks: {
                        color: '#666'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 12
                    },
                    cornerRadius: 4,
                    padding: 10
                }
            }
        }
    });

    // Functionality for dynamic patient selection
    const patientItems = document.querySelectorAll('.patients-list .patient');
    patientItems.forEach(patient => {
        patient.addEventListener('click', function () {
            patientItems.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            // Additional code to dynamically load patient data could go here
        });
    });

    // Example button functionality (e.g., 'Show All Information')
    const showAllBtn = document.querySelector('.btn');
    showAllBtn.addEventListener('click', function () {
        alert('All information is shown here.');
        // Additional logic to display more information can be added here
    });

    // Menu item active state management
    const menuItems = document.querySelectorAll('.menu .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handling the expand more icon click in the profile section
    const expandIcon = document.querySelector('.profile img:last-child');
    expandIcon.addEventListener('click', function () {
        // This can be customized for any dropdown or additional settings
        alert('Settings dropdown could be displayed here.');
    });
});
