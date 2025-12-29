"use client";

import { useState, useEffect } from 'react';
import { generateMarkdown, generateJira, generateSlack } from '../utils/generateDocument';
import PosterGenerator from './PosterGenerator';

export default function ResultsView({ answers, onRestart }) {
    const [activeTab, setActiveTab] = useState('poster'); // 'doc' | 'poster'
    const [format, setFormat] = useState('markdown'); // 'markdown' | 'jira' | 'slack'
    const [content, setContent] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (format === 'markdown') setContent(generateMarkdown(answers));
        if (format === 'jira') setContent(generateJira(answers));
        if (format === 'slack') setContent(generateSlack(answers));
    }, [format, answers]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `team-charter.${format === 'markdown' ? 'md' : 'txt'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '1000px' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>

                {/* Header Actions */}
                <div className="header-actions">
                    <h1 className="text-xl">Your Team Charter</h1>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button className="glass-button" onClick={onRestart}>Restart</button>
                        <div className="divider" />

                        <div className="tabs">
                            <button
                                className={`glass-button ${activeTab === 'doc' ? 'primary' : ''}`}
                                onClick={() => setActiveTab('doc')}
                            >
                                📄 Document
                            </button>
                            <button
                                className={`glass-button ${activeTab === 'poster' ? 'primary' : ''}`}
                                onClick={() => setActiveTab('poster')}
                            >
                                🎨 Poster
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="content-area" style={{ marginTop: '2rem' }}>

                    {activeTab === 'doc' && (
                        <div className="doc-view animate-fade-in">
                            <div className="toolbar" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                <select
                                    className="glass-input"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    style={{ width: 'auto' }}
                                >
                                    <option value="markdown">Markdown (GitHub/GitLab)</option>
                                    <option value="jira">Jira Wiki</option>
                                    <option value="slack">Slack</option>
                                </select>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="glass-button" onClick={handleCopy}>
                                        {copied ? '✓ Copied' : 'Copy'}
                                    </button>
                                    <button className="glass-button" onClick={handleDownload}>
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div className="preview-box">
                                {content}
                            </div>
                        </div>
                    )}

                    {activeTab === 'poster' && (
                        <div className="poster-view animate-fade-in">
                            <div className="toolbar" style={{ marginBottom: '1rem', textAlign: 'right' }}>
                                <p className="text-sm">💡 Tip: Use your system screenshot tool to save this image.</p>
                            </div>
                            <PosterGenerator answers={answers} />
                        </div>
                    )}

                </div>
            </div>

            <style jsx>{`
        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .divider {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.2);
          margin: 0 0.5rem;
        }
        .preview-box {
          background: rgba(0,0,0,0.3);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          font-family: monospace;
          white-space: pre-wrap;
          font-size: 0.9rem;
          line-height: 1.6;
          max-height: 60vh;
          overflow-y: auto;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
