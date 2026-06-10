import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const C = { n:"#0e0b24", nm:"#181338", r:"#e23c41", w:"#fff", g:"#8a879a", gl:"#c5c3ce" };

// Demo engagement shown when access code is "PREVIEW" — lets the portal be
// explored before the backend is configured. Remove before real client use if desired.
const DEMO = {
  client: "Preview Client",
  contact: "Demo User",
  role: "Plant Manager — Flagship U.S. Site",
  meta: "Retained Search · Initiated March 2026 · Led by Bob Cwenar",
  stage: 2,
  stages: [["Discovery","Week 1"],["Market Mapping","Weeks 2–3"],["Candidate Development","In progress"],["Finalist Slate","Upcoming"],["Offer & Onboarding","—"]],
  thisWeek: "Twelve qualified conversations in progress. Three candidates advancing to deep assessment. Finalist slate tracking for the week of June 22.",
  nextTouch: { title: "Pipeline Review Call", detail: "Thursday, June 12 · 2:00 PM ET · with Bob Cwenar" },
  docs: [
    { id:"demo-1", title:"Search Update Report — Week 4", desc:"Pipeline status, market response, next steps · Jun 6, 2026", isNew:true },
    { id:"demo-2", title:"Search Update Report — Week 3", desc:"Outreach summary & early candidate themes · May 30, 2026" },
    { id:"demo-3", title:"Market Map & Target Landscape", desc:"Compensation benchmarks · target organizations · May 22, 2026" },
    { id:"demo-4", title:"Position Specification — Final", desc:"Approved role profile & success criteria · May 16, 2026" },
  ],
};

const Mark = () => (
  <span style={{display:"inline-grid",gridTemplateColumns:"7px 16px",gridTemplateRows:"11px 11px",gap:2}} aria-hidden="true">
    <span style={{gridRow:"1/3",background:C.w,borderRadius:1,opacity:.92}}/>
    <span style={{background:C.r,borderRadius:1}}/>
    <span style={{background:C.r,borderRadius:1,opacity:.85}}/>
  </span>
);

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")`;

