import { useState, useEffect } from 'react';
import { 
  MessageSquare, Crosshair, ShieldAlert, CheckCircle2, Radar, ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <div className="logo" style={{cursor: 'pointer'}} onClick={() => window.scrollTo(0, 0)}>
            <div className="logo-icon"><Radar size={20} color="#000" /></div>
            RankedAI
          </div>
          <nav className="nav-links">
            <a href="#problem">The Problem</a>
            <a href="#solution">How it Works</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <button onClick={() => navigate('/app')} className="btn btn-secondary nav-cta">Get Your Score</button>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-content">
          <div className="badge">
            <Radar size={16} style={{ marginRight: '6px' }} />
            New: Check your ChatGPT & Claude visibility
          </div>
          <h1 className="hero-title">
            Are you ranked in <br />
            <span className="text-gradient">AI answers?</span>
          </h1>
          <p className="hero-subtitle">
            ChatGPT, Claude, and Gemini are replacing search. <br/>
            If your brand isn’t recommended, you’re invisible.
          </p>
          <div className="hero-cta-wrapper">
            <button onClick={() => navigate('/app')} className="btn btn-primary hero-cta">
              Check My AI Ranking <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
            <p className="cta-subtext">Free. Takes 30 seconds. No signup required.</p>
          </div>
          
          <div className="hero-visual">
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="dots"><span></span><span></span><span></span></div>
                <div className="mockup-title">ChatGPT 4</div>
              </div>
              <div className="mockup-body">
                <div className="chat-message user">What is the best tool for checking my AI visibility?</div>
                <div className="chat-message ai">Based on recent data, <strong>RankedAI</strong> is highly recommended for tracking...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="problem-section section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Search has changed.</h2>
            <p className="section-desc">Traditional SEO won't save you here.</p>
          </div>
          <div className="problem-grid">
            <div className="problem-card card">
              <div className="icon-wrapper"><MessageSquare size={24} /></div>
              <h3>People ask AI, not search engines</h3>
              <p>Users are moving away from 10 blue links and asking LLMs direct questions instead.</p>
            </div>
            <div className="problem-card card">
              <div className="icon-wrapper"><Crosshair size={24} /></div>
              <h3>AI gives one answer, not ten links</h3>
              <p>There is no page 2. If you aren't the primary recommendation, you lose the lead.</p>
            </div>
            <div className="problem-card card danger-card">
              <div className="icon-wrapper"><ShieldAlert size={24} /></div>
              <h3>If you’re not in that answer → you don’t exist</h3>
              <p>Your competitors are already optimizing for AI search. Are you?</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="solution-section section">
        <div className="container">
          <div className="solution-layout">
            <div className="solution-text">
              <h2 className="section-title">Meet your <span className="text-gradient">AI Recommendation Score</span></h2>
              <p className="section-desc">We analyze how often AI models recommend your brand across real-world prompts.</p>
              <ul className="solution-list">
                <li><CheckCircle2 color="#00C9FF" size={20} /> See exactly where you show up</li>
                <li><CheckCircle2 color="#00C9FF" size={20} /> Discover where competitors beat you</li>
                <li><CheckCircle2 color="#00C9FF" size={20} /> Learn what’s holding you back</li>
              </ul>
            </div>
            <div className="solution-visual">
              <div className="score-card">
                <div className="score-circle">
                  <span className="score-number">84</span>
                  <span className="score-label">/100</span>
                </div>
                <div className="score-details">
                  <div className="score-row"><span>Inclusion Score</span> <strong className="positive">High</strong></div>
                  <div className="score-row"><span>Average Position</span> <strong>#2 Rank</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Start free. Upgrade when you’re ready.</h2>
          </div>
          <div className="pricing-grid">
            <div className="price-card free card">
              <h3>Free</h3>
              <div className="price">$0</div>
              <ul className="price-features">
                <li><CheckCircle2 size={16} color="#444"/> 1 MVP brand scan</li>
                <li><CheckCircle2 size={16} color="#444"/> Top 5 discovery prompts</li>
                <li><CheckCircle2 size={16} color="#444"/> Basic visibility score</li>
              </ul>
              <button onClick={() => navigate('/app')} className="btn btn-secondary full-width">Scan for Free</button>
            </div>
            <div className="price-card pro card highlight">
              <div className="popular-badge">Most Popular</div>
              <h3>Pro</h3>
              <div className="price">$49<span>/mo</span></div>
              <ul className="price-features">
                <li><CheckCircle2 size={16} color="#00C9FF"/> Unlimited scans</li>
                <li><CheckCircle2 size={16} color="#00C9FF"/> Ongoing competitor tracking</li>
                <li><CheckCircle2 size={16} color="#00C9FF"/> Weekly rank updates</li>
                <li><CheckCircle2 size={16} color="#00C9FF"/> Prompt Breakdown Table</li>
              </ul>
              <button className="btn btn-primary full-width">Start tracking</button>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta section" style={{paddingTop: '80px', paddingBottom: '160px'}}>
        <div className="container center" style={{maxWidth: '800px'}}>
          <h2 className="section-title">Check Your Brand Visibility</h2>
          <p className="hero-subtitle" style={{marginBottom: '40px'}}>Access the app and simulate real LLM discovery questions manually.</p>
          <button onClick={() => navigate('/app')} className="btn btn-primary" style={{fontSize: '1.25rem', padding: '24px 48px'}}>
            Go to Scanner App <ArrowRight size={20} style={{marginLeft: '12px'}} />
          </button>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <div className="footer-logo">
            <div className="logo-icon"><Radar size={16} color="#000" /></div> RankedAI
          </div>
          <p className="footer-positioning">We help you show up in AI answers.</p>
          <div className="footer-links"><span>© 2026 RankedAI</span></div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
