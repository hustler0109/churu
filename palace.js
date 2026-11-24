(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],fine=matchMedia('(pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const bar=document.createElement('div');bar.className='progress';document.body.append(bar);
if($('.hero')){const arch=document.createElement('div');arch.className='hero-arch';$('.hero').append(arch)}
// split hero headline into rising words
const spans=$$('.hero h1 span,.hero h1 em');let i=0;
const split=el=>{el.innerHTML=el.textContent.split(' ').map(w=>`<span class="w"><i style="--i:${i++}">${w}</i></span>`).join(' ')};
spans.forEach(split);
// keep split intact when language is switched
$('#language').addEventListener('click',()=>setTimeout(()=>{i=0;spans.forEach(split)},0));
const hp=$('.hero-photo'),hc=$('.hero-content');
const tick=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h?y/h:0})`;
 if(hp&&!calm&&y<innerHeight*1.2){hp.style.translate=`0 ${y*.22}px`;hc.style.translate=`0 ${y*-.08}px`}
 $$('.archive-section,.visit-section').forEach(s=>{if(calm)return;const r=s.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){s.firstElementChild.style.translate=`0 ${r.top*-.06}px`}})};
addEventListener('scroll',tick,{passive:true});tick();
if(fine&&!calm){const g=document.createElement('div'),r=document.createElement('div');g.className='glow';r.className='ring';document.body.append(g,r);
 let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;g.style.transform=`translate(${x}px,${y}px)`},{passive:true});
 (function f(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(f)})();
 document.addEventListener('pointerover',e=>r.classList.toggle('big',!!e.target.closest('a,button,.event-photo,.craft-item,.tour-thumb')));
 // magnetic buttons
 $$('.hero-cta,.visit-button,.archive-link,.language').forEach(b=>{b.addEventListener('pointermove',e=>{const q=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-q.left-q.width/2)*.22}px,${(e.clientY-q.top-q.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
 // parallax drift inside craft cards
 $$('.craft-item').forEach(c=>c.addEventListener('mousemove',e=>{const q=c.getBoundingClientRect(),im=c.querySelector('img');if(im)im.style.translate=`${((e.clientX-q.left)/q.width-.5)*-16}px ${((e.clientY-q.top)/q.height-.5)*-16}px`}));}
// count-up stats
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const b=e.target,end=+b.textContent;if(calm||!end)return;const t0=performance.now(),from=end>100?end-90:0;(function s(t){const p=Math.min(1,(t-t0)/1800),k=1-Math.pow(1-p,4);b.textContent=Math.round(from+(end-from)*k);if(p<1)requestAnimationFrame(s)})(t0)}),{threshold:.6});
$$('.stat-row b').forEach(b=>io.observe(b));
// stagger reveal children
$$('.craft-gallery .reveal,.event-gallery figure').forEach((el,n)=>{el.style.transitionDelay=(n%4)*.12+'s'});
$$('.event-photo').forEach(f=>{f.classList.add('reveal');new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){f.classList.add('visible');o.disconnect()}}),{threshold:.1}).observe(f)});
})();
