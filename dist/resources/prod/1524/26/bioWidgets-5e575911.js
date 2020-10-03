import{H as e,y as t,c as s,o,f as i,m as a,h as r,i as n,p as l,A as c,Y as u}from"./calfSystem-a5fc99d4.js"
import"./numberIsNaN-a6bcb044.js"
import"./roundToString-92a6300c.js"
import{b as f,r as m}from"./render-2e5b67bc.js"
import"./playerName-f44ad46e.js"
import"./toLowerCase-b21b7cc8.js"
import{c as b}from"./createInput-2b13b662.js"
import{i as p}from"./insertTextBeforeEnd-a53a8e2c.js"
import"./testRange-960066fd.js"
import{t as d}from"./testQuant-50452735.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],y=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(j,e)}function k(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,y)),t}(g.value),t=m(e)
c(t||e,w)}function S(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=a({className:"fshBioContainer "+e}),o=a({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=a({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=a({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),r(e,B),p(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,k),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}export default S
//# sourceMappingURL=bioWidgets-5e575911.js.map
