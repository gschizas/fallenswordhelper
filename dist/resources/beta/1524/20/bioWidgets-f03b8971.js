import{G as e,y as t,c as s,o,e as a,l as i,f as r,i as n,p as l,A as c,Y as u}from"./calfSystem-05554bae.js"
import"./numberIsNaN-d04aa9f7.js"
import"./roundToString-25ba3ca9.js"
import{b as m,r as f}from"./render-7aad0699.js"
import"./playerName-0e65dbb6.js"
import"./toLowerCase-4d1a2136.js"
import{c as b}from"./createInput-b4c4948c.js"
import{i as p}from"./insertTextBeforeEnd-0b7ac991.js"
import"./testRange-54531d6d.js"
import{t as d}from"./testQuant-0751b1ca.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],y=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(j,e)}function k(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,y)),t}(g.value),t=f(e)
c(t||e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=i({className:"fshBioContainer "+e}),o=i({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=i({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=i({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),r(e,B),p(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,k),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,m),a(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-f03b8971.js.map
