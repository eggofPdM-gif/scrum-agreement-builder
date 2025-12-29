"use client";

import { useState } from 'react';
import Wizard from '../components/Wizard';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <Wizard />;
  }

  return (
    <main className="container flex-center" style={{ minHeight: '100vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '600px', textAlign: 'center' }}>
        <h1 className="text-xl mb-4">Project Initialization Tool</h1>
        <p className="text-md mb-8" style={{ color: 'var(--text-secondary)' }}>
          Setup your team's success with generated working agreements.
        </p>
        <button
          className="glass-button primary"
          onClick={() => setStarted(true)}
        >
          Start Wizard
        </button>
      </div>
    </main>
  );
}
