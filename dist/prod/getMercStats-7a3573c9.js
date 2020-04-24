import{w as r,x as t,N as e,v as n,b1 as c,ay as a}from"./calfSystem-cb871cc0.js"
function u(r,t,e){return t+Math.round(Number(c[e].exec(r)[1])*a)}function s(r,t){return r.map(n(u,t.dataset.tipped))}function m(r){const n=t(r)
return function(r){return{attack:r[0],defense:r[1],armor:r[2],damage:r[3],hp:r[4]}}(function(r){return r.reduce(s,[0,0,0,0,0])}(e('#pCC img[src*="/merc/"]',n)))}function o(){return r({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-7a3573c9.js.map
