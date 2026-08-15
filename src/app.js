(function(){
var L=window.LANG||"en",T=window.TOOL;
var th=document.getElementById("themeBtn");
if(th){var cur=localStorage.getItem("th")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",cur);th.onclick=function(){cur=cur==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",cur);localStorage.setItem("th",cur)}}
var q=document.getElementById("q");
if(q){q.oninput=function(){var s=q.value.toLowerCase();document.querySelectorAll(".grid a").forEach(function(a){a.style.display=a.textContent.toLowerCase().indexOf(s)>=0?"":"none"})}}
if(!T)return;
var M=function(x){return new Intl.NumberFormat(L==="es"?"es-MX":"en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(x)};
var N=function(x,d){return new Intl.NumberFormat(L==="es"?"es-MX":"en-US",{maximumFractionDigits:d==null?0:d}).format(x)};
var fn=new Function("v","M","N","L","return ("+T.calc+")(v)");
var box=document.getElementById("fields"),res=document.getElementById("res"),last=[];
T.f.forEach(function(fd){
 var id=fd[0],type=fd[1],lab=L==="es"?fd[3]:fd[2];
 var wrap=document.createElement("label");var tt=document.createElement("span");tt.textContent=lab;wrap.appendChild(tt);
 var inp=document.createElement(type==="s"?"select":"input");
 if(type==="n"){inp.type="number";inp.value=fd[4]}
 else if(type==="d"){inp.type="date";inp.value=fd[4]}
 else if(type==="t"){inp.type="text";inp.value=fd[4]}
 else if(type==="r"){inp.type="range";inp.min=1;inp.max=5;inp.value=fd[4];var rv=document.createElement("b");rv.textContent=" "+fd[4];tt.appendChild(rv);inp.oninput=function(){rv.textContent=" "+inp.value}}
 else if(type==="s"){fd[4].forEach(function(o){var op=document.createElement("option");op.value=o[0];op.textContent=L==="es"?o[2]:o[1];if(o[0]===fd[5])op.selected=true;inp.appendChild(op)})}
 inp.setAttribute("data-id",id);inp.setAttribute("data-type",type);
 inp.addEventListener("input",calc);
 wrap.appendChild(inp);box.appendChild(wrap);
});
function read(){var v={};box.querySelectorAll("[data-id]").forEach(function(i){var t=i.getAttribute("data-type");v[i.getAttribute("data-id")]=(t==="n"||t==="r")?parseFloat(i.value)||0:i.value});return v}
function calc(){try{last=fn(read(),M,N,L);var h='<div class="big">'+last[0][2]+'</div><div class="sub">'+(L==="es"?last[0][1]:last[0][0])+"</div>";for(var i=1;i<last.length;i++)h+='<div class="line"><span>'+(L==="es"?last[i][1]:last[i][0])+"</span><b>"+last[i][2]+"</b></div>";res.innerHTML=h}catch(e){res.innerHTML='<div class="sub">…</div>'}}
var sh=document.getElementById("share");
if(sh)sh.onclick=function(){var t=last.map(function(l){return(L==="es"?l[1]:l[0])+": "+l[2]}).join(" | ")+" — "+location.href;if(navigator.share)navigator.share({title:document.title,text:t,url:location.href});else if(navigator.clipboard)navigator.clipboard.writeText(t)};
var fv=document.getElementById("fav");
if(fv)fv.onclick=function(){var f=JSON.parse(localStorage.getItem("favs")||"[]");var p=location.pathname;var i=f.indexOf(p);if(i>=0)f.splice(i,1);else f.push(p);localStorage.setItem("favs",JSON.stringify(f));var ic=fv.querySelector("span");if(ic)ic.textContent=i>=0?"☆":"★"};
calc();
})();