function Portal() {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [eng, setEng] = useState(null);

  const signIn = async (e) => {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      if (code.trim().toUpperCase() === "PREVIEW") {
        setEng(DEMO); setView("portal"); setBusy(false); return;
      }
      const res = await fetch("/.netlify/functions/portal-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      if (!res.ok) {
        setError(res.status === 429
          ? "Too many attempts. Please wait a few minutes."
          : "That access code wasn't recognized. Check your engagement email or contact your search partner.");
        setBusy(false); return;
      }
      const data = await res.json();
      setEng(data.engagement); setView("portal");
    } catch {
      setError("Couldn't reach the portal. Please try again, or email bob@boundsearch.com.");
    }
    setBusy(false);
  };

  const getDoc = async (docId) => {
    if (eng === DEMO) { alert("Demo mode — documents download in the live portal."); return; }
    const res = await fetch(`/.netlify/functions/portal-doc?doc=${encodeURIComponent(docId)}`, {
      headers: { "x-portal-code": code.trim() },
    });
    if (!res.ok) { alert("Document unavailable — please contact your search partner."); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = docId; a.click();
    URL.revokeObjectURL(url);
  };

  const label = {fontSize:10.5,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.g,marginBottom:8,display:"block"};
  const input = {width:"100%",padding:"13px 16px",background:"rgba(14,11,36,.6)",border:"1px solid rgba(226,60,65,.18)",borderRadius:6,color:C.w,fontFamily:"inherit",fontSize:14,letterSpacing:".02em",outline:"none"};

  return (
    <div style={{minHeight:"100vh",background:C.n,color:C.w,fontFamily:"'Inter','Segoe UI',-apple-system,sans-serif",position:"relative"}}>
      <div aria-hidden="true" style={{position:"fixed",inset:0,pointerEvents:"none",opacity:.05,zIndex:50,backgroundImage:GRAIN}}/>

      {view === "login" && (
        <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden"}}>
          <div aria-hidden="true" style={{position:"absolute",width:720,height:720,borderRadius:"50%",background:"radial-gradient(circle,rgba(226,60,65,.5),transparent 60%)",filter:"blur(60px)",opacity:.1,top:-200,right:-160}}/>
          <div style={{position:"relative",width:"min(420px,100%)",background:"rgba(24,19,56,.5)",border:"1px solid rgba(226,60,65,.16)",borderRadius:10,padding:"44px 40px",boxShadow:"0 40px 90px rgba(0,0,0,.5)",backdropFilter:"blur(10px)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:34}}>
              <Mark/>
              <span style={{fontSize:13,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase"}}>Bound Search Partners</span>
            </div>
            <div style={{fontSize:10.5,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:C.r,marginBottom:10}}>Client Portal</div>
            <h1 style={{fontSize:26,fontWeight:700,letterSpacing:"-.01em",marginBottom:8}}>Your search, live.</h1>
            <p style={{fontSize:13.5,lineHeight:1.65,color:C.g,marginBottom:30}}>Every document, update, and milestone from your engagement — one link, always current.</p>
            <form onSubmit={signIn}>
              <div style={{marginBottom:16}}>
                <label style={label}>Email</label>
                <input style={input} type="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
              </div>
              <div style={{marginBottom:16}}>
                <label style={label}>Engagement Access Code</label>
                <input style={input} type="text" placeholder="Provided with your engagement" value={code} onChange={e=>setCode(e.target.value)} required/>
              </div>
              {error && <div style={{fontSize:12.5,lineHeight:1.6,color:C.r,marginBottom:14}}>{error}</div>}
              <button type="submit" disabled={busy} style={{width:"100%",marginTop:10,padding:15,background:C.r,color:C.w,border:"none",borderRadius:6,fontFamily:"inherit",fontSize:12,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",cursor:"pointer",opacity:busy?.6:1}}>
                {busy ? "Verifying…" : "Enter Portal →"}
              </button>
            </form>
            <div style={{marginTop:26,fontSize:12,lineHeight:1.6,color:C.g,textAlign:"center"}}>
              Access is issued per engagement by your search partner.<br/>No account creation required.
            </div>
          </div>
        </div>
      )}

      {view === "portal" && eng && (
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px clamp(20px,4vw,48px)",borderBottom:"1px solid rgba(226,60,65,.12)",background:"rgba(14,11,36,.7)",position:"sticky",top:0,zIndex:10,backdropFilter:"blur(10px)"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <Mark/>
              <b style={{fontSize:12,letterSpacing:".18em",textTransform:"uppercase"}}>BSP Client Portal</b>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:22,fontSize:12,color:C.g}}>
              <span>{eng.contact} — {eng.client}</span>
              <span onClick={()=>{setView("login");setEng(null);setCode("");}} style={{color:C.gl,cursor:"pointer",fontWeight:600,letterSpacing:".08em",fontSize:11,textTransform:"uppercase"}}>Sign Out</span>
            </div>
          </div>

          <div style={{maxWidth:1180,margin:"0 auto",padding:"clamp(28px,4vw,52px) clamp(20px,4vw,48px)"}}>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-end",gap:18,marginBottom:34}}>
              <div>
                <div style={{fontSize:10.5,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:C.r,marginBottom:10}}>Active Engagement</div>
                <h2 style={{fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:700,letterSpacing:"-.015em"}}>{eng.role}</h2>
                <div style={{fontSize:13,color:C.g,marginTop:6}}>{eng.meta}</div>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",border:"1px solid rgba(34,197,94,.35)",borderRadius:99,fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#86efac"}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e"}}/>
                {eng.stages[eng.stage][0]}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8,marginBottom:44}}>
              {eng.stages.map(([name,when],i)=>(
                <div key={i} style={{padding:"14px 6px 12px",borderTop:`3px solid ${i<eng.stage?"rgba(226,60,65,.55)":i===eng.stage?C.r:"rgba(226,60,65,.14)"}`,fontSize:10.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:i===eng.stage?C.w:i<eng.stage?C.gl:C.g,textAlign:"center"}}>
                  {name}
                  <span style={{display:"block",marginTop:4,fontWeight:500,letterSpacing:".04em",color:C.g,fontSize:10,textTransform:"none"}}>{when}</span>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.7fr) minmax(260px,1fr)",gap:"clamp(24px,3.5vw,44px)",alignItems:"start"}} className="portalCols">
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:C.r,marginBottom:16}}>Engagement Documents</div>
                {eng.docs.map((doc)=>(
                  <div key={doc.id} onClick={()=>getDoc(doc.id)} role="button" tabIndex={0}
                    onKeyDown={e=>{if(e.key==="Enter")getDoc(doc.id);}}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,padding:"18px 20px",border:"1px solid rgba(226,60,65,.12)",borderRadius:8,marginBottom:10,background:"rgba(24,19,56,.35)",cursor:"pointer",transition:"all .3s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(226,60,65,.4)";e.currentTarget.style.transform="translateX(4px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(226,60,65,.12)";e.currentTarget.style.transform="translateX(0)";}}>
                    <div style={{display:"flex",alignItems:"center",gap:16,minWidth:0}}>
                      <div style={{width:38,height:38,flexShrink:0,borderRadius:6,background:"rgba(226,60,65,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:C.r,fontSize:15}}>▤</div>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:14,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{doc.title}</div>
                        <div style={{fontSize:11.5,color:C.g,marginTop:3}}>{doc.desc}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                      {doc.isNew && <span style={{fontSize:9,fontWeight:800,letterSpacing:".12em",color:C.r,border:"1px solid rgba(226,60,65,.4)",borderRadius:4,padding:"3px 7px"}}>NEW</span>}
                      <span style={{color:C.g,fontSize:18}}>↓</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{border:"1px solid rgba(226,60,65,.12)",borderRadius:8,padding:24,background:"rgba(24,19,56,.35)",marginBottom:18}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:C.g,marginBottom:10}}>This Week</div>
                  <p style={{fontSize:13.5,lineHeight:1.75,color:C.gl}}>{eng.thisWeek}</p>
                </div>
                {eng.nextTouch && (
                  <div style={{border:"1px solid rgba(226,60,65,.12)",borderRadius:8,padding:24,background:"rgba(24,19,56,.35)",marginBottom:18}}>
                    <div style={{fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:C.g,marginBottom:10}}>Next Touchpoint</div>
                    <div style={{fontSize:15,fontWeight:600,lineHeight:1.5}}>{eng.nextTouch.title}</div>
                    <div style={{fontSize:12,color:C.g,marginTop:6}}>{eng.nextTouch.detail}</div>
                  </div>
                )}
                <div style={{border:"1px solid rgba(226,60,65,.12)",borderRadius:8,padding:24,background:"rgba(24,19,56,.35)"}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:C.g,marginBottom:10}}>Direct Line</div>
                  <div style={{fontSize:15,fontWeight:600,lineHeight:1.5}}>bob@boundsearch.com</div>
                  <div style={{fontSize:12,color:C.g,marginTop:6}}>(267) 265-1792 — no portal required to reach your partner.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:860px){.portalCols{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Portal/>);
