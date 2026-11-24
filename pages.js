(()=>{const c=document.getElementById('curtain'),L=document.getElementById('language');
try{if(localStorage.getItem('lang')==='hi')L.click()}catch(e){}
L.addEventListener('click',()=>{try{localStorage.setItem('lang',document.documentElement.lang)}catch(e){}});
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.metaKey||e.ctrlKey||a.target)return;const u=new URL(a.href,location.href);
 if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html$/.test(u.pathname))return;e.preventDefault();c.style.animation='drop .55s cubic-bezier(.7,0,.2,1) forwards';setTimeout(()=>location.href=a.href,520)});
addEventListener('pageshow',e=>{if(e.persisted)c.style.animation='lift .8s cubic-bezier(.7,0,.2,1) forwards'});
})();(()=>{const it=[...document.querySelectorAll('.event-photo a')];if(!it.length)return;const lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<button class="lb-x" aria-label="Close">×</button><button class="lb-p" aria-label="Previous">←</button><img alt=""><p></p><button class="lb-n" aria-label="Next">→</button>';document.body.append(lb);
const im=lb.querySelector('img'),cp=lb.querySelector('p');let k=0;const go=n=>{k=(n+it.length)%it.length;im.src=it[k].href;cp.textContent=it[k].closest('figure').querySelector('small').textContent;lb.classList.add('open')},cl=()=>lb.classList.remove('open');
it.forEach((a,n)=>a.addEventListener('click',e=>{e.preventDefault();go(n)}));lb.querySelector('.lb-x').onclick=cl;lb.querySelector('.lb-p').onclick=()=>go(k-1);lb.querySelector('.lb-n').onclick=()=>go(k+1);lb.addEventListener('click',e=>{if(e.target===lb)cl()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')cl();if(e.key==='ArrowRight')go(k+1);if(e.key==='ArrowLeft')go(k-1)})})();
// polish: fade images in once loaded, and a floating back-to-top button
(()=>{document.querySelectorAll('img[loading="lazy"]').forEach(i=>{if(i.complete)return;i.style.opacity=0;i.style.transition='opacity .8s';i.addEventListener('load',()=>i.style.opacity=1,{once:true});i.addEventListener('error',()=>i.style.opacity=1,{once:true})});
const t=document.createElement('button');t.className='to-top';t.type='button';t.setAttribute('aria-label','Back to top');t.textContent='↑';document.body.append(t);
t.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
addEventListener('scroll',()=>t.classList.toggle('show',scrollY>700),{passive:true})})();
