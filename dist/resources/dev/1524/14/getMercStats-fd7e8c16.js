import{v as e,w as r,M as t,u as n,b1 as a,aA as u}from"./calfSystem-d96a3efd.js"
function c(e,r,t){return r+Math.round(Number(a[t].exec(e)[1])*u)}function s(e,r){return e.map(n(c,r.dataset.tipped))}function m(e){const n=r(e)
return function(e){return{attack:e[0],defense:e[1],armor:e[2],damage:e[3],hp:e[4]}}(function(e){return e.reduce(s,[0,0,0,0,0])}(t('#pCC img[src*="/merc/"]',n)))}function o(){return e({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-fd7e8c16.js.map
