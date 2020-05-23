import{G as e,A as t,e as o,o as s,f as a,l as i,h as r,i as n,p as l,C as u,a5 as c}from"./calfSystem-0e5d6faf.js"
import"./numberIsNaN-a4c8282b.js"
import"./round-90a12e36.js"
import"./roundToString-ca66f7f1.js"
import{b as f,r as m}from"./render-ba4a225c.js"
import"./toLowerCase-adcc7aa6.js"
import{c as p}from"./createInput-fb0874a0.js"
import{i as d}from"./insertTextBeforeEnd-87531f51.js"
import"./testRange-4d094a99.js"
import{t as b}from"./testQuant-d782428a.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function v(e,t){return e.replace(t[0],t[1])}function k(e,t){return t.reduce(v,e)}function y(){const e=b(B.value)
e&&(h=e,c("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=k(e,N)
return"guild"===o.cmd&&(t=k(t,j)),t}(g.value)
e=m(e),u(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=i({className:`fshBioContainer ${e}`}),s=i({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,s),w=i({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=i({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),r(e,B),d(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,f),a(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-5b1f18a6.js.map
