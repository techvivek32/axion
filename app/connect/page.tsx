'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';

const BG='#080808',BG2='#121212',PANEL='#1a1a1a',TEXT='#ffffff',MUTED='rgba(255,255,255,.6)',SOFT='rgba(255,255,255,.35)',LINE='rgba(255,255,255,.08)',GOLD='#ffffff',GOLDB='#cccccc',ERR='#c0392b';
const VP={once:false,margin:'-60px'};
const fadeUp={hidden:{opacity:0,y:40},show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const fadeIn={hidden:{opacity:0},show:{opacity:1,transition:{duration:0.5,ease:[0.22,1,0.36,1]as const}}};
const stagger=(d=0.05)=>({hidden:{},show:{transition:{staggerChildren:d}}});

const CONTEXT_TAGS:Record<string,string>={'Labour Codes':'labour-codes','AI Edge Lab':'ai-edge','People Architecture':'people-architecture','Family Business':'family-business','Not sure':'exploratory'};
const CONTEXT_LABELS:Record<string,string>={'labour-codes':'Labour Codes','ai-edge':'AI Edge Lab','people-architecture':'People Architecture','family-business':'Family Business','exploratory':'Exploratory'};
const CONTEXT_HINTS:Record<string,string>={'labour-codes':'This will begin with exposure mapping across the four Codes — wages, classification, social security, and safety.','ai-edge':'This will route your request through the AI Edge diagnostic layer — work compression, judgment ownership, and structural readiness.','people-architecture':'This will begin with a BCR stage diagnosis — where the organisation is stuck between Belief, Conviction, and Rhythm.','family-business':'This will begin with a Five Architectures scan — Authority, Leadership, Governance, Succession, and Capabilities.','exploratory':'We will read your context and identify the most relevant structural layer before responding.'};
const LOADING_MSGS=['Reading your context...','Mapping your architecture...','Preparing diagnostic entry...'];

const inputBase:React.CSSProperties={width:'100%',padding:'13px 16px',background:'rgba(255,255,255,.04)',border:`1px solid rgba(255,255,255,.06)`,borderRadius:'2px',color:'#f8fafc',fontSize:'14px',fontFamily:'Inter,-apple-system,sans-serif',outline:'none',transition:'border-color .2s,box-shadow .2s',appearance:'none' as const};

function Label({children,required}:{children:React.ReactNode;required?:boolean}){
  return(
    <div style={{fontFamily:'monospace',fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase' as const,color:'rgba(226,232,240,.38)',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
      {children}{required&&<span style={{color:GOLD,fontSize:'12px',lineHeight:'1'}}>*</span>}
    </div>
  );
}

function Field({label,required,error,children}:{label:string;required?:boolean;error?:string;children:React.ReactNode}){
  return(
    <motion.div variants={fadeUp} style={{display:'flex',flexDirection:'column' as const}}>
      <Label required={required}>{label}</Label>
      {children}
      {error&&<div style={{fontSize:'11px',color:'#c0392b',marginTop:'5px',fontFamily:'monospace',letterSpacing:'0.04em'}}>{error}</div>}
    </motion.div>
  );
}

function Eyebrow({label}:{label:string}){
  return(
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{display:'inline-flex',alignItems:'center',gap:'10px',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase' as const,color:GOLD,marginBottom:'20px'}}>
      <span style={{width:'24px',height:'1px',background:GOLD,flexShrink:0}}/>
      {label}
    </motion.div>
  );
}

export default function Connect(){
  const [form,setForm]=useState({name:'',email:'',organisation:'',headcount:'',context:'',state:'',sector:'',concern:''});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [touched,setTouched]=useState<Record<string,boolean>>({});
  const [status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle');
  const [loadingMsg,setLoadingMsg]=useState(0);
  const [apiError,setApiError]=useState('');
  const [countdown,setCountdown]=useState(5);

  useEffect(()=>{
    if(status!=='loading')return;
    const t=setInterval(()=>setLoadingMsg(p=>(p+1)%LOADING_MSGS.length),1000);
    return()=>clearInterval(t);
  },[status]);

  useEffect(()=>{
    if(status!=='success')return;
    if(countdown<=0){window.location.href='/';return;}
    const t=setTimeout(()=>setCountdown(p=>p-1),1000);
    return()=>clearTimeout(t);
  },[status,countdown]);

  function validate(data=form){
    const e:Record<string,string>={};
    if(!data.name.trim())e.name='Name is required.';
    if(!data.email.trim())e.email='Work email is required.';
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))e.email='Enter a valid email address.';
    if(!data.organisation.trim())e.organisation='Organisation name is required.';
    if(!data.headcount)e.headcount='Select a headcount band.';
    if(!data.context)e.context='Select a primary context.';
    if(!data.state)e.state='Select a primary operating state.';
    if(!data.sector)e.sector='Select a sector.';
    return e;
  }

  const isValid=Object.keys(validate()).length===0;

  function handleChange(field:string,value:string){
    const next={...form,[field]:value};
    setForm(next);
    if(touched[field]){const e=validate(next);setErrors(prev=>({...prev,[field]:e[field]||''}));}
  }

  function handleBlur(field:string){
    setTouched(prev=>({...prev,[field]:true}));
    const e=validate();
    setErrors(prev=>({...prev,[field]:e[field]||''}));
  }

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    const allTouched=Object.fromEntries(Object.keys(form).map(k=>[k,true]));
    setTouched(allTouched);
    const errs=validate();
    setErrors(errs);
    if(Object.keys(errs).length>0)return;
    setStatus('loading');setApiError('');
    try{
      const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,tag:CONTEXT_TAGS[form.context]||'exploratory',source:'connect-page'})});
      if(!res.ok)throw new Error('API error');
      setStatus('success');
    }catch{setStatus('error');setApiError('Submission failed. Please try again.');}
  }

  function onFocus(e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>){e.target.style.borderColor=GOLD;e.target.style.boxShadow='0 0 0 2px rgba(255,255,255,.08)';}
  function onBlurInput(e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>,field:string){e.target.style.borderColor=errors[field]?'#c0392b':'rgba(255,255,255,.06)';e.target.style.boxShadow='none';handleBlur(field);}

  const contextTag=form.context?CONTEXT_TAGS[form.context]:null;

  return(
    <div style={{background:BG,minHeight:'100vh',color:TEXT,fontFamily:'Inter,-apple-system,sans-serif'}}>
      <NavBar/>

      {/* HERO */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'96px 56px 72px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2.5}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 60%,rgba(255,255,255,.03),transparent 60%)',zIndex:0}}/>
        <div style={{maxWidth:'640px',margin:'0 auto',position:'relative',zIndex:1}}>
          <motion.div variants={stagger(0.08)} initial="hidden" animate="show">
            <motion.div variants={fadeUp} style={{display:'inline-flex',alignItems:'center',gap:'10px',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase' as const,color:GOLD,marginBottom:'20px'}}>
              <span style={{width:'24px',height:'1px',background:GOLD,flexShrink:0}}/>Connect
            </motion.div>
            <motion.h1 variants={fadeUp} style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(28px,4vw,52px)',fontWeight:400,lineHeight:1.08,letterSpacing:'-0.04em',color:TEXT,marginBottom:'20px'}}>
              Begin where the architecture is weakest.
            </motion.h1>
            <motion.div variants={fadeUp} style={{width:'60px',height:'1px',background:GOLD,margin:'0 auto 20px'}}/>
            <motion.p variants={fadeUp} style={{fontSize:'15px',color:MUTED,lineHeight:1.88}}>
              Every engagement begins with context. The form below is not a contact request — it is the starting point of the diagnostic.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'80px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Who this is for"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(24px,3vw,38px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'40px'}}>
            Who this is for.
          </motion.h2>
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2px'}}>
            {[
              {role:'Founder / CEO',body:'You are seeing symptoms — attrition, drift, misalignment — and want to understand what is structurally wrong.'},
              {role:'CFO',body:'You want to read workforce as cost architecture, not just headcount.'},
              {role:'CHRO',body:'You want to move from program ownership to system design.'},
            ].map((item,i)=>(
              <motion.div key={item.role} variants={fadeUp}
                style={{background:PANEL,border:`1px solid ${LINE}`,padding:'28px 24px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)`}}/>
                <div style={{fontFamily:'monospace',fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase' as const,color:GOLD,marginBottom:'12px'}}>{item.role}</div>
                <p style={{fontSize:'14px',color:MUTED,lineHeight:1.8}}>{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'80px 56px'}}>
        <div style={{maxWidth:'720px',margin:'0 auto'}}>
          <Eyebrow label="Process"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(24px,3vw,38px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'40px'}}>
            What happens after you submit.
          </motion.h2>
          <div style={{position:'relative',paddingLeft:'32px'}}>
            <motion.div initial={{scaleY:0,originY:0}} whileInView={{scaleY:1}} viewport={VP} transition={{duration:1,ease:'easeOut'}}
              style={{position:'absolute',left:'7px',top:'8px',bottom:'8px',width:'2px',background:`linear-gradient(to bottom,${GOLD},rgba(255,255,255,.05))`}}/>
            <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={VP}
              style={{display:'flex',flexDirection:'column' as const,gap:'2px'}}>
              {[
                {no:'01',text:'We read your context — the sector, headcount, and concern you have described.'},
                {no:'02',text:'We identify the structural layer — which BCR stage, which practice area, which exposure is most relevant.'},
                {no:'03',text:'You receive a direct response — not a generic email, not a proposal template.'},
                {no:'04',text:'Diagnostic is scoped if relevant — a focused engagement defined by what the context actually requires.'},
              ].map((step,i)=>(
                <motion.div key={step.no} variants={fadeUp}
                  style={{background:PANEL,border:`1px solid ${LINE}`,padding:'20px 24px',position:'relative'}}>
                  <div style={{position:'absolute',left:'-37px',top:'22px',width:'10px',height:'10px',borderRadius:'50%',background:GOLD,border:`2px solid ${BG}`}}/>
                  <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
                    <span style={{fontFamily:'monospace',fontSize:'10px',fontWeight:700,letterSpacing:'0.14em',color:GOLD,flexShrink:0,paddingTop:'2px'}}>{step.no}</span>
                    <p style={{fontSize:'14px',color:MUTED,lineHeight:1.75}}>{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section style={{background:BG2,padding:'80px 56px 96px'}}>
        <div style={{maxWidth:'720px',margin:'0 auto'}}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{marginBottom:'32px'}}>
            <Eyebrow label="Your context"/>
            <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(22px,2.8vw,34px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'8px'}}>
              The more precise your inputs, the more precise the diagnostic.
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            {status==='loading'&&(
              <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                style={{textAlign:'center',padding:'80px 0'}}>
                <div style={{width:'32px',height:'32px',border:`2px solid ${LINE}`,borderTopColor:GOLD,borderRadius:'50%',margin:'0 auto 28px',animation:'spin 0.8s linear infinite'}}/>
                <AnimatePresence mode="wait">
                  <motion.p key={loadingMsg} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.3}}
                    style={{fontFamily:'monospace',fontSize:'13px',color:MUTED,letterSpacing:'0.08em'}}>
                    {LOADING_MSGS[loadingMsg]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {status==='success'&&(
              <motion.div key="success" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:0.6,ease:'easeOut'}}
                style={{textAlign:'center',padding:'80px 0'}}>
                <div style={{width:'48px',height:'48px',border:`1px solid ${GOLD}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 32px',color:GOLD,fontSize:'20px'}}>✓</div>
                <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(20px,2.8vw,32px)',fontWeight:400,color:TEXT,marginBottom:'16px',letterSpacing:'-0.03em'}}>
                  Thank you. Nitin will respond within one business day.
                </h2>
                <p style={{fontSize:'14px',color:MUTED,lineHeight:1.8,maxWidth:'440px',margin:'0 auto 8px'}}>
                  We read every submission. If the context is clear, the response is direct.
                </p>
                <p style={{fontSize:'13px',color:MUTED,lineHeight:1.8,maxWidth:'440px',margin:'0 auto 28px',fontStyle:'italic'}}>
                  This is not a pipeline. Every response is read and written.
                </p>
                <p style={{fontSize:'11px',color:SOFT,fontFamily:'monospace',marginBottom:'20px'}}>Redirecting in {countdown}s</p>
                <Link href="/"
                  style={{display:'inline-block',padding:'11px 26px',background:'rgba(255,255,255,.04)',border:`1px solid ${LINE}`,color:MUTED,fontSize:'13px',letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'border-color .2s,color .2s'}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD;}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor=LINE;e.currentTarget.style.color=MUTED;}}>
                  Return to homepage →
                </Link>
              </motion.div>
            )}

            {(status==='idle'||status==='error')&&(
              <motion.form key="form" onSubmit={handleSubmit} noValidate initial="hidden" animate="show" variants={stagger(0.05)}
                style={{display:'flex',flexDirection:'column' as const,gap:'24px'}}>
                {apiError&&(
                  <motion.div variants={fadeIn} style={{padding:'14px 18px',background:'rgba(192,57,43,.1)',border:'1px solid rgba(192,57,43,.3)',borderRadius:'2px',fontSize:'13px',color:'#e74c3c'}}>
                    {apiError}
                  </motion.div>
                )}
                <Field label="Name" required error={touched.name?errors.name:''}>
                  <input type="text" value={form.name} placeholder="Your full name"
                    onChange={e=>handleChange('name',e.target.value)} onFocus={onFocus}
                    onBlur={e=>onBlurInput(e,'name')}
                    style={{...inputBase,borderColor:touched.name&&errors.name?ERR:LINE}}/>
                </Field>
                <Field label="Work Email" required error={touched.email?errors.email:''}>
                  <input type="email" value={form.email} placeholder="you@company.com"
                    onChange={e=>handleChange('email',e.target.value)} onFocus={onFocus}
                    onBlur={e=>onBlurInput(e,'email')}
                    style={{...inputBase,borderColor:touched.email&&errors.email?ERR:LINE}}/>
                </Field>
                <Field label="Organisation Name" required error={touched.organisation?errors.organisation:''}>
                  <input type="text" value={form.organisation} placeholder="Company or institution"
                    onChange={e=>handleChange('organisation',e.target.value)} onFocus={onFocus}
                    onBlur={e=>onBlurInput(e,'organisation')}
                    style={{...inputBase,borderColor:touched.organisation&&errors.organisation?ERR:LINE}}/>
                </Field>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                  <Field label="Headcount Band" required error={touched.headcount?errors.headcount:''}>
                    <select value={form.headcount} onChange={e=>handleChange('headcount',e.target.value)}
                      onFocus={onFocus} onBlur={e=>onBlurInput(e,'headcount')}
                      style={{...inputBase,borderColor:touched.headcount&&errors.headcount?ERR:LINE,cursor:'pointer'}}>
                      <option value="">Select band</option>
                      {['<100','100–500','500–2000','2000–10000','10000+'].map(v=><option key={v} value={v}>{v}</option>)}
                    </select>
                  </Field>
                  <Field label="Primary Context" required error={touched.context?errors.context:''}>
                    <select value={form.context} onChange={e=>handleChange('context',e.target.value)}
                      onFocus={onFocus} onBlur={e=>onBlurInput(e,'context')}
                      style={{...inputBase,borderColor:touched.context&&errors.context?ERR:LINE,cursor:'pointer'}}>
                      <option value="">Select context</option>
                      {Object.keys(CONTEXT_TAGS).map(v=><option key={v} value={v}>{v}</option>)}
                    </select>
                  </Field>
                </div>
                <AnimatePresence>
                  {contextTag&&(
                    <motion.div key={contextTag} initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.3}}
                      style={{background:PANEL,border:`1px solid rgba(255,255,255,.12)`,padding:'16px 20px',borderLeft:`3px solid ${GOLD}`}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
                        <span style={{fontFamily:'monospace',fontSize:'10px',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase' as const,color:SOFT}}>Tagged as:</span>
                        <span style={{fontFamily:'monospace',fontSize:'10px',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase' as const,color:GOLD,padding:'3px 10px',border:`1px solid rgba(255,255,255,.2)`,background:'rgba(255,255,255,.06)'}}>
                          {CONTEXT_LABELS[contextTag]}
                        </span>
                      </div>
                      <p style={{fontSize:'12px',color:MUTED,lineHeight:1.7}}>{CONTEXT_HINTS[contextTag]}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                  <Field label="Primary Operating State" required error={touched.state?errors.state:''}>
                    <select value={form.state} onChange={e=>handleChange('state',e.target.value)}
                      onFocus={onFocus} onBlur={e=>onBlurInput(e,'state')}
                      style={{...inputBase,borderColor:touched.state&&errors.state?ERR:LINE,cursor:'pointer'}}>
                      <option value="">Select state</option>
                      {['Maharashtra','Karnataka','Delhi NCR','Tamil Nadu','Telangana','Gujarat','West Bengal','Rajasthan','Uttar Pradesh','Haryana','Punjab','Kerala','Other'].map(v=><option key={v} value={v}>{v}</option>)}
                    </select>
                  </Field>
                  <Field label="Sector" required error={touched.sector?errors.sector:''}>
                    <select value={form.sector} onChange={e=>handleChange('sector',e.target.value)}
                      onFocus={onFocus} onBlur={e=>onBlurInput(e,'sector')}
                      style={{...inputBase,borderColor:touched.sector&&errors.sector?ERR:LINE,cursor:'pointer'}}>
                      <option value="">Select sector</option>
                      {['Manufacturing','IT/ITES','Financial Services','Retail','Logistics','Healthcare','Other'].map(v=><option key={v} value={v}>{v}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Most Pressing Concern" error="">
                  <div style={{position:'relative'}}>
                    <textarea value={form.concern} rows={4} maxLength={500}
                      placeholder="Describe the structural challenge you are navigating..."
                      onChange={e=>handleChange('concern',e.target.value)}
                      onFocus={onFocus}
                      onBlur={e=>{e.target.style.borderColor=LINE;e.target.style.boxShadow='none';}}
                      style={{...inputBase,resize:'vertical' as const,minHeight:'100px'}}/>
                    <div style={{position:'absolute',bottom:'10px',right:'12px',fontSize:'10px',color:SOFT,fontFamily:'monospace'}}>{form.concern.length}/500</div>
                  </div>
                </Field>
                <div style={{height:'1px',background:LINE}}/>
                <motion.button type="submit" disabled={!isValid}
                  whileHover={isValid?{scale:1.01,boxShadow:'0 8px 32px rgba(255,255,255,.08)'}:{}}
                  whileTap={isValid?{scale:0.99}:{}}
                  style={{width:'100%',padding:'15px',background:isValid?GOLD:'rgba(255,255,255,.08)',color:isValid?'#080808':'rgba(255,255,255,.25)',border:'none',borderRadius:'2px',fontSize:'13px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' as const,cursor:isValid?'pointer':'not-allowed',transition:'background .2s,color .2s',fontFamily:'Inter,-apple-system,sans-serif'}}>
                  Begin a Diagnostic →
                </motion.button>
                <p style={{fontSize:'11px',color:SOFT,textAlign:'center',fontFamily:'monospace',letterSpacing:'0.04em',lineHeight:1.6}}>
                  No spam. No automated outreach.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CLOSING STRIP */}
      <section style={{background:BG,padding:'120px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2.5}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.03),transparent 60%)',zIndex:0}}/>
        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={VP} transition={{duration:1.2,ease:'easeOut'}}
          style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(28px,5vw,56px)',fontWeight:400,letterSpacing:'-0.04em',lineHeight:1.05,color:GOLD,position:'relative',zIndex:1,textShadow:'0 0 80px rgba(255,255,255,.08)'}}>
          From ambiguity to architecture.
        </motion.p>
      </section>

      <footer style={{background:'rgba(5,5,4,.98)',padding:'20px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${LINE}`,flexWrap:'wrap' as const,gap:'16px'}}>
        <span style={{fontSize:'10px',color:SOFT,letterSpacing:'0.04em'}}>© 2026 Axion Index</span>
        <div style={{display:'flex',gap:'22px'}}>
          {[['/', 'Home'],['/about','About'],['/founder','Founder']].map(([href,label])=>(
            <Link key={href} href={href} style={{fontSize:'11px',color:SOFT}}>{label}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        select option{background:#1e293b;color:#f8fafc}
        @media(max-width:767px){
          section{padding:56px 20px!important}
          footer{padding:20px!important;flex-direction:column!important;text-align:center!important}
          div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="grid-template-columns:repeat(3,1fr)"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}