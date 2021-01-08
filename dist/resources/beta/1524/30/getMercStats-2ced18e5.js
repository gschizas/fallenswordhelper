import{u as r,v as t,D as e,t as n,aP as a,ar as u}from"./calfSystem-ebf4b17d.js"
function c(r,t,e){return t+Math.round(Number(a[e].exec(r)[1])*u)}function s(r,t){return r.map(n(c,t.dataset.tipped))}function m(r){const n=t(r)
return function(r){return{attack:r[0],defense:r[1],armor:r[2],damage:r[3],hp:r[4]}}(function(r){return r.reduce(s,[0,0,0,0,0])}(e('#pCC img[src*="/merc/"]',n)))}function o(){return r({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-2ced18e5.js.map
