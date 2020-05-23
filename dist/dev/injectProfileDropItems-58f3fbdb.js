import{b as e,p as t,g as o,$ as r,D as s,bl as n,f as i,N as a}from"./calfSystem-fd021443.js"
import"./batch-111227ce.js"
import"./dialogMsg-280d6f63.js"
import"./closest-23d4903f.js"
import"./closestTable-fd1fc1d7.js"
import"./insertHtmlBeforeBegin-9d9640eb.js"
import"./addStatTotalToMouseover-136fbdb0.js"
import{c as m}from"./chunk-a3e7a57c.js"
import{e as d}from"./errorDialog-c89dc139.js"
import"./dialog-a08a4c3c.js"
import"./ajaxReturnCode-ee8e978d.js"
import"./senditems-788e9bd9.js"
import"./dropItem-81576dd1.js"
import c from"./injectStoreItems-1b95c554.js"
import"./createTr-49a32cf0.js"
import"./makeFolderSpan-f7e59b0b.js"
import"./makeFolderSpans-1d730f40.js"
import"./eventHandler5-29815432.js"
import"./guildStore-8c50aca3.js"
import"./getInventory-610adf6e.js"
import"./getInventoryById-a110ba2d.js"
import"./selfIdIs-e22a1c50.js"
const l=e=>e.src.includes("/folder.png")
function p(e){return`<option value=${e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${s(e.parentNode.parentNode)}</option>`}function f(e){return function(e){return n({subcmd:"dodropitems",removeIndex:e})}(e)}const u=e=>{f(e.map(e=>e.value)).then(d).then(t=>{t.s&&e.forEach(e=>{const t=e.closest("tr")
t.nextElementSibling.remove(),t.remove()})})},j=e=>{if(!e.returnValue)return
e.preventDefault()
const t=a('[name="removeIndex[]"]:checked')
m(30,t).forEach(u)}
export default function(){c(),function(){const s=e("form",t)[0].nextElementSibling.nextElementSibling.nextElementSibling,n=o("img",s).filter(l)
0!==n.length&&r(s,`<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">${n.map(p).join("")}</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>`)}(),i(document.forms[0],"submit",j)}
//# sourceMappingURL=injectProfileDropItems-58f3fbdb.js.map
