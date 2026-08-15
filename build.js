const fs=require("fs"),P=require("path");
const {cats:CATS,tools:TOOLS}=require("./src/tools.js");
const SITE=process.env.CF_PAGES_URL||"https://quicktools.pages.dev";
const LANGS=["en","es"];
const UI={tag:{en:"Free online calculators",es:"Calculadoras online gratis"},home:{en:"Home",es:"Inicio"},try:{en:"Try also",es:"Prueba también"},faq:{en:"FAQ",es:"Preguntas frecuentes"},how:{en:"How to use",es:"Cómo usar"},share:{en:"Share",es:"Compartir"},fav:{en:"Save",es:"Guardar"},pop:{en:"Most popular",es:"Más populares"},all:{en:"tools",es:"herramientas"},disc:{en:"Results are informative only.",es:"Resultados solo informativos."},privacy:{en:"Privacy",es:"Privacidad"},terms:{en:"Terms",es:"Términos"},about:{en:"About",es:"Acerca de"},contact:{en:"Contact",es:"Contacto"}};
const POP=["mortgage-loan","bmi","percentage","tip","calories"];
const byId=id=>TOOLS.find(t=>t.id===id);
const W=(f,c)=>{fs.mkdirSync(P.dirname(f),{recursive:true});fs.writeFileSync(f,c)};
const tile=(l,t)=>`<a class="tile" href="/${l}/${t.cat}/${t.id}/">${t[l]}</a>`;
const header=(l,path)=>{const alt="/"+(l==="en"?"es":"en")+path.slice(3);return `<header><a class="brand" href="/${l}/">QuickTools</a><nav class="top">${CATS.map(c=>`<a href="/${l}/${c.id}/">${c[l]}</a>`).join("")}</nav><span class="lang"><a href="${alt}">${l==="en"?"ES":"EN"}</a><button id="themeBtn">◐</button></span></header>`};
const footer=l=>`<footer><p>${UI.disc[l]}</p><p><a href="/${l}/about/">${UI.about[l]}</a> · <a href="/${l}/privacy/">${UI.privacy[l]}</a> · <a href="/${l}/terms/">${UI.terms[l]}</a> · <a href="/${l}/contact/">${UI.contact[l]}</a></p></footer>`;
function page(l,path,title,desc,body){const alt=x=>"/"+(x==="en"?"es":"en")+path.slice(3);return `<!DOCTYPE html><html lang="${l}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${SITE}${path}"><link rel="alternate" hreflang="en" href="${SITE}${alt("en")}"><link rel="alternate" hreflang="es" href="${SITE}${alt("es")}"><link rel="alternate" hreflang="x-default" href="${SITE}${alt("en")}"><link rel="stylesheet" href="/assets/styles.css"></head><body>${header(l,path)}<main>${body}</main>${footer(l)}<script src="/assets/app.js"></script></body></html>`}
function toolBody(l,t){const cat=CATS.find(c=>c.id===t.cat);const rel=[...t.rel.map(byId).filter(Boolean),...TOOLS.filter(x=>x.cat===t.cat&&!t.rel.includes(x.id)&&x.id!==t.id).slice(0,2)];
return `<nav class="crumb"><a href="/${l}/">${UI.home[l]}</a> › <a href="/${l}/${t.cat}/">${cat[l]}</a
