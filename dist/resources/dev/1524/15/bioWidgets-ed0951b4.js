import{D as e,x as t,c as o,o as s,e as i,k as r,f as a,i as n,p as l,z as c,W as u}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import"./round-12db58e6.js"
import"./roundToString-cbd573ec.js"
import{b as m,r as f}from"./render-eb9874dd.js"
import"./playerName-e40f24e0.js"
import"./toLowerCase-6383ba3b.js"
import{c as b}from"./createInput-2410e798.js"
import{i as d}from"./insertTextBeforeEnd-85cd30d6.js"
import"./testRange-b6b0d52c.js"
import{t as p}from"./testQuant-81d6b112.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=p(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===o.cmd&&(t=v(t,j)),t}(g.value)
e=f(e),c(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),s=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,s),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),a(e,B),d(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,y),a(e,t),a(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,m),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-ed0951b4.js.map
