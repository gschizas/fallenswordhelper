import{D as e,x as t,c as o,o as s,e as i,k as r,f as a,i as n,p as l,z as u,X as c}from"./calfSystem-d49dbbd3.js"
import"./numberIsNaN-1742f258.js"
import"./round-99c4f204.js"
import"./roundToString-263aa927.js"
import{b as f,r as m}from"./render-35e989ee.js"
import"./playerName-7c21a13e.js"
import"./toLowerCase-e686322a.js"
import{c as p}from"./createInput-1699d448.js"
import{i as d}from"./insertTextBeforeEnd-15fdfab0.js"
import"./testRange-22401008.js"
import{t as b}from"./testQuant-3028d04d.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=b(B.value)
e&&(h=e,c("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===o.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),u(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),s=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,s),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),a(e,B),d(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,y),a(e,t),a(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-d124eb6d.js.map
