import React, { useState, useRef } from 'react';
import './App.css';
import Captcha from './Captcha';
import Dashboard from './Dashboard';
import aamecLogo from './assets/aamec-logo.jpg';
import rightLogo from './assets/right-logo.png';

const VALID_USERS = [
  { regNo: '820423205001', dob: '07-07-2006', name: 'ABINASH M' },
  { regNo: '820423205002', dob: '29-01-2006', name: 'ABISHEK S' },
  { regNo: '820423205003', dob: '13-07-2006', name: 'ADITHYAN M' },
  { regNo: '820423205004', dob: '14-12-2005', name: 'AFRANA RENOSE B' },
  { regNo: '820423205005', dob: '06-10-2005', name: 'AHILAN M' },
  { regNo: '820423205006', dob: '29-03-2006', name: 'AISATH DELISHA K' },
  { regNo: '820423205007', dob: '23-09-2005', name: 'AJAY V' },
  { regNo: '820423205008', dob: '21-08-2005', name: 'AJAY LAKSHMANAN P' },
  { regNo: '820423205009', dob: '12-03-2006', name: 'AKALYA R' },
  { regNo: '820423205010', dob: '02-03-2005', name: 'AKASH M' },
  { regNo: '820423205011', dob: '13-07-2006', name: 'ARCHANA K' },
  { regNo: '820423205012', dob: '20-11-2005', name: 'ARSATH MOHAMED J' },
  { regNo: '820423205013', dob: '15-03-2006', name: 'ASHIKA A' },
  { regNo: '820423205014', dob: '30-03-2006', name: 'ASIKA M' },
  { regNo: '820423205015', dob: '31-10-2005', name: 'ATCHAYA THARASI A' },
  { regNo: '820423205016', dob: '13-04-2006', name: 'BALAJI P' },
  { regNo: '820423205017', dob: '10-08-2005', name: 'BALAJI S L' },
  { regNo: '820423205018', dob: '03-12-2005', name: 'BALAMURUGAN A' },
  { regNo: '820423205019', dob: '21-02-2006', name: 'BALAMURUGAN K' },
  { regNo: '820423205020', dob: '05-06-2005', name: 'BHARATHI SAHANA M' },
  { regNo: '820423205021', dob: '29-07-2006', name: 'BHAVANA B' },
  { regNo: '820423205022', dob: '13-10-2005', name: 'DEEPANRAJ K' },
  { regNo: '820423205023', dob: '16-07-2005', name: 'DHAARANI V' },
  { regNo: '820423205024', dob: '06-07-2006', name: 'DHATCHINESWARAN D' },
  { regNo: '820423205025', dob: '16-11-2005', name: 'DHEEPIKA S' },
  { regNo: '820423205026', dob: '19-01-2006', name: 'DHINAKARAN S' },
  { regNo: '820423205027', dob: '23-01-2006', name: 'DINESH KUMAR S' },
  { regNo: '820423205028', dob: '23-01-2006', name: 'DURGADEVI K' },
  { regNo: '820423205029', dob: '30-05-2005', name: 'DURGASRI S' },
  { regNo: '820423205030', dob: '17-06-2006', name: 'GOPIKA R' },
  { regNo: '820423205031', dob: '24-10-2005', name: 'GOPIKA S' },
  { regNo: '820423205032', dob: '18-05-2006', name: 'HARIKRISHNAN G' },
  { regNo: '820423205033', dob: '31-05-2006', name: 'HARINI R' },
  { regNo: '820423205034', dob: '26-04-2006', name: 'HASBEN FARHANA B' },
  { regNo: '820423205035', dob: '25-05-2006', name: 'JAYASREE J' },
  { regNo: '820423205036', dob: '30-03-2005', name: 'KABILAN B' },
  { regNo: '820423205037', dob: '02-08-2005', name: 'KALAISELVI M' },
  { regNo: '820423205038', dob: '19-05-2006', name: 'KANISHKA SHRI K' },
  { regNo: '820423205039', dob: '10-03-2005', name: 'KAVIBHARATHI S' },
  { regNo: '820423205040', dob: '29-03-2005', name: 'KAVIYARASAN L' },
  { regNo: '820423205041', dob: '01-08-2005', name: 'KAVYA V' },
  { regNo: '820423205042', dob: '16-03-2006', name: 'KAVIYA V' },
  { regNo: '820423205043', dob: '02-01-2006', name: 'KISHORE R' },
  { regNo: '820423205044', dob: '10-04-2005', name: 'LAKSHMI NANDHIDHA L' },
  { regNo: '820423205045', dob: '15-02-2005', name: 'LAVANYA K' },
  { regNo: '820423205046', dob: '17-01-2006', name: 'MAHESWARAN S V' },
  { regNo: '820423205047', dob: '15-02-2006', name: 'MANIKANDAN C' },
  { regNo: '820423205048', dob: '21-12-2005', name: 'MANOJKUMAR M' },
  { regNo: '820423205049', dob: '13-08-2005', name: 'MOHAMED FARHAN M' },
  { regNo: '820423205050', dob: '23-01-2006', name: 'MOHAMED RAZEEN N' },
  { regNo: '820423205051', dob: '24-05-2006', name: 'MOHAMED RIYAZ M' },
  { regNo: '820423205052', dob: '18-01-2006', name: 'MOHANA A' },
  { regNo: '820423205053', dob: '17-04-2006', name: 'NANDHA KUMAR P' },
  { regNo: '820423205054', dob: '03-11-2005', name: 'NANDHAKUMAR A' },
  { regNo: '820423205055', dob: '09-07-2006', name: 'NANDHINI S' },
  { regNo: '820423205056', dob: '22-08-2005', name: 'NIKITHA S' },
  { regNo: '820423205057', dob: '11-07-2006', name: 'NILANCHANA B' },
  { regNo: '820423205058', dob: '31-05-2006', name: 'NISHANTH S' },
  { regNo: '820423205059', dob: '30-07-2006', name: 'PAGALAVAN B' },
  { regNo: '820423205060', dob: '03-10-2005', name: 'PRABU M' },
  { regNo: '820423205061', dob: '22-06-2006', name: 'PRAKASH V' },
  { regNo: '820423205062', dob: '04-08-2005', name: 'PRAVEEN P' },
  { regNo: '820423205063', dob: '03-12-2005', name: 'PRAVEENA K' },
  { regNo: '820423205064', dob: '21-06-2006', name: 'PRAVEEN RAJ J' },
  { regNo: '820423205065', dob: '30-10-2005', name: 'PRAVINKKUMAR A' },
  { regNo: '820423205066', dob: '26-11-2005', name: 'PRIYADHARSHINI S' },
  { regNo: '820423205067', dob: '09-05-2006', name: 'PRIYAN K' },
  { regNo: '820423205068', dob: '06-03-2006', name: 'PRIYASAKI J' },
  { regNo: '820423205069', dob: '08-06-2006', name: 'RAMYA S' },
  { regNo: '820423205070', dob: '11-08-2005', name: 'RESHMA S' },
  { regNo: '820423205071', dob: '17-09-2005', name: 'SANDHURU KUMAR R' },
  { regNo: '820423205072', dob: '07-03-2006', name: 'SANTHOSHINI S' },
  { regNo: '820423205073', dob: '15-11-2005', name: 'SANTHOSH KUMAR BM' },
  { regNo: '820423205074', dob: '20-09-2005', name: 'SHIVARANJANAN B T' },
  { regNo: '820423205075', dob: '14-11-2005', name: 'SITHARTH K T' },
  { regNo: '820423205076', dob: '07-11-2005', name: 'SIVAGURUNATHAN B' },
  { regNo: '820423205077', dob: '10-07-2006', name: 'SIVANESAN S' },
  { regNo: '820423205078', dob: '19-10-2005', name: 'SOWBHARANIKA R C' },
  { regNo: '820423205079', dob: '16-05-2006', name: 'SRI VIDYALAKSHMI S' },
  { regNo: '820423205080', dob: '04-01-2006', name: 'SUBHIKSHA J' },
  { regNo: '820423205081', dob: '22-05-2006', name: 'SUDHARSAN S' },
  { regNo: '820423205082', dob: '07-05-2006', name: 'SWATHI R' },
  { regNo: '820423205083', dob: '27-11-2005', name: 'THARANEESWARI E' },
  { regNo: '820423205084', dob: '28-04-2006', name: 'VAISHNAVI S' },
  { regNo: '820423205085', dob: '23-06-2006', name: 'VASANTH V' },
  { regNo: '820423205086', dob: '04-12-2005', name: 'VEERAMANIKANDAN G' },
  { regNo: '820423205087', dob: '06-03-2006', name: 'VENGATESH K' },
  { regNo: '820423205088', dob: '28-10-2005', name: 'VIGNESH VEERA M' },
  { regNo: '820423205090', dob: '07-03-2006', name: 'VIVEGHA P' },
  { regNo: '820423205091', dob: '22-06-2005', name: 'YOGALAKSHMI K' },
  { regNo: '820423205092', dob: '05-08-2006', name: 'YOGESH S' },
  { regNo: '820423205154', dob: '06-07-2006', name: 'Unknown Student' }, // Moving 5154 to the end to align with the rest
  { regNo: '820423205301', dob: '06-02-2005', name: 'RAGUL M' },
  { regNo: '820423205302', dob: '27-06-2005', name: 'SANTHOSH N' }
];

