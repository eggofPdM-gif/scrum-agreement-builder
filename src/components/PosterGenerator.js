export default function PosterGenerator({ answers }) {
  const projectName = answers.projectName || "Team Charter";
  const mission = answers.mission || "Our mission goes here...";

  // Helper to get value nicely
  const getVal = (id) => {
    const v = answers[id];
    if (Array.isArray(v)) return v.join(", ");
    return v || "Not decided";
  };

  const customMeetings = answers.customMeetings || [];

  return (
    <div className="poster-container">
      <div className="poster-header">
        <h1>{projectName}</h1>
        <p className="mission">"{mission}"</p>
      </div>

      <div className="poster-grid">
        <div className="poster-card logistics">
          <h3>⏱️ Rhythm</h3>
          <div className="row">
            <strong>Sprint:</strong> <span>{getVal('sprintDuration')}</span>
          </div>
          <div className="row">
            <strong>Standup:</strong> <span>{getVal('standupTime')}</span>
          </div>
          <div className="row">
            <strong>Planning:</strong> <span>{getVal('planningDay')}</span>
          </div>

          {customMeetings.length > 0 && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <strong>+ Events</strong>
              {customMeetings.map((m, i) => {
                const details = [m.frequency, m.day, m.time].filter(Boolean).join(' ');
                return (
                  <div key={i} className="row" style={{ fontSize: '0.9em' }}>
                    <span>{m.name}</span> <span style={{ opacity: 0.7, fontSize: '0.8em' }}>{details}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="poster-card rules">
          <h3>📜 Rules</h3>
          <div className="row">
            <strong>Review:</strong> <span>{getVal('codereview')}</span>
          </div>
          <div className="row">
            <strong>Estimate:</strong> <span>{getVal('estimation')}</span>
          </div>
        </div>

        <div className="poster-card comms">
          <h3>💬 Comm Tools</h3>
          <p>{getVal('commTools')}</p>
        </div>

        <div className="poster-card core">
          <h3>⏰ Core Hours</h3>
          <p>{getVal('coreHours')}</p>
        </div>

        <div className="poster-card team">
          <h3>👥 Team</h3>
          {answers.members && Array.isArray(answers.members) && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85em', color: '#a78bfa', marginBottom: '0.25rem' }}>Members</div>
              {answers.members.map((m, i) => (
                <div key={i} className="row" style={{ fontSize: '0.9em' }}>
                  <span>{m.name}</span> <span style={{ opacity: 0.7 }}>{m.role}</span>
                </div>
              ))}
            </div>
          )}
          {answers.stakeholders && Array.isArray(answers.stakeholders) && (
            <div>
              <div style={{ fontSize: '0.85em', color: '#f472b6', marginBottom: '0.25rem' }}>Stakeholders</div>
              {answers.stakeholders.map((s, i) => (
                <div key={i} className="row" style={{ fontSize: '0.9em' }}>
                  <span>{s.name}</span> <span style={{ opacity: 0.7 }}>{s.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .poster-container {
          background: linear-gradient(135deg, rgba(30,27,75,0.9), rgba(49,46,129,0.9));
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 3rem;
          color: white;
          width: 100%;
          aspect-ratio: 16/9;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .poster-header {
          text-align: center;
        }
        .poster-header h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .mission {
          font-style: italic;
          font-size: 1.2rem;
          opacity: 0.8;
        }
        .poster-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 1.5rem;
          flex: 1;
        }
        .poster-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .poster-card h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #93c5fd;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 0.5rem;
        }
        .logistics { grid-row: span 2; }
        .row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          padding-bottom: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .row strong { color: #cbd5e1; }
        
        @media (max-width: 800px) {
          .poster-container { aspect-ratio: auto; }
          .poster-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div >
  );
}
