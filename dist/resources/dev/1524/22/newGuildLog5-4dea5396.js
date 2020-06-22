import{h as t,p as s,f as e,t as n,z as d,y as a,i,x as c,a as o,G as l,aI as r}from"./calfSystem-4cc738f8.js"
import{g as h}from"./idb-670c0cca.js"
import{c as p}from"./createTable-8f45252e.js"
import{p as u}from"./padZ-efc0fa0f.js"
import{g as f}from"./guild-152cc6b9.js"
let b
function g(t){b.replaceChild(t.children[0],b.children[0]),d("Complete.",a("fshOutput"))}function m(t,s){i(t.tBodies[0],s)
const e=t.insertRow(-1).insertCell(-1)
e.className="divider",e.colSpan=3}function y(t){const s=b.getBoundingClientRect().top,e=Math.abs(Math.min(s,0)),i=e/24,c=Math.ceil(document.documentElement.clientHeight/24),o=t.length-i-c,l=p({innerHTML:"<tbody></tbody>"}),r=l.insertRow(-1)
r.style.height=e.toString()+"px",r.insertCell(-1),r.insertCell(-1),r.insertCell(-1),t.slice(i,i+c-1).forEach(n(m,l))
const h=24*o
l.insertRow(-1).style.height=h.toString()+"px",d("Inject table.",a("fshOutput")),requestAnimationFrame(n(g,l))}function R(d){b=p({className:"width_full",id:"fshInjectHere5",innerHTML:"<tbody></tbody>"}),t(s,b),y(d),e(window,"scroll",function(t,s){let e
return function(){clearTimeout(e),e=setTimeout(t,s)}}(n(y,d),0))}function k(t,s,e){return`<tr${function(t,s,e){let n=""
const d=(t-e.time)/6e4
return e.time>s?n=' class="fshNr"':function(t,s,e){return t>20&&s<=e}(d,e.time,s)&&(n=' class="fshOr"'),n}(t,s,e)}><td><span class="newGuildLog"></span></td><td>${function(t){const s=new Date(1e3*t),e=s.getUTCFullYear().toString(),n=u(s.getUTCDate()),d=r[s.getUTCMonth()]
return`${u(s.getUTCHours())}:${u(s.getUTCMinutes())} ${n}/${d}/${e}`}(e.time)}</td><td>${e.msg.text}</td></tr>`}function x(t,s,e,n){return function(t,s,e){return f({subcmd:"log",log_id:t,latest:s,limit:e})}(s,n,t).then(s=>{const n=s.r.logs,d=n.concat(e),a=n.length
return 1e3===a?x(t-a,n[0].id,d,!1):d})}function T(t){const s=(new Date).setUTCSeconds(0,0)-1,e=l("lastmyGuildLogCheck")||s,i=t.map(n(k,s,e)).reverse()
d("Building table.",a("fshOutput")),o(3,R,[i])}function C(t){d("Processing.",a("fshOutput")),o(3,T,[t])}function L(e){x(5e3,-1,[]).then(C)
const n=p({className:"fshInvFilter",innerHTML:'<thead><tr><th colspan="11"><b>Guild Log Version 5</b></th><th colspan="3"><span id="rfsh" class="sendLink">Reset</span> <a href="index.php?cmd=guild&subcmd=log" class="sendLink">Old Guild Log</a></th></tr></thead><tbody><tr><td rowspan="3"><b>&nbsp;Filters:</b></td><td class="fshRight">&nbsp;Potions:</td><td><input type="checkbox" data-item="1"/></td><td class="fshRight">&nbsp;Store/Recalls:</td><td><input type="checkbox" data-item="2"/></td><td class="fshRight">&nbsp;Relics:</td><td><input type="checkbox" data-item="4"/></td><td class="fshRight">&nbsp;Mercenaries:</td><td><input type="checkbox" data-item="5"/></td><td class="fshRight">&nbsp;Group Combats:</td><td><input type="checkbox" data-item="6"/></td><td colspan="3">&nbsp;</td></tr><tr><td class="fshRight">&nbsp;Donations:</td><td><input type="checkbox" data-item="7"/></td><td class="fshRight">&nbsp;Rankings:</td><td><input type="checkbox" data-item="8"/></td><td class="fshRight">&nbsp;GvGs:</td><td><input type="checkbox" data-item="9"/></td><td class="fshRight">&nbsp;Tag/UnTags:</td><td><input type="checkbox" data-item="3"/></td><td class="fshRight">&nbsp;Titans:</td><td><input type="checkbox" data-item="10"/></td><td class="fshRight">&nbsp;Other:</td><td><input type="checkbox" data-item="0"/></td><td>&nbsp;</td></tr><tr><td colspan="2">&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td><td colspan="2">&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td><td colspan="9"></td></tr><tr><td id="fshOutput" class="fshBlue" colspan="14">Loading ...</td></tr></tbody>'})
t(s,n)
const d=p({className:"width_full",id:"headerTable5",innerHTML:'<tbody><tr><td class="header">&nbsp;</td><td class="header">Date</td><td class="header">Message</td></tr></tbody>'})
t(s,d)}export default function(){c()||h("fsh_guildLog").then(L)}
//# sourceMappingURL=newGuildLog5-4dea5396.js.map
