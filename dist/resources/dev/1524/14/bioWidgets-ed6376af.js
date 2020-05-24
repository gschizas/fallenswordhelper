import{F as e,z as t,c as o,o as s,e as i,k as a,f as r,i as n,p as l,B as c,a4 as u}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./round-0cc3c134.js"
import"./roundToString-372e64d2.js"
import{b as f,r as m}from"./render-2dfa221a.js"
import"./toLowerCase-a0540d2c.js"
import{c as d}from"./createInput-2717f905.js"
import{i as p}from"./insertTextBeforeEnd-4a698b23.js"
import"./testRange-4bdd4227.js"
import{t as b}from"./testQuant-cffc2144.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=b(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===o.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),c(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=a({className:"fshBioContainer "+e}),s=a({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,s),w=a({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=a({innerHTML:"<br>Display "})
B=d({min:1,max:99,type:"number",value:h}),r(e,B),p(e," Lines ")
const t=d({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-ed6376af.js.map
