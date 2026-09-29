const $=s=>document.querySelector(s),KEY='asc-001';
const nz=s=>s.replace(/[\u064B-\u065F\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[^\u0621-\u064Aa-z0-9 ]/gi,'').split(/\s+/).filter(Boolean).map(w=>w.replace(/^ال/,'')).join(' ');
const P=[
{name:'الوعي بالذات',a:['الوعي بالذات','وعي بالذات','معرفة الذات'],q:'من أنا؟',r:'«قبل أن أتحدث أمام الآخرين، هناك شخص يجب أن أعرفه أولًا. أعرف أفكاره، ومشاعره، ونقاط قوته، وما الذي يريد أن يوصله. كلما عرفته أكثر، أصبح صوتي أكثر صدقًا.»',h:'أنا أول خطوة قبل أن تبدأ في فهم جمهورك.'},
{name:'نبرات الصوت',a:['نبرات الصوت','نبرة الصوت','نبره الصوت','نبرات'],q:'من أنا؟',r:'«أنا لا أُرى ولا أُلمس، لكنني أستطيع أن أحول الجملة نفسها من عادية إلى مؤثرة، ومن سؤال إلى تعجب، ومن حماس إلى هدوء. إذا اختفيت، أصبح الكلام بلون واحد.»',h:'أنا التي تجعل صوتك يتغير بحسب المعنى والشعور.'},
{name:'فن الوقفات',a:['فن الوقفات','الوقفات','الوقفة','فن الوقفة'],q:'ما أنا؟',r:'«يعتقد الكثيرون أنني فراغ، بينما أكون أحيانًا أكثر تأثيرًا من الكلمات نفسها. أظهر لثوانٍ معدودة، لكنني أجبر الجمهور على الإنصات.»',h:'أنا لحظة صمت... لكنها ليست بلا معنى.'},
{name:'لغة الجسد',a:['لغة الجسد','لغة الجسم'],q:'من أنا؟',r:'«أتحدث دون أن أنطق حرفًا واحدًا. إذا تناقضت مع كلماتك، صدقني الجمهور أنا وكذب كلماتك.»',h:'أنا الرسالة التي يراها الجمهور قبل أن يسمع كلماتك.'},
{name:'الخريطة الذهنية',a:['الخريطة الذهنية','خريطة ذهنية','خريطة الأفكار','mind map','مايند ماب'],q:'ما أنا؟',r:'«أنا موجود قبل بداية الحديث، لكنني لا أظهر للجمهور أبدًا. من ينساني يتشتت، ومن يصادقني يعرف من أين يبدأ وإلى أين ينتهي.»',h:'أساعدك على ترتيب أفكارك قبل أن تتحدث.'},
{name:'الخوف من التحدث أمام الجمهور',a:['الخوف من التحدث أمام الجمهور','الخوف من الحديث أمام الجمهور','الخوف من التحدث','الخوف من الجمهور','رهبة المسرح'],q:'من أنا؟',r:'«كل متحدث عظيم قابلني يومًا ما. البعض هرب مني فاختفى، والبعض واجهني فأصبح أقوى. لا أختفي تمامًا، لكن يمكن السيطرة علي.»',h:'أنا شعور يظهر عندما تقف أمام الجمهور.'},
{name:'الارتجال',a:['الارتجال','ارتجال'],q:'من أنا؟',r:'«أظهر عندما لا تسير الأمور كما خططت لها. لا أحتاج إلى نص جاهز. أساعدك على الاستمرار عندما يفاجئك الموقف. كلما كنت حاضر الذهن، استطعت أن تجد طريقك في اللحظة.»',h:'أنا مهارة تساعدك عندما يحدث شيء غير متوقع.'}];
let files=[],gen=0,sd={};try{files=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(files))}catch(e){}};
const later=(f,ms)=>{const g=gen;setTimeout(()=>g==gen&&f(),ms)};
const cur=()=>$('#cur'),cls=c=>cur().classList.add(c),go=c=>{if(cur().classList.contains(c))return 0;cls(c);return 1};

