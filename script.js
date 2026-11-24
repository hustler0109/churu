const loader=document.getElementById('loader');window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),550));const header=document.querySelector('.topbar');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>35),{passive:true});const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const menu=document.getElementById('mobileMenu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='☰'}));let lang='en';document.getElementById('language').addEventListener('click',e=>{lang=lang==='en'?'hi':'en';document.documentElement.lang=lang;document.body.classList.toggle('hi',lang==='hi');document.querySelectorAll('[data-en][data-hi]').forEach(el=>el.innerHTML=el.dataset[lang]);e.currentTarget.textContent=lang==='en'?'हिंदी':'English'});document.getElementById('year').textContent=new Date().getFullYear();const modal=document.getElementById('adminModal');document.getElementById('adminPreview').addEventListener('click',()=>modal.classList.add('open'));document.getElementById('closeAdmin').addEventListener('click',()=>modal.classList.remove('open'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});if(window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.craft-item,.wall-tile').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-4px)`});card.addEventListener('mouseleave',()=>card.style.transform='')})}


// Photo tour: 23 distinct views, captions matched to each photograph.
(()=>{
 const stage=document.getElementById('tourViewer');if(!stage)return;
 const $=id=>document.getElementById(id),image=$('tourImage'),title=$('tourTitle'),desc=$('tourDescription'),counter=$('tourCounter'),kicker=$('tourKicker'),progress=$('tourProgress'),rail=$('tourStops');
 const scenes=[
 ['19','Welcome Gate','The trust’s welcome banner greets visitors at the gate.','THE ARRIVAL'],
 ['09','Entrance from the Road','The entrance gate and boundary wall seen from outside.','THE APPROACH'],
 ['22','Monument Overview','Domes and pavilions rise above the grand staircase.','THE WHOLE'],
 ['03','The Central Chhatri','The staircase leads up towards the central pavilion.','THE CHHATRI'],
 ['10','The Grand Staircase','A broad flight of steps rising to the upper floor.','THE ASCENT'],
 ['11','Staircase & Domes','Ribbed domes and smaller chhatris crown the facade.','THE SKYLINE'],
 ['21','Stairway & Pavilions','Visitors climb the stairs between the corner pavilions.','THE ASCENT'],
 ['05','Domes & Pavilions','A closer view of the roofline and its cluster of chhatris.','LOOKING UP'],
 ['13','Long Elevation','The full two-storey side elevation with its painted panels.','THE FACADE'],
 ['08','Side Elevation','Another perspective of the arches and ornamental parapet.','ANOTHER PERSPECTIVE'],
 ['12','Side Stairway','A stairway climbs along the side wall to the upper level.','THE UPPER LEVEL'],
 ['20','Painted Facade','Painted arches and panels along the lower storey.','PAINTED DETAIL'],
 ['01','Painted Arcade','Red, blue and white ornament frames the arched openings.','CRAFT & COLOUR'],
 ['17','Framed by an Arch','The chhatri seen through a nearby arched opening.','A CLOSER LOOK'],
 ['18','Through the Arch','A second view of the facade from within the arcade.','A CLOSER LOOK'],
 ['14','Painted Archway','Floral scrollwork in maroon and white around an arched passage.','ORNAMENT'],
 ['24','Floral Mural','A hand-painted floral motif in red, blue, green and white.','ARTISTRY'],
 ['15','Courtyard Colonnade','The arcaded building across the courtyard, where visitors gather.','A PLACE TO GATHER'],
 ['16','Colonnade Stairway','Slender columns and a stairway on the courtyard side.','THE COURTYARD'],
 ['07','Small Shrine','A small white pavilion on a round platform in the grounds.','WITHIN THE GROUNDS'],
 ['04','Aerial View','The complex and its surroundings from above.','THE WIDER VIEW'],
 ['06','Rooftop Terrace','The upper terrace with its chequered floor and domes.','ABOVE THE GROUNDS'],
 ['23','Across the Grounds','The chhatri seen from a distance between tall light masts.','THE SURROUNDINGS']
 ];
 const N=scenes.length;let current=0,scale=1,tx=0,ty=0,drag=null,timer;
 const pad=n=>String(n+1).padStart(2,'0'),apply=()=>{image.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`};
 scenes.forEach((s,i)=>{const b=document.createElement('button');b.className='tour-thumb';b.type='button';b.setAttribute('aria-label',`View ${i+1}: ${s[1]}`);b.innerHTML=`<img src="assets/thumbs/tour-${s[0]}.jpg" alt="" loading="lazy"><span>${pad(i)}</span>`;b.addEventListener('click',()=>show(i));rail.appendChild(b)});
 function show(n){current=(n+N)%N;const s=scenes[current];clearTimeout(timer);image.style.opacity='0';timer=setTimeout(()=>{image.src=`assets/tour-${s[0]}.jpg`;image.alt=s[1]+' at Mantriyon Ki Chhatri';image.style.opacity='1'},150);title.textContent=s[1];desc.textContent=s[2];kicker.textContent=s[3];counter.innerHTML=`${pad(current)} <small>/ ${N}</small>`;progress.style.width=((current+1)/N*100)+'%';[...rail.children].forEach((el,i)=>el.classList.toggle('active',i===current));const t=rail.children[current];rail.scrollTo({left:t.offsetLeft-rail.clientWidth/2+t.clientWidth/2,behavior:'smooth'});scale=1;tx=ty=0;apply()}
 const zoom=d=>{scale=Math.min(2.5,Math.max(1,+(scale+d).toFixed(2)));if(scale===1)tx=ty=0;apply()};
 $('tourPrev').onclick=()=>show(current-1);$('tourNext').onclick=()=>show(current+1);$('tourZoomIn').onclick=()=>zoom(.3);$('tourZoomOut').onclick=()=>zoom(-.3);
 stage.addEventListener('pointerdown',e=>{if(e.target.closest('button')||scale===1)return;drag={x:e.clientX-tx,y:e.clientY-ty};stage.setPointerCapture(e.pointerId);stage.classList.add('dragging')});
 stage.addEventListener('pointermove',e=>{if(!drag)return;const mx=stage.clientWidth*(scale-1)/2,my=stage.clientHeight*(scale-1)/2;tx=Math.max(-mx,Math.min(mx,e.clientX-drag.x));ty=Math.max(-my,Math.min(my,e.clientY-drag.y));apply()});
 ['pointerup','pointercancel'].forEach(t=>stage.addEventListener(t,()=>{drag=null;stage.classList.remove('dragging')}));
 stage.addEventListener('dblclick',()=>{scale=scale>1?1:2;if(scale===1)tx=ty=0;apply()});
 let sx=null;stage.addEventListener('touchstart',e=>{sx=scale===1?e.touches[0].clientX:null},{passive:true});stage.addEventListener('touchend',e=>{if(sx===null)return;const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(current+(d<0?1:-1));sx=null});
 document.addEventListener('keydown',e=>{const r=stage.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||e.target.closest('input,textarea'))return;if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1)});
 show(0);
 image.addEventListener('error',()=>{image.alt='Photograph unavailable'});
})();
