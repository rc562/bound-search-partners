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

export default function App() {
  const [scrolled,setScrolled] = useState(false);
  const [hovInd,setHovInd] = useState(null);
  const [bondVis,setBondVis] = useState(false);
  const [hovBond,setHovBond] = useState(null);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [cloudWord,setCloudWord] = useState(null);
  const [formSent,setFormSent] = useState(false);
  const [statsVis,setStatsVis] = useState(false);
  const [formSending,setFormSending] = useState(false);
  const [chatOpen,setChatOpen] = useState(false);
  const [chatMsgs,setChatMsgs] = useState([{role:"assistant",content:"Hi — I'm the Bound Search Partners AI assistant. I can answer questions about our services, process, and approach, or help you think through what kind of leadership hire might be right for your organization. How can I help?"}]);
  const [chatInput,setChatInput] = useState("");
  const [chatLoading,setChatLoading] = useState(false);
  const [activeCase,setActiveCase] = useState(0);
  const [activeSrv,setActiveSrv] = useState(null);
  const [hovProc,setHovProc] = useState(null);
  const [navHidden,setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [navOpen,setNavOpen] = useState(false);

  // Typewriter hooks
  const heroTw = useTypewriter("The leaders who move industries start here.", 45, 300);
  const srvTw = useTypewriter("Search. Advisory. Intelligence.", 50, 100);
  const readyTw = useTypewriter("Ready when you are.", 60, 200);
  const heroRef = useRef(null);
  const srvHeaderRef = useRef(null);
  const readyRef = useRef(null);

  // Trigger typewriters on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (e.target === heroRef.current) heroTw.start();
          if (e.target === srvHeaderRef.current) srvTw.start();
          if (e.target === readyRef.current) readyTw.start();
        }
      });
    }, { threshold: 0.3 });
    if (heroRef.current) obs.observe(heroRef.current);
    if (srvHeaderRef.current) obs.observe(srvHeaderRef.current);
    if (readyRef.current) obs.observe(readyRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setNavHidden(y > 200);
      if(y > lastScrollY.current && y > 200) setNavOpen(false);
      lastScrollY.current = y;
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
    const el = document.getElementById("mstats-top");
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting) setStatsVis(true); });
    },{threshold:0.3});
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
    {t:"Executive Search",tag:"Targeting the leaders who aren't looking — and building the case for why they should.",d:"C-suite, VP, and senior director placements across manufacturing, supply chain, and industrial sectors. Every engagement is retained, personally led, and grounded in deep understanding of your business, culture, and competitive landscape.",r:"CEO · COO · CFO · VP Operations · VP Supply Chain · VP Manufacturing",rl:"Typical Roles",del:["Full market mapping & competitive landscape analysis","Proprietary candidate shortlist within 30 days","Structured behavioral & leadership assessments","Offer negotiation, counteroffer strategy & onboarding support"]},
    {t:"Operations & Plant Leadership",tag:"The hires that determine whether strategy becomes execution.",d:"Plant managers, engineering directors, and quality leaders — the operational backbone of any manufacturing organization. We go deep into the industrial talent market to surface leaders with real floor presence, CI discipline, and team-building track records.",r:"Plant Manager · Director Engineering · Quality Director · Director of Operations",rl:"Typical Roles",del:["Targeted outreach to passive operational leaders","Technical competency & leadership style vetting","On-site culture alignment evaluation","90-day onboarding support & guarantee-backed engagement"]},
    {t:"Organizational Advisory",tag:"Clarity before commitment — understanding what your organization actually needs.",d:"Diagnostic-driven consulting for manufacturers navigating growth, transition, or underperformance. Whether you need to understand your leadership bench, plan for succession, benchmark compensation, or map the talent landscape before a search begins — we deliver focused engagements with clear deliverables, not open-ended retainers.",r:"Leadership Audit · Succession Planning · Org Design · Comp Benchmarking · Talent Mapping",rl:"Engagement Types",del:["Leadership bench strength assessment","Succession gap analysis with actionable timeline","Compensation benchmarking vs. regional & national market","Talent availability & density mapping"]},
    {t:"Strategic Advisory & Business Intelligence",tag:"PE-grade strategic intelligence, delivered in weeks — not quarters.",d:"Business model audits, strategic roadmaps, and portfolio diagnostics built for private equity firms, venture-backed companies, and manufacturers navigating inflection points. The depth of a Big Four engagement at a fraction of the cost and timeline — powered by AI-augmented research and real operational expertise.",r:"Business Model Audit · Strategic Roadmap · Market Entry Analysis · Portfolio Diagnostics",rl:"Capabilities",del:["Comprehensive business model audit & assessment","Strategic roadmap with prioritized initiatives","Competitive landscape & market entry analysis","AI-augmented research at institutional depth"]},
  ];

  const proc = [
    {p:"01",t:"AI-Powered Intelligence",d:"Proprietary AI tools map the full universe of qualified candidates — not just those in databases. Market mapping, compensation benchmarking, and competitive intelligence at a scale no human team can replicate.",l:"Machine Scale"},
    {p:"02",t:"Human Curation",d:"Every candidate is personally vetted for technical capability, cultural alignment, and leadership trajectory. No algorithmic shortlists. No resume blasts. Every conversation is substantive.",l:"Human Judgment"},
    {p:"03",t:"Client Partnership",d:"Real-time access to a dedicated consultant — not a portal. The process adapts to each search, each culture, each hire. No playbook is one-size-fits-all.",l:"Adaptive"},
    {p:"04",t:"Placement & Beyond",d:"Offer negotiation, counteroffer strategy, resignation coaching, and 90-day onboarding support. Ends when the hire is performing — not when the offer is signed.",l:"Accountable"},
  ];

  const inds = [
    {n:"Manufacturing",s:"Discrete & Process",r:"VP Operations · Plant Manager · Director of Manufacturing · VP Quality · COO",d:"From lean transformations to greenfield launches, we place the operators who keep the floor running."},
    {n:"Supply Chain & Logistics",s:"End-to-End",r:"VP Supply Chain · Director Procurement · Head of Logistics · CSCO",d:"Tariff shifts, nearshoring, dual-sourcing — today's supply chain leaders need a broader playbook than ever."},
    {n:"Building Products",s:"Construction & Materials",r:"Division President · VP Sales · Director Product Dev",d:"We know the intersection of construction cycles, channel strategy, and product innovation."},
    {n:"Food & Beverage",s:"CPG & Production",r:"VP Manufacturing · Plant Director · Director Food Safety · COO",d:"Safety, compliance, and speed-to-shelf. We find leaders who balance all three."},
    {n:"Chemicals & Packaging",s:"Specialty & Industrial",r:"VP Operations · Director Engineering · EHS Director · CTO",d:"Technical depth meets regulatory rigor. Our network runs deep in specialty chemicals and flexible packaging."},
    {n:"Private Equity",s:"Portfolio & Platform",r:"Portfolio CEO · Operating Partner · CFO PE-Backed · Board Director",d:"We partner with PE firms to place operating leaders who drive EBITDA from day one."},
    {n:"Industrial Equipment",s:"Capital Goods",r:"VP Engineering · Director Product Mgmt · GM Aftermarket",d:"Aftermarket, service, and OEM — we understand what drives margin in capital goods."},
    {n:"Real Estate",s:"Development & Construction",r:"VP Development · Director Construction · Head of Acquisitions",d:"Ground-up development to asset management. We place leaders across the project lifecycle."},
    {n:"Engineering Services",s:"Design & Consulting",r:"VP Engineering · Practice Leader · Chief Engineer",d:"Finding technical leaders who can sell, manage, and deliver complex engineering programs."},
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
    }
  ];

  const go = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

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
    <div style={{background:C.n,color:C.w,fontFamily:"'Aptos','Segoe UI',sans-serif",overflowX:"hidden",opacity:1}}>
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
        @keyframes tickScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes beacon{0%,100%{opacity:.8}50%{opacity:.15}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes dotpulse{0%,100%{opacity:1}50%{opacity:.2}}
        .mburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px}
        @keyframes srvFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .srv-tabs::-webkit-scrollbar{display:none}
        @media(min-width:769px){.srv-tabs{justify-content:center!important}}
        #mcloud{display:none}
        #mstats-bottom{display:none}
        #mlogos{display:none}
        .mnav{display:flex;align-items:center;gap:2.5rem}
        .mticker{display:flex}
        @media(max-width:768px){
          #bspChat{width:calc(100vw - 32px)!important;right:16px!important;bottom:80px!important;max-height:70vh!important}
          .mburger{display:flex!important}
          .mnav{display:none!important}
          .float-logo{display:none!important}
          .mticker{display:none!important}
          #mstats-top{display:none!important}
          #mstats-bottom{display:block!important}
          #mabout{grid-template-columns:1fr!important}
          #mabout>div:last-child{display:none!important}
          #mind{display:none!important}
          .srv-expand{grid-template-columns:1fr!important}
          #mcloud{display:flex!important}
          #mlogos{display:grid!important}
          .logo-scroll-wrap{display:none!important}
          #heroVid{object-fit:cover!important;object-position:center center!important}

          #mfounder{grid-template-columns:1fr!important}
          #mcontact{grid-template-columns:1fr!important}
          #mfr1,#mfr2{grid-template-columns:1fr!important}
          #mfootbot{flex-direction:column-reverse!important;align-items:center!important;text-align:center!important}
                    #mherobtns{flex-direction:column!important;align-items:flex-start!important}
          #mcasedetail{grid-template-columns:1fr!important}
          #mretained{grid-template-columns:1fr!important}
        }
        @media(max-width:480px){
          #heroVid{object-fit:cover!important;object-position:center center!important}
          #mstats-top{display:none!important}
          #mstats-bottom{display:block!important}
        }

      `}</style>

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
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <video id="heroVid" autoPlay muted loop playsInline onCanPlay={e=>{e.target.style.opacity=1}} style={{position:"absolute",inset:0,objectFit:"cover",width:"100%",height:"100%",opacity:0,transition:"opacity 1.2s ease"}}><source src="./hero.mp4" type="video/mp4"/></video>
        </div>
        {/* Dark overlay */}
        <div style={{position:"absolute",inset:0,zIndex:1,background:`linear-gradient(180deg,rgba(14,11,36,.4) 0%,rgba(14,11,36,.15) 30%,rgba(14,11,36,.7) 75%,${C.n} 100%),linear-gradient(90deg,rgba(14,11,36,.8) 0%,transparent 55%)`}} />
        {/* Hero content */}
        <div style={{position:"relative",zIndex:2,maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{maxWidth:860,opacity:0,animation:"fu .7s cubic-bezier(.23,1,.32,1) .2s forwards",transform:"translateY(20px)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:32}}><span style={{width:48,height:2,background:C.r,display:"block"}}/><span style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r}}>Retained Executive Search · U.S. Manufacturing & Industrial</span></div>
            <div style={{marginBottom:24,overflow:"hidden"}}>
              <h1 ref={heroRef} style={{fontSize:"clamp(3rem,8vw,6.5rem)",fontWeight:700,lineHeight:.92,letterSpacing:"-.03em",position:"relative",margin:0}}>
                <span style={{visibility:"hidden",position:"absolute",left:0,top:0,right:0}} aria-hidden="true">The leaders who move industries start here.</span>
                <span style={{display:"block"}}>
                {(() => {
                  const full = "The leaders who move industries start here.";
                  const len = heroTw.displayed.length;
                  return full.split("").map((ch, i) => {
                    const visible = i < len;
                    const inMove = i >= 16 && i < 20;
                    return <React.Fragment key={i}>
                      <span style={{
                        color: visible ? (inMove ? C.r : C.w) : "transparent",
                        fontStyle: inMove ? "italic" : "normal",
                      }}>{ch}</span>
                      {i === len - 1 && heroTw.started && <span style={{color:C.r,animation:"blink .8s step-end infinite",fontWeight:300,position:"absolute"}}>|</span>}
                    </React.Fragment>;
                  });
                })()}
                </span>
              </h1>
            </div>
            <p style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",lineHeight:1.5,color:C.gl,maxWidth:600,marginBottom:40}}>Bound Search Partners is a retained executive search firm specializing in manufacturing, industrial, and supply chain leadership.</p>
            <div id="mherobtns" style={{display:"flex",gap:24,flexWrap:"wrap"}}>
              <span onClick={() => go("contact")} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 36px",background:C.r,color:C.w,fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="#c8333a";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(226,60,65,.3)"}} onMouseLeave={e=>{e.currentTarget.style.background=C.r;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>Start a Conversation →</span>
              <span onClick={() => go("services")} style={{display:"inline-flex",padding:"16px 0",color:C.gl,fontSize:13,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",borderBottom:"1px solid rgba(255,255,255,.12)",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.target.style.color=C.w;e.target.style.borderBottomColor=C.r}} onMouseLeave={e=>{e.target.style.color=C.gl;e.target.style.borderBottomColor="rgba(255,255,255,.12)"}}>Explore Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div id="mstats-top" style={{background:C.nm,borderTop:"1px solid rgba(226,60,65,.15)",borderBottom:"1px solid rgba(226,60,65,.15)"}}>
        <div id="mstats" style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["200+","Executive Placements Led"],["92%","Year-One Retention Rate"],["10+","Years in Retained Search"],["50+","Client Organizations Served"]].map(([n,l],i) => (
            <div key={i} style={{padding:"40px 24px",textAlign:"center",borderRight:i<3?"1px solid rgba(226,60,65,.12)":"none",opacity:statsVis?1:0,transform:statsVis?"translateY(0)":"translateY(16px)",transition:`all .5s cubic-bezier(.23,1,.32,1) ${i*.1}s`}}>
              <div style={{fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,color:C.r,lineHeight:1,marginBottom:8}}>{n}</div>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWS TICKER */}
      <div className="mticker" style={{alignItems:"stretch",background:C.nm,borderBottom:"1px solid rgba(226,60,65,.08)",overflow:"hidden",height:42}}>
        <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:8,padding:"0 20px",background:C.n,borderRight:"1px solid rgba(226,60,65,.12)",fontSize:10,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:C.r,whiteSpace:"nowrap"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:C.r,animation:"beacon 2s ease infinite"}}></span>
          Industry Intel
        </div>
        <div style={{flex:1,overflow:"hidden",display:"flex",alignItems:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",whiteSpace:"nowrap",animation:"tickScroll 45s linear infinite"}} onMouseEnter={e=>e.currentTarget.style.animationPlayState="paused"} onMouseLeave={e=>e.currentTarget.style.animationPlayState="running"}>
            {[...Array(2)].map((_,rep) => [
              ["US factory output posts biggest gain in nearly a year","Bloomberg","https://www.bloomberg.com/news/articles/2026-02-18/us-industrial-production"],
              ["Manufacturing ISM expands at fastest pace since 2022","Bloomberg","https://www.bloomberg.com/news/articles/2026-02-02/us-manufacturing-activity"],
              ["Philadelphia Fed manufacturing index rises to 16.3","Advisor Perspectives","https://www.advisorperspectives.com/dshort/updates/2026/02/19/philadelphia-fed-manufacturing-index"],
              ["2026 may be a turnaround year for manufacturing jobs","Marketplace","https://www.marketplace.org/story/2026/02/16/will-there-be-more-manufacturing-jobs-in-2026"],
              ["Core durable goods orders surge amid headwinds","Financial Content","https://markets.financialcontent.com/stocks/article/marketminute-2026-2-18"],
              ["Reshoring reshapes supply chain strategy for 2026","WSI","https://www.wsinc.com/retail-supply-chain-moves/"],
              ["Can reshoring deliver sustainability benefits?","Mfg Dive","https://www.manufacturingdive.com/news/can-reshoring-deliver-manufacturing-sustainability-benefits/811430/"],
              ["2026 outlook: AI and reshoring as key trends","Deloitte","https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook.html"],
            ].map(([h,s,u],i) => (
              <span key={`${rep}-${i}`} style={{padding:"0 40px",fontSize:12,color:C.gl,display:"inline-flex",alignItems:"center",gap:12}}>
                <span style={{color:C.r,fontSize:7,opacity:.5}}>◆</span><a href={u} target="_blank" rel="noopener noreferrer" style={{color:C.gl,textDecoration:"none"}}>{h}</a><span style={{color:C.g,fontSize:10,opacity:.5}}>{s}</span>
              </span>
            ))).flat()}
          </div>
        </div>
      </div>

      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.15),transparent)"}}/>

      {/* ABOUT */}
      <section id="about" style={{padding:"clamp(6rem,12vw,10rem) 0",background:C.nm}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>

          <div id="mabout" style={{display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:"clamp(3rem,8vw,8rem)",alignItems:"center"}}>
            
            {/* Text */}
            <div>
              <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>The Firm</div>
              <h2 style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:32}}>Executive search defined by <span style={{color:C.r,fontStyle:"italic"}}>depth</span>, not volume.</h2>
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
                    <div style={{width:hovProc===i?40:36,height:hovProc===i?40:36,borderRadius:"50%",border:`1.5px solid ${hovProc===i?C.r:'rgba(226,60,65,.2)'}`,background:hovProc===i?"rgba(226,60,65,.1)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:hovProc===i?C.r:C.g,flexShrink:0,transition:"all .3s cubic-bezier(.23,1,.32,1)",boxShadow:hovProc===i?"0 0 20px rgba(226,60,65,.15)":"none"}}>{step.p}</div>
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


      {/* SERVICES */}
      <section id="services" style={{background:C.n,padding:"clamp(5rem,10vw,9rem) 0",overflow:"hidden"}}>
        <div style={{maxWidth:960,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          {/* Section label */}
          <div ref={srvHeaderRef} style={{textAlign:"center",marginBottom:"clamp(3rem,6vw,5rem)"}}>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Services</div>
            <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em"}}>
              {(() => {
                const full = "Search. Advisory. Intelligence.";
                const len = srvTw.displayed.length;
                return full.split("").map((ch, i) => (
                  <React.Fragment key={i}>
                    <span style={{color: i < len ? C.w : "transparent"}}>{ch}</span>
                    {i === len - 1 && srvTw.started && !srvTw.done && <span style={{color:C.r,animation:"blink .6s step-end infinite",fontWeight:300,position:"absolute"}}> |</span>}
                  </React.Fragment>
                ));
              })()}
            </h2>
          </div>

          {/* Accordion */}
          <div>
            {srvs.map((s,i)=>{
              const isOpen = activeSrv===i;
              return (
                <div key={i} style={{borderTop:i===0?"1px solid rgba(226,60,65,.1)":"none",borderBottom:"1px solid rgba(226,60,65,.1)"}}>
                  {/* Row trigger */}
                  <div
                    onClick={()=>setActiveSrv(isOpen?null:i)}
                    style={{
                      display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"22px 0",cursor:"pointer",
                      transition:"padding .3s ease",
                    }}
                    onMouseEnter={e=>{if(!isOpen)e.currentTarget.querySelector('.srv-title').style.color=C.w}}
                    onMouseLeave={e=>{if(!isOpen)e.currentTarget.querySelector('.srv-title').style.color=C.gl}}
                  >
                    <h3 className="srv-title" style={{
                      fontSize:"clamp(1.1rem,2vw,1.35rem)",fontWeight:600,
                      color:isOpen?C.w:C.gl,
                      letterSpacing:"-.01em",lineHeight:1.3,
                      transition:"color .2s",
                    }}>{s.t}</h3>
                    <div style={{
                      width:36,height:36,
                      border:isOpen?`1px solid ${C.w}`:"1px solid rgba(255,255,255,.2)",
                      background:isOpen?"rgba(255,255,255,.1)":"transparent",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:C.w,
                      fontSize:22,fontWeight:300,
                      transition:"transform .3s cubic-bezier(.23,1,.32,1), background .2s, border-color .2s",
                      transform:isOpen?"rotate(45deg)":"rotate(0deg)",
                      flexShrink:0,marginLeft:16,
                    }}>+</div>
                  </div>

                  {/* Expandable content */}
                  <div style={{
                    maxHeight:isOpen?600:0,
                    opacity:isOpen?1:0,
                    overflow:"hidden",
                    transition:"max-height .4s cubic-bezier(.23,1,.32,1), opacity .3s ease",
                  }}>
                    <div style={{paddingBottom:32}}>
                      {/* Tagline + description */}
                      <p style={{fontSize:13,fontStyle:"italic",color:C.r,opacity:.5,lineHeight:1.5,marginBottom:12}}>{s.tag}</p>
                      <p style={{fontSize:15,lineHeight:1.85,color:"#d4d1e0",maxWidth:700,marginBottom:24}}>{s.d}</p>

                      {/* Two columns: deliverables + roles */}
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px 48px",alignItems:"start"}} className="srv-expand">
                        <div>
                          <div style={{fontSize:9,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.r,marginBottom:12}}>Deliverables</div>
                          {s.del.map((d,di)=>(
                            <div key={di} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"5px 0"}}>
                              <span style={{color:C.r,fontSize:8,marginTop:5,flexShrink:0}}>&#9656;</span>
                              <span style={{fontSize:13,color:"#d4d1e0",lineHeight:1.55}}>{d}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{fontSize:9,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.r,marginBottom:12}}>{s.rl}</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                            {s.r.split(" · ").map((role,ri)=>(
                              <span key={ri} style={{padding:"6px 14px",border:"1px solid rgba(226,60,65,.2)",color:"#d4d1e0",fontSize:11,fontWeight:500,letterSpacing:".03em",transition:"all .25s"}}
                                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.r;e.currentTarget.style.color=C.w;e.currentTarget.style.background="rgba(226,60,65,.06)"}}
                                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(226,60,65,.2)";e.currentTarget.style.color="#d4d1e0";e.currentTarget.style.background="transparent"}}
                              >{role}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{textAlign:"center",marginTop:"clamp(3rem,6vw,5rem)"}}>
            <span onClick={()=>go("contact")} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"14px 36px",background:"transparent",border:`2px solid ${C.r}`,color:C.w,fontSize:12,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.r;e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.transform="translateY(0)"}}
            >Start a Conversation →</span>
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.1),transparent)"}}/>

      {/* CASE STUDIES */}
      <section id="results" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.n}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Placement Outcomes</div>
          <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",maxWidth:700,marginBottom:56}}>Real searches.<br/>Measurable results.</h2>
          
          {/* Case selector tabs */}
          <div style={{display:"flex",gap:2,marginBottom:2,flexWrap:"wrap"}}>
            {cases.map((c,i) => (
              <button key={i} onClick={() => setActiveCase(i)} style={{flex:activeCase===i?"2.5 1 0%":"1 1 0%",padding:"16px 20px",background:activeCase===i?"rgba(226,60,65,.08)":"rgba(226,60,65,.02)",border:"none",borderBottom:activeCase===i?`3px solid ${C.r}`:"3px solid transparent",color:activeCase===i?C.w:C.g,fontFamily:"inherit",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",transition:"all .4s cubic-bezier(.23,1,.32,1)",textAlign:"left",minWidth:0,overflow:"hidden"}}>
                <span style={{opacity:.2,fontSize:20,fontWeight:700,color:C.r,display:"block",marginBottom:2}}>{c.id}</span>
                <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"}}>{activeCase===i?c.role:c.ind}</span>
              </button>
            ))}
          </div>

          {/* Active case detail */}
          <div style={{padding:"clamp(2rem,4vw,3.5rem)",background:"rgba(226,60,65,.03)",borderLeft:`4px solid ${C.r}`}}>
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

      {/* INDUSTRIES */}
      <section id="industries" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm,position:"relative"}}>
        <div style={{position:"absolute",inset:0,opacity:.03,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(226,60,65,.4) 1px, transparent 0)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Industries</div>
          <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",maxWidth:600,marginBottom:56}}>Nine sectors.<br/>Deep expertise.</h2>
          <div id="mind" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0}}>
            {inds.map((ind,i) => (
              <div key={i} onMouseEnter={() => setHovInd(i)} onMouseLeave={() => setHovInd(null)}
                style={{padding:"clamp(1.5rem,2.5vw,2.5rem)",borderTop:"1px solid rgba(226,60,65,.08)",borderRight:i%3!==2?"1px solid rgba(226,60,65,.08)":"none",cursor:"default",transition:"background .3s",background:hovInd===i?"rgba(226,60,65,.04)":"transparent",position:"relative",overflow:"hidden",minHeight:160}}>
                <div style={{position:"absolute",top:0,left:0,width:hovInd===i?"100%":"0%",height:2,background:C.r,transition:"width .4s cubic-bezier(.23,1,.32,1)"}}/>
                <h4 style={{fontSize:"clamp(1.25rem,2vw,1.75rem)",fontWeight:700,marginBottom:6,color:hovInd===i?C.w:C.gl,transition:"color .3s"}}>{ind.n}</h4>
                <div style={{fontSize:12,color:C.g,letterSpacing:".05em",marginBottom:8}}>{ind.s}</div>
                <div style={{fontSize:13,color:C.gl,lineHeight:1.8,opacity:hovInd===i?.7:0,transform:hovInd===i?"translateY(0)":"translateY(8px)",transition:"all .4s cubic-bezier(.23,1,.32,1)"}}>{ind.d}<div style={{marginTop:8,fontSize:11,fontWeight:700,color:C.r,letterSpacing:".1em",opacity:.6}}>{ind.r}</div></div>
              </div>
            ))}
          </div>
          {/* Mobile accordion */}
          <div id="mcloud" style={{flexDirection:"column",gap:0}}>
            {inds.map((ind,i) => {
              const isOpen = cloudWord === i;
              return (
                <div key={i} onClick={() => setCloudWord(isOpen ? null : i)}
                  style={{borderBottom:"1px solid rgba(226,60,65,.08)",cursor:"pointer",transition:"all .3s"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:3,height:20,background:isOpen?C.r:"rgba(226,60,65,.2)",borderRadius:2,transition:"all .3s"}}/>
                      <span style={{fontSize:16,fontWeight:isOpen?700:600,color:isOpen?C.w:C.gl,transition:"all .3s"}}>{ind.n}</span>
                    </div>
                    <span style={{fontSize:10,color:isOpen?C.r:C.g,transition:"all .3s",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                  </div>
                  <div style={{maxHeight:isOpen?120:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.23,1,.32,1)",paddingLeft:15}}>
                    <div style={{fontSize:13,color:C.gl,lineHeight:1.7,marginBottom:8}}>{ind.d}</div>
                    <div style={{fontSize:11,fontWeight:600,color:C.r,letterSpacing:1,opacity:.7,paddingBottom:14}}>{ind.r}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gradient transition */}
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(226,60,65,.1),transparent)"}}/>

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
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>The Founder</div>
            <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:24}}>Bob Cwenar</h2>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>Bob Cwenar brings over a decade of experience in retained executive search, specializing in manufacturing, industrial, and supply chain leadership. A graduate of Drexel University, he began his career at Armstrong Franklin, helping grow the firm from a four-person team into a recognized name in the sector.</p>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>Following Armstrong Franklin's merger with GattiHR and acquisition by Kingsley Gate Partners, Bob led national-scale search engagements for clients ranging from founder-led startups to enterprises exceeding $10 billion in revenue — experience that shaped his understanding of what great search looks like at every level.</p>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>He founded Bound Search Partners to offer clients a more direct, senior-led model — one where every engagement is personally managed from strategy through onboarding. It's the kind of search experience that's hard to find at larger firms, and it's the standard here.</p>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl}}>200+ placements. 92% retained at year one. That's the track record behind every search Bound takes on.</p>
          </div>
          <div><img src="./headshot.jpg" alt="Bob Cwenar" style={{width:"100%",maxWidth:420,marginLeft:"auto",borderRadius:2,display:"block"}}/></div>
        </div>
      </section>

      {/* MOBILE STATS - after bio */}
      <div id="mstats-bottom" style={{background:C.nm,borderTop:"1px solid rgba(226,60,65,.15)",borderBottom:"1px solid rgba(226,60,65,.15)",width:"100%"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",width:"100%"}}>
          {[["200+","Executive Placements Led"],["92%","Year-One Retention Rate"],["10+","Years in Retained Search"],["50+","Client Organizations Served"]].map(([n,l],i) => (
            <div key={i} style={{padding:"24px 16px",textAlign:"center",borderRight:i%2===0?"1px solid rgba(226,60,65,.12)":"none",borderBottom:i<2?"1px solid rgba(226,60,65,.12)":"none"}}>
              <div style={{fontSize:28,fontWeight:700,color:C.r,lineHeight:1,marginBottom:6}}>{n}</div>
              <div style={{fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm}}>
        <div id="mcontact" style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(3rem,5vw,5rem)",alignItems:"start"}}>
          <div>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>Contact</div>
            <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:24}}>Start a <span style={{color:C.r,fontStyle:"italic"}}>conversation</span>.</h2>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:32}}>Every engagement begins with a candid discussion about the role and whether Bound Search Partners is the right fit.</p>
            {[["Phone","(267) 265-1792","tel:+12672651792"],["Email","bob@boundsearch.com","mailto:bob@boundsearch.com"],["Headquarters","Philadelphia, PA — Serving clients nationwide",null]].map(([label,val,href],i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"16px 0",borderTop:"1px solid rgba(255,255,255,.05)"}}>
                <div style={{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(226,60,65,.06)",color:C.r,flexShrink:0}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{i===0?<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>:i===1?<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></>:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>}</svg>
                </div>
                <div><strong style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:3}}>{label}</strong>{href?<a href={href} style={{color:C.w,textDecoration:"none"}}>{val}</a>:<span>{val}</span>}</div>
              </div>
            ))}
            <div style={{marginTop:24,padding:20,border:"1px solid rgba(226,60,65,.12)",background:"rgba(226,60,65,.02)"}}>
              <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:10}}>Typical Timeline</div>
              <p style={{fontSize:14,color:C.gl,lineHeight:1.8}}><strong style={{color:C.w}}>Within 24 hours</strong> — Direct response from the founder.<br/><strong style={{color:C.w}}>Within 48 hours</strong> — Discovery call.<br/><strong style={{color:C.w}}>Within one week</strong> — Terms finalized. Research begins.</p>
            </div>
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
              <form name="contact" method="POST" data-netlify="true" onSubmit={async(e)=>{e.preventDefault();setFormSending(true);try{const fd=new FormData(e.target);fd.append("form-name","contact");await fetch("/",{method:"POST",body:fd});setFormSent(true)}catch{alert("Something went wrong. Please email bob@boundsearch.com directly.")}setFormSending(false)}}>
                <input type="hidden" name="form-name" value="contact"/>
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
      <section style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.n,textAlign:"center"}}>
        <div style={{maxWidth:800,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>Ready to begin?</div>
          <h2 style={{fontSize:"clamp(3rem,8vw,6.5rem)",fontWeight:700,lineHeight:.92,letterSpacing:"-.03em",marginBottom:24}}>The right hire<br/>changes <span style={{color:C.r,fontStyle:"italic"}}>everything</span>.</h2>
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
          <span onClick={() => go("contact")} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 36px",background:C.r,color:C.w,fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="#c8333a";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(226,60,65,.3)"}} onMouseLeave={e=>{e.currentTarget.style.background=C.r;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>Start a Conversation →</span>
        </div>
      </section>



      {/* FOOTER with Philly skyline SVG */}
      <footer style={{background:C.nm,padding:"56px 0 24px",borderTop:"1px solid rgba(226,60,65,.08)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <svg width="180" height="36" viewBox="0 0 280 44" fill="none"><rect x="2" y="2" width="9" height="40" rx="1" fill="#fff" opacity=".92"/><rect x="20" y="2" width="22" height="18" rx="1" fill="#e23c41"/><rect x="20" y="24" width="22" height="18" rx="1" fill="#e23c41" opacity=".9"/><line x1="54" y1="6" x2="54" y2="38" stroke="#e23c41" strokeWidth="1.5" opacity=".2"/><text x="64" y="20" fill="#fff" fontFamily="Aptos,sans-serif" fontSize="18" fontWeight="800" letterSpacing="4">BOUND</text><text x="64" y="36" fill="#8a879a" fontFamily="Aptos,sans-serif" fontSize="8" fontWeight="600" letterSpacing="5">SEARCH PARTNERS</text></svg>
              <div style={{width:1,height:24,background:"rgba(255,255,255,.1)"}}/>
              <a href="https://www.getjourneyman.com" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",opacity:.5,transition:"opacity .3s",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.opacity=.85} onMouseLeave={e=>e.currentTarget.style.opacity=.5}>
                <img src="./journeyman-logo-white-transparent.png" alt="Journeyman" style={{height:36,width:"auto"}}/>
              </a>
            </div>
            <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>{["Home","About","Services","Results","Contact"].map(l => <span key={l} onClick={() => go(l.toLowerCase())} style={{fontSize:12,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:C.g,cursor:"pointer",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color=C.r} onMouseLeave={e=>e.target.style.color=C.g}>{l}</span>)}</div>
          </div>

          {/* Divider line */}
          <div style={{height:1,background:"rgba(226,60,65,.1)",marginTop:24,marginBottom:24}} />

          {/* Bottom row: copyright left, skyline right */}
          <div id="mfootbot" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div>
              <div style={{fontSize:12,color:C.g,marginBottom:6}}>© 2025 Bound Search Partners LLC. All rights reserved.</div>
              <div style={{fontSize:11,color:C.g,opacity:.6,marginBottom:4}}>Made with love in the City of Brotherly Love.</div>
              <div style={{fontSize:10,color:C.g,opacity:.4}}>Website designed and built by Bob Cwenar & Claude by Anthropic.</div>
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
      <div onClick={() => setChatOpen(!chatOpen)} style={{position:"fixed",bottom:24,right:24,width:56,height:56,borderRadius:"50%",background:chatOpen?"#c8333a":C.r,boxShadow:"0 4px 20px rgba(226,60,65,.4)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10001,transition:"all .3s"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.08)";e.currentTarget.style.boxShadow="0 6px 28px rgba(226,60,65,.5)"}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 20px rgba(226,60,65,.4)"}}>
        {chatOpen
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
      </div>
      {/* Notification dot */}
      {!chatOpen && chatMsgs.length===1 && <div style={{position:"fixed",bottom:68,right:24,width:12,height:12,borderRadius:"50%",background:"#fff",border:"2px solid "+C.r,zIndex:10002,animation:"beacon 2s ease infinite",pointerEvents:"none"}}/>}

      {/* Chat panel */}
      <div style={{position:"fixed",bottom:92,right:24,width:380,maxHeight:520,borderRadius:12,overflow:"hidden",background:C.n,border:"1px solid rgba(226,60,65,.15)",boxShadow:"0 12px 48px rgba(0,0,0,.5)",zIndex:10000,display:"flex",flexDirection:"column",transform:chatOpen?"translateY(0) scale(1)":"translateY(16px) scale(.95)",opacity:chatOpen?1:0,pointerEvents:chatOpen?"auto":"none",transition:"all .3s cubic-bezier(.23,1,.32,1)"}}>
        {/* Header */}
        <div style={{padding:"16px 20px",background:C.nm,borderBottom:"1px solid rgba(226,60,65,.1)",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(226,60,65,.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="14" height="15" viewBox="0 0 130 140" fill="none"><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92"/><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41"/><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9"/></svg>
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:700}}>Bound Search Partners</div>
            <div style={{fontSize:10,color:C.g,letterSpacing:1}}>AI Assistant</div>
          </div>
        </div>

        {/* Messages */}
        <div id="chatScroll" style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12,maxHeight:360}}>
          {chatMsgs.map((m,i) => (
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"85%",padding:"10px 14px",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",background:m.role==="user"?C.r:"rgba(226,60,65,.06)",fontSize:13,lineHeight:1.6,color:m.role==="user"?"#fff":C.gl}}>
                {m.content}
              </div>
            </div>
          ))}
          {chatLoading && <div style={{display:"flex",gap:4,padding:"8px 0"}}>
            {[0,1,2].map(i => <div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.r,opacity:.4,animation:`f1 1s ease ${i*.15}s infinite`}}/>)}
          </div>}
        </div>

        {/* Input */}
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(226,60,65,.08)",display:"flex",gap:8}}>
          <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendChat()}} placeholder="Ask about our services..." style={{flex:1,padding:"10px 14px",background:C.nm,border:"1px solid rgba(226,60,65,.08)",borderRadius:8,color:C.w,fontFamily:"inherit",fontSize:13,outline:"none",transition:"border-color .3s"}} onFocus={e=>e.target.style.borderColor="rgba(226,60,65,.3)"} onBlur={e=>e.target.style.borderColor="rgba(226,60,65,.08)"}/>
          <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} style={{padding:"10px 14px",background:chatInput.trim()?C.r:"rgba(226,60,65,.2)",border:"none",borderRadius:8,cursor:chatInput.trim()?"pointer":"default",transition:"all .2s"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
