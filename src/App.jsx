import { useState, useEffect } from "react";

const C = {n:"#0e0b24",nm:"#181338",nl:"#2a2456",r:"#e23c41",w:"#fff",g:"#8a879a",gl:"#c5c3ce"};

export default function App() {
  const [loaded,setLoaded] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const [activeSrv,setActiveSrv] = useState(0);
  const [procOpen,setProcOpen] = useState(false);
  const [hovInd,setHovInd] = useState(null);
  const [bondVis,setBondVis] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 3500);
    const h = () => setScrolled(window.scrollY > 60);
    let showV1 = true;
    const vidInterval = setInterval(() => {
      const v1 = document.getElementById("vid1");
      const v2 = document.getElementById("vid2");
      if (v1 && v2) { showV1 = !showV1; v1.style.opacity = showV1 ? "1" : "0"; v1.style.transition = "opacity 1.5s ease"; v2.style.opacity = showV1 ? "0" : "1"; }
    }, 10000);
    window.addEventListener("scroll",h);
    return () => window.removeEventListener("scroll",h);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      const el = document.getElementById("bond");
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            setBondVis(true);
            obs.disconnect();
          }
        });
      },{threshold:0.15,rootMargin:"0px 0px -50px 0px"});
      obs.observe(el);
      return () => obs.disconnect();
    }, 500);
    return () => clearTimeout(timer);
  }, [loaded]);

  const srvs = [
    {n:"01",t:"Retained Executive Search",s:"Retained Search",d:"C-suite, VP, and senior director placements across manufacturing, supply chain, and industrial sectors. Targeting leaders who aren't looking — and convincing them to listen.",r:"CEO · COO · CFO · VP Operations · VP Supply Chain"},
    {n:"02",t:"Operational Leadership",s:"Operations",d:"Plant managers, engineering directors, quality leaders — the operational backbone that determines whether strategy becomes execution.",r:"Plant Manager · Director Engineering · Quality Director"},
    {n:"03",t:"Leadership Assessment",s:"Assessment",d:"Objective evaluation of internal talent against external benchmarks. Data-driven assessments, not confirmation of assumptions already held.",r:"Succession Planning · Org Design · Talent Audit"},
    {n:"04",t:"Market Intelligence",s:"Market Intel",d:"Compensation analysis, competitive talent mapping, and availability studies. A clear-eyed view of the landscape before a search begins.",r:"Comp Benchmarking · Talent Mapping · Availability"},
    {n:"05",t:"Confidential Searches",s:"Confidential",d:"Replacing a sitting executive. Entering a new market. Building leadership around an acquisition. When discretion is not optional.",r:"CEO Replacement · M&A Integration · Board Advisory"},
  ];

  const proc = [
    {p:"01",t:"AI-Powered Intelligence",d:"Proprietary AI tools map the full universe of qualified candidates — not just those in databases. Market mapping, compensation benchmarking, and competitive intelligence at a scale no human team can replicate.",l:"Machine Scale"},
    {p:"02",t:"Human Curation",d:"Every candidate is personally vetted for technical capability, cultural alignment, and leadership trajectory. No algorithmic shortlists. No resume blasts. Every conversation is substantive.",l:"Human Judgment"},
    {p:"03",t:"Client Partnership",d:"Real-time access to a dedicated consultant — not a portal. The process adapts to each search, each culture, each hire. No playbook is one-size-fits-all.",l:"Adaptive"},
    {p:"04",t:"Placement & Beyond",d:"Offer negotiation, counteroffer strategy, resignation coaching, and 90-day onboarding support. Ends when the hire is performing — not when the offer is signed.",l:"Accountable"},
  ];

  const inds = [
    {n:"Manufacturing",s:"Discrete & Process",r:"VP Operations · Plant Manager · Director of Manufacturing · VP Quality · COO"},
    {n:"Supply Chain & Logistics",s:"End-to-End",r:"VP Supply Chain · Director Procurement · Head of Logistics · CSCO"},
    {n:"Building Products",s:"Construction & Materials",r:"Division President · VP Sales · Director Product Dev"},
    {n:"Food & Beverage",s:"CPG & Production",r:"VP Manufacturing · Plant Director · Director Food Safety · COO"},
    {n:"Chemicals & Packaging",s:"Specialty & Industrial",r:"VP Operations · Director Engineering · EHS Director · CTO"},
    {n:"Private Equity",s:"Portfolio & Platform",r:"Portfolio CEO · Operating Partner · CFO PE-Backed · Board Director"},
    {n:"Industrial Equipment",s:"Capital Goods",r:"VP Engineering · Director Product Mgmt · GM Aftermarket"},
    {n:"Real Estate",s:"Development & Construction",r:"VP Development · Director Construction · Head of Acquisitions"},
    {n:"Engineering Services",s:"Design & Consulting",r:"VP Engineering · Practice Leader · Chief Engineer"},
  ];

  // Fallback: trigger bond animation on scroll if IntersectionObserver misses
  useEffect(() => {
    if (!loaded || bondVis) return;
    const checkBond = () => {
      const el = document.getElementById("bond");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setBondVis(true);
        window.removeEventListener("scroll", checkBond);
      }
    };
    window.addEventListener("scroll", checkBond);
    return () => window.removeEventListener("scroll", checkBond);
  }, [loaded, bondVis]);

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

  if (!loaded) return (
    <div style={{position:"fixed",inset:0,background:C.n,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999}}>
      <div style={{position:"relative",width:160,height:170}}>
        <div style={{position:"absolute",left:10,top:8,width:36,height:154,background:C.w,borderRadius:3,opacity:0,animation:"sR .8s cubic-bezier(.23,1,.32,1) .3s forwards"}}/>
        <div style={{position:"absolute",right:10,top:8,width:86,height:70,background:C.r,borderRadius:3,opacity:0,animation:"sL .8s cubic-bezier(.23,1,.32,1) .5s forwards"}}/>
        <div style={{position:"absolute",right:10,bottom:8,width:86,height:70,background:C.r,borderRadius:3,opacity:0,animation:"sL .8s cubic-bezier(.23,1,.32,1) .7s forwards"}}/>
      </div>
      <div style={{marginTop:32,fontSize:10,fontWeight:700,letterSpacing:".4em",textTransform:"uppercase",color:C.g,opacity:0,animation:"fi .5s ease 1.8s forwards"}}>Bound Search Partners</div>
      <div style={{width:100,height:2,background:"rgba(226,60,65,.15)",marginTop:24,overflow:"hidden",opacity:0,animation:"fi .3s ease 2s forwards"}}><div style={{width:"40%",height:"100%",background:C.r,animation:"loadB .8s ease 2.1s forwards"}}/></div>
    </div>
  );

  return (
    <div style={{background:C.n,color:C.w,fontFamily:"'Aptos','Segoe UI',sans-serif",overflowX:"hidden",animation:"siteIn .8s ease forwards",opacity:0}}>
      <style>{`
        @keyframes siteIn{to{opacity:1}}@keyframes sR{to{opacity:.92;transform:translateX(0)}}@keyframes sL{to{opacity:1;transform:translateX(0)}}
        @keyframes fi{to{opacity:1}}@keyframes fu{to{opacity:1;transform:translateY(0)}}@keyframes loadB{to{width:100%}}
        @keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes sp{to{transform:rotate(360deg)}}
        @keyframes ep{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(2.5);opacity:0}}
        
        @keyframes tickScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes logoScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes beacon{0%,100%{opacity:.8}50%{opacity:.15}}
        @keyframes heroShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes heroPulse{0%,100%{opacity:.03}50%{opacity:.08}}
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        ::selection{background:#e23c4144;color:#fff}input:focus,textarea:focus{border-color:#e23c41!important;outline:none}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,width:"100%",zIndex:1000,padding:scrolled?"12px 0":"20px 0",background:scrolled?"rgba(14,11,36,.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(226,60,65,.12)":"none",transition:"all .5s cubic-bezier(.23,1,.32,1)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div onClick={() => go("home")} style={{cursor:"pointer"}}>
            <svg width="36" height="38" viewBox="0 0 130 140" fill="none"><rect x="4" y="4" width="30" height="132" rx="2" fill="#fff" opacity=".92"/><rect x="56" y="4" width="70" height="60" rx="2" fill="#e23c41"/><rect x="56" y="76" width="70" height="60" rx="2" fill="#e23c41" opacity=".9"/></svg>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"2.5rem"}}>
            {[["home","Home"],["about","About"],["services","Services"],["contact",""]].map(([id,label]) => (
              <span key={id} onClick={() => go(id)} style={{fontSize:12,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",...(id==="contact"?{padding:"8px 24px",background:C.r,color:C.w}:{color:C.gl})}}>{id==="contact"?"Start a Search":label}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO — Video placeholder (both videos will alternate on deploy) */}
      <section id="home" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"flex-end",paddingBottom:"clamp(4rem,8vw,8rem)",overflow:"hidden",background:C.n}}>
        {/* VIDEO PLACEHOLDER — on deploy, this becomes:
        */}
        <div style={{position:"absolute",inset:0,zIndex:0}}><video id="vid1" autoPlay muted loop playsInline style={{position:"absolute",inset:0,objectFit:"cover",width:"100%",height:"100%"}}><source src="./video1.mp4" type="video/mp4"/></video><video id="vid2" autoPlay muted loop playsInline style={{position:"absolute",inset:0,objectFit:"cover",width:"100%",height:"100%",opacity:0,transition:"opacity 1.5s ease"}}><source src="./video2.mp4" type="video/mp4"/></video></div>

        {/* Dark overlay */}
        <div style={{position:"absolute",inset:0,zIndex:1,background:`linear-gradient(180deg,rgba(14,11,36,.4) 0%,rgba(14,11,36,.15) 30%,rgba(14,11,36,.7) 75%,${C.n} 100%),linear-gradient(90deg,rgba(14,11,36,.8) 0%,transparent 55%)`}} />
        {/* Hero content */}
        <div style={{position:"relative",zIndex:2,maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{maxWidth:860,opacity:0,animation:"fu .7s cubic-bezier(.23,1,.32,1) .2s forwards",transform:"translateY(20px)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:32}}><span style={{width:48,height:2,background:C.r,display:"block"}}/><span style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r}}>Retained Executive Search · U.S. Manufacturing & Industrial</span></div>
            <h1 style={{fontSize:"clamp(3rem,8vw,6.5rem)",fontWeight:700,lineHeight:.92,letterSpacing:"-.03em",marginBottom:24}}>The leaders who<br/><span style={{color:C.r,fontStyle:"italic"}}>move</span> industries<br/>start here.</h1>
            <p style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",lineHeight:1.5,color:C.gl,maxWidth:600,marginBottom:40}}>Bound Search Partners is a boutique retained executive search firm specializing in manufacturing, industrial, and supply chain leadership.</p>
            <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
              <span onClick={() => go("contact")} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 36px",background:C.r,color:C.w,fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer"}}>Start a Conversation →</span>
              <span onClick={() => go("services")} style={{display:"inline-flex",padding:"16px 0",color:C.gl,fontSize:13,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",borderBottom:"1px solid rgba(255,255,255,.12)",cursor:"pointer"}}>Explore Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:C.nm,borderTop:"1px solid rgba(226,60,65,.15)",borderBottom:"1px solid rgba(226,60,65,.15)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["200+","Executive Placements"],["92%","Year-One Retention"],["10+","Years Retained Search"],["50+","Client Organizations"]].map(([n,l],i) => (
            <div key={i} style={{padding:"40px 24px",textAlign:"center",borderRight:i<3?"1px solid rgba(226,60,65,.12)":"none"}}>
              <div style={{fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,color:C.r,lineHeight:1,marginBottom:8}}>{n}</div>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWS TICKER */}
      <div style={{display:"flex",alignItems:"stretch",background:C.nm,borderBottom:"1px solid rgba(226,60,65,.08)",overflow:"hidden",height:42}}>
        <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:8,padding:"0 20px",background:C.n,borderRight:"1px solid rgba(226,60,65,.12)",fontSize:10,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:C.r,whiteSpace:"nowrap"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:C.r,animation:"beacon 2s ease infinite"}}></span>
          Industry Intel
        </div>
        <div style={{flex:1,overflow:"hidden",display:"flex",alignItems:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",whiteSpace:"nowrap",animation:"tickScroll 45s linear infinite"}}
            onMouseEnter={e => e.currentTarget.style.animationPlayState="paused"}
            onMouseLeave={e => e.currentTarget.style.animationPlayState="running"}>
            {[...Array(2)].map((_,rep) => [
              ["US factory output posts biggest gain in nearly a year","Bloomberg","https://www.bloomberg.com/news/articles/2026-02-18/us-industrial-production-increases-by-most-in-nearly-a-year"],
              ["Manufacturing ISM expands at fastest pace since 2022","Bloomberg","https://www.bloomberg.com/news/articles/2026-02-02/us-manufacturing-activity-expands-by-the-most-since-2022"],
              ["Philadelphia Fed manufacturing index rises to 16.3","Advisor Perspectives","https://www.advisorperspectives.com/dshort/updates/2026/02/19/philadelphia-fed-manufacturing-index-february-2026"],
              ["2026 may be a turnaround year for manufacturing jobs","Marketplace","https://www.marketplace.org/story/2026/02/16/will-there-be-more-manufacturing-jobs-in-2026"],
              ["Core durable goods orders surge amid headwinds","Financial Content","https://markets.financialcontent.com/stocks/article/marketminute-2026-2-18"],
              ["Reshoring reshapes supply chain strategy for 2026","WSI","https://www.wsinc.com/retail-supply-chain-moves/"],
              ["Can reshoring deliver sustainability benefits?","Mfg Dive","https://www.manufacturingdive.com/news/can-reshoring-deliver-manufacturing-sustainability-benefits/811430/"],
              ["2026 outlook: AI and reshoring as key trends","Deloitte","https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook.html"],
            ].map(([h,s,u],i) => (
              <span key={`${rep}-${i}`} style={{padding:"0 40px",fontSize:12,color:C.gl,display:"inline-flex",alignItems:"center",gap:12}}>
                <span style={{color:C.r,fontSize:7,opacity:.5}}>◆</span>
                <a href={u} target="_blank" rel="noopener noreferrer" style={{color:C.gl,textDecoration:"none"}}>{h}</a>
                <span style={{color:C.g,fontSize:10,opacity:.5}}>{s}</span>
              </span>
            ))).flat()}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{padding:"clamp(6rem,12vw,10rem) 0",background:C.nm}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:"clamp(3rem,8vw,8rem)",alignItems:"center"}}>
          <div>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>The Firm</div>
            <h2 style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:32}}>Executive search defined by <span style={{color:C.r,fontStyle:"italic"}}>depth</span>, not volume.</h2>
            <p style={{fontSize:"1.1rem",lineHeight:1.8,color:C.gl,marginBottom:16}}>Bound was founded on a conviction most firms get wrong: recruiting is not a transaction. Every engagement is retained, personally led, and grounded in genuine understanding of the client's business, culture, and competitive landscape.</p>
            <p style={{fontSize:"1.1rem",lineHeight:1.8,color:C.gl}}>Founded in Philadelphia, serving manufacturers nationwide. Bound works with industrial companies, PE-backed portfolio businesses, and the organizations that power the real economy.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:32}}>
            <div style={{position:"relative",width:"100%",maxWidth:320,aspectRatio:"1"}}>
              <div style={{position:"absolute",inset:"15%",border:"1px dashed rgba(226,60,65,.1)",borderRadius:"50%",animation:"sp 30s linear infinite"}}/>
              <div style={{position:"absolute",inset:0,border:"1px dashed rgba(226,60,65,.06)",borderRadius:"50%",animation:"sp 45s linear infinite reverse"}}/>
              {[{r:-55,w:150,c:1},{r:-15,w:130,c:0},{r:35,w:160,c:1},{r:150,w:140,c:0},{r:75,w:120,c:1},{r:195,w:150,c:0}].map((l,i) => <div key={i} style={{position:"absolute",top:"50%",left:"50%",height:1,width:l.w,transformOrigin:"0 0",transform:`rotate(${l.r}deg)`,background:`linear-gradient(90deg,${l.c?'rgba(226,60,65,.25)':'rgba(255,255,255,.12)'},transparent)`}}/>)}
              {[{t:14,l:18,s:12,c:C.r,o:.6,d:6},{t:10,l:78,s:9,c:C.w,o:.3,d:8},{t:72,l:85,s:11,c:C.r,o:.5,d:7},{t:82,l:22,s:8,c:C.w,o:.25,d:9},{t:34,l:90,s:14,c:C.r,o:.4,d:5},{t:90,l:52,s:10,c:C.w,o:.2,d:7}].map((nd,i) => <div key={i} style={{position:"absolute",top:`${nd.t}%`,left:`${nd.l}%`,width:nd.s,height:nd.s,borderRadius:"50%",background:nd.c,opacity:nd.o,transform:"translate(-50%,-50%)",animation:`f${i%2+1} ${nd.d}s ease ${i*.5}s infinite`}}/>)}
              <div style={{position:"absolute",top:"50%",left:"50%",width:24,height:24,borderRadius:"50%",background:C.r,transform:"translate(-50%,-50%)",boxShadow:"0 0 30px rgba(226,60,65,.5)",zIndex:3}}/>
              <div style={{position:"absolute",top:"50%",left:"50%",width:24,height:24,borderRadius:"50%",border:"2px solid #e23c41",transform:"translate(-50%,-50%)",animation:"ep 2.5s ease infinite"}}/>
            </div>
            <button onClick={() => setProcOpen(!procOpen)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 40px",background:procOpen?C.r:"transparent",border:`2px solid ${C.r}`,color:C.w,fontFamily:"inherit",fontSize:14,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",transition:"all .3s",maxWidth:340,width:"100%",justifyContent:"center"}}>
              <span>{procOpen?"✕":"—"}</span><span>{procOpen?"Close":"Explore Our Process"}</span>{!procOpen && <span>↓</span>}
            </button>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH PROCESS EXPANSION */}
      <div style={{maxHeight:procOpen?900:0,overflow:"hidden",transition:"max-height .7s cubic-bezier(.23,1,.32,1)",background:C.n,borderTop:procOpen?"1px solid rgba(226,60,65,.15)":"none",borderBottom:procOpen?"1px solid rgba(226,60,65,.15)":"none"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,4rem)"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:12}}>Our Methodology</div>
            <h2 style={{fontSize:"clamp(1.75rem,4vw,3rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.02em"}}>AI insights, delivered by humans,<br/>for an <span style={{color:C.r,fontStyle:"italic"}}>incredibly</span> personalized search.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}}>
            {proc.map((p,i) => (
              <div key={i} style={{background:"rgba(226,60,65,.03)",padding:"clamp(1.5rem,2.5vw,2.5rem)",borderTop:`3px solid ${C.r}`,transition:"background .3s",cursor:"default"}}
                onMouseEnter={e => e.currentTarget.style.background="rgba(226,60,65,.07)"} onMouseLeave={e => e.currentTarget.style.background="rgba(226,60,65,.03)"}>
                <div style={{fontSize:"4rem",fontWeight:700,color:C.r,opacity:.08,lineHeight:1,marginBottom:16}}>{p.p}</div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:C.r,opacity:.6,marginBottom:8}}>{p.l}</div>
                <h4 style={{fontSize:"clamp(1rem,1.5vw,1.25rem)",fontWeight:700,marginBottom:12}}>{p.t}</h4>
                <p style={{fontSize:14,color:C.gl,lineHeight:1.7}}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{background:C.n,padding:"clamp(5rem,10vw,9rem) 0"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r}}>Services</div>
          <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginTop:16,maxWidth:650,marginBottom:48}}>Five capabilities.<br/>One relentless standard.</h2>
          <div style={{display:"flex",gap:2,marginBottom:2}}>
            {srvs.map((s,i) => (
              <button key={i} onClick={() => setActiveSrv(i)} style={{flex:activeSrv===i?3:1,padding:"20px 16px",background:activeSrv===i?"rgba(226,60,65,.08)":"rgba(226,60,65,.02)",border:"none",borderBottom:activeSrv===i?`3px solid ${C.r}`:"3px solid transparent",color:activeSrv===i?C.w:C.g,fontFamily:"inherit",fontSize:13,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"all .4s cubic-bezier(.23,1,.32,1)",textAlign:"left",minWidth:0,overflow:"hidden"}}>
                <span style={{opacity:.2,fontSize:24,fontWeight:700,color:C.r,display:"block",marginBottom:4}}>{s.n}</span>
                <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"}}>{activeSrv===i?s.t:s.s}</span>
              </button>
            ))}
          </div>
          <div style={{padding:"clamp(2rem,4vw,4rem)",background:"rgba(226,60,65,.03)",borderLeft:`4px solid ${C.r}`,display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",minHeight:280}}>
            <div>
              <h3 style={{fontSize:"clamp(1.5rem,2.5vw,2.25rem)",fontWeight:700,marginBottom:16}}>{srvs[activeSrv].t}</h3>
              <p style={{fontSize:16,color:C.gl,lineHeight:1.8}}>{srvs[activeSrv].d}</p>
              <div style={{marginTop:24,fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:C.r,opacity:.6}}>{srvs[activeSrv].r}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"clamp(10rem,18vw,14rem)",fontWeight:700,color:C.r,opacity:.04,lineHeight:1}}>{srvs[activeSrv].n}</span></div>
          </div>
        </div>
      </section>

      {/* LOGO CAROUSEL */}
      <section style={{background:C.nm,padding:"clamp(3rem,6vw,5rem) 0"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r}}>Trusted By</div>
          <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginTop:16}}>Partnered with industry leaders.</h2>
        </div>
        <div style={{position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,bottom:0,left:0,width:80,background:"linear-gradient(90deg,#181338,transparent)",zIndex:2,pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:0,bottom:0,right:0,width:80,background:"linear-gradient(-90deg,#181338,transparent)",zIndex:2,pointerEvents:"none"}}/>
          <div style={{display:"flex",animation:"logoScroll 30s linear infinite",width:"max-content"}}
            onMouseEnter={e => e.currentTarget.style.animationPlayState="paused"}
            onMouseLeave={e => e.currentTarget.style.animationPlayState="running"}>
            {[...Array(2)].map((_,rep) => [
              ["./logos/hunter_douglas.png","Hunter Douglas"],
              ["./logos/honickman.png","Honickman"],
              ["./logos/aak.jpg","AAK"],
              ["./logos/mcc.png","MCC"],
              ["./logos/post_brothers.png","Post Brothers"],
              ["./logos/makinex.jpg","Makinex"],
              ["./logos/k_hartwall.png","K.Hartwall"],
              ["./logos/marand.png","Marand"],
              ["./logos/cf.png","CF Industries"],
              ["./logos/elementia.jpg","Elementia"],
            ].map(([src,name],i) => (
              <div key={`${rep}-${i}`} style={{flexShrink:0,width:200,height:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem 2rem",background:C.nm,borderRight:"1px solid rgba(226,60,65,.06)"}}>
                <img src={src} alt={name} style={{height:40,width:"auto",maxWidth:150,objectFit:"contain",opacity:.7}} onMouseEnter={e => e.target.style.opacity="1"} onMouseLeave={e => e.target.style.opacity=".7"}/>
              </div>
            ))).flat()}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Industries</div>
          <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",maxWidth:600,marginBottom:56}}>Nine sectors.<br/>Decades of depth.</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0}}>
            {inds.map((ind,i) => (
              <div key={i} onMouseEnter={() => setHovInd(i)} onMouseLeave={() => setHovInd(null)}
                style={{padding:"clamp(1.5rem,2.5vw,2.5rem)",borderTop:"1px solid rgba(226,60,65,.08)",borderRight:i%3!==2?"1px solid rgba(226,60,65,.08)":"none",cursor:"default",transition:"all .3s",background:hovInd===i?"rgba(226,60,65,.04)":"transparent",position:"relative"}}>
                <div style={{position:"absolute",top:0,left:0,width:hovInd===i?"100%":"0%",height:2,background:C.r,transition:"width .4s cubic-bezier(.23,1,.32,1)"}}/>
                <h4 style={{fontSize:"clamp(1.25rem,2vw,1.75rem)",fontWeight:700,marginBottom:6,color:hovInd===i?C.w:C.gl,transition:"color .3s"}}>{ind.n}</h4>
                <div style={{fontSize:12,color:C.g,letterSpacing:".05em",marginBottom:hovInd===i?16:0,transition:"margin .3s"}}>{ind.s}</div>
                <div style={{fontSize:13,color:C.gl,lineHeight:1.8,maxHeight:hovInd===i?200:0,opacity:hovInd===i?.7:0,overflow:"hidden",transition:"all .4s cubic-bezier(.23,1,.32,1)"}}>{ind.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOND */}
      <section id="bond" style={{padding:"clamp(5rem,10vw,8rem) 0",background:C.n,textAlign:"center"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{position:"relative",width:200,height:210,margin:"0 auto"}}>
            <div style={{position:"absolute",left:6,top:6,width:45,height:198,background:C.w,borderRadius:3,opacity:.92,transform:bondVis?"translateX(0)":"translateX(-120px)",transition:"all 1.2s cubic-bezier(.23,1,.32,1)"}}/>
            <div style={{position:"absolute",right:6,top:6,width:105,height:90,background:C.r,borderRadius:3,transform:bondVis?"translateX(0)":"translateX(120px)",transition:"all 1.2s cubic-bezier(.23,1,.32,1)"}}/>
            <div style={{position:"absolute",right:6,bottom:6,width:105,height:90,background:C.r,opacity:.9,borderRadius:3,transform:bondVis?"translateX(0)":"translateX(120px)",transition:"all 1.2s cubic-bezier(.23,1,.32,1) .15s"}}/>
          </div>
          <div style={{marginTop:32,fontSize:"clamp(1.25rem,2.5vw,2rem)",fontWeight:700,opacity:bondVis?1:0,transform:bondVis?"translateY(0)":"translateY(12px)",transition:"all .5s ease .8s"}}>The right company <span style={{color:C.r}}>+</span> the right leader <span style={{color:C.r}}>=</span> Bound.</div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(3rem,6vw,6rem)",alignItems:"center"}}>
          <div>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>The Founder</div>
            <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:24}}>Bob Cwenar</h2>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>Bob Cwenar brings over a decade of retained executive search experience to every engagement. A graduate of Drexel University, he began his career with Armstrong Franklin, growing the practice from a four-person startup into a recognized name in the industry.</p>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:20}}>Through a merger with GattiHR and subsequent acquisition by Kingsley Gate Partners, Bob led national searches for clients ranging from agile startups to enterprises exceeding $10 billion in revenue.</p>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl}}>Today, Bob leads Bound Search Partners with a clear mandate: deliver an executive search experience defined by rigor, precision, and trust.</p>
          </div>
          <div><img src="./headshot.jpg" alt="Bob Cwenar" style={{width:"100%",maxWidth:420,marginLeft:"auto",borderRadius:2,display:"block"}}/></div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.nm}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(3rem,5vw,5rem)",alignItems:"start"}}>
          <div>
            <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>Contact</div>
            <h2 style={{fontSize:"clamp(2rem,5vw,3.75rem)",fontWeight:700,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:24}}>Start a <span style={{color:C.r,fontStyle:"italic"}}>conversation</span>.</h2>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:C.gl,marginBottom:32}}>Every engagement begins with a candid discussion about the role and whether Bound is the right fit.</p>
            {[["Phone","(267) 265-1792","tel:+12672651792"],["Email","bob@boundsearch.com","mailto:bob@boundsearch.com"],["Headquarters","Philadelphia, PA — Serving clients nationwide",null]].map(([label,val,href],i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"16px 0",borderTop:"1px solid rgba(255,255,255,.05)"}}>
                <div style={{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(226,60,65,.06)",color:C.r,flexShrink:0}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{i===0?<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>:i===1?<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></>:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>}</svg>
                </div>
                <div><strong style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:3}}>{label}</strong>{href?<a href={href} style={{color:C.w,textDecoration:"none"}}>{val}</a>:<span>{val}</span>}</div>
              </div>
            ))}
            <div style={{marginTop:32,padding:20,border:"1px solid rgba(226,60,65,.12)",background:"rgba(226,60,65,.02)"}}>
              <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:10}}>Typical Timeline</div>
              <p style={{fontSize:14,color:C.gl,lineHeight:1.8}}><strong style={{color:C.w}}>Within 24 hours</strong> — Direct response from the founder.<br/><strong style={{color:C.w}}>Within 48 hours</strong> — Discovery call.<br/><strong style={{color:C.w}}>Within one week</strong> — Terms finalized. Research begins.</p>
            </div>
          </div>
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
              {["First Name","Last Name"].map(l => <div key={l}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>{l}</label><input style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15}}/></div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
              {["Email","Phone"].map(l => <div key={l}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>{l}</label><input style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15}}/></div>)}
            </div>
            {["Company","Role"].map(l => <div key={l} style={{marginBottom:20}}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>{l}</label><input style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15}}/></div>)}
            <div style={{marginBottom:20}}><label style={{display:"block",fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:C.g,marginBottom:6}}>Additional Context</label><textarea rows={4} style={{width:"100%",padding:14,background:C.n,border:"1px solid rgba(255,255,255,.06)",color:C.w,fontFamily:"inherit",fontSize:15,resize:"vertical"}}/></div>
            <button style={{width:"100%",padding:"16px 36px",background:C.r,color:C.w,border:"none",fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>Submit Inquiry →</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"clamp(5rem,10vw,9rem) 0",background:C.n,textAlign:"center"}}>
        <div style={{maxWidth:800,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{fontSize:"clamp(.65rem,.9vw,.78rem)",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.r,marginBottom:24}}>Ready to begin?</div>
          <h2 style={{fontSize:"clamp(3rem,8vw,6.5rem)",fontWeight:700,lineHeight:.92,letterSpacing:"-.03em",marginBottom:24}}>The right hire<br/>changes <span style={{color:C.r,fontStyle:"italic"}}>everything</span>.</h2>
          <p style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",color:C.gl,lineHeight:1.5,maxWidth:550,margin:"0 auto 40px"}}>Every day a critical seat stays empty, momentum is lost. Bound exists to close that gap.</p>
          <span onClick={() => go("contact")} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 36px",background:C.r,color:C.w,fontSize:13,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",cursor:"pointer"}}>Start a Search →</span>
        </div>
      </section>

      {/* FOOTER with Philly skyline SVG */}
      <footer style={{background:C.nm,padding:"56px 0 24px",borderTop:"1px solid rgba(226,60,65,.08)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 clamp(1.5rem,4vw,4rem)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <svg width="220" height="36" viewBox="0 0 340 44" fill="none"><rect x="2" y="2" width="9" height="40" rx="1" fill="#fff" opacity=".92"/><rect x="20" y="2" width="22" height="18" rx="1" fill="#e23c41"/><rect x="20" y="24" width="22" height="18" rx="1" fill="#e23c41" opacity=".9"/><line x1="54" y1="6" x2="54" y2="38" stroke="#e23c41" strokeWidth="1.5" opacity=".2"/><text x="64" y="20" fill="#fff" fontFamily="Aptos,sans-serif" fontSize="18" fontWeight="800" letterSpacing="4">BOUND</text><text x="64" y="36" fill="#8a879a" fontFamily="Aptos,sans-serif" fontSize="8" fontWeight="600" letterSpacing="5">SEARCH PARTNERS</text></svg>
            <div style={{display:"flex",gap:32}}>{["Home","About","Services","Contact"].map(l => <span key={l} onClick={() => go(l.toLowerCase())} style={{fontSize:12,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:C.g,cursor:"pointer"}}>{l}</span>)}</div>
          </div>

          {/* Divider line */}
          <div style={{height:1,background:"rgba(226,60,65,.1)",marginTop:32,marginBottom:24}} />

          {/* Bottom row: copyright left, skyline right */}
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div>
              <div style={{fontSize:12,color:C.g,marginBottom:6}}>© 2024 Bound Search Partners LLC. All rights reserved.</div>
              <div style={{fontSize:11,color:C.g,opacity:.6,marginBottom:4}}>Made with love in the City of Brotherly Love.</div>
              <div style={{fontSize:10,color:C.g,opacity:.4}}>Website designed and built by Bob Cwenar & Claude by Anthropic.</div>
            </div>
            {/* Philly Skyline SVG */}
            <svg viewBox="0 0 400 160" fill="none" style={{width:220,height:88,flexShrink:0}}>
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
    </div>
  );
}
