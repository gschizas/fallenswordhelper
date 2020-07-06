import{bi as e,x as t,A as s,aK as o,y as n,aT as a,aq as r,t as i,G as c,p as l,Y as u}from"./calfSystem-019de1cf.js"
import{d as f}from"./dialogMsg-16e7e1c1.js"
function d(e,t){u(t,e[t])}function g(){const e=o(n("HelperfshSettings").value)
if(a(e)){const t=e
r(t).forEach(i(d,t)),f("Settings loaded successfully!")}}function p(e,t){return e[t]=c(t),e}export default function(){if(t())return
const o=function(){const t=[],s=new RegExp("^"+e)
for(let o=0,n=window.localStorage.length;o<n;o+=1){const n=window.localStorage.key(o)
n.match(s)&&t.push(n.replace(e,""))}return t}().reduce(p,{})
!function(e,t){s(`<h1>FSH Settings</h1><br><center>The box below is your current settings. Copy it to save your current settings<br>To load saved settings, simply replace the contents of the box with your saved copy and press the button below.<textarea align="center" cols="80" rows="25" style="background-color:white;font-family:Consolas,'Lucida Console','Courier New',monospace;" id="HelperfshSettings" name="fshSettings">${JSON.stringify(t)}</textarea><br><input id="HelperLoadSettings" class="custombutton" type="submit" value="Load Settings!" /></center>`,e)}(l,o),$("#HelperLoadSettings").on("click",g)}
//# sourceMappingURL=load-99b62c4a.js.map
