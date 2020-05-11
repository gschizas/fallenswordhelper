import{cf as e,z as t,G as o,i as n,p as s,o as i,A as a,a5 as r,v as c,cg as d,aw as m}from"./calfSystem-8dc0fa4b.js"
import"./isChecked-1bdf83c2.js"
import{s as p}from"./simpleCheckbox-1f751e80.js"
import"./guildStore-b172d7f4.js"
import"./getInventory-20cd9685.js"
import"./getInventoryById-f0471a4b.js"
import{p as g}from"./perfFilter-ddedae65.js"
let l
const f=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function k(e){0!==e.error?h(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${d+m}breakdown&m=1`}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(k)}function j(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?y():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function x(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function v(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,j,!0),i(a("composing-items"),x),i(a("disableBreakdownPrompts"),v))}
//# sourceMappingURL=breakdown-5ec7956d.js.map
