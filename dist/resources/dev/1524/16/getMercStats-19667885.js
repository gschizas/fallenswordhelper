import{t,u as r,I as e,s as n,aT as a,av as u}from"./calfSystem-d49dbbd3.js"
function c(t,r,e){return r+Math.round(Number(a[e].exec(t)[1])*u)}function s(t,r){return t.map(n(c,r.dataset.tipped))}function d(t){const n=r(t)
return function(t){return{attack:t[0],defense:t[1],armor:t[2],damage:t[3],hp:t[4]}}(function(t){return t.reduce(s,[0,0,0,0,0])}(e('#pCC img[src*="/merc/"]',n)))}function m(){return t({cmd:"guild",subcmd:"mercs"}).then(d)}export{m as g}
//# sourceMappingURL=getMercStats-19667885.js.map
