import{D as e,x as t,c as s,o,e as i,k as a,f as r,i as n,p as l,z as c,V as u}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import"./roundToString-c7353690.js"
import{b as f,r as d}from"./render-ad06fdd4.js"
import"./playerName-a172b8d3.js"
import"./toLowerCase-dcd4458e.js"
import{c as m}from"./createInput-e6e1d6b3.js"
import{i as p}from"./insertTextBeforeEnd-438d4add.js"
import"./testRange-c1779f47.js"
import{t as b}from"./testQuant-ffd89c9b.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=b(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,j)),t}(g.value)
e=d(e),c(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=a({className:"fshBioContainer "+e}),o=a({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=a({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=a({innerHTML:"<br>Display "})
B=m({min:1,max:99,type:"number",value:h}),r(e,B),p(e," Lines ")
const t=m({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-9a19b068.js.map
