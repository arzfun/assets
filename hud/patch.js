const log=(msg,ok=true)=>console.log(`[arzfun-patch] ${ok?'ok':'failed'} ${msg}`);
const tasks=[
  ()=>{const el=document.querySelector('.player-info__server-info-bar');if(!el)throw'server-info-bar not found';el.style.setProperty('--server-flag','url(https://arzfun.github.io/assets/hud/logo_full.png)')},
  ()=>{const el=document.querySelector('.player-info__vip-logo');if(!el)throw'vip-logo not found';el.src='https://arzfun.github.io/assets/hud/addvip.gif'},
  ()=>{new MutationObserver(()=>document.querySelectorAll('.dialog').forEach(el=>el.style.setProperty('--bgColor','181,10,255'))).observe(document.body,{childList:true,subtree:true})},
  ()=>{const el=document.querySelector('.player-info__project-logo-image');if(!el)throw'logo-image not found';el.outerHTML=`<video class="player-info__project-logo-image" autoplay muted loop playsinline style="background-color:transparent" src="https://arzfun.github.io/assets/logos/logo_spring.webm"></video>`},
  ()=>{const m={'6330834a07b6a1a4147b.svg':'https://arzfun.github.io/assets/hud/arzfun-footer.png','d920b253bc63a3af4f94.svg':'https://arzfun.github.io/assets/hud/arzfun-title.png','de38bd41d7d33dbc23d2.svg':'https://arzfun.github.io/assets/hud/arzfun-logo.png','e349f61ca1299e0187fa.svg':'https://arzfun.github.io/assets/logo/logo.png'};const r=i=>{if(!i?.src)return;for(const k in m)if(i.src.includes(k))i.src=m[k]};document.querySelectorAll('img').forEach(r);new MutationObserver(e=>e.forEach(t=>t.addedNodes.forEach(n=>{if(n.tagName==='IMG')r(n);if(n.querySelectorAll)n.querySelectorAll('img').forEach(r)}))).observe(document.documentElement,{childList:true,subtree:true})},
  ()=>{document.addEventListener('click',e=>{const el=e.target.closest('.main-menu-footer__media-link,.main-menu-footer__media-social');if(!el)return;e.stopImmediatePropagation();e.preventDefault();const t=el.innerText.toLowerCase();if(t.includes('сайт'))window.cef.Open('https://arzfun.hhos.net/api/launcher/link?site',1);else if(t.includes('форум'))window.cef.Open('https://arzfun.hhos.net/api/launcher/link?forum',1);else if(el.querySelector('.icon-social-vk'))window.cef.Open('https://arzfun.hhos.net/api/launcher/link?vk',1);else if(el.querySelector('.icon-social-tg'))window.cef.Open('https://arzfun.hhos.net/api/launcher/link?telegram',1);else if(el.querySelector('.icon-social-discord'))window.cef.Open('https://arzfun.hhos.net/api/launcher/link?discord',1);},true)}
];
const names=['server-flag','vip-logo','dialog-color','logo-video','img-replace','menu-links'];
const run=()=>tasks.forEach((fn,i)=>{try{fn();log(names[i])}catch(e){log(`${names[i]}: ${e}`,false)}});
const retry=()=>{
  const failed=tasks.filter((_,i)=>{try{tasks[i]();return false}catch{return true}});
  if(failed.length===0)return;
  const ob=new MutationObserver(()=>{run();ob.disconnect()});
  ob.observe(document.body,{childList:true,subtree:true});
};
const apply=()=>{run();retry();};
document.readyState==='loading'
  ? document.addEventListener('DOMContentLoaded',apply)
  : apply();