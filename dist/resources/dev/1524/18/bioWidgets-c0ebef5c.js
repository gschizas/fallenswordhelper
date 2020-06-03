import{D as e,x as t,c as o,o as s,e as a,k as i,f as r,i as n,p as l,z as u,X as c}from"./calfSystem-5545a3e6.js"
import"./numberIsNaN-0d2994c6.js"
import"./round-aab1479f.js"
import"./roundToString-199787f3.js"
import{b as f,r as m}from"./render-c27b6e2f.js"
import"./playerName-546a1209.js"
import"./toLowerCase-57ae178d.js"
import{c as p}from"./createInput-836d9f1f.js"
import{i as d}from"./insertTextBeforeEnd-5a32dd2a.js"
import"./testRange-f08fd681.js"
import{t as b}from"./testQuant-36a679f9.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=b(B.value)
e&&(h=e,c("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===o.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),u(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=i({className:"fshBioContainer "+e}),s=i({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,s),w=i({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=i({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),r(e,B),d(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,f),a(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-c0ebef5c.js.map
