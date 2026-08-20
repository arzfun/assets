const log=(msg,ok=true)=>console.log(`[arzfun-patch] ${ok?'ok':'failed'} ${msg}`);
const tasks=[
  ()=>{const el=document.querySelector('.player-info__server-info-bar');if(!el)throw'server-info-bar not found';el.style.setProperty('--server-flag','url(https://arzfun.github.io/assets/hud/logo_full.png)')},
  ()=>{const el=document.querySelector('.player-info__vip-logo');if(!el)throw'vip-logo not found';el.src='https://arzfun.github.io/assets/hud/addvip.gif'},
  ()=>{new MutationObserver(()=>document.querySelectorAll('.dialog').forEach(el=>el.style.setProperty('--bgColor','181,10,255'))).observe(document.body,{childList:true,subtree:true})},
  ()=>{const el=document.querySelector('.player-info__project-logo-image');if(!el)throw'logo-image not found';el.outerHTML=`<video class="player-info__project-logo-image" autoplay muted loop playsinline style="background-color:transparent" src="https://arzfun.github.io/assets/logos/logo_spring.webm"></video>`},
  ()=>{
    const m={
      'main-menu-navigation__header-logo-image':'https://arzfun.github.io/assets/logo/logo.png',
      'main-menu-navigation__header-title-image':'https://arzfun.github.io/assets/hud/arzfun-title.png',
      'main-menu-navigation__header-caption-image':'https://arzfun.github.io/assets/hud/arzfun-footer.png',
      'main-menu-map__logo-image':'https://arzfun.github.io/assets/hud/arzfun-logo.png',
      'main-menu-settings__logo-image':'https://arzfun.github.io/assets/hud/arzfun-logo.png',
      'player-list__logo-image':'https://arzfun.github.io/assets/hud/arzfun-logo.png'
    };
    const r=i=>{if(i?.tagName!=='IMG')return;for(const c in m)if(i.classList.contains(c)){i.src=m[c];return}};
    document.querySelectorAll('img').forEach(r);
    new MutationObserver(e=>e.forEach(t=>t.addedNodes.forEach(n=>{r(n);if(n.querySelectorAll)n.querySelectorAll('img').forEach(r)}))).observe(document.documentElement,{childList:true,subtree:true});
  },
  ()=>{document.addEventListener('click',e=>{const el=e.target.closest('.main-menu-footer__media-link,.main-menu-footer__media-social');if(!el)return;e.stopImmediatePropagation();e.preventDefault();const t=el.innerText.toLowerCase();if(t.includes('сайт'))window.cef.Open('https://arzfun.hhos.net/link/site?r=gamemenu',1);else if(t.includes('форум'))window.cef.Open('https://arzfun.hhos.net/link/forum?r=gamemenu',1);else if(el.querySelector('.icon-social-vk'))window.cef.Open('https://arzfun.hhos.net/link/vk?r=gamemenu',1);else if(el.querySelector('.icon-social-tg'))window.cef.Open('https://arzfun.hhos.net/link/telegram?r=gamemenu',1);else if(el.querySelector('.icon-social-discord'))window.cef.Open('https://arzfun.hhos.net/link/discord?r=gamemenu',1);},true)}
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