export default function WizardLayout({ steps, currentStepIndex, children }) {
    return (
        <div className="wizard-container container">
            <aside className="wizard-sidebar glass-panel">
                <h2 className="text-lg mb-8" style={{ padding: '0 1rem' }}>Setup Team</h2>
                <div className="steps-list">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step-item ${index === currentStepIndex ? 'active' : ''} ${index < currentStepIndex ? 'completed' : ''}`}
                        >
                            <div className="step-indicator">
                                {index < currentStepIndex ? '✓' : index + 1}
                            </div>
                            <span className="step-label">{step.category}</span>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="wizard-content">
                {children}
            </main>

            <style jsx>{`
        .wizard-container {
          display: flex;
          gap: 2rem;
          min-height: 80vh;
          align-items: flex-start;
          padding-top: 4rem;
        }
        .wizard-sidebar {
          flex: 0 0 250px;
          padding: 2rem 1rem;
          height: fit-content;
        }
        .wizard-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .step-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .step-item.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          font-weight: 500;
        }
        .step-item.completed {
          color: var(--accent-color);
        }
        
        .step-indicator {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }
        .step-item.active .step-indicator {
          border-color: var(--accent-color);
          background: var(--accent-color);
          color: white;
          border: none;
        }

        @media (max-width: 768px) {
          .wizard-container {
            flex-direction: column;
          }
          .wizard-sidebar {
            width: 100%;
            display: none; /* Hide sidebar on mobile for now or make it a top bar */
          }
        }
      `}</style>
        </div>
    );
}
