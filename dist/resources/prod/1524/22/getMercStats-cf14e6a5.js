import{u as e,v as r,D as t,t as n,aQ as a,ar as u}from"./calfSystem-d04e4be4.js"
function c(e,r,t){return r+Math.round(Number(a[t].exec(e)[1])*u)}function s(e,r){return e.map(n(c,r.dataset.tipped))}function m(e){const n=r(e)
return function(e){return{attack:e[0],defense:e[1],armor:e[2],damage:e[3],hp:e[4]}}(function(e){return e.reduce(s,[0,0,0,0,0])}(t('#pCC img[src*="/merc/"]',n)))}function o(){return e({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-cf14e6a5.js.map
