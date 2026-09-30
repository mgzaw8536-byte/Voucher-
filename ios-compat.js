
(function(){
"use strict";
const IOS_DB="MZ_IOS_MEDIA_DB";
function q(id){return document.getElementById(id);}
function dismissSplash(){
 const el=q("iosSplash"); if(!el)return;
 el.style.opacity="0"; setTimeout(()=>{el.style.display="none"},280);
}
async function loadSplash(){
 const overlay=q("iosSplash"), img=q("iosSplashImage"), vid=q("iosSplashVideo");
 if(!overlay)return;
 let videoData=null, imageData=null;
 try{videoData=localStorage.getItem("MZ_SPLASH_VIDEO_PREVIEW");}catch(e){}
 try{imageData=localStorage.getItem("MZ_SPLASH_IMAGE_PREVIEW");}catch(e){}
 if(videoData){
   try{vid.src=videoData;vid.classList.add("active");vid.onended=dismissSplash;
       const p=vid.play(); if(p&&p.catch)p.catch(()=>{setTimeout(dismissSplash,1800)});
       setTimeout(dismissSplash,30000); return;
   }catch(e){}
 }
 if(imageData){img.src=imageData;}
 img.classList.add("active");
 setTimeout(dismissSplash,1800);
 overlay.addEventListener("click",dismissSplash,{once:true});
}
window.addEventListener("DOMContentLoaded",loadSplash);
if("serviceWorker" in navigator){
 window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
})();
