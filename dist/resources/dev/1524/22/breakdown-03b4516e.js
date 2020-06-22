import{r as e,x as t,G as o,i as s,p as n,o as i,y as a,l as r,Z as c,t as d,bJ as m,as as p}from"./calfSystem-4cc738f8.js"
import"./isChecked-464466aa.js"
import{s as g}from"./simpleCheckbox-326bdee4.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import"./guildStore-36c52711.js"
import"./getInventory-8dd8007d.js"
import"./getInventoryById-068bca44.js"
import"./getArrayByClassName-cef24a4c.js"
import{p as l}from"./perfFilter-1303d03e.js"
let f
const b=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function j(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(j,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(x)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function B(){f=!f,c("disableBreakdownPrompts",f)}export default function(){t()||(l("composing"),f=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-03b4516e.js.map
