const fs=require("fs"),P=require("path");
const {cats:C,tools:T}=require("./src/tools.js");
const S="https://speedytools.org";
const L=["en","es"];
const U={tag:{en:"Free online calculators",es:"Calculadoras online gratis"},home:{en:"Home",es:"Inicio"},try:{en:"Try also",es:"Prueba también"},faq:{en:"FAQ",es:"Preguntas"},how:{en:"How to use",es:"Cómo usar"},share:{en:"Share",es:"Compartir"},fav:{en:"Save",es:"Guardar"},pop:{en:"Most popular",es:"Más populares"},all:{en:"tools",es:"herramientas"},disc:{en:"Informative only.",es:"Solo informativo."},priv:{en:"Privacy",es:"Privacidad"},terms:{en:"Terms",es:"Términos"},about:{en:"About",es:"Acerca"},contact:{en:"Contact",es:"Contacto"}};
const H1={money:{en:"Money & Finance Calculators",es:"Calculadoras de Finanzas"},health:{en:"Health Calculators",es:"Calculadoras de Salud"},everyday:{en:"Everyday Tools & Calculators",es:"Herramientas y Utilidades Diarias"},fun:{en:"Fun Tests & Calculators",es:"Tests y Calculadoras Divertidas"}};
const gid=id=>T.find(t=>t.id===id);
const W=(f,c)=>{fs.mkdirSync(P.dirname(f),{recursive:true});fs.writeFileSync(f,c)};
const tile=(l,t)=>`<a class="tile" href="/${l}/${t.cat}/${t.id}/"><b>${t[l]}</b><small style="display:block;color:var(--mut);font-size:12px;margin-top:4px">${t.d?t.d[l]:""}</small></a>`;
const hd=(l,p)=>{const a="/"+(l==="en"?"es":"en")+p.slice(3);return `<header><a class="brand" href="/${l}/">QuickTools</a><nav class="top">${C.map(c=>`<a href="/${l}/${c.id}/">${c[l]}</a>`).join("")}</nav><span class="lang"><a href="${a}">${l==="en"?"ES":"EN"}</a><button id="themeBtn">◐</button></span></header>`};
const ft=l=>`<footer><p>${U.disc[l]}</p><p><a href="/${l}/about/">${U.about[l]}</a> · <a href="/${l}/privacy/">${U.priv[l]}</a> · <a href="/${l}/terms/">${U.terms[l]}</a> · <a href="/${l}/contact/">${U.contact[l]}</a></p></footer>`;
function pg(l,p,ti,d,b){const a=x=>"/"+(x==="en"?"es":"en")+p.slice(3);return `<!DOCTYPE html><html lang="${l}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ti}</title><meta name="description" content="${d}"><link rel="canonical" href="${S}${p}"><link rel="alternate" hreflang="en" href="${S}${a("en")}"><link rel="alternate" hreflang="es" href="${S}${a("es")}"><link rel="alternate" hreflang="x-default" href="${S}${a("en")}"><link rel="stylesheet" href="/assets/styles.css"></head><body>${hd(l,p)}<main>${b}</main>${ft(l)}<script src="/assets/app.js"></script></body></html>`}
function tb(l,t){const c=C.find(x=>x.id===t.cat);const r=[...t.rel.map(gid).filter(Boolean),...T.filter(x=>x.cat===t.cat&&!t.rel.includes(x.id)&&x.id!==t.id).slice(0,2)];
return `<nav class="crumb"><a href="/${l}/">${U.home[l]}</a> › <a href="/${l}/${t.cat}/">${c[l]}</a></nav><h1>${t[l]}</h1><p class="desc">${t.d?t.d[l]:U.tag[l]}</p><div class="card"><div id="fields" class="fields"></div><div id="res" class="res"></div><div class="acts"><button id="share">↗ ${U.share[l]}</button><button id="fav"><span>☆</span> ${U.fav[l]}</button></div></div><div class="ad">Ad</div><h2>${U.how[l]}</h2><ol>${t.f.map(f=>`<li>${l==="es"?"Ingresa":"Enter"} ${(l==="es"?f[3]:f[2]).toLowerCase()}</li>`).join("")}</ol><h2>${U.faq[l]}</h2>${l==="en"?"<h3>Is it free?</h3><p>Yes.</p><h3>Does it store data?</h3><p>No.</p>":"<h3>¿Es gratis?</h3><p>Sí.</p><h3>¿Guarda datos?</h3><p>No.</p>"}<h2>${U.try[l]}</h2><div class="grid">${r.map(x=>tile(l,x)).join("")}</div><script>window.LANG="${l}";window.TOOL=${JSON.stringify({f:t.f,calc:t.calc})};</script>`}
function hb(l,c){const list=T.filter(t=>t.cat===c.id);const h1=(H1[c.id]||{})[l]||c[l];return `<nav class="crumb"><a href="/${l}/">${U.home[l]}</a></nav><h1>${h1}</h1><p class="desc">${c.intro?c.intro[l]:""}</p><div class="grid">${list.map(t=>tile(l,t)).join("")}</div><h2>${U.try[l]}</h2><div class="grid">${C.filter(x=>x.id!==c.id).map(x=>`<a class="tile" href="/${l}/${x.id}/"><b>${x[l]}</b></a>`).join("")}</div>`}
const hmb=l=>`<h1>${l==="es"?"Calculadoras online gratis":"Free online calculators"}</h1>`+C.map(c=>`<h2>${(H1[c.id]||{})[l]||c[l]}</h2><div class="grid">${T.filter(t=>t.cat===c.id).map(t=>tile(l,t)).join("")}</div>`).join("");
const paths=[];
L.forEach(l=>{
paths.push("/"+l+"/");W("dist/"+l+"/index.html",pg(l,"/"+l+"/","QuickTools – "+U.tag[l],U.tag[l],hmb(l)));
C.forEach(c=>{const p="/"+l+"/"+c.id+"/";const h1=(H1[c.id]||{})[l]||c[l];paths.push(p);W("dist"+p+"index.html",pg(l,p,h1+" – QuickTools",c.intro?c.intro[l]:U.tag[l],hb(l,c)))});
T.forEach(t=>{const p="/"+l+"/"+t.cat+"/"+t.id+"/";paths.push(p);W("dist"+p+"index.html",pg(l,p,t[l]+" – QuickTools",t.d?t.d[l]:t[l],tb(l,t)))});
[["about",`<h1>${U.about[l]}</h1><p>QuickTools. ${U.tag[l]}</p>`],["privacy",`<h1>${U.priv[l]}</h1><p>${l==="es"?"No guardamos datos personales. Los cálculos ocurren en tu navegador.":"We do not store personal data. Calculations run in your browser."}</p>`],["terms",`<h1>${U.terms[l]}</h1><p>${U.disc[l]}</p>`],["contact",`<h1>${U.contact[l]}</h1><p>contact@quicktools.site</p>`]].forEach(x=>{const p="/"+l+"/"+x[0]+"/";paths.push(p);W("dist"+p+"index.html",pg(l,p,x[0]+" – QuickTools",U.tag[l],x[1]))});
});
W("dist/google2e57c5c982c6259b.html","google-site-verification: google2e57c5c982c6259b.html");
W("dist/index.html",'<!DOCTYPE html><meta charset="utf-8"><script>location.replace((navigator.language||"en").indexOf("es")===0?"/es/":"/en/")</script>');
W("dist/sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>"<url><loc>"+S+p+"</loc></url>").join("")+"</urlset>");
W("dist/robots.txt","User-agent: *\nAllow: /\nSitemap: "+S+"/sitemap.xml");
fs.mkdirSync("dist/assets",{recursive:true});
fs.copyFileSync("src/app.js","dist/assets/app.js");
fs.copyFileSync("src/styles.css","dist/assets/styles.css");
console.log("OK: "+(paths.length+1)+" pages");
