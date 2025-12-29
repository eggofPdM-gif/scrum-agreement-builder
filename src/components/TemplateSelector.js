import { templates } from '../data/templates';

export default function TemplateSelector({ onSelect }) {
    return (
        <div className="glass-panel" style={{ padding: '2rem', width: '100%' }}>
            <h2 className="text-xl mb-2">Choose a Methodology</h2>
            <p className="text-sm mb-6">Select a starting point for your team's working agreements.</p>

            <div className="templates-grid">
                {Object.entries(templates).map(([key, template]) => (
                    <button
                        key={key}
                        className="glass-button template-card"
                        onClick={() => onSelect(template.defaults)}
                    >
                        <h3 className="text-lg mb-2">{template.label}</h3>
                        <p className="text-sm">{template.description}</p>
                    </button>
                ))}
            </div>

            <style jsx>{`
        .templates-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        .template-card {
          text-align: left;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
        }
        .template-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-color);
        }
      `}</style>
        </div>
    );
}
