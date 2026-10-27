/* ==========================================================
   FILE 3 of 4: portal.js   (ALL LOGIC / JAVASCRIPT CODE)
   PART 1 Settings   PART 2 Database layer   PART 3 Helpers & stats   PART 4 Charts
   PART 5 Login/apply/forgot password   PART 6 Affiliate dashboard   PART 7 Admin panel
   PART 8 Actions (clicks, forms)   PART 9 Demo data & live refresh
   ========================================================== */

/* ===== PART 1: SETTINGS (edit these) ===== */
const ADMIN_EMAIL='admin@vedantix.com';
const ADMIN_PASS='change-me-123';
const TRACK='go.html';
const VERT=['Home improvement','Finance','Health & wellness','Loan','E-commerce','Insurance','Other'];
const TRAF=['Facebook ads','Google ads','SEO / blog','Native ads','Email','Push','Social organic','YouTube','Other'];
const PTYPE=['Lead','Sale','Install','Call'];

/* ==========================================
   FILE 3 of 4: portal.js (ALL LOGIC / JAVASCRIPT CODE)
   PART 1: Settings | PART 2: Database Layer | PART 3: Helpers & stats
   ========================================== */

// --- PART 1: SETTINGS (Edit these) ---
const ADMIN_EMAIL = "admin@vedantix.com";
const ADMIN_PASS = "change-me-123";
const TRACK = "go.html";
const VENT = ["Home Improvement", "Finance", "Health & Wellness", "Loan", "E-commerce", "Insurance", "Other"];
const TRAF = ["Facebook ads", "Google ads", "SEO / Blog", "Native ads", "Email", "Push", "Social organic", "YouTube", "Other"];
const PTYPE = ["Lead", "Sale", "Install", "Call"];

// --- PART 2: DATABASE LAYER (Supabase Integration) ---
const SUPABASE_URL = 'https://mtygalcritplvahhodji.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_H0SSbV3_DnIWuO1o-spplQ_583Ukeb1';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DB = {
  async add(data) {
    const { data: result, error } = await supabase
      .from('queries')
      .insert([
        {
          name: data.Name || data.name || '',
          email: data.Email || data.email || '',
          message: data.Message || data.message || '',
          phone: data['Phone Number'] || data.Phone || data.phone || ''
        }
      ]);

    if (error) {
      console.error('Error inserting data to Supabase:', error);
      return null;
    }
    return result;
  }
};

// --- PART 3: HELPERS & STATS ---
const $ = id => document.getElementById(id);
const d84600000 = 86400000;

