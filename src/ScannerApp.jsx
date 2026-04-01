import { useState, useRef } from 'react';
import { Radar, ArrowRight, CheckCircle2, Zap, Loader2, Trophy, Clock, TrendingUp, Lock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ScannerApp() {
  const navigate = useNavigate();
  const [scanState, setScanState] = useState('idle');
  const [formData, setFormData] = useState({ brand: '', category: '', website: '', competitors: '' });
  const [scanProgress, setScanProgress] = useState('Initializing...');
  const [scanResult, setScanResult] = useState(null);
  
  const scanIntervalRef = useRef(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!formData.brand || !formData.category) return;
    setScanState('scanning');
    setScanProgress('Generating 20 discovery prompts...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      scanIntervalRef.current = setInterval(() => pollScan(data.scan_id), 1500);
    } catch (err) {
      console.error(err);
      setScanState('error');
    }
  };

  const pollScan = async (scanId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scans/${scanId}`);
      const data = await res.json();
      if (data.status === 'processing' || data.status === 'pending') {
        const pd = parseInt(data.progress.split(' / ')[0] || 0);
        if (pd === 0) setScanProgress('Generating 20 discovery prompts...');
        else if (pd < 10) setScanProgress('Querying AI models in parallel...');
        else if (pd < 18) setScanProgress('Analyzing mentions and extracting ranking algorithms...');
        else setScanProgress('Computing final optimistic visibility score...');
      } else if (data.status === 'completed') {
        clearInterval(scanIntervalRef.current);
        setScanResult(data);
        setScanState('complete');
      } else if (data.status === 'failed') {
        clearInterval(scanIntervalRef.current);
        setScanState('error');
      }
    } catch (err) {
      console.error(err);
      clearInterval(scanIntervalRef.current);
      setScanState('error');
    }
  };

  const getConfidenceLevel = (prompts) => {
    if (prompts > 15) return "High Confidence (20 Prompts)";
    return "Medium Confidence";
  };

  let beatingCompetitors = [];
  if (scanResult?.score?.competitors) {
     beatingCompetitors = scanResult.score.competitors.filter(c => c.score.final_score > scanResult.score.target.final_score).sort((a,b) => b.score.final_score - a.score.final_score);
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="scrolled">
        <div className="container nav-container">
          <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className="logo-icon"><Radar size={20} color="#000" /></div> RankedAI
          </div>
          <button onClick={() => navigate('/')} className="btn btn-secondary nav-cta">Exit Scanner</button>
        </div>
      </header>
      
      <main className="container center" style={{maxWidth: '900px', flex: 1, marginTop: '120px', paddingBottom: '120px'}}>
        <h1 className="hero-title" style={{fontSize: '3rem', marginBottom: '16px'}}>AI Diagnostics</h1>
        <p className="hero-subtitle" style={{marginBottom: '40px'}}>Discover if ChatGPT recommends you over your competitors.</p>
        
        <div style={{background: '#0a0a0a', padding: '40px', borderRadius: '24px', border: '1px solid #222', textAlign: 'left'}}>
          {scanState === 'idle' && (
            <form className="advanced-scan-form" onSubmit={handleScan} style={{margin: 0, width: '100%'}}>
              <div className="form-row">
                <input required type="text" placeholder="Brand Name (e.g. Canva)" className="scan-input" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
                <input required type="text" placeholder="Category (e.g. graphic design tools)" className="scan-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Competitors (e.g. Figma, Sketch)" className="scan-input" value={formData.competitors} onChange={e => setFormData({...formData, competitors: e.target.value})} />
                <button type="submit" className="btn btn-primary scan-btn" style={{ flex: 1 }}>
                  Run Deep Scan (20 Prompts) <ArrowRight size={18} style={{marginLeft: '8px'}} />
                </button>
              </div>
            </form>
          )}

          {scanState === 'scanning' && (
            <div className="scanning-ui center" style={{padding: '60px 0'}}>
              <Loader2 className="spinner" size={56} color="#00C9FF" style={{ animation: 'spin 2s linear infinite', marginBottom: '24px' }} />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{fontSize: '1.8rem'}}>{scanProgress}</h3>
              <p style={{color: '#888'}}>Analyzing your digital footprint across {formData.category} models...</p>
            </div>
          )}

          {scanState === 'complete' && scanResult && (
             <div className="results-dashboard">
             
             <div style={{color: '#888', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center'}}>
               <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><CheckCircle2 size={14} color="#92FE9D"/> {getConfidenceLevel(scanResult.prompts_data.length)}</span>
               <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Clock size={14}/> Snapshot: {new Date().toLocaleDateString('en-US')}</span>
             </div>
             
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
               <h3 style={{fontSize: '2rem', margin: 0}}>Diagnostic Profile: <span style={{color: '#00C9FF'}}>{formData.brand}</span></h3>
               <div className="badge" style={{margin: 0, padding: '10px 20px', fontSize: '1rem'}}>
                 {scanResult.score?.target?.label}
               </div>
             </div>

             <div style={{display: 'flex', gap: '32px', marginBottom: '40px'}}>
               <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flexShrink: 0}}>
                 <div className="score-circle" style={{margin: 0, border: '4px solid rgba(0, 201, 255, 0.3)'}}>
                   <span className="score-number" style={{fontSize: '3.5rem'}}>{scanResult.score?.target?.final_score || 0}</span>
                 </div>
                 <div style={{display: 'flex', gap: '8px'}}>
                   <span style={{background: '#1a1a1a', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', color: '#ccc'}}>Presence: <strong style={{color: '#fff'}}>{scanResult.score?.target?.presence_label}</strong></span>
                   <span style={{background: '#1a1a1a', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', color: '#ccc'}}>Dominance: <strong style={{color: '#fff'}}>{scanResult.score?.target?.dominance_label}</strong></span>
                 </div>
               </div>
               
               <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', background: '#050505', padding: '24px', borderRadius: '16px', border: '1px solid #222'}}>
                 <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                   <h4 style={{fontSize: '1.2rem', margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px'}}><Target size={20} color="#00C9FF"/> AI Behavior Interpreter</h4>
                   <div style={{textAlign: 'right'}}>
                     <div style={{color: '#00C9FF', fontWeight: 'bold', fontSize: '1.2rem'}}>{scanResult.score?.target?.potential_score} / 100</div>
                     <div style={{fontSize: '0.8rem', color: '#888'}}>Pro Potential Score</div>
                   </div>
                 </div>
                 
                 <div style={{color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.6', padding: '16px', background: '#111', borderRadius: '12px', borderLeft: '4px solid #00C9FF'}}>
                   {scanResult.score?.target?.insight_copy}
                 </div>
                 
                 <div style={{display: 'flex', gap: '8px', color: '#aaa', fontSize: '0.9rem', marginTop: 'auto'}}>
                    <CheckCircle2 size={16} color="#444" style={{flexShrink: 0, marginTop: '2px'}} />
                    Evidence: AI recognized your brand natively in {scanResult.score?.target?.inclusion_score}% of the simulated discovery queries across the {formData.category} space.
                 </div>
               </div>
             </div>

             {/* Auto Top Competitor Highlight (Urgency Engine) */}
             {(beatingCompetitors.length > 0 || scanResult.score?.auto_competitor) && (
                <div style={{marginBottom: '40px'}}>
                  <h4 style={{fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444'}}>
                    <TrendingUp size={20} /> Who AI Recommends Instead
                  </h4>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
                    
                    {beatingCompetitors.length > 0 ? (
                      beatingCompetitors.slice(0, 3).map((comp, idx) => (
                        <div key={idx} style={{background: 'rgba(239, 68, 68, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
                          <h5 style={{fontSize: '1.1rem', margin: '0 0 8px 0', color: '#fff'}}>{comp.name}</h5>
                          <div style={{color: '#ef4444', fontWeight: 'bold', fontSize: '1.5rem'}}>{comp.score.final_score} / 100</div>
                          <div style={{fontSize: '0.85rem', color: '#aaa', marginTop: '8px'}}>AI favored this brand in queries where you were omitted.</div>
                        </div>
                      ))
                    ) : (
                      scanResult.score?.auto_competitor && (
                        <div style={{background: 'rgba(239, 68, 68, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
                            <h5 style={{fontSize: '1.1rem', margin: '0 0 8px 0', color: '#fff'}}>{scanResult.score.auto_competitor}</h5>
                            <div style={{fontSize: '0.85rem', color: '#aaa', marginTop: '8px'}}>This brand was naturally cross-recommended by AI more frequently than any other detected entity.</div>
                        </div>
                      )
                    )}
                    
                  </div>
                </div>
             )}

             {/* The Freemium Blurred Paywall */}
             <div style={{ position: 'relative', marginTop: '60px' }}>
                <div style={{ filter: 'blur(6px)', opacity: 0.3, userSelect: 'none', pointerEvents: 'none', background: '#000' }}>
                  <h4 style={{fontSize: '1.3rem', marginBottom: '16px'}}>Deep Prompt Breakdown</h4>
                  <div style={{overflowX: 'hidden', background: '#050505', borderRadius: '12px', border: '1px solid #222'}}>
                    <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px'}}>
                      <thead>
                        <tr style={{borderBottom: '1px solid #333', background: '#111'}}>
                          <th style={{padding: '16px', color: '#888'}}>AI Discovery Prompt</th>
                          <th style={{padding: '16px', color: '#888'}}>Your Brand Rank</th>
                          <th style={{padding: '16px', color: '#888'}}>Competitor Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{borderBottom: '1px solid #1a1a1a'}}>
                          <td style={{padding: '16px'}}>What are the best tools for this space?</td>
                          <td style={{padding: '16px'}}>Rank #5</td>
                          <td style={{padding: '16px'}}>Rank #1</td>
                        </tr>
                        <tr style={{borderBottom: '1px solid #1a1a1a'}}>
                          <td style={{padding: '16px'}}>Compare Notion and Clickup.</td>
                          <td style={{padding: '16px'}}>Not found</td>
                          <td style={{padding: '16px'}}>Rank #2</td>
                        </tr>
                        <tr>
                          <td style={{padding: '16px'}}>Affordable alternatives to top managers.</td>
                          <td style={{padding: '16px'}}>Rank #3</td>
                          <td style={{padding: '16px'}}>Not found</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{marginTop: '20px', background: '#050505', border: '1px solid #333', padding: '20px', borderRadius: '12px'}}>
                      <p style={{margin: 0, color: '#ccc'}}>Step 2: Start publishing "Best X for Y" landing pages targeting...</p>
                  </div>
                </div>
                
                <div className="center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                  <div style={{ background: '#111', padding: '40px', borderRadius: '24px', border: '1px solid #333', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
                    <div style={{display: 'inline-block', background: 'rgba(0, 201, 255, 0.1)', padding: '16px', borderRadius: '50%', marginBottom: '20px'}}>
                       <Lock size={32} color="#00C9FF" />
                    </div>
                    <h3 style={{fontSize: '1.6rem', marginBottom: '12px'}}>Unlock the AI Optimization Engine</h3>
                    <p style={{color: '#aaa', marginBottom: '24px'}}>Stop guessing. See exactly why the AI chose competitors over you, and get a step-by-step plan to rank #1.</p>
                    
                    <ul style={{textAlign: 'left', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#ccc'}}>
                      <li style={{display: 'flex', gap: '12px'}}><CheckCircle2 size={18} color="#00C9FF" style={{marginTop:'2px'}}/> See exact simulated LLM queries used</li>
                      <li style={{display: 'flex', gap: '12px'}}><CheckCircle2 size={18} color="#00C9FF" style={{marginTop:'2px'}}/> Full competitor gap analysis & breakdown</li>
                      <li style={{display: 'flex', gap: '12px'}}><CheckCircle2 size={18} color="#00C9FF" style={{marginTop:'2px'}}/> Step-by-step improvement plan</li>
                      <li style={{display: 'flex', gap: '12px'}}><CheckCircle2 size={18} color="#00C9FF" style={{marginTop:'2px'}}/> Weekly tracking & delta alerts</li>
                    </ul>
                    <button onClick={() => navigate('/upgrade')} className="btn btn-primary full-w">View Plans & Upgrade</button>
                    <button onClick={() => setScanState('idle')} className="btn btn-secondary full-w" style={{marginTop: '12px'}}>Run another free scan</button>
                  </div>
                </div>
             </div>

           </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ScannerApp;
