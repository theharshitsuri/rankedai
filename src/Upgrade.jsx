import { useState } from 'react';
import { Radar, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Upgrade() {
  const navigate = useNavigate();
  const [btnTextContext, setBtnTextContext] = useState({});

  const handleClick = (plan) => {
    setBtnTextContext({...btnTextContext, [plan]: 'Coming Soon! 🚀'});
    setTimeout(() => {
      setBtnTextContext({...btnTextContext, [plan]: undefined});
    }, 3000);
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       <header className="scrolled">
        <div className="container nav-container">
          <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className="logo-icon"><Radar size={20} color="#000" /></div> RankedAI
          </div>
          <button onClick={() => navigate(-1)} className="btn btn-secondary nav-cta">
            <ArrowLeft size={16} style={{marginRight: '8px'}} /> Back
          </button>
        </div>
      </header>

      <main className="container center" style={{maxWidth: '1000px', flex: 1, marginTop: '80px', paddingBottom: '120px'}}>
        <div className="badge" style={{marginBottom: '24px'}}><Zap size={16} style={{marginRight: '8px'}} color="#00C9FF" /> RankedAI Pro</div>
        <h1 className="hero-title" style={{fontSize: '3.5rem', marginBottom: '16px'}}>Stop Guessing. <br/>Start Ranking in AI.</h1>
        <p className="hero-subtitle" style={{marginBottom: '60px', maxWidth: '600px', margin: '0 auto'}}>Unlock the exact discovery queries LLMs use, dissect competitor strategies, and get a step-by-step roadmap to dominate AI answers.</p>
        
        <div className="pricing-grid" style={{textAlign: 'left', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '40px', justifyItems: 'center'}}>
          <div className="price-card card" style={{background: '#0a0a0a', border: '1px solid #222', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column'}}>
             <h3 style={{fontSize: '1.5rem', margin: '0 0 12px 0'}}>Free Tier</h3>
             <p style={{color: '#888', marginBottom: '24px'}}>Perfect for a quick diagnosis of your brand's AI ranking.</p>
             <div className="price" style={{fontSize: '3rem', fontWeight: '800', marginBottom: '32px'}}>$0<span style={{fontSize: '1rem', color: '#888', fontWeight: 'normal'}}></span></div>
             <ul style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1}}>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#444" style={{flexShrink:0}}/> 1 MVP brand scan</li>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#444" style={{flexShrink:0}}/> Top discovery prompts</li>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#444" style={{flexShrink:0}}/> Basic visibility score</li>
             </ul>
             <button onClick={() => navigate('/app')} className="btn btn-secondary full-w" style={{padding: '24px 0', fontSize: '1.2rem'}}>
               Scan for Free
             </button>
          </div>

          <div className="price-card card highlight" style={{background: '#000', border: '1px solid #00C9FF', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,201,255,0.1)', transform: 'scale(1.05)', position: 'relative', display: 'flex', flexDirection: 'column'}}>
             <div className="popular-badge" style={{position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: '#00C9FF', color: '#000', padding: '8px 24px', borderRadius: '24px', fontSize: '0.9rem', fontWeight: 'bold'}}>Recommended</div>
             <h3 style={{fontSize: '1.5rem', margin: '16px 0 12px 0'}}>Pro Tier</h3>
             <p style={{color: '#aaa', marginBottom: '24px'}}>Unlock the exact discovery queries LLMs use with a step-by-step roadmap to dominate answers.</p>
             <div className="price" style={{fontSize: '3.5rem', fontWeight: '800', marginBottom: '32px'}}>$49<span style={{fontSize: '1rem', color: '#888', fontWeight: 'normal'}}>/mo</span></div>
             <ul style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1}}>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#00C9FF" style={{flexShrink:0}}/> See exact simulated LLM queries</li>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#00C9FF" style={{flexShrink:0}}/> Full competitor gap analysis</li>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#00C9FF" style={{flexShrink:0}}/> Step-by-step improvement plan</li>
               <li style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc'}}><CheckCircle2 size={18} color="#00C9FF" style={{flexShrink:0}}/> Weekly tracking & delta alerts</li>
             </ul>
             <button onClick={() => handleClick('pro')} className="btn btn-primary full-w" style={{padding: '24px 0', fontSize: '1.2rem', background: btnTextContext['pro'] ? '#222' : 'var(--brand-primary)', color: btnTextContext['pro'] ? '#fff' : '#000'}}>
               {btnTextContext['pro'] || "Upgrade to Pro"}
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Upgrade;