const esc = s => (s + '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

const safeUrl = u => {
  if (!u) return '#';
  if (/^https?:\/\//i.test(u)) return u;
  return 'https://' + u;
};

const msg = (id, txt, isErr) => {
  const el = $(id);
  if (el) {
    el.innerText = txt;
    el.className = 'msg ' + (isErr ? 'err' : 'ok');
  }
};

const toast = (txt, c = '') => {
  const t = $('toast');
  if (t) {
    t.innerText = txt;
    t.className = 'toast ' + (c ? c : '');
    setTimeout(() => { t.className = 'toast'; }, 3000);
  }
};

const chk = (f, n) => Array.from(f.querySelectorAll(`input[name="${n}"]:checked`)).map(x => x.value);
const inp = (f, n) => {
  const el = f.querySelector(`[name="${n}"]`);
  return el ? el.value.trim() : '';
};
/* ===== PART 3: HELPERS & STATS ===== */
const $=i=>document.getElementById(i);
const D=86400000;
const esc=s=>{const d=document.createElement('div');d.textContent=s==null?'':s;return d.innerHTML.replace(/"/g,'&quot;')};
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const safe=u=>/^https?:\/\//i.test(u)?u:'#';
const msg=(id,t,c)=>{const m=$(id);m.textContent=t;m.className='msg '+c};
const toast=t=>{const e=$('toast');if(!e)return;e.textContent=t;e.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.remove('on'),2200)};
const chk=(f,n)=>[...f.querySelectorAll('input[name="'+n+'"]:checked')].map(i=>i.value);
const chips=(id,l,n)=>{$(id).innerHTML=l.map(v=>`<label><input type="checkbox" name="${n}" value="${esc(v)}"><span>${esc(v)}</span></label>`).join('')};
const fmt=n=>Math.round(n).toLocaleString('en-US');
const usd=n=>'$'+Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtv=(v,f)=>f==='p'?v.toFixed(2)+'%':f==='u'?usd(v):fmt(v);
const ds=t=>{const d=new Date(t);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const dt=t=>new Date(t).toLocaleString('en-GB');
const sum=a=>a.reduce((t,x)=>t+(x.n||1),0);
const offName=id=>(offs().find(o=>o.id===id)||{}).name||'(deleted offer)';
const affName=id=>(affs().find(a=>a.id===id)||{}).name||'(deleted)';
const poFor=(u,o)=>u&&u.po&&u.po[o.id]!=null&&u.po[o.id]!==''?+u.po[o.id]:+o.usd||0;
const myUrl=(o,a)=>new URL(TRACK,location.href).href+'?o='+o+'&a='+a;

let me=null,role='aff',view='authView',lastLive='';
let RG={k:'7d',f:'',t:''};                       // date range (today / 7d / month / 30d / custom)
let S={off:null,show:{imp:0,clk:1,led:1}};       // affiliate view state
let A={pane:'ov',flt:'all',aff:null,off:null,editO:null,mEdit:null,q:'',lf:''};   // admin view state
const cur=()=>affs().find(x=>x.id===me);

function rng(R){const now=new Date(),sod=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  if(R.k==='today')return[sod,sod+D-1];
  if(R.k==='7d')return[sod-6*D,sod+D-1];
  if(R.k==='30d')return[sod-29*D,sod+D-1];
  if(R.k==='month')return[new Date(now.getFullYear(),now.getMonth(),1).getTime(),sod+D-1];
  if(R.k==='custom'&&R.f&&R.t){let a=new Date(R.f+'T00:00:00').getTime(),b=new Date(R.t+'T23:59:59').getTime();if(a>b){const x=a;a=b;b=x}return[a,b]}
  return[sod-6*D,sod+D-1]}

/* collect events for a filter {a:affiliateId,o:offerId} inside a date range */
function collect(f,R){const[s,e]=rng(R||RG),ok=x=>x.t>=s&&x.t<=e&&(!f||((!f.a||x.a===f.a)&&(!f.o||x.o===f.o)));
  const I=DB.g('imp',[]).filter(ok),C=DB.g('clk',[]).filter(ok),L=DB.g('led',[]).filter(ok);
  const r={I,C,L,imp:sum(I),clk:sum(C),led:sum(L),usd:L.reduce((t,x)=>t+(x.usd||0),0)};
  r.cr=r.clk?r.led/r.clk*100:0;r.epc=r.clk?r.usd/r.clk:0;return r}
const all=f=>collect(f,{k:'custom',f:'2000-01-01',t:'2100-01-01'});

function series(r){const[s,e]=rng(RG),span=e-s+1,st=span<=D?3600000:(span/D>92?7*D:D),n=Math.ceil(span/st),z=()=>Array(n).fill(0),o={imp:z(),clk:z(),led:z()},lab=[];
  for(let i=0;i<n;i++){const d=new Date(s+i*st);lab.push(st===3600000?d.getHours()+':00':d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'}))}
  const put=(k,a)=>a.forEach(x=>{const i=Math.max(0,Math.min(n-1,Math.floor((x.t-s)/st)));o[k][i]+=(x.n||1)});
  put('imp',r.I);put('clk',r.C);put('led',r.L);return{lab,o}}

/* ===== PART 4: CHARTS (pure SVG, no library needed) ===== */
function lineChart(lab,sr,pre){const W=720,H=270,L=46,R=14,T=14,B=30,iw=W-L-R,ih=H-T-B,n=lab.length;
  const act=sr.filter(s=>S.show[s.k]),mx=Math.max(1,...act.flatMap(s=>s.d)),pw=Math.pow(10,Math.floor(Math.log10(mx))),f=mx/pw,top=(f<=1?1:f<=2?2:f<=5?5:10)*pw;
  const X=i=>L+(n<2?iw/2:i*iw/(n-1)),Y=v=>T+ih-v/top*ih;let g='';
  for(let k=0;k<=4;k++){const v=top*k/4,y=Y(v);g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" class="gl"/><text x="${L-8}" y="${y+4}" class="ax" text-anchor="end">${+v.toFixed(1)}</text>`}
  const step=Math.max(1,Math.ceil(n/8));for(let i=0;i<n;i+=step)g+=`<text x="${X(i)}" y="${H-8}" class="ax" text-anchor="middle">${lab[i]}</text>`;
  const defs=act.map((s,j)=>`<linearGradient id="${pre}${j}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.c}" stop-opacity=".35"/><stop offset="1" stop-color="${s.c}" stop-opacity="0"/></linearGradient>`).join('');
  const lines=act.map((s,j)=>{const pts=s.d.map((v,i)=>[X(i),Y(v)]),d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
    return `<path d="${d}L${X(n-1)} ${T+ih}L${X(0)} ${T+ih}Z" fill="url(#${pre}${j})" class="area"/><path d="${d}" fill="none" stroke="${s.c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" pathLength="1" class="ln"/>`+
      (n<=45?pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#fff" stroke="${s.c}" stroke-width="2" class="dt"><title>${s.name} · ${lab[i]}: ${s.d[i]}</title></circle>`).join(''):'')}).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Performance chart"><defs>${defs}</defs>${g}${lines}</svg>`}

const bars=L=>{const m=Math.max(1,...L.map(x=>x.v));return L.length?`<div class="bars">${L.map(x=>`<div class="br"><span class="bl">${esc(x.l)}</span><div class="bar"><span style="--w:${(x.v/m*100).toFixed(1)}%;--c:${x.c}"></span></div><b>${x.t}</b></div>`).join('')}</div>`:'<p class="small">No data yet.</p>'};

/* KPI cards + chart for a filter. p = unique prefix for the count-up animation */
function statsBlock(f,p){const r=collect(f),se=series(r);
  const K=[['imp','Impressions',r.imp,'n','#8A94B8'],['clk','Clicks',r.clk,'n','#3A6BFF'],['led','Conversions',r.led,'n','#F2A33A'],['cr','CR',r.cr,'p','#7A4DFF'],['usd','Earnings (USD)',r.usd,'u','#1FA37A'],['epc','EPC',r.epc,'u','#E0527A']];
  const sr=[{k:'imp',name:'Impressions',c:'#8A94B8',d:se.o.imp},{k:'clk',name:'Clicks',c:'#3A6BFF',d:se.o.clk},{k:'led',name:'Conversions',c:'#F2A33A',d:se.o.led}];
  return `<div class="kpis">${K.map((k,i)=>`<div class="kpi" style="--i:${i};--c:${k[4]}"><span>${k[1]}</span><b data-k="${p}${k[0]}" data-v="${k[2]}" data-f="${k[3]}">${fmtv(k[2],k[3])}</b></div>`).join('')}</div>
  <div class="panel"><div class="ph"><h3>Performance</h3><div class="legend">${sr.map(s=>`<button class="lg${S.show[s.k]?' on':''}" data-act="tog" data-k="${s.k}"><i style="background:${s.c}"></i>${s.name}</button>`).join('')}</div></div>${lineChart(se.lab,sr,'g'+p)}</div>`}

const prevV={};
function countUp(){document.querySelectorAll('#liveBox [data-v]').forEach(el=>{const k=el.dataset.k,to=+el.dataset.v,from=prevV[k]||0;prevV[k]=to;if(from===to)return;const t0=performance.now();
  (function f(t){const p=Math.min(1,(t-t0)/700),v=from+(to-from)*(1-Math.pow(1-p,3));el.textContent=fmtv(v,el.dataset.f);if(p<1)requestAnimationFrame(f)})(t0)})}

const drawRange=()=>{const b=$('rangeBar');if(!b)return;
  b.innerHTML=`<div class="rb">${[['today','Today'],['7d','Last 7 days'],['month','This month'],['30d','Last 30 days'],['custom','Custom range']].map(x=>`<button class="rc${RG.k===x[0]?' on':''}" data-act="rk" data-k="${x[0]}">${x[1]}</button>`).join('')}<span class="cust${RG.k==='custom'?' on':''}"><input type="date" data-d="f" value="${RG.f}"><b>→</b><input type="date" data-d="t" value="${RG.t}"></span></div>`};
function drawLive(force){const b=$('liveBox');if(!b)return;let h='';
  try{h=view==='affView'?affLive():admLive()}catch(e){console.error(e);return}
  if(h===lastLive&&!force)return;lastLive=h;b.innerHTML=h;countUp()}

/* activity feed: admin/affiliate log + clicks + leads */
function feed(f,n){const ev=[];
  DB.g('log',[]).forEach(x=>{if(!f||x.a===f.a)ev.push({t:x.t,a:x.a,x:x.x,k:x.w==='admin'?'adm':'log'})});
  DB.g('clk',[]).forEach(x=>{if(!f||x.a===f.a)ev.push({t:x.t,a:x.a,x:(x.n>1?x.n+' clicks':'Click')+' on '+offName(x.o),k:'clk'})});
  DB.g('led',[]).forEach(x=>{if(!f||x.a===f.a)ev.push({t:x.t,a:x.a,x:(x.n>1?x.n+' conversions':'Conversion')+' on '+offName(x.o)+' ('+usd(x.usd)+')',k:'led'})});
  return ev.sort((a,b)=>b.t-a.t).slice(0,n)}
const feedHTML=(L,nm)=>L.length?`<ul class="feed">${L.map(e=>`<li class="${e.k}"><i></i><div><b>${nm&&e.a?esc(affName(e.a))+' · ':''}${esc(e.x)}</b><span class="small">${dt(e.t)}</span></div></li>`).join('')}</ul>`:'<p class="small">No activity yet.</p>';

/* view switch */
const show=v=>{view=v;['authView','affView','admView'].forEach(x=>$(x).classList.toggle('hide',x!==v));
  if(v!=='affView')$('affRoot').innerHTML='';if(v!=='admView')$('admRoot').innerHTML=''};
const tab=t=>{document.querySelectorAll('.tab[data-t]').forEach(x=>x.classList.toggle('on',x.dataset.t===t));['login','apply','admin','reset'].forEach(x=>$('t-'+x).classList.toggle('hide',x!==t))};
chips('verts',VERT,'verts');chips('traffic',TRAF,'traffic');
document.querySelectorAll('.tab[data-t]').forEach(b=>b.onclick=()=>tab(b.dataset.t));

/* ===== PART 5: APPLY, LOGIN, FORGOT PASSWORD ===== */
$('fApply').onsubmit=e=>{e.preventDefault();const f=e.target,em=f.email.value.trim().toLowerCase(),ph=f.phone.value.trim(),v=chk(f,'verts'),t=chk(f,'traffic');
  if(!v.length||!t.length)return msg('mApply','Select at least one vertical and one traffic source.','err');
  if(blocked(em,ph))return msg('mApply','We cannot accept this application.','err');
  if(affs().some(x=>x.email===em))return msg('mApply','This email has already applied.','err');
  const n=DB.g('seq',1000)+1;DB.s('seq',n);const id=uid('a');
  DB.s('aff',affs().concat({id:id,uid:'VX'+n,name:f.name.value.trim(),email:em,phone:ph,pass:f.password.value,address:f.address.value.trim(),verticals:v,traffic:t,
    city:f.city.value.trim(),state:f.state.value.trim(),country:f.country.value.trim(),notes:f.notes.value.trim(),anote:'',
    status:'pending',offers:[],po:{},mgr:'',logins:0,lastLogin:0,date:ds(Date.now())}));
  lg(id,'Applied to join (VX'+n+')');
  f.reset();msg('mApply','Thanks! Your application is submitted. We will contact you if approved.','ok')};

$('fLogin').onsubmit=e=>{e.preventDefault();const f=e.target,em=f.email.value.trim().toLowerCase(),u=affs().find(x=>x.email===em);
  if(!u||u.pass!==f.password.value)return msg('mLogin','Incorrect email or password.','err');
  if(u.status==='banned'||blocked(em,u.phone))return msg('mLogin','This account has been permanently closed.','err');
  const m={pending:'Your application is still under review.',rejected:'Your application was not approved.',paused:'Your account is paused. Please contact Vedantix.'}[u.status];
  if(m)return msg('mLogin',m,'err');
  me=u.id;f.reset();$('mLogin').className='msg';S.off=null;
  saveAff(u.id,x=>{x.logins=(x.logins||0)+1;x.lastLogin=Date.now()});lg(u.id,'Logged in');showAff()};

$('fAdmin').onsubmit=e=>{e.preventDefault();const f=e.target;
  if(f.email.value.trim().toLowerCase()!==ADMIN_EMAIL||f.password.value!==DB.g('adm',ADMIN_PASS))return msg('mAdmin','Incorrect email or password.','err');
  f.reset();$('mAdmin').className='msg';A.pane='ov';A.aff=A.off=null;A.editO=null;show('admView');renderAdm()};

const okUser=(r,e)=>r==='admin'?e===ADMIN_EMAIL:(u=>!!u&&u.status!=='banned'&&u.status!=='rejected'&&!blocked(e,u.phone))(affs().find(x=>x.email===e));
document.querySelectorAll('[data-forgot]').forEach(a=>a.onclick=e=>{e.preventDefault();role=a.dataset.forgot;
  $('fForgot').classList.remove('hide');$('fReset').classList.add('hide');$('mReset').className='msg';tab('reset')});
$('fForgot').onsubmit=e=>{e.preventDefault();const em=e.target.email.value.trim().toLowerCase();
  if(okUser(role,em)){const c=String(Math.floor(100000+Math.random()*900000));
    DB.s('rst',DB.g('rst',[]).filter(x=>x.e!==em).concat({e:em,r:role,c:c,x:Date.now()+9e5}));
    msg('mReset','Demo mode: your reset code is '+c+'. The live version will email it.','ok')}
  else msg('mReset','If this email is eligible, a reset code has been sent.','ok');
  e.target.classList.add('hide');$('fReset').classList.remove('hide');$('fReset').email.value=em};
$('fReset').onsubmit=e=>{e.preventDefault();const f=e.target,em=f.email.value,r=DB.g('rst',[]).find(x=>x.e===em&&x.r===role&&x.c===f.code.value.trim()&&x.x>Date.now());
  if(!r||!okUser(role,em))return msg('mReset','Invalid or expired code.','err');
  if(role==='admin')DB.s('adm',f.password.value);else saveAff(em,x=>x.pass=f.password.value);
  DB.s('rst',DB.g('rst',[]).filter(x=>x.e!==em));f.reset();
  tab(role==='admin'?'admin':'login');msg(role==='admin'?'mAdmin':'mLogin','Password changed. Please log in.','ok')};

/* ===== PART 6: AFFILIATE DASHBOARD ===== */
function showAff(){const u=cur();if(!u)return;
  $('affRoot').innerHTML=`<div class="dash"><div class="topbar"><div><h2>Welcome, ${esc(u.name)}</h2><span class="small">ID ${esc(u.uid||'')} · your offers, stats and tracking links</span></div>
  <div class="acts"><span class="live"><i></i>LIVE <small id="stamp"></small></span><button class="btn dark sm" data-logout>Log out</button></div></div>
  <div id="rangeBar"></div><div id="liveBox"></div></div>`;
  show('affView');drawRange();lastLive='';drawLive();tick()}

function mgrCard(u){const m=mgrs().find(x=>x.id===u.mgr);
  return m?`<div class="mgr"><div class="av">${esc(m.name.charAt(0).toUpperCase())}</div><div><b>${esc(m.name)}</b><span class="small">Your account manager</span><br><span class="small">Teams ID: <b style="display:inline">${esc(m.teams)}</b></span></div><a class="btn sm" target="_blank" rel="noopener" href="https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(m.teams)}">Chat on Teams</a></div>`
    :`<div class="mgr"><div class="av">?</div><div><b>Manager not assigned yet</b><span class="small">Vedantix will assign your manager soon.</span></div></div>`}

function offerTable(u){let T={imp:0,clk:0,led:0,usd:0};
  const rows=(u.offers||[]).map(id=>offs().find(o=>o.id===id)).filter(Boolean).map(o=>{const r=collect({a:u.id,o:o.id});T.imp+=r.imp;T.clk+=r.clk;T.led+=r.led;T.usd+=r.usd;
    return `<tr><td><b>${esc(o.name)}</b>${o.status!=='live'?' <span class="badge b-paused">paused</span>':''}</td><td>${usd(poFor(u,o))}</td><td>${fmt(r.imp)}</td><td>${fmt(r.clk)}</td><td>${fmt(r.led)}</td><td>${r.clk?r.cr.toFixed(2)+'%':'-'}</td><td><b>${usd(r.usd)}</b></td></tr>`}).join('');
  const tot=rows?`<tr><td><b>Total</b></td><td></td><td><b>${fmt(T.imp)}</b></td><td><b>${fmt(T.clk)}</b></td><td><b>${fmt(T.led)}</b></td><td><b>${T.clk?(T.led/T.clk*100).toFixed(2)+'%':'-'}</b></td><td><b>${usd(T.usd)}</b></td></tr>`:'';
  return `<div class="panel"><h3>Offer-wise performance</h3><div class="tablewrap"><table><thead><tr><th>Offer</th><th>PO</th><th>Impr.</th><th>Clicks</th><th>Conv.</th><th>CR</th><th>USD</th></tr></thead><tbody>${rows||'<tr><td colspan="7" class="small">No offers assigned yet.</td></tr>'}${tot}</tbody></table></div></div>`}

function affLive(){const u=cur();if(!u)return'';
  const O=offs().filter(x=>x.status==='live'),mine=O.filter(x=>(u.offers||[]).includes(x.id));
  if(S.off){const o=mine.find(x=>x.id===S.off);if(o)return affOffer(u,o);S.off=null}
  const live=[],appr=[];mine.forEach(o=>(all({a:u.id,o:o.id}).clk>0?live:appr).push(o));
  const rq=DB.g('req',[]).filter(r=>r.a===u.id&&r.st==='pending').map(r=>r.o),fresh=O.filter(o=>!(u.offers||[]).includes(o.id));
  const pt=o=>esc((o.ptype||'Lead').toLowerCase());
  const card=(o,k)=>{
    if(k==='new')return `<div class="oc"><b>${esc(o.name)}</b><span class="small">${esc(o.cat||'')} · ${esc(o.region)}</span><span class="pay">${usd(o.usd)} <small>per ${pt(o)}</small></span>${rq.includes(o.id)?'<span class="badge b-pending">Request sent</span>':`<button class="btn sm" data-act="reqacc" data-id="${esc(o.id)}">Request access</button>`}</div>`;
    const r=collect({a:u.id,o:o.id});
    return `<div class="oc"><b>${esc(o.name)}</b><span class="small">${esc(o.region)}</span><span class="pay">${usd(poFor(u,o))} <small>per ${pt(o)}</small></span><div class="mini"><span>${fmt(r.clk)}<small>clicks</small></span><span>${r.clk?r.cr.toFixed(1)+'%':'-'}<small>CR</small></span><span>${usd(r.usd)}<small>USD</small></span></div><button class="btn sm dark" data-act="open" data-id="${esc(o.id)}">Open offer</button></div>`};
  const col=(t,c,l,k,em)=>`<div class="col"><h4><i class="dot ${c}"></i>${t}<em>${l.length}</em></h4>${l.map(o=>card(o,k)).join('')||`<p class="small">${em}</p>`}</div>`;
  return mgrCard(u)+statsBlock({a:u.id},'af')+`<div class="cols">${col('Live offers','g',live,'live','No live offers yet.')}${col('Approved offers','b',appr,'appr','Approved offers waiting for first traffic appear here.')}${col('New offers','o',fresh,'new','No new offers right now.')}</div>`+offerTable(u)}

function affOffer(u,o){const L=myUrl(o.id,u.id),pt=esc((o.ptype||'Lead').toLowerCase());
  const rows=[['Payout',usd(poFor(u,o))+' per '+pt],['Category',o.cat],['Traffic allowed',o.traffic],['Region',o.region],['Timing / caps',o.timing],['Details',o.desc]];
  return `<button class="btn sm dark" data-act="back" style="margin-bottom:14px">← Back to dashboard</button>
  <div class="panel ohead"><div><h2>${esc(o.name)}</h2><span class="badge b-approved">${esc(o.cat||'Offer')}</span></div><div class="po">${usd(poFor(u,o))}<small>per ${pt}</small></div></div>
  ${statsBlock({a:u.id,o:o.id},'ao')}
  <div class="two"><div class="panel"><h3>About this offer</h3><table>${rows.map(r=>`<tr><th>${r[0]}</th><td>${esc(r[1])}</td></tr>`).join('')}</table></div>
  <div class="panel"><h3>Your tracking link</h3><input readonly value="${esc(L)}" onclick="this.select()"><p style="margin:12px 0" class="acts"><button class="btn sm" data-act="cp" data-v="${esc(L)}" data-o="${esc(o.id)}">Copy link</button>${o.preview?`<a class="btn sm dark" href="${esc(safe(o.preview))}" target="_blank" rel="noopener">Preview offer</a>`:''}</p>
  <p class="small">Send traffic only through this link so every click and lead is credited to you.</p></div></div>`}

/* ===== PART 7: ADMIN PANEL ===== */
const B=(act,l,at,c)=>`<button class="btn sm ${c||''}" data-act="${act}" ${at||''}>${l}</button>`;

function renderAdm(){const P=A.pane,rq=DB.g('req',[]).filter(r=>r.st==='pending').length,pend=affs().filter(x=>x.status==='pending').length;
  const tabs=[['ov','Overview'],['aff','Affiliates',pend],['off','Offers'],['req','Requests',rq],['mgr','Managers'],['log','Activity']].map(t=>`<button class="tab${P===t[0]?' on':''}" data-act="pane" data-p="${t[0]}">${t[1]}${t[2]?`<em class="cnt">${t[2]}</em>`:''}</button>`).join('');
  let body='';
  if(P==='ov')body=`<div id="rangeBar"></div><div id="liveBox"></div>${demoBox()}`;
  else if(P==='aff')body=A.aff?affDetail(affs().find(x=>x.id===A.aff)):paneAffList();
  else if(P==='off')body=A.editO?offForm():A.off?offDetail(offs().find(x=>x.id===A.off)):paneOff();
  else if(P==='req')body=paneReq();else if(P==='mgr')body=paneMgr();else body=paneLog();
  $('admRoot').innerHTML=`<div class="dash"><div class="topbar"><div><h2>Admin panel</h2><span class="small">Full control of affiliates, offers, payouts and tracking</span></div>
    <div class="acts"><span class="live"><i></i>LIVE <small id="stamp"></small></span><button class="btn dark sm" data-logout>Log out</button></div></div>
    <div class="tabs">${tabs}</div>${body}</div>`;
  drawRange();lastLive='';drawLive();tick()}

function admLive(){
  if(A.pane==='ov')return ovLive();
  if(A.pane==='aff'&&A.aff){const u=affs().find(x=>x.id===A.aff);return u?statsBlock({a:u.id},'ad')+offerTable(u):''}
  if(A.pane==='off'&&A.off){const o=offs().find(x=>x.id===A.off);return o?statsBlock({o:o.id},'od')+offAffTable(o):''}
  return''}

function ovLive(){const a=affs(),o=offs();
  const strip=`<div class="strip"><div><b>${a.length}</b><span>Affiliates</span></div><div><b>${a.filter(x=>x.status==='approved').length}</b><span>Approved</span></div><div><b>${a.filter(x=>x.status==='pending').length}</b><span>Pending review</span></div><div><b>${o.filter(x=>x.status==='live').length}</b><span>Live offers</span></div></div>`;
  const ta=a.filter(x=>x.status==='approved').map(u=>({u,r:collect({a:u.id})})).sort((x,y)=>y.r.usd-x.r.usd||y.r.clk-x.r.clk).slice(0,6);
  const to=o.map(x=>({x,r:collect({o:x.id})})).sort((x,y)=>y.r.clk-x.r.clk).slice(0,6);
  return strip+statsBlock(null,'ov')+`<div class="two"><div class="panel"><h3>Top affiliates (earnings)</h3>${bars(ta.map(t=>({l:t.u.name,v:t.r.usd,t:usd(t.r.usd),c:'var(--green)'})))}</div>
  <div class="panel"><h3>Top offers (clicks)</h3>${bars(to.map(t=>({l:t.x.name,v:t.r.clk,t:fmt(t.r.clk),c:'var(--blue)'})))}</div></div>
  <div class="panel"><h3>Recent activity</h3>${feedHTML(feed(null,10),1)}</div>`}

const demoBox=()=>`<div class="panel"><h3>Demo tools</h3><p class="small">Fill the portal with sample affiliates, offers and 30 days of stats to test everything. Demo affiliates log in with password <b>demo12345</b>.</p><div class="acts">${B('demo','Load demo data')} ${B('undemo','Remove demo data','','red')}</div></div>`;

/* --- affiliates list --- */
function paneAffList(){const a=affs(),n=s=>a.filter(x=>x.status===s).length;
  const fl=['all','pending','approved','paused','rejected','banned'].map(f=>`<button class="tab${A.flt===f?' on':''}" data-act="flt" data-f="${f}">${f}</button>`).join('');
  return `<div class="pbar"><input id="qAff" placeholder="Search name, email, phone, ID…" value="${esc(A.q)}"></div><p class="sub">${a.length} total · ${n('pending')} pending · ${n('approved')} approved · ${n('paused')} paused · ${n('banned')} banned</p><div class="tabs">${fl}</div>
  <div class="panel"><div class="tablewrap" id="affList">${affTable()}</div></div>`}
function affTable(){const q=A.q.toLowerCase().trim();
  const rows=affs().filter(u=>(A.flt==='all'||u.status===A.flt)&&(!q||[u.name,u.email,u.phone,u.uid].join(' ').toLowerCase().includes(q))).map(u=>{const r=all({a:u.id}),e=esc(u.id);
    return `<tr class="rowlink" data-act="ad" data-id="${e}"><td><b>${esc(u.name)}</b><br><span class="small">${esc(u.uid||'')} · ${esc(u.email)}<br>${esc(u.phone)}</span></td><td>${esc((u.verticals||[]).join(', '))}</td><td><span class="badge b-${u.status}">${u.status}</span><br><span class="small">${(u.offers||[]).length} offers</span></td><td>${fmt(r.clk)} clicks<br>${fmt(r.led)} leads<br><b>${usd(r.usd)}</b></td><td>${u.status==='pending'?B('st','Approve','data-id="'+e+'" data-s="approved"')+' '+B('st','Reject','data-id="'+e+'" data-s="rejected"','red'):'<span class="small">Open →</span>'}</td></tr>`}).join('');
  return `<table><thead><tr><th>Affiliate</th><th>Verticals</th><th>Status</th><th>All-time</th><th></th></tr></thead><tbody>${rows||'<tr><td colspan="5" class="small">Nothing here.</td></tr>'}</tbody></table>`}

/* --- one affiliate: every detail + control --- */
function affDetail(u){if(!u){A.aff=null;return paneAffList()}
  const e=esc(u.id),st=u.status,S_=(s,l,c)=>B('st',l,`data-id="${e}" data-s="${s}"`,c);
  let act='';if(st!=='banned'){if(st!=='approved')act+=S_('approved',st==='paused'?'Resume':'Approve','green');if(st==='approved')act+=S_('paused','Pause','dark');if(st==='pending')act+=S_('rejected','Reject','red');act+=B('ban','Ban forever',`data-id="${e}"`,'red')}
  act+=B('del','Delete account',`data-id="${e}"`,'red');
  const I=(n,l,v,t)=>`<label>${l}${t?`<textarea name="${n}" rows="2">${esc(v)}</textarea>`:`<input name="${n}" value="${esc(v)}">`}</label>`;
  const assigned=(u.offers||[]).map(id=>offs().find(o=>o.id===id)).filter(Boolean);
  const assign=offs().map(o=>{const on=(u.offers||[]).includes(o.id),r=all({a:u.id,o:o.id});
    return `<tr><td><label style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" style="width:auto" data-as="${esc(o.id)}" data-id="${e}" ${on?'checked':''}><b>${esc(o.name)}</b></label><span class="small">${esc(o.region)} · default ${usd(o.usd)}</span></td><td><input type="number" step="0.01" min="0" style="max-width:110px" data-po="${esc(o.id)}" data-id="${e}" placeholder="${o.usd}" value="${u.po&&u.po[o.id]!=null?esc(u.po[o.id]):''}"></td><td>${fmt(r.clk)}</td><td>${fmt(r.led)}</td><td>${usd(r.usd)}</td><td><span class="badge b-${o.status==='live'?'approved':'paused'}">${o.status}</span></td></tr>`}).join('');
  return `<p><button class="btn sm dark" data-act="adback">← All affiliates</button></p>
  <div class="panel"><div class="ph"><h3>${esc(u.name)} <span class="badge b-${st}">${st}</span></h3><div class="acts">${act}</div></div>
   <div class="info"><div><b>User ID</b>${esc(u.uid||'')}</div><div><b>Joined</b>${esc(u.date||'')}</div><div><b>Last login</b>${u.lastLogin?dt(u.lastLogin):'Never'}</div><div><b>Total logins</b>${u.logins||0}</div><div><b>Verticals</b>${esc((u.verticals||[]).join(', '))}</div><div><b>Traffic sources</b>${esc((u.traffic||[]).join(', '))}</div><div><b>Application notes</b>${esc(u.notes||'-')}</div></div>
   <form id="fProf" data-id="${e}"><div class="g2">${I('name','Full name',u.name)}${I('email','Email (login ID)',u.email)}${I('phone','Phone / WhatsApp',u.phone)}
   <label>Password (visible to admin)<div class="pw"><input name="pass" id="pwf" type="password" value="${esc(u.pass)}"><button type="button" class="btn sm dark" data-act="pw">Show</button></div></label></div>
   ${I('address','Address',u.address,1)}<div class="row">${I('city','City',u.city)}${I('state','State',u.state)}${I('country','Country',u.country)}</div>
   <div class="g2"><label>Account manager<select name="mgr"><option value="">— none —</option>${mgrs().map(m=>`<option value="${esc(m.id)}"${u.mgr===m.id?' selected':''}>${esc(m.name)} (${esc(m.teams)})</option>`).join('')}</select></label>${I('anote','Internal admin note',u.anote||'')}</div>
   <div><button class="btn" type="submit">Save details</button></div></form></div>
  <div id="rangeBar"></div><div id="liveBox"></div>
  <div class="panel"><h3>Offers for this affiliate</h3><p class="small">Tick to give or remove an offer. Enter a custom PO (USD) for this affiliate; blank uses the offer's default. A new PO applies to leads recorded from now on.</p><div class="tablewrap"><table><thead><tr><th>Offer</th><th>Custom PO $</th><th>Clicks</th><th>Leads</th><th>USD</th><th>Offer</th></tr></thead><tbody>${assign||'<tr><td colspan="6" class="small">Create offers first.</td></tr>'}</tbody></table></div></div>
  <div class="panel"><h3>Adjust numbers (increase / decrease)</h3>${assigned.length?`<form id="fAdj" data-id="${e}"><div class="row"><label>Offer<select name="o">${assigned.map(o=>`<option value="${esc(o.id)}">${esc(o.name)}</option>`).join('')}</select></label><label>What<select name="m"><option value="led">Leads / conversions</option><option value="clk">Clicks</option><option value="imp">Impressions</option></select></label><label>Quantity<input type="number" name="n" min="1" value="1"></label></div><div class="acts"><button class="btn green" type="submit" value="add">+ Add</button><button class="btn red" type="submit" value="rem">− Remove</button></div></form><p class="small">Added leads use this affiliate's PO. Removing takes away the most recent entries. Every change is logged.</p>`:'<p class="small">Assign an offer first.</p>'}</div>
  <div class="panel"><h3>Full activity timeline</h3>${feedHTML(feed({a:u.id},80),0)}</div>`}

/* --- offers --- */
function paneOff(){
  const rows=offs().map(o=>{const r=all({o:o.id}),n=affs().filter(u=>(u.offers||[]).includes(o.id)).length;
    return `<tr><td><b>${esc(o.name)}</b><br><span class="small">${esc(o.cat||'')} · ${esc(o.region)}</span></td><td>${esc(o.po)}</td><td>${n}</td><td>${fmt(r.clk)} / ${fmt(r.led)}</td><td><span class="badge b-${o.status==='live'?'approved':'paused'}">${o.status}</span></td><td class="acts">${B('ao','Offer page','data-id="'+esc(o.id)+'"','dark')}${B('oe','Edit','data-id="'+esc(o.id)+'"')}${B('od','Delete','data-id="'+esc(o.id)+'"','red')}</td></tr>`}).join('');
  return `<p>${B('oe','+ New offer','data-id=""')}</p><div class="panel"><div class="tablewrap"><table><thead><tr><th>Offer</th><th>Default PO</th><th>Affiliates</th><th>Clicks / Leads</th><th>Status</th><th></th></tr></thead><tbody>${rows||'<tr><td colspan="6" class="small">No offers yet.</td></tr>'}</tbody></table></div></div>`}

function offForm(){const o=A.editO==='new'?{status:'live',ptype:'Lead',cat:VERT[0]}:offs().find(x=>x.id===A.editO)||{};
  const I=(n,l,t,x)=>`<label>${l}${t?`<textarea name="${n}" rows="3">${esc(o[n])}</textarea>`:`<input name="${n}" ${x||''} value="${esc(o[n])}">`}</label>`;
  const S2=(n,l,L)=>`<label>${l}<select name="${n}">${L.map(v=>`<option${o[n]===v?' selected':''}>${esc(v)}</option>`).join('')}</select></label>`;
  return `<div class="panel"><h3>${o.id?'Edit offer':'New offer'}</h3><form id="fOff" data-id="${o.id||''}"><div class="g2">${I('name','Offer name')}${S2('cat','Category',VERT)}${I('usd','Default payout (USD)','','type="number" step="0.01" min="0"')}${S2('ptype','Payout type',PTYPE)}${I('traffic','Allowed traffic (e.g. Facebook ads, Google ads)')}${I('region','Region / GEO')}</div>
  ${I('timing','Timing / caps')}${I('desc','Details / rules for affiliates',1)}${I('link','Advertiser link (use {click_id} and {aff} where needed)')}${I('preview','Preview page link')}
  <label>Status<select name="status"><option value="live"${o.status==='live'?' selected':''}>Live</option><option value="paused"${o.status==='paused'?' selected':''}>Paused</option></select></label>
  <div class="acts"><button class="btn" type="submit">Save offer</button>${B('oc','Cancel','type="button"','dark')}</div></form></div>`}

function offDetail(o){if(!o){A.off=null;return paneOff()}
  const rows=[['Default payout',o.po],['Category',o.cat],['Allowed traffic',o.traffic],['Region',o.region],['Timing / caps',o.timing],['Advertiser link',o.link],['Preview link',o.preview],['Details',o.desc]];
  return `<p><button class="btn sm dark" data-act="aoback">← All offers</button></p>
  <div class="panel"><div class="ph"><h3>${esc(o.name)} <span class="badge b-${o.status==='live'?'approved':'paused'}">${o.status}</span></h3><div class="acts">${B('oe','Edit','data-id="'+esc(o.id)+'"')}${B('ot',o.status==='live'?'Pause offer':'Make live','data-id="'+esc(o.id)+'"','dark')}${B('od','Delete','data-id="'+esc(o.id)+'"','red')}</div></div>
  <table>${rows.map(r=>`<tr><th>${r[0]}</th><td style="word-break:break-all">${esc(r[1])}</td></tr>`).join('')}<tr><th>Tracking link format</th><td style="word-break:break-all">${esc(myUrl(o.id,'AFFILIATE_ID'))}</td></tr></table>
  ${o.preview?`<p style="margin-top:12px"><a class="btn sm dark" href="${esc(safe(o.preview))}" target="_blank" rel="noopener">Open preview page</a></p>`:''}</div>
  <div id="rangeBar"></div><div id="liveBox"></div>
  <div class="panel"><h3>Affiliates on this offer &amp; their tracking links</h3>${offLinks(o)}</div>`}
function offAffTable(o){const rows=affs().filter(u=>(u.offers||[]).includes(o.id)).map(u=>{const r=collect({a:u.id,o:o.id});
  return `<tr><td><b>${esc(u.name)}</b><br><span class="small">${esc(u.uid||'')}</span></td><td>${fmt(r.imp)}</td><td>${fmt(r.clk)}</td><td>${fmt(r.led)}</td><td>${r.clk?r.cr.toFixed(2)+'%':'-'}</td><td><b>${usd(r.usd)}</b></td></tr>`}).join('');
  return `<div class="panel"><h3>Affiliate-wise performance</h3><div class="tablewrap"><table><thead><tr><th>Affiliate</th><th>Impr.</th><th>Clicks</th><th>Conv.</th><th>CR</th><th>USD</th></tr></thead><tbody>${rows||'<tr><td colspan="6" class="small">No affiliate has this offer yet.</td></tr>'}</tbody></table></div></div>`}
function offLinks(o){const as=affs().filter(u=>(u.offers||[]).includes(o.id)),free=affs().filter(u=>u.status==='approved'&&!(u.offers||[]).includes(o.id));
  const rows=as.map(u=>{const L=myUrl(o.id,u.id);return `<tr><td><b>${esc(u.name)}</b><br><span class="small">${esc(u.uid||'')}</span></td><td><input type="number" step="0.01" min="0" style="max-width:100px" data-po="${esc(o.id)}" data-id="${esc(u.id)}" placeholder="${o.usd}" value="${u.po&&u.po[o.id]!=null?esc(u.po[o.id]):''}"></td><td><input readonly value="${esc(L)}" onclick="this.select()"></td><td class="acts">${B('cp','Copy','data-v="'+esc(L)+'"')}${B('unassign','Remove','data-id="'+esc(u.id)+'" data-o="'+esc(o.id)+'"','red')}</td></tr>`}).join('');
  return `<div class="tablewrap"><table><thead><tr><th>Affiliate</th><th>Custom PO $</th><th>Tracking link</th><th></th></tr></thead><tbody>${rows||'<tr><td colspan="4" class="small">No affiliate assigned yet.</td></tr>'}</tbody></table></div>
  <label style="max-width:360px;margin-top:14px">Give this offer to an affiliate<select data-qa="${esc(o.id)}"><option value="">— choose approved affiliate —</option>${free.map(u=>`<option value="${esc(u.id)}">${esc(u.name)} (${esc(u.uid||'')})</option>`).join('')}</select></label>`}

/* --- requests, managers, activity --- */
function paneReq(){const R=DB.g('req',[]).slice().reverse(),p=R.filter(r=>r.st==='pending'),d=R.filter(r=>r.st!=='pending').slice(0,15);
  const row=r=>`<tr><td><b>${esc(affName(r.a))}</b></td><td>${esc(offName(r.o))}</td><td>${dt(r.t)}</td><td>${r.st==='pending'?B('rq','Approve','data-id="'+esc(r.id)+'" data-v="ok"','green')+' '+B('rq','Reject','data-id="'+esc(r.id)+'" data-v="no"','red'):'<span class="badge b-'+(r.st==='ok'?'approved':'rejected')+'">'+(r.st==='ok'?'approved':'rejected')+'</span>'}</td></tr>`;
  return `<div class="panel"><h3>Offer access requests</h3><p class="small">Affiliates request new offers from their dashboard. Approving assigns the offer at its default PO.</p><div class="tablewrap"><table><thead><tr><th>Affiliate</th><th>Offer</th><th>Requested</th><th></th></tr></thead><tbody>${p.map(row).join('')||'<tr><td colspan="4" class="small">No pending requests.</td></tr>'}</tbody></table></div></div>
  ${d.length?`<div class="panel"><h3>Recent decisions</h3><div class="tablewrap"><table><tbody>${d.map(row).join('')}</tbody></table></div></div>`:''}`}

function paneMgr(){const M=mgrs(),m=M.find(x=>x.id===A.mEdit)||{};
  return `<div class="two"><div class="panel"><h3>Managers</h3><table><tbody>${M.map(x=>`<tr><td><b>${esc(x.name)}</b><br><span class="small">Teams: ${esc(x.teams)}${x.phone?' · '+esc(x.phone):''}<br>${affs().filter(u=>u.mgr===x.id).length} affiliates</span></td><td class="acts">${B('medit','Edit','data-id="'+esc(x.id)+'"')}${B('mdel','Delete','data-id="'+esc(x.id)+'"','red')}</td></tr>`).join('')||'<tr><td class="small">No managers yet.</td></tr>'}</tbody></table></div>
  <div class="panel"><h3>${m.id?'Edit manager':'Add manager'}</h3><form id="fMgr" data-id="${esc(m.id||'')}"><label>Manager name<input name="name" required value="${esc(m.name)}"></label><label>Teams ID (email used in Microsoft Teams)<input name="teams" required value="${esc(m.teams)}"></label><label>Phone (optional)<input name="phone" value="${esc(m.phone)}"></label><div class="acts"><button class="btn" type="submit">Save manager</button>${m.id?B('mcancel','Cancel','type="button"','dark'):''}</div></form><p class="small" style="margin-top:12px">Assign a manager to each affiliate inside the affiliate's page. New approved affiliates get the first manager automatically.</p></div></div>`}

function paneLog(){const f=A.lf?{a:A.lf}:null;
  return `<div class="panel"><div class="ph"><h3>Activity log</h3><select id="lfSel" style="max-width:280px"><option value="">All affiliates</option>${affs().map(u=>`<option value="${esc(u.id)}"${A.lf===u.id?' selected':''}>${esc(u.name)}</option>`).join('')}</select></div>${feedHTML(feed(f,250),1)}</div>`}

/* ===== PART 8: ACTIONS ===== */
const assignOffer=(a,o,on)=>{saveAff(a,x=>{x.offers=(x.offers||[]).filter(k=>k!==o);if(on)x.offers.push(o)});lg(a,(on?'Offer given by admin: ':'Offer removed by admin: ')+offName(o),'admin')};
const setStatus=(id,s)=>{saveAff(id,x=>{x.status=s;if(s==='approved'&&!x.mgr&&mgrs()[0])x.mgr=mgrs()[0].id});lg(id,'Status set to '+s,'admin')};
function adjust(a,o,m,n,add){const L=DB.g(m,[]),u=affs().find(x=>x.id===a),of=offs().find(x=>x.id===o);
  if(add){const ev={t:Date.now(),o:o,a:a,n:n,id:uid('m')};if(m==='led')ev.usd=n*poFor(u,of);L.push(ev)}
  else{let r=n;for(let i=L.length-1;i>=0&&r>0;i--){const x=L[i];if(x.a!==a||x.o!==o)continue;const c=x.n||1,t=Math.min(c,r);if(m==='led'&&x.usd!=null)x.usd=x.usd*(c-t)/c;x.n=c-t;r-=t;if(x.n<=0)L.splice(i,1)}n=n-r}
  DB.s(m,L);return n}

document.addEventListener('click',e=>{
  if(e.target.closest('[data-logout]')){if(me)lg(me,'Logged out');me=null;S.off=null;show('authView');tab('login');return}
  const b=e.target.closest('[data-act]');if(!b)return;const d=b.dataset;
  const redraw=()=>{lastLive='';drawLive()};
  switch(d.act){
    case 'rk':RG.k=d.k;if(d.k==='custom'&&!RG.f){RG.t=ds(Date.now());RG.f=ds(Date.now()-29*D)}drawRange();redraw();break;
    case 'tog':S.show[d.k]=S.show[d.k]?0:1;redraw();break;
    case 'open':S.off=d.id;lg(me,'Viewed offer: '+offName(d.id));scrollTo(0,0);redraw();break;
    case 'back':S.off=null;redraw();break;
    case 'cp':try{navigator.clipboard.writeText(d.v)}catch(x){const t=document.createElement('textarea');t.value=d.v;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
      toast('Link copied');if(d.o&&me)lg(me,'Copied tracking link: '+offName(d.o));break;
    case 'reqacc':{const r=DB.g('req',[]);if(!r.some(x=>x.a===me&&x.o===d.id&&x.st==='pending'))r.push({id:uid('r'),a:me,o:d.id,t:Date.now(),st:'pending'});DB.s('req',r);lg(me,'Requested access to '+offName(d.id));toast('Request sent to admin');redraw();break}
    /* admin */
    case 'pane':A.pane=d.p;A.aff=A.off=null;A.editO=null;A.mEdit=null;renderAdm();break;
    case 'ad':A.pane='aff';A.aff=d.id;renderAdm();scrollTo(0,0);break;
    case 'adback':A.aff=null;renderAdm();break;
    case 'flt':A.flt=d.f;renderAdm();break;
    case 'st':setStatus(d.id,d.s);renderAdm();break;
    case 'ban':{if(!confirm('Ban permanently? This person can never log in again, reset a password, or re-apply with this email/phone.'))return;
      const u=affs().find(x=>x.id===d.id);DB.s('ban',DB.g('ban',[]).concat({email:u.email,phone:u.phone||''}));saveAff(d.id,x=>x.status='banned');lg(d.id,'Banned forever','admin');renderAdm();break}
    case 'del':{if(!confirm('Delete this affiliate and all their clicks, leads and impressions? This cannot be undone.'))return;
      const u=affs().find(x=>x.id===d.id);DB.s('aff',affs().filter(x=>x.id!==d.id));['clk','led','imp'].forEach(k=>DB.s(k,DB.g(k,[]).filter(x=>x.a!==d.id)));DB.s('req',DB.g('req',[]).filter(x=>x.a!==d.id));
      lg('','Deleted affiliate '+u.name+' ('+(u.uid||'')+')','admin');A.aff=null;renderAdm();break}
    case 'pw':{const i=$('pwf');i.type=i.type==='password'?'text':'password';b.textContent=i.type==='password'?'Show':'Hide';break}
    case 'ao':A.pane='off';A.off=d.id;renderAdm();scrollTo(0,0);break;
    case 'aoback':A.off=null;renderAdm();break;
    case 'oe':A.pane='off';A.editO=d.id||'new';A.off=null;renderAdm();scrollTo(0,0);break;
    case 'oc':A.editO=null;renderAdm();break;
    case 'od':{if(!confirm('Delete this offer? It will also be removed from all affiliates.'))return;const n=offName(d.id);
      DB.s('off',offs().filter(x=>x.id!==d.id));const a=affs();a.forEach(x=>x.offers=(x.offers||[]).filter(k=>k!==d.id));DB.s('aff',a);lg('','Deleted offer '+n,'admin');A.off=null;renderAdm();break}
    case 'ot':{const o=offs().find(x=>x.id===d.id);o.status=o.status==='live'?'paused':'live';DB.s('off',offs().map(x=>x.id===o.id?o:x));lg('','Offer '+o.name+' set to '+o.status,'admin');renderAdm();break}
    case 'unassign':assignOffer(d.id,d.o,false);renderAdm();break;
    case 'rq':{const R=DB.g('req',[]),r=R.find(x=>x.id===d.id);r.st=d.v;DB.s('req',R);if(d.v==='ok')assignOffer(r.a,r.o,true);else lg(r.a,'Access request rejected: '+offName(r.o),'admin');renderAdm();break}
    case 'medit':A.mEdit=d.id;renderAdm();break;
    case 'mcancel':A.mEdit=null;renderAdm();break;
    case 'mdel':{if(!confirm('Delete this manager?'))return;DB.s('mgr',mgrs().filter(x=>x.id!==d.id));const a=affs();a.forEach(x=>{if(x.mgr===d.id)x.mgr=''});DB.s('aff',a);renderAdm();break}
    case 'demo':loadDemo();renderAdm();toast('Demo data loaded');break;
    case 'undemo':removeDemo();renderAdm();toast('Demo data removed');break;
  }});

document.addEventListener('change',e=>{const c=e.target,d=c.dataset;
  if(d.d){RG[d.d]=c.value;RG.k='custom';drawRange();lastLive='';drawLive();return}
  if(d.as){assignOffer(d.id,d.as,c.checked);renderAdm();return}
  if(d.po!==undefined){saveAff(d.id,x=>{x.po=x.po||{};x.po[d.po]=c.value});lg(d.id,'PO for '+offName(d.po)+' set to '+(c.value===''?'default':'$'+c.value),'admin');toast('PO saved');return}
  if(d.qa!==undefined&&c.value){assignOffer(c.value,d.qa,true);renderAdm();return}
  if(c.id==='lfSel'){A.lf=c.value;renderAdm()}});
document.addEventListener('input',e=>{if(e.target.id==='qAff'){A.q=e.target.value;$('affList').innerHTML=affTable()}});

document.addEventListener('submit',e=>{const f=e.target,id=f.id;if(!['fOff','fProf','fAdj','fMgr'].includes(id))return;e.preventDefault();const v=k=>f.elements[k].value.trim();
  if(id==='fOff'){const o={id:f.dataset.id||uid('o')};['name','cat','ptype','traffic','region','timing','desc','link','preview','status'].forEach(k=>o[k]=v(k));
    o.usd=parseFloat(v('usd'))||0;o.po=usd(o.usd)+' per '+o.ptype.toLowerCase();
    if(!o.name||!/^https?:\/\//i.test(o.link))return toast('Offer name and a valid advertiser link (https://...) are required');
    if(o.preview&&!/^https?:\/\//i.test(o.preview))return toast('Preview link must start with https://');
    const old=offs().find(x=>x.id===o.id);o.date=old?old.date:ds(Date.now());
    DB.s('off',old?offs().map(x=>x.id===o.id?o:x):offs().concat(o));lg('',(old?'Offer updated: ':'Offer created: ')+o.name,'admin');A.editO=null;if(!old)A.off=o.id;renderAdm();toast('Offer saved')}
  if(id==='fProf'){const u=affs().find(x=>x.id===f.dataset.id),em=v('email').toLowerCase();
    if(affs().some(x=>x.id!==u.id&&x.email===em))return toast('This email is already used by another affiliate');
    if(f.elements.pass.value.length<8)return toast('Password must be at least 8 characters');
    saveAff(u.id,x=>{['name','phone','address','city','state','country','anote','mgr'].forEach(k=>x[k]=v(k));x.email=em;x.pass=f.elements.pass.value});
    lg(u.id,'Profile details edited by admin','admin');renderAdm();toast('Details saved')}
  if(id==='fAdj'){const a=f.dataset.id,o=v('o'),m=v('m'),n=Math.max(1,parseInt(v('n'))||1),add=!e.submitter||e.submitter.value==='add';
    const done=adjust(a,o,m,n,add),L={led:'conversions',clk:'clicks',imp:'impressions'}[m];
    lg(a,'Admin '+(add?'added ':'removed ')+done+' '+L+' on '+offName(o),'admin');renderAdm();toast((add?'Added ':'Removed ')+done+' '+L)}
  if(id==='fMgr'){const M=mgrs(),m={id:f.dataset.id||uid('m'),name:v('name'),teams:v('teams'),phone:v('phone')};
    DB.s('mgr',f.dataset.id?M.map(x=>x.id===m.id?m:x):M.concat(m));A.mEdit=null;renderAdm();toast('Manager saved')}});

/* ===== PART 9: DEMO DATA & LIVE REFRESH ===== */
function loadDemo(){removeDemo();const now=new Date(),sod=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  const mg=[{id:'demoM1',name:'Ankit Mishra',teams:'ankit.mishra@vedantix.com',phone:''},{id:'demoM2',name:'Neha Kapoor',teams:'neha.kapoor@vedantix.com',phone:''}];
  const mk=(i,name,cat,u,pt,reg)=>({id:'demoO'+i,name,cat,usd:u,ptype:pt,po:usd(u)+' per '+pt.toLowerCase(),traffic:'Facebook ads, Google ads, SEO / blog',region:reg,timing:'All days, cap 200/day',desc:'Sample offer for testing. Replace with real rules and details.',link:'https://example.com/offer'+i+'?click_id={click_id}&aff={aff}',preview:'https://example.com/',status:'live',date:ds(now)});
  const O=[mk(1,'Solar Panel Quote','Home improvement',28,'Lead','USA'),mk(2,'Personal Loan Finder','Loan',35,'Lead','USA, UK'),mk(3,'Health Supplement Trial','Health & wellness',18,'Sale','USA'),mk(4,'Car Insurance Compare','Insurance',22,'Lead','Canada')];
  const mkA=(i,name,em,ofs,m)=>({id:'demoA'+i,uid:'VX'+(2000+i),name,email:em,phone:'+91 98000 0'+i+'0'+i+'0'+i,pass:'demo12345',address:'12 Demo Street, Hazratganj',city:'Lucknow',state:'Uttar Pradesh',country:'India',verticals:['Home improvement','Loan'],traffic:['Facebook ads','SEO / blog'],notes:'Demo affiliate',anote:'',status:'approved',offers:ofs,po:{},mgr:m,logins:5,lastLogin:Date.now()-D,date:ds(Date.now()-40*D)});
  const AF=[mkA(1,'Rohit Sharma','rohit.demo@example.com',['demoO1','demoO2'],'demoM1'),mkA(2,'Aman Verma','aman.demo@example.com',['demoO1','demoO2','demoO3'],'demoM2'),mkA(3,'Priya Singh','priya.demo@example.com',['demoO2','demoO3'],'demoM1')];
  const imp=[],clk=[],led=[];
  AF.forEach((u,ai)=>u.offers.forEach(oid=>{const o=O.find(x=>x.id===oid);for(let d=29;d>=0;d--){const t=sod-d*D+(9+Math.floor(Math.random()*9))*3600000;if(t>Date.now())continue;
    const im=Math.round((300+Math.random()*700)*(1+ai*.3)),ck=Math.round(im*(.03+Math.random()*.05)),ld=Math.round(ck*(.04+Math.random()*.1));
    imp.push({t,o:oid,a:u.id,n:im});if(ck)clk.push({t,o:oid,a:u.id,n:ck,id:uid('d')});if(ld)led.push({t,o:oid,a:u.id,n:ld,usd:ld*o.usd,id:uid('d')})}}));
  DB.s('mgr',mgrs().concat(mg));DB.s('off',offs().concat(O));DB.s('aff',affs().concat(AF));
  DB.s('imp',DB.g('imp',[]).concat(imp));DB.s('clk',DB.g('clk',[]).concat(clk));DB.s('led',DB.g('led',[]).concat(led))}
function removeDemo(){const d=x=>String(x.id||'').indexOf('demo')===0,da=x=>String(x.a||'').indexOf('demo')===0;
  DB.s('mgr',mgrs().filter(x=>!d(x)));DB.s('off',offs().filter(x=>!d(x)));DB.s('aff',affs().filter(x=>!d(x)));
  ['imp','clk','led','log','req'].forEach(k=>DB.s(k,DB.g(k,[]).filter(x=>!da(x))))}

/* live refresh: every 3 seconds + instantly when another tab (e.g. go.html) saves a click */
function tick(){if(view!=='affView'&&view!=='admView')return;const s=$('stamp');if(s)s.textContent='updated '+new Date().toLocaleTimeString('en-GB');drawLive()}
setInterval(tick,3000);
window.addEventListener('storage',tick);