function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Login inputs
  const [studentRegNo, setStudentRegNo] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [studentInput, setStudentInput] = useState('');
  
  // Captcha state
  const [studentCaptcha, setStudentCaptcha] = useState('');
  const studentCaptchaRef = useRef(null);

  const handleRefreshCaptcha = () => {
    if (studentCaptchaRef.current) {
      studentCaptchaRef.current.refreshCaptcha();
    }
  };

  const handlePlayAudio = () => {
    if (studentCaptchaRef.current) {
      studentCaptchaRef.current.playAudio();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Verify Captcha (Case-Insensitive)
    if (studentInput.toLowerCase() !== studentCaptcha.toLowerCase()) {
      alert("Invalid Captcha! Please try again.");
      handleRefreshCaptcha();
      setStudentInput('');
      return;
    }

    // 2. Verify RegNo and DOB
    const userMatch = VALID_USERS.find(user => user.regNo === studentRegNo && user.dob === studentDob);
    
    if (userMatch) {
      // Success!
      setCurrentUser(userMatch);
      setIsLoggedIn(true);
    } else {
      // Failed login
      alert("Invalid Register Number or Date of Birth.");
      handleRefreshCaptcha();
      setStudentInput('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setStudentRegNo('');
    setStudentDob('');
    setStudentInput('');
  };

  if (isLoggedIn && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="logo-container left-logo">
          {/* Using provided AAMEC logo */}
          <img src={aamecLogo} alt="AAMEC Logo" className="au-logo" />
        </div>
        <div className="header-titles">
          <h1>ANJALAI AMMAL MAHALINGAM ENGINEERING COLLEGE</h1>
        </div>
        <div className="logo-container right-logo">
          <img src={rightLogo} alt="IT Logo" className="au-logo" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h2>welcome to department of information technology</h2>
        </div>

        {/* 3 Column Layout below banner */}
        <div className="panels-container">

          {/* Student Login Panel */}
          <div className="login-panel">
            <h3 className="panel-title">Student Portal Login</h3>
            <form className="login-form student-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Register Number</label>
                <input 
                  type="text" 
                  value={studentRegNo}
                  onChange={(e) => setStudentRegNo(e.target.value)}
                />
              </div>
              <div className="form-group dob-group">
                <div className="dob-labels">
                  <label>Date of Birth</label>
                  <span className="date-format">[DD-MM-YYYY]</span>
                </div>
                <input 
                  type="text" 
                  value={studentDob}
                  onChange={(e) => setStudentDob(e.target.value)}
                />
              </div>
              <div className="form-group captcha-input-group">
                <label>Enter the Captcha <span className="play-btn" onClick={handlePlayAudio} title="Listen to Captcha">▶ Play</span></label>
                <input 
                  type="text" 
                  className="captcha-input"
                  value={studentInput}
                  onChange={(e) => setStudentInput(e.target.value)}
                />
              </div>

              <div className="captcha-wrapper">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Captcha ref={studentCaptchaRef} onChange={setStudentCaptcha} />
                  <button type="button" onClick={handleRefreshCaptcha} className="refresh-captcha-btn" title="Refresh Captcha">
                    ↻
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="login-btn">Login</button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
