import{cf as e,z as t,G as o,i as n,p as s,o as i,A as a,a5 as r,v as c,cg as d,aw as m}from"./calfSystem-0e5d6faf.js"
import"./isChecked-b4499234.js"
import{s as p}from"./simpleCheckbox-36785f1a.js"
import"./guildStore-d26a8300.js"
import"./getInventory-4e5ba01c.js"
import"./getInventoryById-590cf298.js"
import{p as g}from"./perfFilter-d35f21cf.js"
let f
const l=[]
function u(e){e.hide()}function b(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(b,e,c(u,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function k(e){0!==e.error?h(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${d+m}breakdown&m=1`}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(l).then(k)}function j(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==l.length?y():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function x(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=l.indexOf(t);-1===o?l.push(t):l.splice(o,1)}function v(){f=!f,r("disableBreakdownPrompts",f)}export default function(){t()||(g("composing"),f=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,j,!0),i(a("composing-items"),x),i(a("disableBreakdownPrompts"),v))}
//# sourceMappingURL=breakdown-279b7f7a.js.map
