import{ce as e,y as t,F as o,i as n,p as s,o as i,z as a,a4 as r,u as c,cf as d,av as m}from"./calfSystem-d96a3efd.js"
import"./isChecked-028fa109.js"
import{s as p}from"./simpleCheckbox-fb9f4a06.js"
import"./guildStore-0302347f.js"
import"./getInventory-1d86043b.js"
import"./getInventoryById-bb2e70f9.js"
import{p as g}from"./perfFilter-a92a859c.js"
let f
const l=[]
function u(e){e.hide()}function b(e,t){e.animate({height:0},500,t)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(b,e,c(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(h,5e3)}function k(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(l).then(k)}function j(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==l.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function x(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=l.indexOf(t);-1===o?l.push(t):l.splice(o,1)}function v(){f=!f,r("disableBreakdownPrompts",f)}export default function(){t()||(g("composing"),f=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,j,!0),i(a("composing-items"),x),i(a("disableBreakdownPrompts"),v))}
//# sourceMappingURL=breakdown-307d9df3.js.map
