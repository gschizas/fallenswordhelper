import{w as e,x as r,N as t,v as n,b1 as a,ay as u}from"./calfSystem-72fdbe97.js"
function c(e,r,t){return r+Math.round(Number(a[t].exec(e)[1])*u)}function s(e,r){return e.map(n(c,r.dataset.tipped))}function m(e){const n=r(e)
return function(e){return{attack:e[0],defense:e[1],armor:e[2],damage:e[3],hp:e[4]}}(function(e){return e.reduce(s,[0,0,0,0,0])}(t('#pCC img[src*="/merc/"]',n)))}function o(){return e({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-f478d0eb.js.map
