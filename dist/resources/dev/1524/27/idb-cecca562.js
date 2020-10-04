import{ad as e,ae as t}from"./calfSystem-ec5e5725.js"
class r{constructor(e="keyval-store",t="keyval"){this.storeName=t,this._dbp=new Promise((r,o)=>{const n=indexedDB.open(e,1)
n.onerror=()=>o(n.error),n.onsuccess=()=>r(n.result),n.onupgradeneeded=()=>{n.result.createObjectStore(t)}})}_withIDBStore(e,t){return this._dbp.then(r=>new Promise((o,n)=>{const s=r.transaction(this.storeName,e)
s.oncomplete=()=>o(),s.onabort=s.onerror=()=>n(s.error),t(s.objectStore(this.storeName))}))}}let o
function n(){return o||(o=new r),o}const s=r=>{r&&"NotFoundError"!==r.name&&e(t(r),!1)}
async function a(e,t){try{return await function(e,t=n()){let r
return t._withIDBStore("readonly",t=>{r=t.get(e)}).then(()=>r.result)}(e,t)}catch(e){s(e)}}async function c(e,t,r){try{return await function(e,t,r=n()){return r._withIDBStore("readwrite",r=>{r.put(t,e)})}(e,t,r)}catch(e){s(e)}}export{a as g,c as s}
//# sourceMappingURL=idb-cecca562.js.map
