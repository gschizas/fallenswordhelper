import{cf as e,z as t,G as o,i as n,p as s,o as i,A as a,a5 as r,v as c,cg as d,aw as m}from"./calfSystem-70b0df7f.js"
import"./isChecked-c96092db.js"
import{s as p}from"./simpleCheckbox-13baa371.js"
import"./guildStore-997fb26d.js"
import"./getInventory-58a12092.js"
import"./getInventoryById-e8f5fd59.js"
import{p as g}from"./perfFilter-654a8ff3.js"
let f
const l=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function k(e){0!==e.error?h(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${d+m}breakdown&m=1`}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(l).then(k)}function j(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==l.length?y():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function x(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=l.indexOf(t);-1===o?l.push(t):l.splice(o,1)}function v(){f=!f,r("disableBreakdownPrompts",f)}export default function(){t()||(g("composing"),f=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,j,!0),i(a("composing-items"),x),i(a("disableBreakdownPrompts"),v))}
//# sourceMappingURL=breakdown-b374fdae.js.map
