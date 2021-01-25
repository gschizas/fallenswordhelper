import{r as e,x as t,H as o,i as s,p as n,o as a,y as i,l as r,_ as c,t as d,N as m,av as p,aw as g}from"./calfSystem-19a5d332.js"
import{p as l}from"./perfFilter-72709b0f.js"
import{s as f}from"./simpleCheckbox-dc1f0754.js"
import"./getArrayByClassName-8cefca3b.js"
import"./getInventoryById-3a7785c2.js"
import"./getInventory-b9584cb0.js"
import"./guildStore-1e1a9259.js"
import"./cmdExport-bf03c29e.js"
import"./indexAjaxJson-bdfce70d.js"
import"./isChecked-00f5c23d.js"
let b
const u=[]
function h(e){e.hide()}function j(e,t){e.animate({height:0},500,t)}function x(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(j,e,d(h,e)))}function y(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(x,5e3)}function k(e){0!==e.error?y(`Error: ${e.msg}`,"rgb(164, 28, 28)"):m(`${p+g}breakdown&m=1`)}function w(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(u).then(k)}function C(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==u.length?w():y("Error: No items selected.","rgb(164, 28, 28)")}(e)}function v(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=u.indexOf(t);-1===o?u.push(t):u.splice(o,1)}function B(){b=!b,c("disableBreakdownPrompts",b)}function P(){t()||(l("composing"),b=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${f("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,C,!0),a(i("composing-items"),v),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-217a9168.js.map
