import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RoadmapCard from './RoadmapCard';
import { roadmapApi } from '../api/roadmaps';
import Navbar from './Navbar';

export default function Dashboard({ roadmaps, setRoadmaps }) {
  const { id } = useParams();
  const [roadmapData, setRoadmapData] = useState(null);
  const [progress, setProgress] = useState({});
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await roadmapApi.getRoadmap(id); // 👈 CHANGED: get() → getRoadmap()
        setRoadmapData(data);

        setRoadmaps(prev =>
          prev.map(r => (r.id === id ? { ...r, roadmap: data.roadmap } : r))
        );
      } catch (error) {
        console.error('Failed to load roadmap:', error);
      }
    };
    loadData();
  }, [id, setRoadmaps]);

  const logProgress = async (stageIndex, completionRate) => {
    try {
      const log = {
        stage: stageIndex,
        completion_rate: completionRate,
        date: new Date().toISOString().split('T')[0]
      };

      const updated = await roadmapApi.updateProgress(id, log); // 👈 CHANGED: update() → updateProgress()
      setRoadmapData(updated);
      setProgress(prev => ({ ...prev, [stageIndex]: completionRate }));
    } catch (error) {
      console.error('Failed to update progress:', error);
      alert('Failed to update progress');
    }
  };

  const handleRegenerate = async () => {
    try {
      const log = { stage: -1, completion_rate: 0.3, date: new Date().toISOString().split('T')[0] };
      const updated = await roadmapApi.updateProgress(id, log); // 👈 CHANGED: update() → updateProgress()
      setRoadmapData(updated);
      setCurrentStageIndex(0);
    } catch (error) {
      console.error('Regeneration failed:', error);
      alert('Regeneration failed');
    }
  };

  const goToNext = () => {
    if (currentStageIndex < roadmapData.roadmap.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const goToStage = (index) => {
    setCurrentStageIndex(index);
  };

  if (!roadmapData) {
    return (
      <>
        <Navbar />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center">
            <div className="spinner-border text-primary mb-4" style={{ width: '4rem', height: '4rem' }} />
            <h4 className="text-muted">Loading your personalized roadmap</h4>
          </div>
        </div>
      </>
    );
  }

  const totalStages = roadmapData.roadmap.length;
  const currentStage = roadmapData.roadmap[currentStageIndex];
  const totalProgress =
    roadmapData.roadmap.reduce((acc, _, index) => acc + (progress[index] || 0), 0) /
    totalStages;

  return (
    <>
      <Navbar />

      <div className="container py-5 min-vh-100">
        <div className="col-xl-10 col-xxl-9 mx-auto">

          {/* HEADER */}
          <div className="card shadow-lg border-0 rounded-4 mb-5">
            <div
              className="card-body text-center p-5 rounded-4"
              style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}
            >
              <h1 className="fw-bold mb-3">Your Personalized Roadmap</h1>

              <div className="progress mx-auto mb-3" style={{ width: 250, height: 12 }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${totalProgress * 100}%` }}
                >
                  {Math.round(totalProgress * 100)}%
                </div>
              </div>

              <h5 className="fw-semibold">
                {Math.round(totalProgress * 100)}% Complete • {totalStages} Stages
              </h5>
            </div>
          </div>

          {/* ROADMAP CARD */}
          <RoadmapCard
            stage={currentStage}
            index={currentStageIndex}
            onProgress={logProgress}
            progress={progress[currentStageIndex] || 0}
          />

          {/* STAGE DOTS */}
          <div className="d-flex justify-content-center gap-2 my-4">
            {roadmapData.roadmap.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStage(index)}
                className={`rounded-circle border-0 ${
                  index === currentStageIndex
                    ? 'bg-primary text-white'
                    : progress[index]
                    ? 'bg-success text-white'
                    : 'bg-light'
                }`}
                style={{ width: 42, height: 42 }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <button
              onClick={goToPrevious}
              disabled={currentStageIndex === 0}
              className="btn btn-outline-primary px-4"
            >
              ← Previous
            </button>

            <button
              onClick={goToNext}
              disabled={currentStageIndex === totalStages - 1}
              className="btn btn-primary px-4"
            >
              Next →
            </button>
          </div>

          {/* REGENERATE */}
          <div className="text-center">
            <button
              onClick={handleRegenerate}
              className="btn btn-warning btn-lg px-5 rounded-pill"
            >
              🔄 Regenerate My Roadmap
            </button>
          </div>

        </div>
      </div>
    </>
  );
}