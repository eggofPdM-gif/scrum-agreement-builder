import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ value, options, placeholder, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div
                className="glass-input custom-select-trigger"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                }}
            >
                <span style={{ color: value ? 'inherit' : 'var(--text-secondary)' }}>
                    {value || placeholder}
                </span>
                <span style={{ fontSize: '0.8em', opacity: 0.7, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
            </div>
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden'
                }}>
                    {options.map(opt => (
                        <div
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                background: value === opt ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = value === opt ? 'rgba(59, 130, 246, 0.2)' : 'transparent'}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function QuestionCard({ question, value, onChange }) {
    const handleChange = (e) => {
        onChange(question.id, e.target.value);
    };

    const handleMultiSelect = (option) => {
        const current = Array.isArray(value) ? value : [];
        if (current.includes(option)) {
            onChange(question.id, current.filter(item => item !== option));
        } else {
            onChange(question.id, [...current, option]);
        }
    };

    // Logic for Dynamic List (Custom Meetings)
    const handleDynamicListChange = (index, field, val) => {
        const currentList = Array.isArray(value) ? [...value] : [];
        if (!currentList[index]) currentList[index] = { name: '', time: '' };
        currentList[index][field] = val;
        onChange(question.id, currentList);
    };

    const addDynamicItem = () => {
        const currentList = Array.isArray(value) ? [...value] : [];
        onChange(question.id, [...currentList, { name: '', time: '' }]);
    };

    const removeDynamicItem = (index) => {
        const currentList = Array.isArray(value) ? [...value] : [];
        onChange(question.id, currentList.filter((_, i) => i !== index));
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', width: '100%' }}>
            <h2 className="text-xl mb-4">{question.label}</h2>

            {question.type === 'text' && (
                <input
                    type="text"
                    className="glass-input"
                    value={value || ''}
                    onChange={handleChange}
                    placeholder={question.placeholder}
                />
            )}

            {question.type === 'textarea' && (
                <textarea
                    className="glass-input"
                    value={value || ''}
                    onChange={handleChange}
                    placeholder={question.placeholder}
                    rows={4}
                />
            )}

            {question.type === 'time' && (
                <input
                    type="time"
                    className="glass-input"
                    value={value || ''}
                    onChange={handleChange}
                />
            )}

            {question.type === 'time-range' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="time"
                        className="glass-input"
                        style={{ flex: 1 }}
                        value={value ? value.split(' - ')[0] : ''}
                        onChange={(e) => {
                            const end = value ? value.split(' - ')[1] : '';
                            onChange(question.id, `${e.target.value} - ${end || ''}`);
                        }}
                    />
                    <span>-</span>
                    <input
                        type="time"
                        className="glass-input"
                        style={{ flex: 1 }}
                        value={value ? value.split(' - ')[1] : ''}
                        onChange={(e) => {
                            const start = value ? value.split(' - ')[0] : '';
                            onChange(question.id, `${start || ''} - ${e.target.value}`);
                        }}
                    />
                </div>
            )}

            {question.type === 'select' && (
                <div className="options-grid">
                    {question.options.map((opt) => (
                        <button
                            key={opt}
                            className={`glass-button ${value === opt ? 'primary' : ''}`}
                            onClick={() => onChange(question.id, opt)}
                            style={{ width: '100%', textAlign: 'left' }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}

            {question.type === 'multi-select' && (
                <div className="options-grid">
                    {question.options.map((opt) => (
                        <button
                            key={opt}
                            className={`glass-button ${Array.isArray(value) && value.includes(opt) ? 'primary' : ''}`}
                            onClick={() => handleMultiSelect(opt)}
                            style={{ width: '100%', textAlign: 'left' }}
                        >
                            {opt} {Array.isArray(value) && value.includes(opt) && '✓'}
                        </button>
                    ))}
                </div>
            )}

            {question.type === 'structured-list' && (
                <div className="dynamic-list">
                    {(value || []).map((item, index) => (
                        <div key={index} className="dynamic-row">
                            {question.fields.map((field) => (
                                <div key={field.name} style={{ width: field.width || 'auto', flex: field.width ? 'none' : 1 }}>
                                    {field.type === 'select' ? (
                                        <CustomSelect
                                            value={item[field.name] || ''}
                                            options={field.options}
                                            placeholder={field.label}
                                            onChange={(val) => handleDynamicListChange(index, field.name, val)}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder || field.label}
                                            className="glass-input"
                                            value={item[field.name] || ''}
                                            onChange={(e) => handleDynamicListChange(index, field.name, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                className="glass-button remove-btn"
                                onClick={() => removeDynamicItem(index)}
                                style={{ width: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button className="glass-button" onClick={addDynamicItem}>
                        {question.addLabel || "+ Add Item"}
                    </button>
                </div>
            )}

            {question.type === 'dynamic-list' && (
                <div className="dynamic-list">
                    {(value || []).map((item, index) => (
                        <div key={index} className="dynamic-row">
                            <input
                                type="text"
                                placeholder="Meeting Name (e.g. Refinement)"
                                className="glass-input"
                                value={item.name}
                                onChange={(e) => handleDynamicListChange(index, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="When (e.g. Wed 14:00)"
                                className="glass-input"
                                style={{ width: '200px' }}
                                value={item.time}
                                onChange={(e) => handleDynamicListChange(index, 'time', e.target.value)}
                            />
                            <button
                                className="glass-button remove-btn"
                                onClick={() => removeDynamicItem(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button className="glass-button" onClick={addDynamicItem}>
                        + Add Meeting
                    </button>
                </div>
            )}

            <style jsx>{`
        .glass-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 1rem;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          outline: none;
        }
        .glass-input:focus {
          border-color: var(--accent-color);
          background: rgba(255, 255, 255, 0.1);
        }
        .options-grid {
          display: grid;
          gap: 0.5rem;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        .dynamic-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .dynamic-row {
          display: flex;
          gap: 1rem;
        }
        .remove-btn {
          padding: 0 1rem;
          color: #ef4444; /* red-500 */
          border-color: rgba(239, 68, 68, 0.3);
        }
        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .dynamic-row input { width: 100% !important; }
        }
        
        /* Hover effect for custom select */
        .custom-select-trigger:hover {
            border-color: var(--glass-highlight);
            background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
        </div>
    );
}
