const fs=require("fs"),P=require("path");
const {cats:CATS,tools:TOOLS}=require("./src/tools.js");
const SITE=process.env.CF_PAGES_URL||"https://quicktools.pages.dev";
const LANGS=["en","es"];
const UI={tag:{en:"Free online calculators",es:"Calculadoras online gratis"},home:{en:"Home",es:"Inicio"},try:{en:"Try also",es:"Prueba también"},faq:{en:"FAQ",es:"Preguntas frecuentes"},how:{en:"How to use",es:"Cómo usar"},share:{en:"Share",es:"Compartir"},fav:{en:"Save",es:"Guardar"},pop:{en:"Most popular",es:"Más populares"},all:{en:"tools",es:"herramientas"},disc:{en:"Results are informative only.",es:"Resultados solo informativos."},privacy:{en:"Privacy",es:"Privacidad"},terms:{en:"Terms",es:"Términos"},about:{en:"About",es:"Acerca de"},contact:{en:"Contact",es:"Contacto"}};
const POP=["mortgage-loan","bmi","percentage","tip","calories"];
const byId=id=>TOOLS.find(t=>t.id===id);
const W=(f,c)=>{fs.mkdirSync(P.dirname(f),{recursive:true});fs.writeFileSync(f,c)};
const tile=(l,t)=>`<a class="tile" href="/${l}/${t.cat}/${t.id}/">${t[l]}</a>`;
const header=(l,path)=>{const alt="/"+(l==="en"?"es":"en")+path.slice(3);return `<header><a class="brand" href="/${l}/">QuickTools</a><nav class="top">${CATS.map(c=>`<a href="/${l}/${c.id}/">${c[l]}</a>`).join
