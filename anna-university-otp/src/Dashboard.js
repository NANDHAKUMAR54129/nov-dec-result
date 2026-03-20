import React, { useState } from 'react';
import './Dashboard.css';
import aamecLogo from './assets/aamec-logo.jpg';
import rightLogo from './assets/right-logo.png';
import resultsData from './data/results';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('PROFILE');
  const [gpaResult, setGpaResult] = useState(null);
  const [showGpa, setShowGpa] = useState(false);

  // Centralized subject definition with CORRECT R2021 credits
  // MX3083 is a mandatory non-credit course (credit = 0)
  const SEM_SUBJECTS = {
    'CCS334': 3, 'CCS341': 3, 'CS3551': 3,
    'CS3591': 4, 'CS3691': 4,
    'IT3501': 3, 'IT3511': 2,
    'MX3083': 0, 'NM1122': 2
  };

  const calculateGPA = () => {
    const gradePoints = {
      'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'U': 0, 'UA': 0, 'RA': 0, 'N/A': 0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    Object.keys(SEM_SUBJECTS).forEach(code => {
      const credits = SEM_SUBJECTS[code];
      if (credits === 0) return; // Skip non-credit courses (e.g. MX3083)
      const grade = (resultsData[user.regNo] && resultsData[user.regNo][code]) || 'N/A';
      const points = gradePoints[grade] !== undefined ? gradePoints[grade] : 0;
      
      totalPoints += (points * credits);
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    setGpaResult({ gpa, totalPoints: totalPoints.toFixed(1), totalCredits });
  };

  // Auto-calculate GPA (but keep it hidden) when switching to RESULTS tab
  React.useEffect(() => {
    if (activeTab === 'EXAM RESULTS') {
      calculateGPA();
      setShowGpa(false); // reset visibility on tab switch
    }
  }, [activeTab]);

  return (
    <div className="dashboard-container">
      {/* Top right logout link */}
      <div className="logout-container">
        <span className="logout-link" onClick={onLogout}>LOG OUT</span>
      </div>

      <div className="dashboard-header-wrapper">
        <div className="header-logo-container">
          <img src={aamecLogo} alt="AAMEC Logo" className="dashboard-logo" />
        </div>
        <div className="dashboard-title-container">
          <h1 className="college-title">ANJALAI AMMAL MAHALINGAM ENGINEERING COLLEGE</h1>
          <h2 className="dept-title">DEPARTMENT OF INFORMATION TECHNOLOGY</h2>
        </div>
        <div className="header-logo-container">
          <img src={rightLogo} alt="IT Logo" className="dashboard-logo" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        
        {/* Navigation Tabs */}
        <div className="tabs-container">
          <div 
            className={`tab ${activeTab === 'PROFILE' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('PROFILE')}
          >
            PROFILE
          </div>
          <div 
            className={`tab ${activeTab === 'EXAM SCHEDULE' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('EXAM SCHEDULE')}
          >
            EXAM SCHEDULE
          </div>
          <div 
            className={`tab ${activeTab === 'EXAM RESULTS' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('EXAM RESULTS')}
          >
            EXAM RESULTS
          </div>
        </div>

        {/* Profile Content Box */}
        {activeTab === 'PROFILE' && (
          <div className="profile-box fade-in">
            <h2 className="profile-box-title">STUDENT <span className="title-highlight">PROFILE</span></h2>
            
            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Register Number</span>
                <span className="detail-value">{user.regNo}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{user.name || "Student Name (Placeholder)"}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Institution</span>
                <span className="detail-value">ANJALAI AMMAL MAHALINGAM ENGINEERING COLLEGE</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Branch</span>
                <span className="detail-value">B.Tech.Information Technology</span>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Content Box */}
        {activeTab === 'EXAM SCHEDULE' && (
          <div className="profile-box fade-in">
            <h2 className="profile-box-title">EXAM <span className="title-highlight">SCHEDULE</span></h2>
            <div className="schedule-placeholder">
              <p>Your exam schedule will be displayed here.</p>
            </div>
          </div>
        )}

        {/* Results Content Box */}
        {activeTab === 'EXAM RESULTS' && (
          <div className="profile-box results-box fade-in">
            <h2 className="profile-box-title">EXAM <span className="title-highlight">RESULTS (NOV/DEC)</span></h2>
            
            {/* Student Info Bar for Results */}
            <div className="results-student-info">
              <div className="info-item">
                <span className="info-label">Register No:</span>
                <span className="info-value">{user.regNo}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Student Name:</span>
                <span className="info-value">{user.name || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Programme:</span>
                <span className="info-value">B.Tech.Information Technology</span>
              </div>
              <div className="info-item gpa-info-item">
                <div className="gpa-inline-content">
                  <button 
                    className="gpa-inline-btn"
                    onClick={() => setShowGpa(!showGpa)}
                  >
                    {showGpa ? 'Hide GPA' : 'View GPA'}
                  </button>
                  {showGpa && gpaResult && (
                    <span className="gpa-inline-result">
                      GPA: {gpaResult.gpa}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="results-table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Semester</th>
                    <th>Subject Code</th>
                    <th>Grade</th>
                    <th>RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(SEM_SUBJECTS).map(code => {
                    const grade = (resultsData[user.regNo] && resultsData[user.regNo][code]) || 'N/A';
                    let status = "PASS";
                    // Correct status check based on grades provided in formula (U and RA are FAIL)
                    if (grade === 'U' || grade === 'UA' || grade === 'RA' || grade === 'N/A') status = "FAIL";
                    
                    // Specific class to handle symbols like '+' inside grade class (e.g. A+ -> A-plus)
                    const normalizedGrade = grade.replace('+', '-plus');

                    const credits = SEM_SUBJECTS[code];
                    return (
                      <tr key={code}>
                        <td className="semester-col">05</td>
                        <td className="subject-code">{code}</td>
                        <td>
                          <span className={`grade-badge grade-${normalizedGrade}`}>
                            {grade}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge status-${status.toLowerCase()}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