/* ---------- art helpers ---------- */
const D=(x,y,w,h,c,o=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" opacity="${o}"/>`;
const V=`<rect width="1000" height="600" fill="url(#vg)" pointer-events="none"/><rect width="1000" height="600" filter="url(#nz)" pointer-events="none"/>`;
const W=(k,x)=>`<svg id="cur" class="scene" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">${x}${V}</svg>`;
const wood=y=>`<rect y="${y}" width="1000" height="${600-y}" fill="url(#wd)"/>`+[...Array(8)].map((_,i)=>`<path d="M0 ${y+10+i*(600-y)/8}H1000" stroke="#0005"/>`).join('');
const curt=(x,w,c='')=>`<rect class="${c}" x="${x}" y="0" width="${w}" height="480" fill="url(#cf)"/><rect x="${x}" y="0" width="${w}" height="26" fill="#1b1a17"/>`;
const cone=(x,w,h=470)=>`<path d="M${x-16} 0L${x+16} 0L${x+w} ${h}L${x-w} ${h}Z" fill="url(#sp)"/>`;
const aud=(y)=>[...Array(22)].map((_,i)=>{const x=i*47+(i%2?12:-4),h=(i*37)%18;return `<g class="ah" style="animation-delay:${i%5*.3}s"><circle cx="${x}" cy="${y+h}" r="16" fill="#131210"/><path d="M${x-27} 620Q${x-23} ${y+h+22} ${x} ${y+h+20}Q${x+23} ${y+h+22} ${x+27} 620Z" fill="#131210"/></g>`}).join('');
const mic=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M0 0V-130" stroke="#111" stroke-width="5"/><ellipse rx="34" ry="7" fill="#111"/><rect x="-7" y="-162" width="14" height="34" rx="7" fill="#2F2E2B" stroke="#D8C3A5" stroke-width="2"/></g>`;
const spk=(x,y,m='',s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="spk ${m}"><ellipse cy="4" rx="46" ry="8" fill="#0008"/><path class="bd" d="M-38 0L-30-110Q0-128 30-110L38 0Z" fill="#1b1a17" stroke="#D8C3A5" stroke-opacity=".55"/><circle class="hd" cy="-138" r="17" fill="#1b1a17" stroke="#D8C3A5" stroke-opacity=".55"/><path class="ar" d="M-28-100L-38-40M28-100L38-40" stroke="#1b1a17" stroke-width="9" stroke-linecap="round"/><path class="cr" d="M-26-92L22-58M26-92L-22-58" stroke="#2c2a25" stroke-width="9" stroke-linecap="round"/></g></g>`;
const bars=(x,y,w,h)=>`<g class="bars">${[...Array(30)].map((_,i)=>{const hh=h*(.3+((i*7)%10)/14);return `<rect x="${x+i*w/30}" y="${y-hh/2}" width="${w/30-4}" height="${hh}" rx="2" fill="#D8C3A5" style="animation-delay:${(i*.13)%1}s"/>`}).join('')}</g>`;
const ring=(x,y,r,a)=>`<circle class="rg hot" data-a="${a}" cx="${x}" cy="${y}" r="${r}"/>`;
const hall=(sx,m,scr)=>`${D(0,0,1000,600,'#2F2E2B')}${curt(0,110)}${curt(890,110)}<rect x="230" y="50" width="540" height="270" rx="6" fill="#F6EFE4" opacity=".16" stroke="#A66F4E" stroke-width="6"/>${scr}${wood(390)}${cone(sx,150)}${mic(sx+75,400)}${spk(sx,400,m,1.15)}${aud(505)}`;
const paper=(i,x,y,r)=>`<g class="pp hot" data-x="${x}" data-y="${y}" data-r="${r}"><rect x="-65" y="-45" width="130" height="90" fill="#F6EFE4" stroke="#D8C3A5"/><path d="M-48-22H40M-48-8H48M-48 6H20M-48 20H36" stroke="#A66F4E" stroke-opacity=".5" stroke-width="3"/>${i%2?`<rect x="-52" y="-38" width="40" height="30" fill="#3F4A36" opacity=".8"/>`:''}<circle cy="-42" r="6" fill="#A66F4E"/></g>`;

/* ---------- scenes ---------- */
const door=`<g data-a="go" class="hot"><rect x="40" y="170" width="130" height="300" fill="#1a1917" stroke="#A66F4E" stroke-width="4"/><rect x="56" y="186" width="98" height="284" fill="url(#dl)"/><circle class="rg" cx="105" cy="330" r="80"/></g>`;
const S={
C:()=>S[0]().replace('data-a="go"',''),
0:()=>W(0,`${D(0,0,1000,600,'#2F2E2B')}${curt(0,1000)}${wood(470)}${cone(500,260)}${mic(500,478)}<g transform="translate(700 470)"><rect x="-6" y="-70" width="10" height="70" fill="#111"/><rect x="66" y="-70" width="10" height="70" fill="#111"/><rect x="-14" y="-92" width="100" height="16" fill="#3a2a20" stroke="#A66F4E"/><rect x="-10" y="-170" width="8" height="80" fill="#111"/><rect x="14" y="-108" width="52" height="16" rx="2" fill="#A66F4E" transform="rotate(-4 40 -100)"/></g>${door}`),
1:()=>{let b='';for(let i=0;i<9;i++)b+=`<circle class="bulb" cx="${350+i*37.5}" cy="72" r="7" style="animation-delay:${i*.4}s"/><circle class="bulb" cx="${350+i*37.5}" cy="448" r="7" style="animation-delay:${i*.3}s"/>`;for(let i=0;i<9;i++)b+=`<circle class="bulb" cx="328" cy="${95+i*44}" r="7" style="animation-delay:${i*.5}s"/><circle class="bulb" cx="672" cy="${95+i*44}" r="7" style="animation-delay:${i*.2}s"/>`;
return W(1,`${D(0,0,1000,600,'#3F4A36')}${[...Array(9)].map((_,i)=>D(i*125,0,3,440,'#0003')).join('')}<circle cx="500" cy="240" r="330" fill="#D8C3A5" opacity=".07"/>${wood(440)}
<g class="hot mf" data-a="mirror"><rect x="308" y="52" width="384" height="416" rx="26" fill="url(#wd)" stroke="#0007" stroke-width="3"/><rect x="340" y="84" width="320" height="352" rx="14" fill="#1f1f1a"/><g class="refl"><path d="M410 436Q416 320 500 316Q584 320 590 436Z" fill="#2c2a24" stroke="#D8C3A5" stroke-opacity=".4"/><circle cx="500" cy="270" r="40" fill="#2c2a24" stroke="#D8C3A5" stroke-opacity=".4"/><path d="M420 430Q426 330 510 326" fill="none" stroke="#F6EFE4" stroke-opacity=".18" stroke-width="10"/><rect x="560" y="360" width="46" height="34" fill="#A66F4E" opacity=".4"/><circle cx="392" cy="140" r="22" fill="none" stroke="#D8C3A5" opacity=".3"/></g><path d="M340 84H520L340 300Z" fill="#F6EFE4" class="gl"/><circle class="rg" cx="500" cy="260" r="150"/></g>${b}
<g transform="translate(150 440)"><rect x="-50" y="-40" width="100" height="14" fill="#5b3f2e"/><rect x="-44" y="-26" width="8" height="66" fill="#111"/><rect x="36" y="-26" width="8" height="66" fill="#111"/><rect x="-50" y="-150" width="12" height="112" fill="#3a2a20"/></g>
<rect x="720" y="330" width="240" height="14" fill="#6b4a36" stroke="#0005"/><rect x="735" y="344" width="10" height="110" fill="#111"/><rect x="935" y="344" width="10" height="110" fill="#111"/>
<rect x="760" y="296" width="80" height="34" fill="#A66F4E" stroke="#0006"/><rect x="796" y="296" width="8" height="34" fill="#2F2E2B"/><g transform="rotate(-6 890 300)"><rect x="860" y="262" width="60" height="68" fill="#2F2E2B" stroke="#D8C3A5" stroke-width="3"/><circle cx="890" cy="288" r="10" fill="#D8C3A5" opacity=".5"/><path d="M872 322Q890 298 908 322Z" fill="#D8C3A5" opacity=".5"/></g><rect x="730" y="322" width="46" height="8" fill="#F6EFE4" transform="rotate(4 750 326)"/>
<circle cx="850" cy="140" r="46" fill="#F6EFE4" stroke="#A66F4E" stroke-width="6"/><path d="M850 140V108M850 140L872 150" stroke="#2F2E2B" stroke-width="4" stroke-linecap="round"/>`)},
2:()=>W(2,`${D(0,0,1000,600,'#2F2E2B')}${curt(0,1000)}${wood(470)}${cone(300,190)}${mic(300,480)}<path d="M300 -10Q120 200 230 470Q470 520 640 470" fill="none" stroke="#111" stroke-width="4" transform="translate(0 0)"/>
<g class="dust" fill="#F6EFE4" opacity=".5">${[...Array(14)].map((_,i)=>`<circle cx="${180+i*38}" cy="${280+(i*53)%180}" r="${1+i%3}" style="animation-delay:${i*.7}s"/>`).join('')}</g>
<rect x="600" y="440" width="340" height="14" fill="#6b4a36"/><rect x="620" y="454" width="10" height="120" fill="#111"/><rect x="910" y="454" width="10" height="120" fill="#111"/>
<path d="M660 440Q640 390 690 380" fill="none" stroke="#111" stroke-width="7"/><path d="M660 440Q700 400 720 440" fill="none" stroke="#D8C3A5" stroke-width="5"/>
<g class="hot" data-a="rec"><rect x="740" y="360" width="180" height="80" rx="6" fill="#A66F4E" stroke="#0007" stroke-width="3"/><g class="reel"><circle cx="785" cy="395" r="20" fill="#2F2E2B"/><path d="M785 378V412M768 395H802" stroke="#D8C3A5" stroke-width="3"/></g><g class="reel"><circle cx="875" cy="395" r="20" fill="#2F2E2B"/><path d="M875 378V412M858 395H892" stroke="#D8C3A5" stroke-width="3"/></g><circle class="rg" cx="830" cy="400" r="85"/></g>
<g transform="translate(0 0)">${bars(640,290,280,110)}</g><path class="pk" d="M640 290Q690 230 740 290T840 290T920 290" fill="none" stroke="#F6EFE4" stroke-width="3" filter="url(#gl)"/>`),
3:()=>W(3,hall(500,'',bars(260,185,480,120))+`<rect data-a="talk" class="hot" x="430" y="240" width="140" height="170" fill="transparent"/>${ring(500,340,90,'talk')}`),
4:()=>W(4,hall(340,'c',`<text data-a="sent" class="hot" x="500" y="190" text-anchor="middle" font-size="30" fill="#F6EFE4" direction="rtl">أنا سعيد جدًا بوجودكم اليوم.</text>`)+`<rect data-a="body" class="hot" x="280" y="240" width="120" height="170" fill="transparent"/>${ring(340,340,85,'body')}<rect data-a="sent" class="hot" x="270" y="150" width="460" height="60" fill="transparent"/>`),
5:()=>{const L=[[200,340],[400,340],[600,340],[800,340]].map(p=>`<line class="tl" x1="500" y1="140" x2="${p[0]}" y2="${p[1]}" stroke="#A66F4E" stroke-width="3"/>`).join('');
return W(5,`${D(0,0,1000,600,'#3F4A36')}${[...Array(12)].map((_,i)=>D(i*84,0,3,600,'#0003')).join('')}<circle cx="500" cy="220" r="360" fill="#D8C3A5" opacity=".08"/>${wood(470)}<g>${L}</g>${paper(0,620,300,-9)}${paper(1,300,240,12)}${paper(2,780,180,-4)}${paper(3,450,400,7)}${paper(4,140,420,-14)}`)},
6:()=>W(6,`${D(0,0,1000,600,'#2F2E2B')}<rect x="290" y="40" width="420" height="430" fill="url(#lt)"/><g class="pk"><path d="M320 470V330Q500 250 680 330V470Z" fill="#151412"/></g>${D(0,0,1000,26,'#1b1a17')}<path d="M40 0Q120 260 60 470M960 0Q880 260 940 470" fill="none" stroke="#A66F4E" stroke-width="5"/>${wood(470)}<g class="cl l hot" data-a="cur"><rect x="280" y="0" width="222" height="480" fill="url(#cf)"/></g><g class="cl r hot" data-a="cur"><rect x="498" y="0" width="222" height="480" fill="url(#cf)"/></g><path d="M500 0V480" stroke="#D8C3A5" stroke-opacity=".5" stroke-width="3" class="cl"/>${ring(500,250,120,'cur')}<g class="wk">${spk(170,480,'',1.5)}</g><rect x="60" y="440" width="70" height="40" rx="10" fill="#A66F4E"/>`),
7:()=>W(7,hall(500,'',`<g class="scr"><rect x="270" y="90" width="230" height="20" fill="#D8C3A5" opacity=".7"/><rect x="270" y="130" width="300" height="12" fill="#D8C3A5" opacity=".4"/><rect x="270" y="155" width="260" height="12" fill="#D8C3A5" opacity=".4"/><rect x="600" y="100" width="130" height="130" fill="#A66F4E" opacity=".5"/></g><rect class="scrdead" x="230" y="50" width="540" height="270" fill="#0b0a09"/>`)+`<rect class="pap" x="560" y="300" width="30" height="38" fill="#F6EFE4"/><g class="hand"><path d="M770 560L772 440" stroke="#131210" stroke-width="16" stroke-linecap="round"/><circle cx="772" cy="428" r="12" fill="#131210"/></g>`),
8:()=>W(8,`${D(0,0,1000,600,'#2F2E2B')}${curt(0,1000)}${wood(470)}${cone(500,230)}${mic(500,478)}${D(0,0,1000,600,'#000',.45)}`),
9:()=>W(9,`${D(0,0,1000,600,'#2F2E2B')}<rect x="150" y="30" width="700" height="440" fill="url(#lt)"/><rect x="330" y="40" width="340" height="180" fill="#F6EFE4" opacity=".14"/>${wood(470)}${cone(500,240)}<g class="ra">${mic(575,480)}${spk(500,480,'o',1.5)}</g><g class="ra">${aud(540)}${[...Array(22)].map((_,i)=>{const x=i*47+(i%2?12:-4);return `<circle class="hn" cx="${x-9}" cy="${515+(i*37)%18}" r="7" fill="#D8C3A5" style="animation-delay:${i%4*.06}s"/><circle class="hn" cx="${x+9}" cy="${515+(i*37)%18}" r="7" fill="#D8C3A5" style="animation-delay:${i%4*.06}s"/>`}).join('')}</g>${[0,.8,1.6].map(d=>`<circle class="rp" cx="500" cy="540" r="330" style="animation-delay:${d}s"/>`).join('')}
<g class="rc l"><rect x="0" y="0" width="500" height="480" fill="url(#cf)"/></g><g class="rc r"><rect x="500" y="0" width="500" height="480" fill="url(#cf)"/></g>${D(0,0,1000,26,'#1b1a17')}<rect class="dk" width="1000" height="600" fill="#000" opacity=".92"/><g class="rspot"><rect width="1000" height="600" fill="#000" opacity="0"/></g>`)
};

/* ---------- flow ---------- */
const act={};
const say=(p,r,v)=>{try{const u=new SpeechSynthesisUtterance('أهلًا بكم في هذه الليلة');u.lang='ar';u.pitch=p;u.rate=r;u.volume=v;speechSynthesis.speak(u)}catch(e){}};
act.go=()=>show(1);
act.mirror=()=>{if(go('lit'))later(()=>pz(0),2200)};
act.rec=()=>{if(!go('lit'))return;const c=cur();speechSynthesis&&speechSynthesis.cancel&&speechSynthesis.cancel();say(1,1,.7);c.classList.add('w1');later(()=>{c.classList.replace('w1','w2');say(1.9,1.3,1)},2000);later(()=>{c.classList.replace('w2','w3');say(.2,.6,.5)},4000);later(()=>pz(1),6500)};
act.talk=()=>{if(!go('lit'))return;later(()=>cls('still'),2800);later(()=>cur().classList.remove('still'),4900);later(()=>pz(2),5800)};
const cm=()=>{$('#cm').innerHTML=(sd.a?'<div><small>ما قيل</small>«أنا سعيد جدًا بوجودكم اليوم.»</div>':'')+(sd.b?'<div><small>ما ظهر</small>عيناه على الأرض… وجسده يبتعد عن القاعة.</div>':'');if(sd.a&&sd.b&&go('lit'))later(()=>pz(3),2400)};
act.sent=()=>{sd.a=1;cm()};act.body=()=>{sd.b=1;cm()};
act.cur=()=>{if(go('lit'))later(()=>pz(5),2800)};
const I={
0:()=>later(()=>cap('سبعة ملفات اختفت من هذا المسرح… والباب الجانبي مفتوح قليلًا.'),1500),
5:()=>{const s=cur(),pp=[...s.querySelectorAll('.pp')],mv=new Set;let d;const pos=g=>g.style.transform=`translate(${g._x}px,${g._y}px) rotate(${g._r}deg)`;
const pt=e=>new DOMPoint(e.clientX,e.clientY).matrixTransform(s.getScreenCTM().inverse());
pp.forEach(g=>{g._x=+g.dataset.x;g._y=+g.dataset.y;g._r=+g.dataset.r;pos(g);g.onpointerdown=e=>{if(s.classList.contains('solved')||s.classList.contains('lit')&&sd.done)return;d=g;const p=pt(e);g._ox=g._x-p.x;g._oy=g._y-p.y;g.parentNode.append(g);e.preventDefault()}});
s.onpointermove=e=>{if(!d)return;const p=pt(e);d._x=p.x+d._ox;d._y=p.y+d._oy;pos(d)};
s.onpointerup=()=>{if(!d)return;mv.add(d);d=null;if(mv.size>=3&&go('lit'))later(()=>pz(4),1300)};
s.tidy=()=>{[[500,140],[200,340],[400,340],[600,340],[800,340]].forEach((t,i)=>{pp[i]._x=t[0];pp[i]._y=t[1];pp[i]._r=0;pos(pp[i])})}},
7:()=>{later(()=>cls('glitch'),2200);later(()=>cls('dead'),3000);later(()=>cls('ask'),3800);later(()=>pz(6),5800)},
8:()=>{$('#ov').innerHTML=`<div id="bd">${files.map((i,k)=>`<div class="fc" style="--r:${(i*7)%9-4}deg;animation-delay:${k*.2}s"><small>0${i+1}</small>${P[i].name}</div>`).join('')}</div><h2 id="t1"></h2><button id="rv" hidden>كشف الحقيقة</button>`;
const t=x=>{const e=$('#t1');e.style.animation='none';e.offsetWidth;e.style.animation='';e.textContent=x};later(()=>t('لقد اكتملت الأدلة.'),1800);later(()=>t('بقي شيء واحد فقط.'),4600);later(()=>{$('#rv').hidden=false},6600);$('#rv').onclick=reveal}};
const cap=t=>{const e=$('#cap');e.textContent=t;e.classList.add('on');later(()=>e.classList.remove('on'),5500)};
const hud=()=>{$('#fb').textContent=`FILES ${files.length}/7`;$('#dr').innerHTML=files.length?files.map(i=>`<div>0${i+1} — ${P[i].name}</div>`).join(''):'<div>—</div>'};
const show=(k,first)=>{gen++;sd={};$('#pz').className='';$('#cm').innerHTML='';const s=$('#sc'),put=()=>{s.innerHTML=S[k]();s.style.opacity=1;I[k]&&I[k]()};first?put():(s.style.opacity=0,setTimeout(put,800))};
const pz=i=>{const p=P[i],e=$('#pz');e.className='on p'+i;e.innerHTML=`<p>${p.r}</p><h3>${p.q}</h3><div><input id="in" placeholder="اكتب إجابتك" autocomplete="off"><button id="ok">تحقّق</button></div><em id="ht"></em><a id="hb">تلميح</a>`;
$('#hb').onclick=()=>$('#ht').textContent=p.h;
const chk=()=>{if(p.a.map(nz).includes(nz($('#in').value))){e.className='';win(i)}else{e.classList.add('no');setTimeout(()=>e.classList.remove('no'),450)}};
$('#ok').onclick=chk;$('#in').onkeydown=k=>k.key=='Enter'&&chk();setTimeout(()=>$('#in').focus(),300)};
const win=i=>{cls('solved');if(i==3){const s=cur().querySelector('.spk');s.classList.remove('c');s.classList.add('o')}if(i==4)cur().tidy();if(i==6)cur().querySelector('.spk').classList.add('o');
if(!files.includes(i))files.push(i);save();hud();
later(()=>{$('#stp').innerHTML=`<div>تم اكتشاف الملف 0${i+1}</div><small>أُضيف إلى ملف القضية: ${P[i].name}</small>`;$('#stp').className='on'},2600);
later(()=>{$('#stp').className='';show(i==6?8:i+2)},6000)};
const reveal=()=>{gen++;$('#ov').innerHTML='<div id="bl" style="opacity:0"></div>';$('#hud').className='h';const b=$('#bl');requestAnimationFrame(()=>b.style.opacity=1);
setTimeout(()=>{$('#sc').innerHTML=S[9]();$('#ov').innerHTML='<div id="bl"></div><div id="fin"><small>أنت الآن...</small><h1>Authentic Speaker</h1><h2>المتحدث الحقيقي</h2><h3>أحمد سالم</h3></div>'},1800);
const at=(ms,f)=>setTimeout(f,ms),c=x=>cur().classList.add(x),f=$;
at(4200,()=>{c('a');$('#bl').style.opacity=0});
at(5600,()=>c('b'));at(10500,()=>c('c'));at(12000,()=>{c('d');clap()});
const q=(n,ms)=>at(ms,()=>$('#fin').children[n].classList.add('on'));
q(0,12500);at(15500,()=>{$('#fin').children[0].classList.remove('on')});q(1,15800);q(2,18500);q(3,21000)};
const clap=()=>{try{const a=new AudioContext(),len=a.sampleRate*.05,b=a.createBuffer(1,len,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);for(let k=0;k<160;k++){const s=a.createBufferSource(),g=a.createGain();s.buffer=b;g.gain.value=.07+Math.random()*.08;s.connect(g).connect(a.destination);s.start(a.currentTime+k*.045+Math.random()*.05)}}catch(e){}};

/* ---------- boot ---------- */
$('#app').innerHTML=`<svg width="0" height="0" style="position:absolute"><defs>
<linearGradient id="sp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6EFE4" stop-opacity=".5"/><stop offset="1" stop-color="#D8C3A5" stop-opacity=".03"/></linearGradient>
<linearGradient id="cf" x1="0" x2=".06" spreadMethod="repeat"><stop offset="0" stop-color="#2F2E2B"/><stop offset=".5" stop-color="#3F4A36"/><stop offset="1" stop-color="#232320"/></linearGradient>
<linearGradient id="wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A66F4E"/><stop offset="1" stop-color="#4a3222"/></linearGradient>
<linearGradient id="dl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8C3A5"/><stop offset="1" stop-color="#A66F4E"/></linearGradient>
<linearGradient id="lt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6EFE4"/><stop offset="1" stop-color="#D8C3A5"/></linearGradient>
<radialGradient id="vg"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></radialGradient>
<filter id="gl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="nz"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2"/><feColorMatrix values="0 0 0 0 .2 0 0 0 0 .2 0 0 0 0 .2 0 0 0 .1 0"/></filter></defs></svg>
<div id="st"><div id="sc"></div><div id="hud" class="h"><b>CASE 001</b><button id="fb"></button></div><div id="dr"></div><div id="cap"></div><div id="cm"></div><div id="pz"></div><div id="stp"></div>
<div id="ov"><div id="cv"><small>CASE 001</small><h1>قضية المتحدث الحقيقي</h1><h2>أحمد سالم</h2><i>سري</i><button id="begin">ابدأ التحقيق</button></div></div></div>`;
$('#st').addEventListener('click',e=>{const a=e.target.closest('[data-a]');a&&act[a.dataset.a]&&act[a.dataset.a]()});
$('#fb').onclick=()=>$('#dr').classList.toggle('on');
hud();show('C',1);
$('#begin').onclick=()=>{$('#ov').innerHTML='';$('#hud').className='';files.length>=7?show(8):files.length?show(files.length+1):show(0)};
document.addEventListener('keydown', function(e) {
  const input = document.getElementById('in');
  const pz = document.getElementById('pz');

  if (!input || !pz || !pz.classList.contains('on')) return;

  if (document.activeElement !== input) {
    input.focus();
  }

  if (
    e.key.length === 1 &&
    !e.ctrlKey &&
    !e.altKey &&
    !e.metaKey
  ) {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;

    input.value =
      input.value.slice(0, start) +
      e.key +
      input.value.slice(end);

    input.setSelectionRange(
      start + e.key.length,
      start + e.key.length
    );

    e.preventDefault();
  }
});
