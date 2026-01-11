import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadmapApi } from '../api/roadmaps';
import Navbar from './Navbar';

export default function Form({ onGenerate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    customSkills: [],
    companies: [],
    customCompanies: [],
    interests: [],
    customInterests: [],
    weeks: '4'
  });
  const [customInput, setCustomInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const steps = ['Education', 'Skills', 'Companies', 'Interests', 'Duration'];

  const educationOptions = [
    '1st Year BTech','2nd Year BTech','3rd Year BTech',
    '4th Year BTech','Final Year MCA','Recent Graduate'
  ];

  const skillOptions = [
    'JavaScript','React','Python','Java','Node.js',
    'SQL','Git','HTML/CSS','TypeScript','MongoDB','C++','AWS'
  ];

  const companyOptions = [
    'Infosys','TCS','Wipro','Accenture','Cognizant',
    'HCL','Tech Mahindra','Capgemini','IBM','Microsoft','Google','Amazon'
  ];

  const interestOptions = [
    'Web Development','Mobile Apps','Data Science','Machine Learning',
    'Cloud Computing','DevOps','Cybersecurity','Backend Development'
  ];

  const weeksOptions = [
    { value: '2', label: '2 Weeks' },
    { value: '4', label: '4 Weeks' },
    { value: '6', label: '6 Weeks' },
    { value: '8', label: '8 Weeks' }
  ];

  const toggleSelection = (category, item) => {
    const current = formData[category];
    setFormData({
      ...formData,
      [category]: current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item]
    });
  };

  const addCustomItem = (category) => {
    if (!customInput.trim()) return;
    const customCategory = `custom${category.charAt(0).toUpperCase() + category.slice(1)}`;
    setFormData({
      ...formData,
      [customCategory]: [...formData[customCategory], customInput.trim()]
    });
    setCustomInput('');
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const userData = {
        year: formData.education,
        skills: [...formData.skills, ...formData.customSkills],
        companies: [...formData.companies, ...formData.customCompanies],
        interests: [...formData.interests, ...formData.customInterests],
        weeks: parseInt(formData.weeks)
      };
      
      const result = await roadmapApi.generateRoadmap(userData);
      console.log('Roadmap generated:', result);
      
      navigate(`/dashboard/${result.id}`);
    } catch (err) {
      setError(err.message || 'Failed to generate roadmap');
      console.error('Generation error:', err);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa, #e2ebf0)',
          paddingTop: '60px'
        }}
      >
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Create Your Career Roadmap 🚀</h2>
          <p className="text-center text-muted mb-5">
            Answer a few questions and get a personalized roadmap
          </p>

          {/* STEPPER */}
          <div className="d-flex justify-content-center mb-4 gap-3">
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: currentStep === i + 1 ? '#2563eb' : '#e5e7eb',
                  color: currentStep === i + 1 ? '#fff' : '#555'
                }}
              >
                {i + 1}. {s}
              </div>
            ))}
          </div>

          {/* CARD */}
          <div
            className="card border-0 shadow-lg mx-auto"
            style={{ maxWidth: '900px', borderRadius: '18px' }}
          >
            <div className="card-body p-5">
              
              {/* ERROR MESSAGE */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <>
                  <h4 className="mb-4">🎓 Select Education Level</h4>
                  <div className="row g-3">
                    {educationOptions.map(opt => (
                      <div key={opt} className="col-md-4">
                        <button
                          className={`btn w-100 py-3 ${
                            formData.education === opt
                              ? 'btn-primary shadow'
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => setFormData({ ...formData, education: opt })}
                        >
                          {opt}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <>
                  <h4 className="mb-3">🛠 Choose Skills</h4>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        className={`btn btn-sm ${
                          formData.skills.includes(skill)
                            ? 'btn-primary shadow'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => toggleSelection('skills', skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <input
                    className="form-control"
                    placeholder="Add custom skill & press Enter"
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomItem('skills')}
                  />
                </>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <>
                  <h4 className="mb-3">🏢 Target Companies</h4>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {companyOptions.map(company => (
                      <button
                        key={company}
                        className={`btn btn-sm ${
                          formData.companies.includes(company)
                            ? 'btn-primary shadow'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => toggleSelection('companies', company)}
                      >
                        {company}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <>
                  <h4 className="mb-3">❤️ Interests</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        className={`btn btn-sm ${
                          formData.interests.includes(interest)
                            ? 'btn-primary shadow'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => toggleSelection('interests', interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 5 */}
              {currentStep === 5 && (
                <>
                  <h4 className="mb-4">⏱ Duration</h4>
                  <div className="row g-3">
                    {weeksOptions.map(w => (
                      <div key={w.value} className="col-md-3">
                        <button
                          className={`btn w-100 py-3 ${
                            formData.weeks === w.value
                              ? 'btn-primary shadow'
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => setFormData({ ...formData, weeks: w.value })}
                        >
                          {w.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* NAVIGATION */}
              <div className="d-flex justify-content-between mt-5">
                <button
                  className="btn btn-outline-secondary px-4"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep(s => s - 1)}
                >
                  Back
                </button>

                {currentStep < 5 ? (
                  <button
                    className="btn btn-primary px-4 shadow"
                    onClick={() => setCurrentStep(s => s + 1)}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    className="btn btn-success px-4 shadow"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? 'Generating…' : '🚀 Generate Roadmap'}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}