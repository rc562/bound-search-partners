import React, { useState, useEffect, useRef, useCallback } from "react";

const C = {n:"#0e0b24",nm:"#181338",nl:"#2a2456",r:"#e23c41",w:"#fff",g:"#8a879a",gl:"#c5c3ce"};

function useTypewriter(text, speed = 40, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
  }, [text, speed, startDelay, started]);

  return { displayed, done, start, started };
}

const REDUCE = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Rise({children, delay = 0}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(REDUCE);
  useEffect(() => {
    if (REDUCE) return;
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }), {threshold:.35});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{overflow:"hidden"}}>
      <div style={{transform:vis?"translateY(0)":"translateY(110%)",transition:`transform .9s cubic-bezier(.23,1,.32,1) ${delay}s`}}>{children}</div>
    </div>
  );
}

export default function App() {
  const [scrolled,setScrolled] = useState(false);
  const [hovInd,setHovInd] = useState(null);
  const [bondVis,setBondVis] = useState(false);
  const [hovBond,setHovBond] = useState(null);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [formSent,setFormSent] = useState(false);
  const [formSending,setFormSending] = useState(false);
  const [heroReady,setHeroReady] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "./hero-poster.jpg";
    if (img.complete) setHeroReady(true);
    else img.onload = () => setHeroReady(true);
  }, []);
  const [chatOpen,setChatOpen] = useState(false);
  const [chatMsgs,setChatMsgs] = useState([{role:"assistant",content:"Hi — I'm the Bound Search Partners AI assistant. I can answer questions about our services, process, and approach, or help you think through what kind of leadership hire might be right for your organization. How can I help?"}]);
  const [chatInput,setChatInput] = useState("");
  const [chatLoading,setChatLoading] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [activeCase,setActiveCase] = useState(0);
  const [activeSrv,setActiveSrv] = useState(-1);
  const [hovProc,setHovProc] = useState(null);
  const [navHidden,setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [navOpen,setNavOpen] = useState(false);
  const [ctaVis,setCtaVis] = useState(false);
  const [indOpen,setIndOpen] = useState(-1);
  const [bwActive,setBwActive] = useState(-1);
  const [rowItem,setRowItem] = useState({});
  const [hovChip,setHovChip] = useState(null);

  // Typewriter hooks
  const heroTw = useTypewriter("The leaders who move industries start here.", 45, 300);
  const readyTw = useTypewriter("Ready when you are.", 60, 200);
  const heroRef = useRef(null);
  const readyRef = useRef(null);

  // Trigger typewriters on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (e.target === heroRef.current) heroTw.start();
          if (e.target === readyRef.current) readyTw.start();
        }
      });
    }, { threshold: 0.3 });
    if (heroRef.current) obs.observe(heroRef.current);
    if (readyRef.current) obs.observe(readyRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setNavHidden(y > 200);
      if(y > lastScrollY.current && y > 200) setNavOpen(false);
      lastScrollY.current = y;
      if (!reduce && y < window.innerHeight * 1.2) {
        const hc = document.getElementById("heroContent");
        if (hc) {
          if (y > 0) hc.style.animation = "none";
          hc.style.transform = `translateY(${y * .22}px)`;
          hc.style.opacity = Math.max(1 - y / 650, 0);
        }
      }
    };
    window.addEventListener("scroll",h,{passive:true});
    return () => window.removeEventListener("scroll",h);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("bond");
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => { setBondVis(entry.isIntersecting); });
      },{threshold:0.2});
      obs.observe(el);
      return () => obs.disconnect();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = document.getElementById("closer");
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting) setCtaVis(true); });
    },{threshold:.35});
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const newMsgs = [...chatMsgs, {role:"user",content:userMsg}];
    setChatMsgs(newMsgs);
    setChatLoading(true);
    try {
      const res = await fetch("/.netlify/functions/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          messages: newMsgs.map(m => ({role:m.role,content:m.content}))
        })
      });
      const data = await res.json();
      const reply = data.content?.map(c => c.text || "").join("") || "I apologize — something went wrong. Please try again or reach Bob directly at bob@boundsearch.com.";
      setChatMsgs(prev => [...prev, {role:"assistant",content:reply}]);
    } catch(e) {
      setChatMsgs(prev => [...prev, {role:"assistant",content:"I'm having trouble connecting right now. You can reach Bob directly at (267) 265-1792 or bob@boundsearch.com."}]);
    }
    setChatLoading(false);
    setTimeout(() => {const el=document.getElementById("chatScroll");if(el)el.scrollTop=el.scrollHeight},100);
  };

  const srvs = [
    {t:"Executive Search",tag:"Targeting the leaders who aren't looking — and building the case for why they should.",d:"C-suite, VP, and senior director placements across manufacturing, supply chain, and industrial sectors. Every engagement is retained, personally led, and grounded in deep understanding of your business, culture, and competitive landscape.",r:"CEO · COO · CFO · VP Operations · VP Supply Chain · VP Manufacturing",rl:"Typical Roles",del:["Full market mapping & competitive landscape analysis","Proprietary candidate shortlist within 30 days","Structured behavioral & leadership assessments","Offer negotiation, counteroffer strategy & onboarding support"],rds:["When the board needs a builder, not a caretaker — we map every operator who has scaled a business like yours.","The integrator who turns strategy into throughput. Operators with P&L scars, not just polish.","Finance leaders fluent in plant economics — capex, working capital, and the cost story behind every unit.","Multi-site operators who raise output and keep the people doing it. Floor credibility, executive range.","Leaders who have lived tariff shocks, dual-sourcing, and nearshoring — networks that bend without breaking.","Floor-up leaders who pair CI discipline with on-time capital project delivery."]},
    {t:"Operations & Plant Leadership",tag:"The hires that determine whether strategy becomes execution.",d:"Plant managers, engineering directors, and quality leaders — the operational backbone of any manufacturing organization. We go deep into the industrial talent market to surface leaders with real floor presence, CI discipline, and team-building track records.",r:"Plant Manager · Director Engineering · Quality Director · Director of Operations",rl:"Typical Roles",del:["Targeted outreach to passive operational leaders","Technical competency & leadership style vetting","On-site culture alignment evaluation","90-day onboarding support & guarantee-backed engagement"],rds:["The hire that decides whether your site hits plan. We vet for floor presence, not resume polish.","Technical depth that can run capex, vendors, and a team — the bridge between design and the floor.","Leaders who build quality systems your customers audit and trust — before the complaint, not after.","Cross-functional operators who own output, cost, and culture across shifts and sites."]},
    {t:"Organizational Advisory",tag:"Clarity before commitment — understanding what your organization actually needs.",d:"Diagnostic-driven consulting for manufacturers navigating growth, transition, or underperformance. Whether you need to understand your leadership bench, plan for succession, benchmark compensation, or map the talent landscape before a search begins — we deliver focused engagements with clear deliverables, not open-ended retainers.",r:"Leadership Audit · Succession Planning · Org Design · Comp Benchmarking · Talent Mapping",rl:"Engagement Types",del:["Leadership bench strength assessment","Succession gap analysis with actionable timeline","Compensation benchmarking vs. regional & national market","Talent availability & density mapping"],rds:["A clear-eyed read on your bench before a transition forces the question.","Know who is ready, who is close, and where the gaps are — with a timeline you can act on.","Structure that matches how the work actually flows — not the org chart you inherited.","Real market data on what leadership costs in your region and sector — before a counteroffer teaches you.","Who is out there, where they sit, and how reachable they are — before you commit to a search."]},
    {t:"Strategic Advisory & Business Intelligence",tag:"PE-grade strategic intelligence, delivered in weeks — not quarters.",d:"Business model audits, strategic roadmaps, and portfolio diagnostics built for private equity firms, venture-backed companies, and manufacturers navigating inflection points. The depth of a Big Four engagement at a fraction of the cost and timeline — powered by AI-augmented research and real operational expertise.",r:"Business Model Audit · Strategic Roadmap · Market Entry Analysis · Portfolio Diagnostics",rl:"Capabilities",del:["Comprehensive business model audit & assessment","Strategic roadmap with prioritized initiatives","Competitive landscape & market entry analysis","AI-augmented research at institutional depth"],rds:["A VC-grade teardown of how you make money and where it leaks — in weeks, not quarters.","Prioritized moves with owners and sequence. Strategy you can run Monday morning.","Demand, competitors, channel, and risk on a new market — before the capital commits.","Rapid reads across holdings: where the EBITDA levers are and which leadership gaps block them."]},
  ];

  const proc = [
    {p:"01",t:"AI-Powered Intelligence",d:"Proprietary AI tools map the full universe of qualified candidates — not just those in databases. Market mapping, compensation benchmarking, and competitive intelligence at a scale no human team can replicate.",l:"Machine Scale"},
    {p:"02",t:"Human Curation",d:"Every candidate is personally vetted for technical capability, cultural alignment, and leadership trajectory. No algorithmic shortlists. No resume blasts. Every conversation is substantive.",l:"Human Judgment"},
    {p:"03",t:"Client Partnership",d:"Direct access to the consultant running your search — backed by a live client portal where every update and document stays one click away. The process adapts to each search, each culture, each hire.",l:"Adaptive"},
    {p:"04",t:"Placement & Beyond",d:"Offer negotiation, counteroffer strategy, resignation coaching, and 90-day onboarding support. Ends when the hire is performing — not when the offer is signed.",l:"Accountable"},
  ];

  const inds = [
    {n:"Manufacturing",s:"Discrete & Process",r:"VP Operations · Plant Manager · Director of Manufacturing · VP Quality · COO",d:"From lean transformations to greenfield launches, we place the operators who keep the floor running. Our network spans discrete and process environments — leaders who have lived takt times, changeovers, and plants run under real cost pressure. We know the difference between a resume that says operational excellence and a leader who has actually delivered it."},
    {n:"Supply Chain & Logistics",s:"End-to-End",r:"VP Supply Chain · Director Procurement · Head of Logistics · CSCO",d:"Tariff shifts, nearshoring, dual-sourcing — today's supply chain leaders need a broader playbook than ever. We place executives who have redesigned networks under pressure, not just managed steady-state flow. The leaders in our network have lived the disruptions your board is asking about."},
    {n:"Building Products",s:"Construction & Materials",r:"Division President · VP Sales · Director Product Dev",d:"We know the intersection of construction cycles, channel strategy, and product innovation. Building products leadership demands range — reading housing starts, managing dealer and distributor relationships, and driving product development against commodity cost swings. We place leaders who have run that full equation."},
    {n:"Food & Beverage",s:"CPG & Production",r:"VP Manufacturing · Plant Director · Director Food Safety · COO",d:"Safety, compliance, and speed-to-shelf — we find leaders who balance all three. From plant floors under SQF and FDA scrutiny to the commercial pressure of retail and private-label customers, we place operators who protect the brand while hitting the number."},
    {n:"Chemicals & Packaging",s:"Specialty & Industrial",r:"VP Operations · Director Engineering · EHS Director · CTO",d:"Technical depth meets regulatory rigor. Our network runs deep in specialty chemicals and flexible packaging — leaders fluent in process safety, EHS culture, and the engineering realities of continuous operations. These are searches where a wrong hire is measured in more than dollars."},
    {n:"Private Equity",s:"Portfolio & Platform",r:"Portfolio CEO · Operating Partner · CFO PE-Backed · Board Director",d:"We partner with PE firms to place operating leaders who drive EBITDA from day one. Speed and certainty matter most inside a hold period — we deliver vetted operators who have created value in sponsor-backed companies before and know what the investment thesis demands of them."},
    {n:"Industrial Equipment",s:"Capital Goods",r:"VP Engineering · Director Product Mgmt · GM Aftermarket",d:"Aftermarket, service, and OEM — we understand what drives margin in capital goods. We place leaders who balance the engineering culture of equipment businesses with the commercial discipline that aftermarket growth requires."},
    {n:"Real Estate",s:"Development & Construction",r:"VP Development · Director Construction · Head of Acquisitions",d:"Ground-up development to asset management — we place leaders across the project lifecycle. Executives who can underwrite, entitle, build, and operate. Development leadership is about managing risk across years-long commitments, and we know who has actually delivered."},
    {n:"Engineering Services",s:"Design & Consulting",r:"VP Engineering · Practice Leader · Chief Engineer",d:"Finding technical leaders who can sell, manage, and deliver complex engineering programs. The best practice leaders are rainmakers and engineers at once — we know how rare that combination is, and where to find it."},
  ];

  const cases = [
    {
      id:"01",
      ind:"Ingredients Manufacturing",
      rev:"$500M+ Revenue",
      role:"VP Operations",
      focus:"Quality · Capital Projects · Automation",
      days:"120",
      status:"1.5+ years and thriving",
      challenge:"A global ingredients manufacturer needed a VP Operations to lead quality transformation and oversee a major capital equipment and automation program. The market was tight — qualified candidates with both the technical depth and the leadership maturity to manage enterprise-scale capex were scarce.",
      outcome:"Placed within 120 days in a difficult market. The hire has exceeded capital project timelines, navigated real-time budget constraints driven by macroeconomic volatility, identified alternate suppliers across multiple business lines, and resolved a series of global supply chain disruptions through hands-on operational attention. Still in role after 1.5 years."
    },
    {
      id:"02",
      ind:"Chemical Manufacturing",
      rev:"$1B+ Revenue",
      role:"EHS Leader",
      focus:"Safety Transformation · Cultural Change",
      days:"Confidential",
      status:"In role and delivering results",
      challenge:"A large-scale chemical manufacturer with a historically reactive safety culture needed an EHS leader capable of building proactive safety systems from the ground up. The role required relocating a candidate across the country to a specialized facility where stakeholder buy-in was critical.",
      outcome:"Successfully relocated a candidate cross-country into a high-impact role. The hire has earned organizational buy-in, implemented new proactive safety procedures, and is delivering measurable improvements. Continuous improvement initiatives are now being adopted across the enterprise."
    },
    {
      id:"03",
      ind:"Industrial Manufacturing",
      rev:"Mid-Market · Global",
      role:"U.S. Manufacturing Leader, Americas",
      focus:"Succession Planning · Multi-Site Operations",
      days:"Planned transition",
      status:"~2 years in role, fully transitioned",
      challenge:"A mid-sized industrial manufacturer serving automotive, construction equipment, and general industrial markets needed to plan succession for their Americas manufacturing leader approaching retirement. The 12–18 month transition demanded a candidate with engineering depth, strategic vision, and the ability to manage a complex multi-site network.",
      outcome:"Identified an operations leader with a strong engineering pedigree and the strategic range to lead across a complex manufacturing network. The predecessor has since retired, and the hire has fully stepped into the role — now nearly two years in and performing at the level the organization envisioned."
    },
    {
      id:"04",
      ind:"Specialty Chemicals",
      rev:"$1B+ Revenue · Global",
      role:"Head of Product Stewardship, North America",
      focus:"Technical Leadership · Generational Transition",
      days:"Confidential",
      status:"In role and scaling",
      challenge:"A global specialty chemical company producing highly engineered, client-specific products needed to transition technical leadership to a new generation. The role — Head of Product Stewardship for North America — required a rare combination: deep formulation knowledge, client-facing credibility, and cultural fit with a particular engineering leadership style.",
      outcome:"Found the needle in the haystack. The hire brought the technical specificity the organization required, earned trust with the existing engineering leadership, and has successfully scaled into an enterprise-level product stewardship role covering all of North America."
    },
    {
      id:"05",
      ind:"Food Ingredients Manufacturing",
      rev:"$1B+ Revenue · Global",
      role:"Plant Manager",
      focus:"Site Leadership · U.S. Flagship Operations",
      days:"Confidential",
      status:"Placed 2026 — onboarding",
      challenge:"A global specialty food ingredients manufacturer needed a Plant Manager for its U.S. flagship site — a high-visibility role demanding floor credibility, food-safety rigor, and the leadership range to run one of the company's most strategically important plants.",
      outcome:"Ran a full retained process from market mapping through offer negotiation, delivering a competitive multi-finalist slate. Placed a proven plant leader who is onboarding with strong organizational alignment — and the client has since retained BSP for its next leadership search."
    }
  ];

  const go = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  const renderSrvDetail = (s) => (
    <div>
      <p style={{fontSize:13,fontStyle:"italic",color:C.r,opacity:.6,lineHeight:1.5,marginBottom:14}}>{s.tag}</p>
      <p style={{fontSize:15,lineHeight:1.85,color:"#d4d1e0",marginBottom:26}}>{s.d}</p>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.r,marginBottom:12}}>Deliverables</div>
      <div style={{marginBottom:24}}>
        {s.del.map((d,di)=>(
          <div key={di} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"5px 0"}}>
            <span style={{color:C.r,fontSize:8,marginTop:5,flexShrink:0}}>&#9656;</span>
            <span style={{fontSize:13,color:"#d4d1e0",lineHeight:1.55}}>{d}</span>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.r,marginBottom:12}}>{s.rl}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {s.r.split(" · ").map((role,ri)=>(
          <span key={ri} style={{position:"relative",padding:"7px 14px",border:`1px solid ${hovChip===ri?"rgba(226,60,65,.6)":"rgba(226,60,65,.2)"}`,color:hovChip===ri?C.w:"#d4d1e0",fontSize:11,fontWeight:500,letterSpacing:".03em",cursor:"default",transition:"all .25s",background:hovChip===ri?"rgba(226,60,65,.07)":"transparent"}}
            onMouseEnter={()=>setHovChip(ri)} onMouseLeave={()=>setHovChip(null)}
            onClick={(e)=>{e.stopPropagation();setHovChip(hovChip===ri?null:ri);}}
          >
            {role}
            <span style={{position:"absolute",bottom:"calc(100% + 10px)",left:0,width:"min(270px,72vw)",padding:"12px 14px",background:"#14102e",border:"1px solid rgba(226,60,65,.3)",borderRadius:4,fontSize:12,lineHeight:1.6,color:C.gl,fontWeight:400,letterSpacing:0,boxShadow:"0 12px 36px rgba(0,0,0,.5)",opacity:hovChip===ri?1:0,transform:hovChip===ri?"translateY(0)":"translateY(6px)",transition:"all .3s cubic-bezier(.23,1,.32,1)",pointerEvents:"none",zIndex:20,whiteSpace:"normal"}}>
              {s.rds[ri]}
            </span>
          </span>
        ))}
      </div>
    </div>
  );

  // Philly skyline SVG component for footer
  const PhillySkyline = () => (
    <svg viewBox="0 0 400 160" fill="none" style={{width:200,height:80,opacity:.15}}>
      {/* Far buildings */}
      <rect x="20" y="80" width="18" height="80" fill="#2a2456"/>
      <rect x="45" y="90" width="14" height="70" fill="#1f1a42"/>
      <rect x="65" y="75" width="20" height="85" fill="#2a2456"/>
      {/* Liberty Place 1 */}
      <rect x="95" y="45" width="22" height="115" fill="#2a2456"/>
      <polygon points="95,45 106,20 117,45" fill="#2a2456"/>
      {/* Liberty Place 2 */}
      <rect x="122" y="55" width="18" height="105" fill="#1f1a42"/>
      <polygon points="122,55 131,32 140,55" fill="#1f1a42"/>
      {/* Comcast Center */}
      <rect x="150" y="15" width="30" height="145" fill="#2a2456"/>
      <rect x="152" y="10" width="26" height="5" fill="#2a2456"/>
      <rect x="163" y="0" width="4" height="10" fill="#2a2456"/>
      <circle cx="165" cy="0" r="3" fill={C.r} opacity=".6"/>
      {/* Comcast Tech */}
      <rect x="188" y="25" width="25" height="135" fill="#1f1a42"/>
      {/* City Hall */}
      <rect x="225" y="60" width="40" height="100" fill="#2a2456"/>
      <rect x="237" y="42" width="16" height="18" fill="#2a2456"/>
      <rect x="242" y="28" width="6" height="14" fill="#2a2456"/>
      <circle cx="245" cy="26" r="3" fill={C.r} opacity=".3"/>
      {/* BNY Mellon */}
      <rect x="275" y="40" width="24" height="120" fill="#2a2456"/>
      {/* More buildings */}
      <rect x="308" y="55" width="22" height="105" fill="#1f1a42"/>
      <rect x="338" y="65" width="28" height="95" fill="#2a2456"/>
      <rect x="372" y="80" width="18" height="80" fill="#1f1a42"/>
      {/* Street */}
      <rect x="0" y="158" width="400" height="2" fill="#1f1a42"/>
    </svg>
  );

  return (
    <div style={{background:C.n,color:C.w,fontFamily:"'Inter','Segoe UI',-apple-system,sans-serif",overflowX:"hidden",opacity:1}}>
      <style>{`
        @keyframes siteIn{to{opacity:1}}@keyframes sR{to{opacity:.92;transform:translateX(0)}}@keyframes sL{to{opacity:1;transform:translateX(0)}}
        @keyframes fi{to{opacity:1}}@keyframes fu{to{opacity:1;transform:translateY(0)}}@keyframes loadB{to{width:100%}}
        @keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes sp{to{transform:rotate(360deg)}}
        @keyframes ep{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(2.5);opacity:0}}
        @keyframes statPop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes heroShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes heroPulse{0%,100%{opacity:.03}50%{opacity:.08}}
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        .navlink{position:relative;transition:color .3s}.navlink:hover{color:#fff!important}.navlink::after{content:"";position:absolute;bottom:-4px;left:0;width:0;height:2px;background:#e23c41;transition:width .3s ease}.navlink:hover::after{width:100%}
        ::selection{background:#e23c4144;color:#fff}input:focus,textarea:focus{border-color:#e23c41!important;outline:none}
        @keyframes beacon{0%,100%{opacity:.8}50%{opacity:.15}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes annoIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes typeDot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1}}
        @keyframes toastUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(hover:none){
          body, body *{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none}
          input, textarea{-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default}
        }
        .orbCore{width:14px;height:14px;border-radius:50%;background:#e23c41;flex-shrink:0;animation:orbBreathe 3.2s ease-in-out infinite;box-shadow:0 0 14px rgba(226,60,65,.8)}
        @keyframes orbBreathe{0%,100%{transform:scale(1);box-shadow:0 0 10px rgba(226,60,65,.55)}50%{transform:scale(1.18);box-shadow:0 0 20px rgba(226,60,65,.95)}}
        .orbPing{position:absolute;left:19px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;border:1px solid rgba(226,60,65,.7);animation:orbPing 4s cubic-bezier(0,0,.2,1) infinite;pointer-events:none}
        @keyframes orbPing{0%,55%{transform:scale(1);opacity:0}60%{transform:scale(1);opacity:.9}100%{transform:scale(3.2);opacity:0}}
        .orbLabel{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c5c3ce;white-space:nowrap;max-width:0;opacity:0;transition:max-width .45s cubic-bezier(.23,1,.32,1),opacity .35s ease .05s}
        .orbLauncher:hover .orbLabel,.orbLauncher:focus-visible .orbLabel{max-width:90px;opacity:1}
        .orbLauncher:hover{border-color:rgba(226,60,65,.7);box-shadow:0 10px 40px rgba(226,60,65,.25), inset 0 1px 0 rgba(255,255,255,.08)}
        @media(hover:none){.orbLabel{display:none}}
        @media(prefers-reduced-motion:reduce){.orbCore,.orbPing{animation:none}}
        @keyframes kbDrift{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.09) translate(-1.4%,1%)}}
        .kbDrift{animation:kbDrift 30s ease-in-out infinite alternate;will-change:transform}
        @media(prefers-reduced-motion:reduce){.kbDrift{animation:none}}
        @keyframes dotpulse{0%,100%{opacity:1}50%{opacity:.2}}
        .mburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px}
        @keyframes srvFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes caseIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes detailIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .ghostTitle{-webkit-text-stroke:1.2px rgba(255,255,255,.3)}
        .srv-tabs::-webkit-scrollbar{display:none}
        @media(min-width:769px){.srv-tabs{justify-content:center!important}}
        @media(min-width:900px){.adv-desc{display:inline!important}}
        .mnav{display:flex;align-items:center;gap:2.5rem}
        @media(max-width:768px){
          #bspChat{width:calc(100vw - 32px)!important;right:16px!important;bottom:80px!important;max-height:70vh!important}
          .mburger{display:flex!important}
          .mnav{display:none!important}
          .float-logo{display:none!important}
          #mabout{grid-template-columns:1fr!important}
          #mabout>div:last-child{display:none!important}

          #mfounder{grid-template-columns:1fr!important}
          #mcontact{grid-template-columns:1fr!important}
          #mfr1,#mfr2{grid-template-columns:1fr!important}
          #mfootbot{flex-direction:column-reverse!important;align-items:center!important;text-align:center!important}
                    #mherobtns{flex-direction:column!important;align-items:flex-start!important}
          #mcasedetail{grid-template-columns:1fr!important}
          #srvScene{grid-template-columns:1fr!important}
          .caseTabs{flex-wrap:nowrap!important;overflow-x:auto;-webkit-overflow-scrolling:touch}
          .caseTabs>button{flex:0 0 auto!important;max-width:70vw}
          .mfRow{text-align:left!important}
          .mfAnno{grid-template-columns:1fr!important}
          .ghostTitle{-webkit-text-stroke:0!important;color:rgba(197,195,206,.42)!important}
          .mfRowDetail{display:none!important}
          .mfMobDetail{display:block!important}
          .caseTabs{flex-wrap:nowrap!important;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin}
          .caseTabs button{flex:0 0 auto!important;min-width:max-content!important}
          .caseTabs button span{overflow:visible!important;text-overflow:clip!important}
          .mfName{display:block!important;padding:.25rem 0}
          .mfSep{display:none!important}
          #mretained{grid-template-columns:1fr!important}
        }
        @media(max-width:480px){
        }

      `}</style>

      {/* Film grain — site-wide material texture */}
      <div aria-hidden="true" style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:5000,opacity:.026,backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")`}}/>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,width:"100%",zIndex:1000,padding:scrolled?"12px 0":"20px 0",background:scrolled?"rgba(14,11,36,.6)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(226,60,65,.06)":"none",transform:navHidden?"translateY(-100%)":"translateY(0)",transition:"all .4s cubic-bezier(.23,1,.32,1)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div onClick={() => go("home")} style={{cursor:"pointer"}}>
            <svg width="36" height="38" viewBox="0 0 130 140" fill="none"><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92"/><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41"/><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9"/></svg>
          </div>
          <div className="mburger" onClick={() => setMobileMenu(!mobileMenu)}>
              <div style={{width:24,height:2,background:mobileMenu?C.r:C.w,transform:mobileMenu?"rotate(45deg) translateY(7px)":"none",transition:"all .3s"}}/>
              <div style={{width:24,height:2,background:C.w,opacity:mobileMenu?0:1,transition:"all .3s"}}/>
              <div style={{width:24,height:2,background:mobileMenu?C.r:C.w,transform:mobileMenu?"rotate(-45deg) translateY(-7px)":"none",transition:"all .3s"}}/>
            </div>
            <div className="mnav" style={{display:"flex",alignItems:"center",gap:"2.5rem"}}>
            {[["home","Home"],["about","About"],["services","Services"],["results","Results"],["contact",""]].map(([id,label]) => (
              <span key={id} onClick={() => go(id)} className={id!=="contact"?"navlink":""} style={{fontSize:12,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",...(id==="contact"?{color:C.r,transition:"all .3s"}:{color:C.gl})}} onMouseEnter={id==="contact"?e=>{e.target.style.opacity=".7"}:undefined} onMouseLeave={id==="contact"?e=>{e.target.style.opacity="1"}:undefined}>{id==="contact"?"Contact":label}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* Floating logo — always visible */}
      <div className="float-logo" onClick={() => go("home")} style={{
        position:"fixed",top:20,left:24,zIndex:1001,
        cursor:"pointer",
        opacity:navHidden?1:0,
        transform:navHidden?"scale(1)":"scale(.8)",
        pointerEvents:navHidden?"auto":"none",
        transition:"all .3s cubic-bezier(.23,1,.32,1)",
      }}>
        <svg width="36" height="38" viewBox="0 0 130 140" fill="none"><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92"/><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41"/><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9"/></svg>
      </div>

      {/* Floating collapsed menu button */}
      <div style={{
        position:"fixed",top:20,right:24,zIndex:1001,
        opacity:navHidden?1:0,
        transform:navHidden?"scale(1)":"scale(.8)",
        pointerEvents:navHidden?"auto":"none",
        transition:"all .3s cubic-bezier(.23,1,.32,1)",
      }}>
        <div onClick={()=>setNavOpen(!navOpen)} style={{
          width:44,height:44,borderRadius:"50%",
          background:"rgba(14,11,36,.8)",backdropFilter:"blur(16px)",
          border:"1px solid rgba(226,60,65,.15)",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:navOpen?0:5,
          cursor:"pointer",transition:"all .3s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(226,60,65,.4)"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(226,60,65,.15)"}}
        >
          <div style={{width:18,height:2,background:navOpen?C.r:C.w,transform:navOpen?"rotate(45deg) translateY(1px)":"none",transition:"all .3s"}}/>
          <div style={{width:18,height:2,background:C.w,opacity:navOpen?0:1,transition:"all .2s"}}/>
          <div style={{width:18,height:2,background:navOpen?C.r:C.w,transform:navOpen?"rotate(-45deg) translateY(-1px)":"none",transition:"all .3s"}}/>
        </div>

        {/* Dropdown menu */}
        <div style={{
          position:"absolute",top:52,right:0,
          background:"rgba(14,11,36,.92)",backdropFilter:"blur(20px)",
          border:"1px solid rgba(226,60,65,.1)",
          borderRadius:8,
          padding:navOpen?"12px 0":"0",
          minWidth:180,
          opacity:navOpen?1:0,
          transform:navOpen?"translateY(0)":"translateY(-8px)",
          pointerEvents:navOpen?"auto":"none",
          transition:"all .25s cubic-bezier(.23,1,.32,1)",
          overflow:"hidden",
          maxHeight:navOpen?400:0,
        }}>
          {[["home","Home"],["about","About"],["services","Services"],["results","Results"],["contact","Contact"]].map(([id,label]) => (
            <div key={id} onClick={()=>{go(id);setNavOpen(false)}} style={{
              padding:"10px 24px",cursor:"pointer",
              fontSize:12,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",
              color:id==="contact"?C.r:C.gl,
              transition:"all .2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(226,60,65,.06)";e.currentTarget.style.color=C.w}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=id==="contact"?C.r:C.gl}}
            >{label}</div>
          ))}
        </div>
      </div>

      {mobileMenu && <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(14,11,36,.98)",zIndex:999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:32}} onClick={() => setMobileMenu(false)}>
        {[["home","Home"],["about","About"],["services","Services"],["results","Results"],["contact","Contact"]].map(([id,label]) => (
          <span key={id} onClick={() => {go(id);setMobileMenu(false)}} style={{fontSize:id==="contact"?16:24,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",color:id==="contact"?C.w:C.gl,...(id==="contact"?{padding:"14px 40px",background:C.r}:{})}}>{label}</span>
        ))}
      </div>}

      {/* HERO */}
      <section id="home" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"flex-end",paddingBottom:"clamp(4rem,8vw,8rem)",overflow:"hidden",background:C.n}}>
        <div style={{position:"absolute",inset:0,zIndex:0,overflow:"hidden",backgroundImage:"url(data:image/jpeg;base64,/9j//gAQTGF2YzYwLjMxLjEwMgD/2wBDAAgQEBMQExYWFhYWFhoYGhsbGxoaGhobGxsdHR0iIiIdHR0bGx0dICAiIiUmJSMjIiMmJigoKDAwLi44ODpFRVP/xAB1AAEAAwEBAQAAAAAAAAAAAAAGBQEHBAADAQADAQEAAAAAAAAAAAAAAAACAQMEABAAAgEEAQMDAwUBAAAAAAAAAgERADEhAxJBYQQiBRORUXGBIzKh0UIRAQABBAMBAQEAAAAAAAAAAAEAIRESYQMCMRNCUf/AABEIABsAMAMBIgACEQADEQD/2gAMAwEAAhEDEQA/ADOvQ6kvjAGkRIW7S4mKR69YpXVA/LevZ5rTJEHC6afGFno+t62/f+VlsE9vJTXszs+T/lpJz0wks0lHTWVaz/dIJZItmtXxxRLpV+JsN+VxRmp2rHJqUimG5tFTOVCGUZrq1pQurwvpNX8LoMfuS2eT4+zYJ6Q1E+V2nKy7Z+1I/a/KHaXuG42S1gS2JuXAZShXmFauecLst7aZy/I5ekNplyXqRNCl2UvP9VEwQYcTjvj8qvQkFvt+frelpaxIRbSb9GeuVnN6wBixK9i6wwGs5lFl4hO/6VxkOwHyac9CnM2pjqAYNxaY7Z6V8gSKG8sUbXZ81/tJYsdyDPYZskzcOP5Yt0S71Zcw0S2QiRRxF4cK7i965SUkbfRuO2akPKxq8VLCett93yvSSnXaQj9aJ//Z)",backgroundSize:"cover",backgroundPosition:"center",filter:"none"}}>
          <div className="kbDrift" style={{position:"absolute",inset:0,backgroundImage:"url(./hero-poster.jpg)",backgroundSize:"cover",backgroundPosition:"center",opacity:heroReady?1:0,transition:"opacity .9s ease"}}/>
        </div>
        {/* Dark overlay */}
        <div style={{position:"absolute",inset:0,zIndex:1,background:`radial-gradient(ellipse 58% 52% at 26% 58%, rgba(10,8,26,.62), transparent 72%),linear-gradient(180deg,transparent 0%,transparent 70%,${C.n} 100%),linear-gradient(90deg,rgba(14,11,36,.4) 0%,transparent 40%)`}} />
        {/* Hero content */}
        <div style={{position:"relative",zIndex:2,maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div id="heroContent" style={{maxWidth:860,opacity:0,animation:"fu .7s cubic-bezier(.23,1,.32,1) .2s forwards",transform:"translateY(20px)",willChange:"transform,opacity"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:32}}><span style={{width:48,height:2,background:C.r,display:"block"}}/><span style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r}}>Retained Executive Search · U.S. Manufacturing & Industrial</span></div>
            <div style={{marginBottom:24,overflow:"hidden"}}>
              <h1 ref={heroRef} style={{fontSize:"clamp(3rem,8vw,6.5rem)",fontWeight:700,lineHeight:.92,letterSpacing:"-.03em",position:"relative",margin:0}}>
                <span style={{visibility:"hidden",position:"absolute",left:0,top:0,right:0}} aria-hidden="true">The leaders who move industries start here.</span>
                <span style={{display:"block",filter:"drop-shadow(0 2px 16px rgba(8,6,20,.85)) drop-shadow(0 1px 3px rgba(8,6,20,.4))"}}>
                {(() => {
                  const full = "The leaders who move industries start here.";
                  const len = heroTw.displayed.length;
                  const cursor = <span key="cur" style={{color:C.r,animation:"blink .8s step-end infinite",fontWeight:300,fontStyle:"normal",position:"absolute"}}>|</span>;
                  const ranges = [[0,16,false],[16,20,true],[20,full.length,false]];
                  const out = [];
                  ranges.forEach(([a,b,ital],ri) => {
                    const v = Math.min(Math.max(len,a),b);
                    if (v > a) out.push(<span key={"v"+ri} style={{color:ital?C.r:C.w,fontStyle:ital?"italic":"normal"}}>{full.slice(a,v)}</span>);
                    if (heroTw.started && len === v && len >= a && len < b) out.push(cursor);
                    if (b > v) out.push(<span key={"t"+ri} style={{color:"transparent",fontStyle:ital?"italic":"normal"}}>{full.slice(v,b)}</span>);
                  });
                  if (heroTw.started && len >= full.length) out.push(cursor);
                  return out;
                })()}
                </span>
              </h1>
            </div>
            <p style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",lineHeight:1.55,color:C.w,fontWeight:500,maxWidth:600,marginBottom:40,textShadow:"0 2px 22px rgba(8,6,20,.9), 0 1px 4px rgba(8,6,20,.6)"}}>Bound Search Partners is a retained executive search firm specializing in manufacturing, industrial, and supply chain leadership.</p>
            <div id="mherobtns" style={{display:"flex",gap:24,flexWrap:"wrap"}}>
              <span onClick={() => go("contact")} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click()}}} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 36px",background:C.r,color:C.w,fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="#c8333a";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(226,60,65,.3)"}} onMouseLeave={e=>{e.currentTarget.style.background=C.r;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>Start a Conversation →</span>
              <span onClick={() => go("services")} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click()}}} style={{display:"inline-flex",padding:"16px 0",color:C.gl,fontSize:13,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",borderBottom:"1px solid rgba(255,255,255,.12)",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.target.style.color=C.w;e.target.style.borderBottomColor=C.r}} onMouseLeave={e=>{e.target.style.color=C.gl;e.target.style.borderBottomColor="rgba(255,255,255,.12)"}}>Explore Services</span>
            </div>
          </div>
        </div>
      </section>


      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.15),transparent)"}}/>

      {/* ABOUT */}
      <section id="about" style={{padding:"clamp(6rem,12vw,10rem) 0",background:C.nm}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>

          <div id="mabout" style={{display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:"clamp(3rem,8vw,8rem)",alignItems:"center"}}>
            
            {/* Text */}
            <div>
              <Rise><h2 style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:32}}>Executive search defined by <span style={{color:C.r,fontStyle:"italic"}}>depth</span>, not volume.</h2></Rise>
              <p style={{fontSize:"1.1rem",lineHeight:1.8,color:C.gl,marginBottom:16}}>Bound Search Partners was founded on one principle: executive search should be personal. Every engagement is retained, personally led, and grounded in genuine understanding of the client's business, culture, and competitive landscape.</p>
              <p style={{fontSize:"1.1rem",lineHeight:1.8,color:C.gl}}>Founded in Philadelphia, serving manufacturers nationwide. Bound Search Partners works with industrial companies, PE-backed portfolio businesses, and the organizations that power the real economy.</p>
            </div>

            {/* Process — clean vertical flow */}
            <div>
              <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:32}}>Our Process</div>
              {proc.map((step,i) => (
                <div key={i} style={{display:"flex",gap:20,marginBottom:i<proc.length-1?0:0}} onMouseEnter={() => setHovProc(i)} onMouseLeave={() => setHovProc(null)}>
                  {/* Vertical line + number */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                    <div style={{width:hovProc===i?40:36,height:hovProc===i?40:36,borderRadius:"50%",border:`1.5px solid ${hovProc===i?C.r:'rgba(226,60,65,.2)'}`,background:hovProc===i?"rgba(226,60,65,.1)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:hovProc===i?C.r:C.g,flexShrink:0,transition:"all .3s cubic-bezier(.23,1,.32,1)",boxShadow:hovProc===i?"0 0 20px rgba(226,60,65,.15)":"none"}}><span style={{width:7,height:7,borderRadius:"50%",background:hovProc===i?C.r:"rgba(226,60,65,.4)",transition:"background .3s"}}/></div>
                    {i<proc.length-1 && <div style={{width:1,flex:1,background:`linear-gradient(180deg,rgba(226,60,65,${hovProc===i?.35:.2}),rgba(226,60,65,.05))`,minHeight:24,transition:"all .3s"}}/>}
                  </div>
                  {/* Content */}
                  <div style={{paddingBottom:i<proc.length-1?32:0,transition:"all .3s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                      <h4 style={{fontSize:16,fontWeight:700,color:hovProc===i?C.w:C.gl,transition:"color .3s"}}>{step.t}</h4>
                      <span style={{fontSize:9,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:C.r,opacity:hovProc===i?.8:.5,transition:"opacity .3s"}}>{step.l}</span>
                    </div>
                    <p style={{fontSize:14,color:C.gl,lineHeight:1.7,opacity:hovProc===i?1:.7,transition:"opacity .3s"}}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* SERVICES — living index */}
      <section id="services" style={{background:C.n,padding:"clamp(6rem,11vw,9rem) 0",position:"relative",overflow:"hidden"}}>
        <div aria-hidden="true" style={{position:"absolute",width:"min(720px,90vw)",height:"min(720px,90vw)",borderRadius:"50%",background:"radial-gradient(circle,rgba(226,60,65,.5),transparent 60%)",filter:"blur(50px)",opacity:.12,pointerEvents:"none",top:`${Math.max(activeSrv,0)*20-6}%`,left:"52%",transition:"top 1.2s cubic-bezier(.23,1,.32,1)",willChange:"top"}}/>

        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",position:"relative"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Services</div>
          <Rise><h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:"clamp(2.5rem,5vw,4.5rem)"}}>Search. Advisory. Intelligence.</h2></Rise>

          <div id="srvScene" style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:"clamp(2.5rem,5vw,5.5rem)",alignItems:"start"}}>
            <div>
              {srvs.map((s,i) => {
                const active = activeSrv === i;
                return (
                  <div key={i} onMouseEnter={() => {setActiveSrv(i);setHovChip(null);}} onClick={() => {setActiveSrv(isMobile && activeSrv===i ? -1 : i);setHovChip(null);}} role="button" tabIndex={0}
                    onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setActiveSrv(i);}}}
                    style={{padding:"clamp(1.2rem,2.1vw,1.8rem) 0",cursor:"pointer",borderBottom:"1px solid rgba(226,60,65,.08)",userSelect:"none"}}>
                    <h3 className={active?undefined:"ghostTitle"} style={{fontSize:"clamp(1.55rem,3.4vw,3rem)",fontWeight:700,letterSpacing:"-.02em",lineHeight:1.08,margin:0,color:active?C.w:"transparent",transition:"color .45s ease"}}>
                      {s.t}<span style={{color:active?C.r:"transparent",transition:"color .45s ease"}}>.</span>
                    </h3>
                    {isMobile && active && (
                      <div onClick={e=>e.stopPropagation()} style={{paddingTop:18,animation:"detailIn .4s cubic-bezier(.23,1,.32,1)",cursor:"default"}}>
                        {renderSrvDetail(s)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isMobile && activeSrv >= 0 && (
              <div key={activeSrv} style={{animation:"detailIn .45s cubic-bezier(.23,1,.32,1)",paddingTop:6}}>
                {renderSrvDetail(srvs[activeSrv])}
              </div>
            )}
          </div>

        </div>
      </section>


      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.1),transparent)"}}/>

      {/* CASE STUDIES */}
      <section id="results" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.n}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Placement Outcomes</div>
          <Rise><h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",maxWidth:700,marginBottom:56}}>Real searches.<br/>Measurable results.</h2></Rise>
          
          {/* Case selector tabs */}
          <div className="caseTabs" style={{display:"flex",gap:2,marginBottom:2,flexWrap:"wrap"}}>
            {cases.map((c,i) => (
              <button key={i} onClick={() => setActiveCase(i)} style={{flex:activeCase===i?"2.5 1 0%":"1 1 0%",padding:"16px 20px",background:activeCase===i?"rgba(226,60,65,.08)":"rgba(226,60,65,.02)",border:"none",borderBottom:activeCase===i?`3px solid ${C.r}`:"3px solid transparent",color:activeCase===i?C.w:C.g,fontFamily:"inherit",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",transition:"all .4s cubic-bezier(.23,1,.32,1)",textAlign:"left",minWidth:0,overflow:"hidden"}}>
                <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"}}>{activeCase===i?c.role:c.ind}</span>
              </button>
            ))}
          </div>

          {/* Active case detail */}
          <div key={activeCase} style={{padding:"clamp(2rem,4vw,3.5rem)",background:"rgba(226,60,65,.03)",borderLeft:`4px solid ${C.r}`,animation:"caseIn .5s cubic-bezier(.23,1,.32,1)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr",gap:32}}>
              {/* Header row */}
              <div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"8px 24px",marginBottom:20}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:C.r,padding:"4px 12px",background:"rgba(226,60,65,.08)"}}>{cases[activeCase].ind}</span>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:C.gl,padding:"4px 12px",background:"rgba(255,255,255,.03)"}}>{cases[activeCase].rev}</span>
                </div>
                <h3 style={{fontSize:"clamp(1.5rem,2.5vw,2.25rem)",fontWeight:700,marginBottom:8}}>{cases[activeCase].role}</h3>
                <div style={{fontSize:13,color:C.g,letterSpacing:".05em"}}>{cases[activeCase].focus}</div>
              </div>

              {/* Metrics row */}
              <div style={{display:"flex",gap:48,flexWrap:"wrap",padding:"20px 0",borderTop:"1px solid rgba(226,60,65,.08)",borderBottom:"1px solid rgba(226,60,65,.08)"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>Time to Fill</div>
                  <div style={{fontSize:24,fontWeight:700,color:C.r}}>{cases[activeCase].days}{cases[activeCase].days!=="Confidential"&&cases[activeCase].days!=="Planned transition"?" days":""}</div>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>Current Status</div>
                  <div style={{fontSize:16,fontWeight:700,color:C.w,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>
                    {cases[activeCase].status}
                  </div>
                </div>
              </div>

              {/* Challenge + Outcome */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}} id="mcasedetail">
                <div>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:C.r,marginBottom:12,opacity:.7}}>The Challenge</div>
                  <p style={{fontSize:15,color:C.gl,lineHeight:1.8}}>{cases[activeCase].challenge}</p>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:C.r,marginBottom:12,opacity:.7}}>The Outcome</div>
                  <p style={{fontSize:15,color:C.gl,lineHeight:1.8}}>{cases[activeCase].outcome}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{marginTop:16,fontSize:11,color:C.g,opacity:.5,fontStyle:"italic"}}>Client identities protected. All outcomes are real and verified.</div>
        </div>
      </section>

      {/* INDUSTRIES — manifesto */}
      <section id="industries" style={{padding:"clamp(6rem,11vw,10rem) 0",background:C.nm,position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",position:"relative",textAlign:"center"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:18}}>Industries</div>
          <Rise><h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:"clamp(2.5rem,5vw,4rem)"}}>We know your world.</h2></Rise>

          {/* the manifesto block — annotations anchor under the clicked word */}
          <div style={{fontSize:"clamp(1.25rem,2.5vw,2rem)",fontWeight:700,letterSpacing:"-.02em",lineHeight:1.5,maxWidth:1040,margin:"0 auto"}}>
            {(isMobile ? inds.map((_,i) => [i]) : [[0,1,2],[3,4,5],[6,7,8]]).map((row,r) => {
              const openRow = indOpen >= 0 ? (isMobile ? indOpen : Math.floor(indOpen/3)) : -1;
              const DH = typeof window !== "undefined" && window.innerWidth < 640 ? 640 : 250;
              const shown = rowItem[r];
              return (
                <React.Fragment key={r}>
                  <div className="mfRow" style={{textAlign:"center",padding:".18em 0",position:"relative"}}>
                    {row.map((i,ci) => {
                      const d = inds[i];
                      const lit = indOpen === i || hovInd === i;
                      return (
                        <span key={i}>
                          <span className={"mfName" + (lit ? "" : " ghostTitle")}
                            onMouseEnter={() => setHovInd(i)} onMouseLeave={() => setHovInd(null)}
                            onClick={() => {
                              setRowItem(m => ({...m, [r]: i}));
                              setIndOpen(indOpen === i ? -1 : i);
                            }}
                            role="button" tabIndex={0}
                            onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click();}}}
                            style={{cursor:"pointer",color:lit?C.w:"transparent",transition:"color .4s ease",userSelect:"none",whiteSpace:"nowrap",display:"inline-block"}}>
                            {d.n}{indOpen === i && <span style={{color:C.r}}>.</span>}
                          </span>
                          {ci < row.length - 1 && <span className="mfSep" style={{color:C.r,opacity:.45,margin:"0 .5em",fontWeight:400}}>·</span>}
                          <span className="mfMobDetail" style={{display:"none",overflow:"hidden",maxHeight:indOpen===i?700:0,opacity:indOpen===i?1:0,transition:"max-height .4s cubic-bezier(.23,1,.32,1), opacity .3s ease"}}>
                            <span style={{display:"block",padding:"10px 0 22px",fontSize:15,fontWeight:400,letterSpacing:0,lineHeight:1.8}}>
                              <span style={{display:"block",fontSize:12,color:C.g,letterSpacing:".05em",marginBottom:10}}>{d.s}</span>
                              <span style={{display:"block",fontSize:14.5,color:"#d4d1e0",lineHeight:1.85,marginBottom:16}}>{d.d}</span>
                              <span style={{display:"block",fontSize:10,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.r,marginBottom:10}}>Roles We Place</span>
                              <span style={{display:"flex",flexWrap:"wrap",gap:6}}>
                                {d.r.split(" · ").map((role,ri)=>(
                                  <span key={ri} style={{padding:"6px 13px",border:"1px solid rgba(226,60,65,.22)",color:"#d4d1e0",fontSize:11,fontWeight:500,letterSpacing:".03em"}}>{role}</span>
                                ))}
                              </span>
                            </span>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  <div className="mfRowDetail" style={{overflow:"hidden",height:openRow===r?DH:0,transition:"height .5s cubic-bezier(.23,1,.32,1)"}}>
                    {shown != null && (() => {
                      const d = inds[shown];
                      return (
                      <div key={shown} style={{textAlign:"left",animation:"annoIn .4s ease both"}}>
                        <div style={{padding:"26px 0 30px",fontSize:15,fontWeight:400,letterSpacing:0,lineHeight:1.8}}>
                          <div className="mfAnno" style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:"clamp(1.5rem,3vw,3rem)",alignItems:"start"}}>
                            <div>
                              <div style={{fontSize:12,color:C.g,letterSpacing:".05em",marginBottom:10}}>{d.s}</div>
                              <div style={{fontSize:14.5,color:"#d4d1e0",lineHeight:1.85}}>{d.d}</div>
                            </div>
                            <div>
                              <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.r,marginBottom:10}}>Roles We Place</div>
                              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                                {d.r.split(" · ").map((role,ri)=>(
                                  <span key={ri} style={{padding:"6px 13px",border:"1px solid rgba(226,60,65,.22)",color:"#d4d1e0",fontSize:11,fontWeight:500,letterSpacing:".03em"}}>{role}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );})()}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </section>


      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.1),transparent)"}}/>

      {/* BOND */}
      <section id="bond" style={{padding:"clamp(3rem,6vw,5rem) 0 clamp(5rem,10vw,8rem)",background:C.n,textAlign:"center",overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,background:"radial-gradient(circle,rgba(226,60,65,.04),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>

          {/* B icon — interactive */}
          <div style={{position:"relative",width:140,height:150,margin:"0 auto"}}>
            {/* White bar — "the right company" */}
            <div style={{
              position:"absolute",left:6,top:6,width:34,height:138,background:C.w,borderRadius:3,opacity:.92,
              transform:bondVis?(hovBond==="company"?"translateX(-30px) scale(1.12)":hovBond==="leader"?"translateX(6px) scale(.95) rotate(2deg)":hovBond==="bsp"?"translateX(18px) scale(1.08)":"translateX(0)"):"translateX(-100px)",
              transition:"all .4s cubic-bezier(.23,1,.32,1)",
            }}/>
            {/* Red top — "the right leader" */}
            <div style={{
              position:"absolute",right:6,top:6,width:78,height:62,background:C.r,borderRadius:3,
              transform:bondVis?(hovBond==="leader"?"translateX(30px) translateY(-8px) scale(1.12)":hovBond==="company"?"translateX(-6px) scale(.95)":hovBond==="bsp"?"translateX(-18px) translateY(4px) scale(1.08)":"translateX(0)"):"translateX(100px)",
              transition:"all .4s cubic-bezier(.23,1,.32,1)",
            }}/>
            {/* Red bottom — "the right leader" */}
            <div style={{
              position:"absolute",right:6,bottom:6,width:78,height:62,background:C.r,opacity:.9,borderRadius:3,
              transform:bondVis?(hovBond==="leader"?"translateX(30px) translateY(8px) scale(1.12)":hovBond==="company"?"translateX(-6px) scale(.95)":hovBond==="bsp"?"translateX(-18px) translateY(-4px) scale(1.08)":"translateX(0)"):"translateX(100px)",
              transition:"all .4s cubic-bezier(.23,1,.32,1) .05s",
            }}/>
            {/* Glow */}
            <div style={{
              position:"absolute",inset:-30,
              background:"radial-gradient(ellipse,rgba(226,60,65,.15),transparent 70%)",
              opacity:hovBond==="bsp"?1:hovBond?0.4:bondVis?.2:0,
              transform:hovBond==="bsp"?"scale(1.3)":"scale(1)",
              transition:"all .4s ease",
            }}/>
          </div>

          {/* Tagline — interactive phrases */}
          <div style={{marginTop:28,fontSize:"clamp(1.25rem,2.5vw,2rem)",fontWeight:700,opacity:bondVis?1:0,transform:bondVis?"translateY(0)":"translateY(12px)",transition:"all .5s ease .5s"}}>
            <span
              onMouseEnter={()=>setHovBond("company")}
              onMouseLeave={()=>setHovBond(null)}
              style={{cursor:"default",transition:"color .2s",color:hovBond==="company"?C.w:C.gl,borderBottom:hovBond==="company"?"2px solid rgba(255,255,255,.3)":"2px solid transparent",paddingBottom:2}}
            >The right company</span>
            {" "}<span style={{color:C.r}}>+</span>{" "}
            <span
              onMouseEnter={()=>setHovBond("leader")}
              onMouseLeave={()=>setHovBond(null)}
              style={{cursor:"default",transition:"color .2s",color:hovBond==="leader"?C.r:"inherit",borderBottom:hovBond==="leader"?"2px solid rgba(226,60,65,.3)":"2px solid transparent",paddingBottom:2}}
            >the right leader</span>
            {" "}<span style={{color:C.r}}>=</span>{" "}
            <span
              onMouseEnter={()=>setHovBond("bsp")}
              onMouseLeave={()=>setHovBond(null)}
              style={{cursor:"default",transition:"color .2s",color:hovBond==="bsp"?C.w:"inherit",borderBottom:hovBond==="bsp"?"2px solid rgba(226,60,65,.4)":"2px solid transparent",paddingBottom:2}}
            >Bound Search Partners.</span>
          </div>

          {/* Values — single row of keywords */}
          <div style={{marginTop:28,display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"8px 24px",opacity:bondVis?1:0,transform:bondVis?"translateY(0)":"translateY(10px)",transition:"all .6s ease .7s"}}>
            {["Rigor","Transparency","Precision","Trust","Candor","Urgency"].map((v,i) => (
              <span key={i} style={{fontSize:12,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:i%2===0?C.gl:C.r,opacity:.6}}>{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm}}>
        <div id="mfounder" style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(3rem,6vw,6rem)",alignItems:"center"}}>
          <div>
            <Rise><h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:18}}>Bob Cwenar<span style={{color:C.r}}>.</span></h2></Rise>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
              <span style={{width:34,height:3,background:C.r,flexShrink:0}}/>
              <span style={{fontSize:"clamp(.68rem,.95vw,.8rem)",fontWeight:700,letterSpacing:".24em",textTransform:"uppercase",color:C.r,whiteSpace:"nowrap"}}>Founder &amp; Managing Partner</span>
              <span style={{flex:1,height:1,background:"rgba(226,60,65,.18)"}}/>
            </div>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>Bob Cwenar has spent more than a decade in retained executive search, focused exclusively on manufacturing, industrial, and supply chain leadership. He built and led GattiHR's first Industrial Practice — establishing the firm's presence beyond its historic roots in HR search — and directed national and global engagements there and at Kingsley Gate Partners, a global executive search firm — serving organizations from founder-led companies to enterprises exceeding $10 billion in revenue.</p>
<p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>He founded Bound Search Partners on a conviction proven across hundreds of engagements: searches succeed when they are led, start to finish, by the senior consultant accountable for the outcome. Every Bound engagement is personally directed — from search strategy and market mapping through final negotiation and onboarding — with no hand-offs and no layers between the client and the work.</p>
<p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>The record: more than 200 executive placements, with 92 percent retained beyond the first year. It is the standard to which every Bound search is held.</p>
          </div>
          <div><img src="./headshot.png" alt="Bob Cwenar" style={{width:"100%",maxWidth:420,marginLeft:"auto",display:"block"}}/></div>
        </div>

        {/* Beyond the work */}
        <div style={{maxWidth:1320,margin:"56px auto 0",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:40}}>
            <div style={{fontSize:"clamp(.62rem,.85vw,.74rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:14}}>Beyond the work</div>
            <p style={{fontSize:"1rem",lineHeight:1.7,color:C.gl,marginBottom:28,maxWidth:560}}>Search is a people business. It seems only fair to be one.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"10px 34px",marginBottom:18}}>
              {[
                {w:"Philadelphia", d:"Rooted here by choice. The skyline on this site is the view from home; the industrial economy around it is the one this firm serves."},
                {w:"Son of a builder", d:"Bob's father builds custom homes and restores historic properties in Bucks County. The regard for people who make physical things — and stand behind the finished work — is inherited."},
                {w:"Behind the lens", d:"A longtime photographer of cities and landscapes. The discipline transfers: wait for the right frame, not the available one."},
                {w:"The kitchen", d:"Where the same standards apply — preparation, timing, execution. Bob cooks the way he runs searches: personally, start to finish."},
                {w:"Markets & macro", d:"A standing study of geopolitics, capital flows, and supply chains — the research habit behind the client advisories published on this site."},
                {w:"City-builder", d:"Strategy games where you zone districts and untangle traffic. It's research, technically."},
              ].map((item,i) => {
                const on = bwActive === i;
                return (
                  <span key={i} role="button" tabIndex={0}
                    onMouseEnter={() => {if(!isMobile) setBwActive(i);}}
                    onClick={() => setBwActive(on ? -1 : i)}
                    onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setBwActive(on?-1:i);}}}
                    style={{fontSize:"clamp(1.25rem,2.4vw,1.9rem)",fontWeight:800,letterSpacing:"-.01em",cursor:"pointer",color:on?C.w:"rgba(244,243,247,.22)",transition:"color .35s",userSelect:"none",whiteSpace:"nowrap"}}>
                    {item.w}<span style={{color:on?C.r:"transparent",transition:"color .35s"}}>.</span>
                  </span>
                );
              })}
            </div>
            <div style={{minHeight:54}}>
              {bwActive >= 0 && (
                <p key={bwActive} style={{fontSize:".95rem",lineHeight:1.65,color:C.gl,maxWidth:680,margin:0,animation:"detailIn .45s cubic-bezier(.23,1,.32,1)",borderLeft:`2px solid ${C.r}`,paddingLeft:16}}>
                  {[
                    "Rooted here by choice. The skyline on this site is the view from home; the industrial economy around it is the one this firm serves.",
                    "Bob's father builds custom homes and restores historic properties in Bucks County. The regard for people who make physical things — and stand behind the finished work — is inherited.",
                    "A longtime photographer of cities and landscapes. The discipline transfers: wait for the right frame, not the available one.",
                    "Where the same standards apply — preparation, timing, execution. Bob cooks the way he runs searches: personally, start to finish.",
                    "A standing study of geopolitics, capital flows, and supply chains — the research habit behind the client advisories published on this site.",
                    "Strategy games where you zone districts and untangle traffic. It's research, technically.",
                  ][bwActive]}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm}}>
        <div id="mcontact" style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(3rem,5vw,5rem)",alignItems:"start"}}>
          <div>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>Contact</div>
            <Rise><h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:24}}>Start a <span style={{color:C.r,fontStyle:"italic"}}>conversation</span>.</h2></Rise>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:32}}>Every engagement begins with a candid discussion about the role and whether Bound Search Partners is the right fit.</p>
            {[["Phone","(267) 265-1792","tel:+12672651792"],["Email","bob@boundsearch.com","mailto:bob@boundsearch.com"],["Headquarters","Philadelphia, PA — Serving clients nationwide",null]].map(([label,val,href],i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"16px 0",borderTop:"1px solid rgba(255,255,255,.05)"}}>
                <div style={{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(226,60,65,.06)",color:C.r,flexShrink:0}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{i===0?<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>:i===1?<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></>:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>}</svg>
                </div>
                <div><strong style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:3}}>{label}</strong>{href?<a href={href} style={{color:C.w,textDecoration:"none"}}>{val}</a>:<span>{val}</span>}</div>
              </div>
            ))}
            <p style={{marginTop:24,fontSize:13.5,color:C.gl,lineHeight:1.7,borderLeft:`2px solid ${C.r}`,paddingLeft:14}}>Every inquiry receives a direct response from the founder within 24 hours.</p>
          </div>
          <div>
            {formSent ? (
              <div style={{textAlign:"center",padding:"80px 24px"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(226,60,65,.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e23c41" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3 style={{fontSize:24,fontWeight:700,marginBottom:12}}>Inquiry Received</h3>
                <p style={{fontSize:15,color:C.gl,lineHeight:1.7}}>Thank you for reaching out. Bob will respond personally within 24 hours.</p>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={async(e)=>{e.preventDefault();setFormSending(true);try{const fd=new FormData(e.target);fd.append("form-name","contact");await fetch("/",{method:"POST",body:fd});setFormSent(true)}catch{alert("Something went wrong. Please email bob@boundsearch.com directly.")}setFormSending(false)}}>
                <input type="hidden" name="form-name" value="contact"/>
                <p style={{display:"none"}} aria-hidden="true"><label>Don't fill this out: <input name="bot-field"/></label></p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
                  <div>
                    <label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>I Am A</label>
                    <select name="visitor-type" required defaultValue="" style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,transition:"border-color .3s",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a879a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",paddingRight:40}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.06)"}>
                      <option value="" disabled style={{color:"#8a879a"}}>Select one</option>
                      <option value="Client / Prospective Client">Client / Prospective Client</option>
                      <option value="Candidate">Candidate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>Inquiry Type</label>
                    <select name="inquiry-type" required defaultValue="" style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,transition:"border-color .3s",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a879a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",paddingRight:40}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.06)"}>
                      <option value="" disabled style={{color:"#8a879a"}}>Select one</option>
                      <option value="Executive Search">Executive Search</option>
                      <option value="Operations & Plant Leadership">Operations & Plant Leadership</option>
                      <option value="Organizational Advisory">Organizational Advisory</option>
                      <option value="Strategic Advisory & Business Intelligence">Strategic Advisory & Business Intelligence</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div id="mfr1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
                  {[["first-name","First Name"],["last-name","Last Name"]].map(([n,l]) => <div key={n}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>{l}</label><input name={n} required style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,transition:"border-color .3s"}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.06)"}/></div>)}
                </div>
                <div id="mfr2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
                  {[["email","Email","email"],["phone","Phone","tel"]].map(([n,l,t]) => <div key={n}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>{l}</label><input name={n} type={t} required={n==="email"} style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,transition:"border-color .3s"}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.06)"}/></div>)}
                </div>
                {[["company","Company"],["role","Role"]].map(([n,l]) => <div key={n} style={{marginBottom:20}}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>{l}</label><input name={n} style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,transition:"border-color .3s"}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.06)"}/></div>)}
                <div style={{marginBottom:20}}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>Additional Context</label><textarea name="message" rows={4} style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,resize:"vertical",transition:"border-color .3s"}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.4)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.06)"}/></div>
                <button type="submit" disabled={formSending} style={{width:"100%",padding:"16px 36px",background:formSending?"rgba(226,60,65,.5)":C.r,color:C.w,border:"none",fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:formSending?"wait":"pointer",fontFamily:"inherit",transition:"all .3s"}} onMouseEnter={e=>{if(!formSending)e.target.style.background="#c8333a"}} onMouseLeave={e=>{if(!formSending)e.target.style.background=C.r}}>{formSending?"Sending...":"Submit Inquiry →"}</button>
              </form>
            )}
          </div>
        </div>
      </section>


      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.12),transparent)"}}/>

      {/* CTA */}
      <section id="closer" style={{padding:"clamp(5rem,10vw,8.5rem) 0",background:C.n,textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:"url(./closer-bg.jpg)",backgroundSize:"cover",backgroundPosition:"center 38%"}}/>
        <div aria-hidden="true" style={{position:"absolute",inset:0,background:"linear-gradient(180deg, #0e0b24 0%, transparent 24%, transparent 76%, #0e0b24 100%)"}}/>
        <div aria-hidden="true" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(900px,120vw)",height:"min(900px,120vw)",background:"radial-gradient(circle,rgba(226,60,65,.06),transparent 65%)",pointerEvents:"none",opacity:ctaVis?1:0,transition:"opacity 1.2s ease .3s"}}/>
        <div style={{maxWidth:800,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",position:"relative"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24,opacity:ctaVis?1:0,transition:"opacity .6s ease"}}>Ready to begin?</div>
          <h2 style={{fontSize:"clamp(2.8rem,7.5vw,5.75rem)",fontWeight:700,lineHeight:.94,letterSpacing:"-.03em",marginBottom:24,opacity:ctaVis?1:0,transform:ctaVis?"translateY(0)":"translateY(24px)",transition:"all .8s cubic-bezier(.23,1,.32,1) .1s"}}>The right hire<br/>changes <span style={{color:C.r,fontStyle:"italic"}}>everything</span>.</h2>
          <p ref={readyRef} style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",color:C.gl,lineHeight:1.5,maxWidth:550,margin:"0 auto 40px"}}>
            {(() => {
              const full = "Ready when you are.";
              const len = readyTw.displayed.length;
              return full.split("").map((ch, i) => (
                <React.Fragment key={i}>
                  <span style={{color: i < len ? C.gl : "transparent"}}>{ch}</span>
                  {i === len - 1 && readyTw.started && <span style={{color:C.r,animation:"blink .8s step-end infinite",fontWeight:300}}>|</span>}
                </React.Fragment>
              ));
            })()}
          </p>
          <span onClick={() => go("contact")} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click()}}} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 36px",background:C.r,color:C.w,fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="#c8333a";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(226,60,65,.3)"}} onMouseLeave={e=>{e.currentTarget.style.background=C.r;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>Start a Conversation →</span>
        </div>
      </section>



      {/* ADVISORIES SECTION */}
      <section id="advisories" style={{padding:"40px 0",background:C.nm,borderTop:"1px solid rgba(226,60,65,.08)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>

          <div style={{display:"flex",alignItems:"baseline",gap:24,marginBottom:20,flexWrap:"wrap"}}>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r}}>Advisories</span>
            <span style={{fontSize:12,color:C.g,opacity:.6}}>Grounded analysis on events affecting manufacturing and industrial operations.</span>
          </div>

          {/* Advisory list */}
          <div style={{display:"flex",flexDirection:"column"}}>
            {[
{date:"Jun 12, 2026", badge:"New", title:"The Bottleneck Has Moved", desc:"Both Middle East corridors blocked at once. U.S. factory activity at a four-year high. $1.77 trillion committed to capacity no one has staffed. Advisory No. 04 on where the constraint moved.", href:"/BSP_Advisory_2026-06-12.pdf", featured:true},
              {date:"Apr 29, 2026", badge:"", title:"Strait of Hormuz: 60 Days In", desc:"What has actually shifted for U.S. manufacturing — and what hasn't. Three structural changes, five operational realities, and what to watch in May.", href:"/BSP_Hormuz_Update_April29.pdf", featured:false},
              {date:"Mar 12, 2026", badge:"", title:"Strait of Hormuz: What's Changed Since March 5", desc:"Brent crossed $100. Iran mined the strait. Goldman is using March 21 as their base-case recovery date. Seven-day update.", href:"/BSP_Hormuz_Update_March12.pdf", featured:false},
              {date:"Mar 5, 2026", badge:"", title:"Strait of Hormuz: A Grounded Assessment", desc:"The original bulletin. Separated verified data from noise, mapped four transmission channels into U.S. manufacturing.", href:"/BSP_Hormuz_Client_Bulletin_March2026.pdf", featured:false},
            ].map((item,i) => (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:24,padding:"14px 0",borderTop:"1px solid rgba(255,255,255,.05)",textDecoration:"none",transition:"background .2s",flexWrap:"wrap"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(226,60,65,.03)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{fontSize:11,color:item.featured?C.r:C.g,fontWeight:600,letterSpacing:".08em",whiteSpace:"nowrap",minWidth:80}}>{item.date}</span>
                <span style={{fontSize:13,fontWeight:700,color:item.featured?C.w:C.gl,flex:"1 1 200px",display:"flex",alignItems:"center",gap:10}}>{item.title}{item.badge && <span style={{fontSize:9,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:"#fff",background:C.r,padding:"2px 8px",flexShrink:0}}>{item.badge}</span>}</span>
                <span style={{fontSize:12,color:C.g,flex:"2 1 300px",display:"none"}} className="adv-desc">{item.desc}</span>
                <span style={{fontSize:11,color:C.r,whiteSpace:"nowrap",fontWeight:600}}>Read →</span>
              </a>
            ))}
          </div>

        </div>
      </section>


      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.08),transparent)"}}/>

      {/* FOOTER with Philly skyline SVG */}
      <footer style={{background:C.nm,padding:"56px 0 24px",borderTop:"1px solid rgba(226,60,65,.08)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <svg width="180" height="36" viewBox="0 0 280 44" fill="none"><rect x="2" y="2" width="9" height="40" rx="1" fill="#fff" opacity=".92"/><rect x="20" y="2" width="22" height="18" rx="1" fill="#e23c41"/><rect x="20" y="24" width="22" height="18" rx="1" fill="#e23c41" opacity=".9"/><line x1="54" y1="6" x2="54" y2="38" stroke="#e23c41" strokeWidth="1.5" opacity=".2"/><text x="64" y="20" fill="#fff" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" letterSpacing="4">BOUND</text><text x="64" y="36" fill="#8a879a" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" letterSpacing="5">SEARCH PARTNERS</text></svg>
            <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>{["Home","About","Services","Results","Contact"].map(l => <span key={l} onClick={() => go(l.toLowerCase())} style={{fontSize:12,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:C.g,cursor:"pointer",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color=C.r} onMouseLeave={e=>e.target.style.color=C.g}>{l}</span>)}
              <a href="./portal.html" style={{fontSize:12,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:C.g,cursor:"pointer",transition:"color .3s",textDecoration:"none"}} onMouseEnter={e=>e.target.style.color=C.r} onMouseLeave={e=>e.target.style.color=C.g}>Client Portal</a></div>
          </div>

          {/* Divider line */}
          <div style={{height:1,background:"rgba(226,60,65,.1)",marginTop:24,marginBottom:24}} />

          {/* Bottom row: copyright left, skyline right */}
          <div id="mfootbot" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div>
              <div style={{fontSize:12,color:C.g,marginBottom:6}}>© {new Date().getFullYear()} Bound Search Partners LLC. All rights reserved.</div>
              <div style={{fontSize:11,color:C.g,opacity:.6,marginBottom:4}}>Made with love in the City of Brotherly Love.</div>
              <div style={{fontSize:10,color:C.g,opacity:.4,marginBottom:8}}>Website designed and built by Bob Cwenar.</div>
              <div style={{fontSize:10,color:C.g,opacity:.35,display:"flex",alignItems:"center",gap:6}}>&#128274; This site does not collect, store, or share any personal data. All form submissions are encrypted and sent directly to Bound Search Partners.</div>
            </div>
            {/* Philly Skyline SVG */}
            <svg id="mskyline" viewBox="0 0 400 160" fill="none" style={{width:220,height:88,flexShrink:0}}>
              {/* Buildings */}
              <rect x="20" y="80" width="18" height="80" fill="#2a2456" opacity=".25"/>
              <rect x="45" y="90" width="14" height="70" fill="#1f1a42" opacity=".2"/>
              <rect x="65" y="75" width="20" height="85" fill="#2a2456" opacity=".25"/>
              <rect x="95" y="45" width="22" height="115" fill="#2a2456" opacity=".3"/>
              <polygon points="95,45 106,20 117,45" fill="#2a2456" opacity=".3"/>
              <rect x="122" y="55" width="18" height="105" fill="#1f1a42" opacity=".25"/>
              <polygon points="122,55 131,32 140,55" fill="#1f1a42" opacity=".25"/>
              <rect x="150" y="15" width="30" height="145" fill="#2a2456" opacity=".35"/>
              <rect x="152" y="10" width="26" height="5" fill="#2a2456" opacity=".35"/>
              <rect x="163" y="0" width="4" height="10" fill="#2a2456" opacity=".35"/>
              <rect x="188" y="25" width="25" height="135" fill="#1f1a42" opacity=".3"/>
              <rect x="225" y="60" width="40" height="100" fill="#2a2456" opacity=".3"/>
              <rect x="237" y="42" width="16" height="18" fill="#2a2456" opacity=".3"/>
              <rect x="242" y="28" width="6" height="14" fill="#2a2456" opacity=".3"/>
              <rect x="275" y="40" width="24" height="120" fill="#2a2456" opacity=".25"/>
              <rect x="308" y="55" width="22" height="105" fill="#1f1a42" opacity=".2"/>
              <rect x="338" y="65" width="28" height="95" fill="#2a2456" opacity=".25"/>
              <rect x="372" y="80" width="18" height="80" fill="#1f1a42" opacity=".2"/>
              {/* Street */}
              <rect x="0" y="158" width="400" height="2" fill="#1f1a42" opacity=".3"/>
              {/* Red beacon on Comcast */}
              <circle cx="165" cy="2" r="3" fill="#e23c41" opacity=".7">
                <animate attributeName="opacity" values=".7;.15;.7" dur="2s" repeatCount="indefinite"/>
              </circle>
              {/* Penn statue glow */}
              <circle cx="245" cy="26" r="4" fill="#e23c41" opacity=".2">
                <animate attributeName="opacity" values=".2;.05;.2" dur="4s" repeatCount="indefinite"/>
              </circle>
              {/* City glow */}
              
              {/* Window lights */}
              <rect x="156" y="50" width="3" height="3" fill="#fff" opacity=".3">
                <animate attributeName="opacity" values=".3;.8;.3" dur="3s" repeatCount="indefinite"/>
              </rect>
              <rect x="168" y="70" width="3" height="3" fill="#fff" opacity=".2">
                <animate attributeName="opacity" values=".2;.7;.2" dur="4.5s" begin="0.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="160" y="90" width="3" height="3" fill="#e23c41" opacity=".2">
                <animate attributeName="opacity" values=".2;.6;.2" dur="5s" begin="1s" repeatCount="indefinite"/>
              </rect>
              <rect x="194" y="55" width="3" height="3" fill="#fff" opacity=".25">
                <animate attributeName="opacity" values=".25;.75;.25" dur="3.5s" begin="0.8s" repeatCount="indefinite"/>
              </rect>
              <rect x="200" y="80" width="3" height="3" fill="#fff" opacity=".2">
                <animate attributeName="opacity" values=".2;.7;.2" dur="6s" begin="2s" repeatCount="indefinite"/>
              </rect>
              <rect x="232" y="80" width="3" height="3" fill="#fff" opacity=".3">
                <animate attributeName="opacity" values=".3;.8;.3" dur="4s" begin="1.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="252" y="95" width="3" height="3" fill="#e23c41" opacity=".2">
                <animate attributeName="opacity" values=".2;.6;.2" dur="5.5s" begin="0.3s" repeatCount="indefinite"/>
              </rect>
              <rect x="280" y="65" width="3" height="3" fill="#fff" opacity=".2">
                <animate attributeName="opacity" values=".2;.75;.2" dur="3s" begin="2.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="290" y="100" width="3" height="3" fill="#fff" opacity=".25">
                <animate attributeName="opacity" values=".25;.7;.25" dur="4.5s" begin="1s" repeatCount="indefinite"/>
              </rect>
              <rect x="315" y="80" width="3" height="3" fill="#fff" opacity=".2">
                <animate attributeName="opacity" values=".2;.65;.2" dur="5s" begin="1.8s" repeatCount="indefinite"/>
              </rect>
              <rect x="345" y="90" width="3" height="3" fill="#e23c41" opacity=".2">
                <animate attributeName="opacity" values=".2;.5;.2" dur="6s" begin="0.7s" repeatCount="indefinite"/>
              </rect>
              <rect x="100" y="80" width="3" height="3" fill="#fff" opacity=".2">
                <animate attributeName="opacity" values=".2;.7;.2" dur="4s" begin="1.2s" repeatCount="indefinite"/>
              </rect>
              {/* Traffic dots */}
              <circle cx="0" cy="157" r="2" fill="#e23c41" opacity=".5">
                <animateMotion dur="7s" repeatCount="indefinite" path="M0,0 L400,0"/>
              </circle>
              <circle cx="400" cy="157" r="2" fill="#fff" opacity=".3">
                <animateMotion dur="9s" repeatCount="indefinite" path="M0,0 L-400,0"/>
              </circle>
              <circle cx="0" cy="157" r="2" fill="#e23c41" opacity=".4">
                <animateMotion dur="11s" begin="3s" repeatCount="indefinite" path="M0,0 L400,0"/>
              </circle>
            </svg>
          </div>
        </div>
      </footer>

      {/* AI CHAT WIDGET */}
      {/* Chat bubble */}
      <div onClick={() => setChatOpen(!chatOpen)} className="orbLauncher" role="button" tabIndex={0} aria-label="Chat with BSP"
        onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setChatOpen(!chatOpen);}}}
        style={{position:"fixed",bottom:24,right:24,height:54,minWidth:54,borderRadius:27,background:"rgba(18,14,42,.72)",border:"1px solid rgba(226,60,65,.35)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",boxShadow:"0 8px 32px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:12,padding:"0 19px",cursor:"pointer",zIndex:10001,transition:"all .45s cubic-bezier(.23,1,.32,1)",overflow:"hidden"}}>
        {!chatOpen && <span className="orbPing" aria-hidden="true"/>}
        {chatOpen
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{flexShrink:0}}><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <span className="orbCore" aria-hidden="true"/>}
        {!chatOpen && <span className="orbLabel">Ask BSP</span>}
      </div>

      {/* Chat panel */}
      <div style={{position:"fixed",bottom:92,right:24,width:"min(390px, calc(100vw - 32px))",maxHeight:"min(560px, 72vh)",borderRadius:20,overflow:"hidden",background:"rgba(12,11,18,.94)",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",border:"1px solid rgba(255,255,255,.09)",boxShadow:"0 24px 64px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)",zIndex:10000,display:"flex",flexDirection:"column",transform:chatOpen?"translateY(0) scale(1)":"translateY(20px) scale(.96)",opacity:chatOpen?1:0,pointerEvents:chatOpen?"auto":"none",transition:"all .35s cubic-bezier(.23,1,.32,1)"}}>
        {/* Header */}
        <div style={{padding:"14px 16px 12px",borderBottom:"1px solid rgba(255,255,255,.08)",position:"relative",textAlign:"center"}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",margin:"0 auto 7px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="18" height="19" viewBox="0 0 130 140" fill="none"><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92"/><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41"/><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9"/></svg>
          </div>
          <div style={{fontSize:12.5,fontWeight:600,letterSpacing:".01em"}}>Bound Search Partners</div>
          <div style={{fontSize:10,color:C.g,marginTop:2}}>AI Assistant</div>
          <span onClick={() => setChatOpen(false)} role="button" aria-label="Close chat" style={{cursor:"pointer",color:C.g,padding:6,lineHeight:0,position:"absolute",top:12,right:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </span>
        </div>

        {/* Messages */}
        <div id="chatScroll" style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12,maxHeight:360}}>
          <div style={{textAlign:"center",fontSize:10,fontWeight:600,color:"#73708a",margin:"2px 0 4px"}}>Today {new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})}</div>
          {chatMsgs.map((m,i) => (
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"80%",padding:"10px 15px",borderRadius:m.role==="user"?"18px 18px 5px 18px":"18px 18px 18px 5px",background:m.role==="user"?"linear-gradient(180deg,#e8474c,#cf3238)":"#26252e",fontSize:13.5,lineHeight:1.5,color:m.role==="user"?"#fff":"#ececf2",boxShadow:m.role==="user"?"0 2px 12px rgba(226,60,65,.25)":"none"}}>
                {m.content}
              </div>
            </div>
          ))}
          {chatLoading && <div style={{display:"flex",justifyContent:"flex-start"}}>
            <div style={{padding:"13px 16px",borderRadius:"18px 18px 18px 5px",background:"#26252e",display:"flex",gap:5,alignItems:"center"}}>
              {[0,1,2].map(i => <span key={i} style={{width:7,height:7,borderRadius:"50%",background:"#9b98ad",animation:`typeDot 1.2s ease ${i*.18}s infinite`}}/>)}
            </div>
          </div>}
        </div>

        {/* Security notice */}
        <div style={{padding:"4px 16px",textAlign:"center"}}>
          <span style={{fontSize:9,color:"#5a577a",opacity:.6}}>&#128274; Conversations are not stored or shared. Your privacy is protected.</span>
        </div>

        {/* Input */}
        <div style={{padding:"10px 14px 14px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{position:"relative",display:"flex",alignItems:"center"}}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendChat()}} placeholder="Message" style={{flex:1,padding:"10px 46px 10px 17px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.14)",borderRadius:21,color:C.w,fontFamily:"inherit",fontSize:14,outline:"none",transition:"border-color .3s"}} onFocus={e=>{e.target.style.borderColor="rgba(226,60,65,.5)"}} onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,.14)"}}/>
            <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} aria-label="Send" style={{position:"absolute",right:5,width:30,height:30,borderRadius:"50%",background:chatInput.trim()?"linear-gradient(180deg,#e8474c,#cf3238)":"rgba(255,255,255,.1)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:chatInput.trim()?"pointer":"default",transition:"all .25s"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={chatInput.trim()?"#fff":"#5d5a72"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
