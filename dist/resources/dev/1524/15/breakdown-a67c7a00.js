import{q as e,w as t,D as o,i as s,p as n,o as i,x as a,W as r,s as c,b$ as d,ah as m}from"./calfSystem-ee582533.js"
import"./isChecked-21b2756d.js"
import{s as p}from"./simpleCheckbox-eb1aed29.js"
import"./getArrayByClassName-981a136a.js"
import"./indexAjaxJson-e486d467.js"
import"./cmdExport-23cec039.js"
import"./guildStore-7cd0d847.js"
import"./getInventory-82e3b49f.js"
import"./getInventoryById-77125772.js"
import{p as g}from"./perfFilter-8e750c38.js"
let l
const b=[]
function u(e){e.hide()}function f(e,t){e.animate({height:0},500,t)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(f,e,c(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(h,5e3)}function j(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function x(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(j)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?x():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),y),i(a("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-a67c7a00.js.map
