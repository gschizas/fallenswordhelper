import{u as r,v as t,D as a,t as e,aQ as n,ar as u}from"./calfSystem-d3aab5a8.js"
function c(r,t,a){return t+Math.round(Number(n[a].exec(r)[1])*u)}function s(r,t){return r.map(e(c,t.dataset.tipped))}function m(r){const e=t(r)
return function(r){return{attack:r[0],defense:r[1],armor:r[2],damage:r[3],hp:r[4]}}(function(r){return r.reduce(s,[0,0,0,0,0])}(a('#pCC img[src*="/merc/"]',e)))}function o(){return r({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-a924b6d7.js.map
