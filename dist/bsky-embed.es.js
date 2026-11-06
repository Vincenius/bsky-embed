(()=>{function Ie(e){return Object.keys(e).reduce((n,r)=>{const s=e[r];return n[r]=Object.assign({},s),ye(s.value)&&!De(s.value)&&!Array.isArray(s.value)&&(n[r].value=Object.assign({},s.value)),Array.isArray(s.value)&&(n[r].value=s.value.slice(0)),n},{})}function Fe(e){return e?Object.keys(e).reduce((n,r)=>{const s=e[r];return n[r]=ye(s)&&"value"in s?s:{value:s},n[r].attribute||(n[r].attribute=Be(r)),n[r].parse="parse"in n[r]?n[r].parse:typeof n[r].value!="string",n},{}):{}}function Ue(e){return Object.keys(e).reduce((n,r)=>(n[r]=e[r].value,n),{})}function He(e,t){const n=Ie(t);return Object.keys(t).forEach(s=>{const o=n[s],a=e.getAttribute(o.attribute),i=e[s];a&&(o.value=o.parse?me(a):a),i!=null&&(o.value=Array.isArray(i)?i.slice(0):i),o.reflect&&we(e,o.attribute,o.value),Object.defineProperty(e,s,{get(){return o.value},set(l){const d=o.value;o.value=l,o.reflect&&we(this,o.attribute,o.value);for(let c=0,f=this.__propertyChangedCallbacks.length;c<f;c++)this.__propertyChangedCallbacks[c](s,l,d)},enumerable:!0,configurable:!0})}),n}function me(e){if(e)try{return JSON.parse(e)}catch{return e}}function we(e,t,n){if(n==null||n===!1)return e.removeAttribute(t);let r=JSON.stringify(n);e.__updating[t]=!0,r==="true"&&(r=""),e.setAttribute(t,r),Promise.resolve().then(()=>delete e.__updating[t])}function Be(e){return e.replace(/\.?([A-Z]+)/g,(t,n)=>"-"+n.toLowerCase()).replace("_","-").replace(/^-/,"")}function ye(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function De(e){return Object.prototype.toString.call(e)==="[object Function]"}function Ke(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let re;function Ve(e,t){const n=Object.keys(t);return class extends e{static get observedAttributes(){return n.map(s=>t[s].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=He(this,t);const s=Ue(this.props),o=this.Component,a=re;try{re=this,this.__initialized=!0,Ke(o)?new o(s,{element:this}):o(s,{element:this})}finally{re=a}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let s=null;for(;s=this.__releaseCallbacks.pop();)s(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(s,o,a){if(this.__initialized&&!this.__updating[s]&&(s=this.lookupProp(s),s in t)){if(a==null&&!this[s])return;this[s]=t[s].parse?me(a):a}}lookupProp(s){if(t)return n.find(o=>s===o||s===t[o].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(s){this.__releaseCallbacks.push(s)}addPropertyChangedCallback(s){this.__propertyChangedCallbacks.push(s)}}}function qe(e,t={},n={}){const{BaseElement:r=HTMLElement,extension:s}=n;return o=>{let a=customElements.get(e);return a?(a.prototype.Component=o,a):(a=Ve(r,Fe(t)),a.prototype.Component=o,a.prototype.registeredTag=e,customElements.define(e,a,s),a)}}const Ge=(e,t)=>e===t,se=Symbol("solid-proxy"),J={equals:Ge};let ve=Se;const M=1,Y=2,xe={owned:null,cleanups:null,context:null,owner:null};var k=null;let ie=null,Xe=null,w=null,x=null,j=null,Q=0;function Je(e,t){const n=w,r=k,s=e.length===0,o=t===void 0?r:t,a=s?xe:{owned:null,cleanups:null,context:o?o.context:null,owner:o},i=s?e:()=>e(()=>V(()=>ee(a)));k=a,w=null;try{return G(i,!0)}finally{w=n,k=r}}function K(e,t){t=t?Object.assign({},J,t):J;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),$e(n,s));return[_e.bind(n),r]}function $(e,t,n){const r=oe(e,t,!1,M);q(r)}function ke(e,t,n){ve=Ze;const r=oe(e,t,!1,M);r.user=!0,j?j.push(r):q(r)}function E(e,t,n){n=n?Object.assign({},J,n):J;const r=oe(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,q(r),_e.bind(r)}function V(e){if(w===null)return e();const t=w;w=null;try{return e()}finally{w=t}}function Ye(e){ke(()=>V(e))}function _e(){if(this.sources&&this.state)if(this.state===M)q(this);else{const e=x;x=null,G(()=>Z(this),!1),x=e}if(w){const e=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(e)):(w.sources=[this],w.sourceSlots=[e]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function $e(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&G(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],a=ie&&ie.running;a&&ie.disposed.has(o),(a?!o.tState:!o.state)&&(o.pure?x.push(o):j.push(o),o.observers&&Ce(o)),a||(o.state=M)}if(x.length>1e6)throw x=[],new Error},!1)),t}function q(e){if(!e.fn)return;ee(e);const t=Q;Qe(e,e.value,t)}function Qe(e,t,n){let r;const s=k,o=w;w=k=e;try{r=e.fn(t)}catch(a){return e.pure&&(e.state=M,e.owned&&e.owned.forEach(ee),e.owned=null),e.updatedAt=n+1,Ae(a)}finally{w=o,k=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?$e(e,r):e.value=r,e.updatedAt=n)}function oe(e,t,n,r=M,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:k,context:k?k.context:null,pure:n};return k===null||k!==xe&&(k.owned?k.owned.push(o):k.owned=[o]),o}function W(e){if(e.state===0)return;if(e.state===Y)return Z(e);if(e.suspense&&V(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Q);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===M)q(e);else if(e.state===Y){const r=x;x=null,G(()=>Z(e,t[0]),!1),x=r}}function G(e,t){if(x)return e();let n=!1;t||(x=[]),j?n=!0:j=[],Q++;try{const r=e();return We(n),r}catch(r){n||(j=null),x=null,Ae(r)}}function We(e){if(x&&(Se(x),x=null),e)return;const t=j;j=null,t.length&&G(()=>ve(t),!1)}function Se(e){for(let t=0;t<e.length;t++)W(e[t])}function Ze(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:W(r)}for(t=0;t<n;t++)W(e[t])}function Z(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===M?r!==t&&(!r.updatedAt||r.updatedAt<Q)&&W(r):s===Y&&Z(r,t)}}}function Ce(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Y,n.pure?x.push(n):j.push(n),n.observers&&Ce(n))}}function ee(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),a=n.observerSlots.pop();r<s.length&&(o.sourceSlots[a]=r,s[r]=o,n.observerSlots[r]=a)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ee(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function et(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ae(e,t=k){throw et(e)}function Ee(e,t){return V(()=>e(t||{}))}function te(){return!0}const tt={get(e,t,n){return t===se?n:e.get(t)},has(e,t){return t===se?!0:e.has(t)},set:te,deleteProperty:te,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:te,deleteProperty:te}},ownKeys(e){return e.keys()}};function ae(e){return(e=typeof e=="function"?e():e)?e:{}}function nt(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function rt(...e){let t=!1;for(let a=0;a<e.length;a++){const i=e[a];t=t||!!i&&se in i,e[a]=typeof i=="function"?(t=!0,E(i)):i}if(t)return new Proxy({get(a){for(let i=e.length-1;i>=0;i--){const l=ae(e[i])[a];if(l!==void 0)return l}},has(a){for(let i=e.length-1;i>=0;i--)if(a in ae(e[i]))return!0;return!1},keys(){const a=[];for(let i=0;i<e.length;i++)a.push(...Object.keys(ae(e[i])));return[...new Set(a)]}},tt);const n={},r=Object.create(null);for(let a=e.length-1;a>=0;a--){const i=e[a];if(!i)continue;const l=Object.getOwnPropertyNames(i);for(let d=l.length-1;d>=0;d--){const c=l[d];if(c==="__proto__"||c==="constructor")continue;const f=Object.getOwnPropertyDescriptor(i,c);if(!r[c])r[c]=f.get?{enumerable:!0,configurable:!0,get:nt.bind(n[c]=[f.get.bind(i)])}:f.value!==void 0?f:void 0;else{const S=n[c];S&&(f.get?S.push(f.get.bind(i)):f.value!==void 0&&S.push(()=>f.value))}}}const s={},o=Object.keys(r);for(let a=o.length-1;a>=0;a--){const i=o[a],l=r[i];l&&l.get?Object.defineProperty(s,i,l):s[i]=l?l.value:void 0}return s}function st(e,t,n){let r=n.length,s=t.length,o=r,a=0,i=0,l=t[s-1].nextSibling,d=null;for(;a<s||i<o;){if(t[a]===n[i]){a++,i++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===a){const c=o<r?i?n[i-1].nextSibling:n[o-i]:l;for(;i<o;)e.insertBefore(n[i++],c)}else if(o===i)for(;a<s;)(!d||!d.has(t[a]))&&t[a].remove(),a++;else if(t[a]===n[o-1]&&n[i]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[i++],t[a++].nextSibling),e.insertBefore(n[--o],c),t[s]=n[o]}else{if(!d){d=new Map;let f=i;for(;f<o;)d.set(n[f],f++)}const c=d.get(t[a]);if(c!=null)if(i<c&&c<o){let f=a,S=1,P;for(;++f<s&&f<o&&!((P=d.get(t[f]))==null||P!==c+S);)S++;if(S>c-i){const F=t[a];for(;i<c;)e.insertBefore(n[i++],F)}else e.replaceChild(n[i++],t[a++])}else a++;else t[a++].remove()}}}const Pe="_$DX_DELEGATE";function v(e,t,n){let r;const s=()=>{const a=document.createElement("template");return a.innerHTML=e,a.content.firstChild},o=()=>(r||(r=s())).cloneNode(!0);return o.cloneNode=o,o}function ze(e,t=window.document){const n=t[Pe]||(t[Pe]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,it))}}function y(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Oe(e,t){t==null?e.removeAttribute("class"):e.className=t}function le(e,t,n){return V(()=>e(t,n))}function h(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return ne(e,t,r,n);$(s=>ne(e,t(),s,n),r)}function it(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function ne(e,t,n,r,s){for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,a=r!==void 0;if(e=a&&n[0]&&n[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(t=t.toString()),a){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=N(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||o==="boolean")n=N(e,n,r);else{if(o==="function")return $(()=>{let i=t();for(;typeof i=="function";)i=i();n=ne(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],l=n&&Array.isArray(n);if(ce(i,t,n,s))return $(()=>n=ne(e,i,n,r,!0)),()=>n;if(i.length===0){if(n=N(e,n,r),a)return n}else l?n.length===0?je(e,i,r):st(e,n,i):(n&&N(e),je(e,i));n=i}else if(t.nodeType){if(Array.isArray(n)){if(a)return n=N(e,n,r,t);N(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ce(e,t,n,r){let s=!1;for(let o=0,a=t.length;o<a;o++){let i=t[o],l=n&&n[e.length],d;if(!(i==null||i===!0||i===!1))if((d=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))s=ce(e,i,l)||s;else if(d==="function")if(r){for(;typeof i=="function";)i=i();s=ce(e,Array.isArray(i)?i:[i],Array.isArray(l)?l:[l])||s}else e.push(i),s=!0;else{const c=String(i);l&&l.nodeType===3&&l.data===c?e.push(l):e.push(document.createTextNode(c))}}return s}function je(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function N(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let a=t.length-1;a>=0;a--){const i=t[a];if(s!==i){const l=i.parentNode===e;!o&&!a?l?e.replaceChild(s,i):e.insertBefore(s,n):l&&i.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}function ot(e){const t=Object.keys(e),n={};for(let r=0;r<t.length;r++){const[s,o]=K(e[t[r]]);Object.defineProperty(n,t[r],{get:s,set(a){o(()=>a)}})}return n}function at(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function lt(e){return(t,n)=>{const{element:r}=n;return Je(s=>{const o=ot(t);r.addPropertyChangedCallback((i,l)=>o[i]=l),r.addReleaseCallback(()=>{r.renderRoot.textContent="",s()});const a=e(o,n);return h(r.renderRoot,a)},at(r))}}function ct(e,t,n){return arguments.length===2&&(n=t,t={}),qe(e,t)(lt(n))}const dt=`/*
! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
.visible {
  visibility: visible;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.right-5 {
  right: 1.25rem;
}
.top-5 {
  top: 1.25rem;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-16 {
  margin-bottom: 4rem;
}
.ml-10 {
  margin-left: 2.5rem;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-8 {
  margin-top: 2rem;
}
.block {
  display: block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.grid {
  display: grid;
}
.h-10 {
  height: 2.5rem;
}
.h-14 {
  height: 3.5rem;
}
.h-2 {
  height: 0.5rem;
}
.h-4 {
  height: 1rem;
}
.h-auto {
  height: auto;
}
.max-h-\\[90vh\\] {
  max-height: 90vh;
}
.w-10 {
  width: 2.5rem;
}
.w-14 {
  width: 3.5rem;
}
.w-4 {
  width: 1rem;
}
.w-full {
  width: 100%;
}
.max-w-\\[calc\\(100\\%-70px\\)\\] {
  max-width: calc(100% - 70px);
}
.max-w-screen-sm {
  max-width: 640px;
}
.flex-1 {
  flex: 1 1 0%;
}
@keyframes pulse {

  50% {
    opacity: .5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-1 {
  gap: 0.25rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.overflow-hidden {
  overflow: hidden;
}
.text-ellipsis {
  text-overflow: ellipsis;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-t-md {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.border {
  border-width: 1px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity));
}
.bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
}
.bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity));
}
.bg-slate-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(226 232 240 / var(--tw-bg-opacity));
}
.bg-slate-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-bold {
  font-weight: 700;
}
.font-semibold {
  font-weight: 600;
}
.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
.text-slate-500 {
  --tw-text-opacity: 1;
  color: rgb(100 116 139 / var(--tw-text-opacity));
}
.text-slate-600 {
  --tw-text-opacity: 1;
  color: rgb(71 85 105 / var(--tw-text-opacity));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.underline {
  text-decoration-line: underline;
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop\\:bg-gray-800::backdrop {
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
}
.backdrop\\:opacity-90::backdrop {
  opacity: 0.9;
}
.hover\\:bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.hover\\:underline:hover {
  text-decoration-line: underline;
}
.dark\\:border-slate-800:where(.dark, .dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(30 41 59 / var(--tw-border-opacity));
}
.dark\\:bg-slate-800:where(.dark, .dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(30 41 59 / var(--tw-bg-opacity));
}
.dark\\:text-slate-400:where(.dark, .dark *) {
  --tw-text-opacity: 1;
  color: rgb(148 163 184 / var(--tw-text-opacity));
}
.dark\\:text-white:where(.dark, .dark *) {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
`,ut="https://api.bsky.app",de=async(e,t)=>{const n=new URLSearchParams;for(const[r,s]of Object.entries(t))s!=null&&s!==""&&n.set(r,String(s));try{const r=await fetch(`${ut}/xrpc/${e}?${n.toString()}`,{headers:{accept:"application/json"}});return r.ok?{success:!0,data:await r.json()}:{success:!1,data:null}}catch{return{success:!1,data:null}}},ft=e=>de("app.bsky.feed.getAuthorFeed",e),pt=e=>de("app.bsky.feed.getFeed",e),ht=e=>de("app.bsky.feed.searchPosts",e),bt=new TextEncoder,ue=new TextDecoder,I=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),gt=e=>{try{const{protocol:t}=new URL(String(e));return t==="http:"||t==="https:"?String(e):null}catch{return null}},mt=(e,t)=>{const n=bt.encode(e),r=t.filter(a=>a?.index&&a.features?.length&&a.index.byteStart<a.index.byteEnd).sort((a,i)=>a.index.byteStart-i.index.byteStart),s=[];let o=0;for(const a of r){const{byteStart:i,byteEnd:l}=a.index;i<o||(i>o&&s.push({text:ue.decode(n.slice(o,i))}),s.push({text:ue.decode(n.slice(i,l)),feature:a.features[0]}),o=l)}return o<n.length&&s.push({text:ue.decode(n.slice(o))}),s.length||s.push({text:e}),s},Re=({post:e,reason:t,isRoot:n})=>{if(e.$type==="app.bsky.embed.record#viewNotFound"||e.$type==="app.bsky.embed.record#viewBlocked")return null;if(e.$type==="app.bsky.graph.defs#listView")return{username:e.creator.displayName,handle:e.creator.handle,avatar:e.creator.avatar,text:[{val:e.description,setInnerHtml:!1}],createdAt:e.indexedAt,uri:e.uri,images:[],card:null,replyPost:null,isRepost:!1,repostBy:null};if(e.$type==="app.bsky.feed.defs#generatorView")return{username:e.creator.displayName,handle:e.creator.handle,avatar:e.creator.avatar,text:[{val:e.description,setInnerHtml:!1}],createdAt:e.indexedAt,uri:e.uri,images:[],card:null,replyPost:null,isRepost:!1,repostBy:null};if(!e.record)return null;const r=e.record.facets||[],s=e.record.text,o=[];for(const d of mt(s,r)){const c=d.feature,f=c?.$type==="app.bsky.richtext.facet#link"?gt(c.uri):null;f?o.push({val:`<a href="${I(f)}" target="_blank" rel="noopener" class="text-blue-500 underline">${I(d.text)}</a>`,setInnerHtml:!0}):c?.$type==="app.bsky.richtext.facet#mention"?o.push({val:`<a href="https://bsky.app/profile/${I(c.did??"")}" target="_blank" rel="noopener" class="text-blue-500 underline">${I(d.text)}</a>`,setInnerHtml:!0}):c?.$type==="app.bsky.richtext.facet#tag"?o.push({val:`<a href="https://bsky.app/hashtag/${I(c.tag??"")}" target="_blank" rel="noopener" class="text-blue-500 underline">${I(d.text)}</a>`,setInnerHtml:!0}):o.push({val:d.text,setInnerHtml:!1})}const a=e.embed?.$type==="app.bsky.embed.record#view"?e.embed.record:e.embed?.record?.record?.$type==="app.bsky.embed.record#viewRecord"&&e.embed.record.record,i=a&&{...a,record:a.value||a.record,embed:(a?.embeds||[])[0]},l=e.author||e.creator;return{username:l.displayName,handle:l.handle,avatar:l.avatar,text:o,createdAt:e.record.createdAt,uri:e.uri,images:[...e.embed?.images||[],...e.embed?.media?.images||[],...[e.embed?.media?.external].filter(Boolean).map(d=>({...d,alt:d.title,thumb:d.uri}))],video:e.embed?.$type==="app.bsky.embed.video#view"&&e.embed,card:e.embed?.$type==="app.bsky.embed.external#view"&&e.embed?.external,replyPost:n&&i&&Re({post:i,reason:{$type:"",by:{displayName:""}},isRoot:!1}),isRepost:t?.$type==="app.bsky.feed.defs#reasonRepost",repostBy:t?.by?.displayName}},fe=e=>(e.feed||[]).map(t=>Re({...t,isRoot:!0})),Me=e=>{const t=e.lastIndexOf("/");return t!==-1?e.substring(t+1):e},wt=e=>{const t=new Date,n=60*1e3,r=n*60,s=r*24,o=s*30,a=s*365,i=t.getTime()-e.getTime();return i<n?Math.floor(i/1e3)+"s":i<r?Math.floor(i/n)+"m":i<s?Math.floor(i/r)+"h":i<o?Math.floor(i/s)+"d":i<a?Math.floor(i/o)+" mo":Math.floor(i/a)+" yr"},yt=async(e,t,n=!1)=>{if(!("IntersectionObserver"in window)){console.error("IntersectionObserver not supported");return}if(!t){console.error("Video element not found");return}const r={root:null,threshold:.5},s=async(a,i)=>{for(const l of a){if(!l.isIntersecting)continue;i.unobserve(t);const{default:d}=await import("./bsky-embed-hls.js");if(d.isSupported()){const c=new d;c.loadSource(e.playlist),c.attachMedia(t),c.on(d.Events.MANIFEST_PARSED,()=>{n||t.play()})}else t.canPlayType("application/vnd.apple.mpegurl")&&(t.src=e.playlist,t.addEventListener("loadedmetadata",()=>{n||t.play()}))}};new IntersectionObserver(s,r).observe(t)};var vt=v('<article class="p-4 border-b border-slate-300 dark:border-slate-800"><div class="flex gap-2"><div class="w-full max-w-[calc(100%-70px)]"><div class="flex items-center"><a class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white"><span class="font-bold dark:text-white"></span><span> </span><span class="text-slate-500 dark:text-slate-400 text-sm">@</span></a><span class="text-slate-500 dark:text-slate-400 text-sm"><span class=mx-1>\xB7</span><a class=hover:underline></a></span></div><p class="whitespace-pre-wrap dark:text-white">'),xt=v('<p class="flex gap-1 items-center ml-10 text-slate-600 dark:text-slate-400"><svg viewBox="0 0 576 512"height=16 width=16 tabindex=-1 class=mr-1><path fill=currentColor d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg><span class="text-sm text-slate-500 font-semibold">Reposted by '),kt=v('<img alt="profile picture"class="w-14 h-14 rounded-full">'),_t=v('<img alt="profile picture"class="w-4 h-4 mr-1 rounded-full">'),Te=v("<span>"),$t=v("<div>"),St=v("<a><img class=rounded-md>"),Ct=v('<div class="mt-4 w-full"><video width=100% class="rounded-md w-full h-auto"preload=none>'),At=v('<a target=_blank rel=noopener class="mt-4 rounded-md border border-slate-300 block"><div class=p-3><p class="text-slate-500 dark:text-slate-400 text-sm"></p><p class="font-bold dark:text-white mb-1"></p><p class="whitespace-pre-wrap dark:text-white">'),Et=v('<img class=rounded-t-md alt="Post Thumbnail">'),Pt=v('<a target=_blank rel=noopener class="mt-4 rounded-md border border-slate-300 block">');const Le=({linkTarget:e="_self",post:t,handleModalContent:n,isCard:r=!1,dateFormat:s,disableImages:o,disableVideos:a,disableAutoplay:i})=>{let l;return Ye(()=>{!a&&t.video&&t.video.cid&&yt(t.video,l,i)}),(()=>{var d=vt(),c=d.firstChild,f=c.firstChild,S=f.firstChild,P=S.firstChild,F=P.firstChild,pe=F.nextSibling,U=pe.nextSibling;U.firstChild;var H=P.nextSibling,he=H.firstChild,C=he.nextSibling,X=S.nextSibling;return h(d,(()=>{var p=E(()=>!!t.isRepost);return()=>p()&&(()=>{var u=xt(),m=u.firstChild,g=m.nextSibling;return g.firstChild,h(g,()=>t.repostBy,null),u})()})(),c),h(c,!r&&(()=>{var p=kt();return $(()=>y(p,"src",t.avatar)),p})(),f),h(S,r&&(()=>{var p=_t();return $(()=>y(p,"src",t.avatar)),p})(),P),y(P,"target",e),y(P,"rel",e==="_blank"?"noopeener":""),h(F,()=>t.username),h(U,()=>t.handle,null),y(C,"target",e),y(C,"rel",e==="_blank"?"noopeener":""),h(C,(()=>{var p=E(()=>!!(s&&s.type==="absolute"));return()=>p()?new Date(t.createdAt).toLocaleDateString(s.locale,s.options):wt(new Date(t.createdAt))})()),h(X,()=>t.text.map(p=>p.setInnerHtml?(()=>{var u=Te();return $(()=>u.innerHTML=p.val),u})():(()=>{var u=Te();return h(u,()=>p.val),u})())),h(f,(()=>{var p=E(()=>!o&&t.images.length>0);return()=>p()&&(()=>{var u=$t();return h(u,()=>t.images.map(m=>(()=>{var g=St(),T=g.firstChild;return g.$$click=A=>n(A,m),y(g,"target",e),y(g,"rel",e==="_blank"?"noopeener":""),$(A=>{var B=`https://bsky.app/profile/${t.handle}/post/${Me(t.uri)}`,R=m.thumb,b=m.alt;return B!==A.e&&y(g,"href",A.e=B),R!==A.t&&y(T,"src",A.t=R),b!==A.a&&y(T,"alt",A.a=b),A},{e:void 0,t:void 0,a:void 0}),g})())),$(()=>Oe(u,t.images.length>1?"mt-4 grid grid-cols-2 gap-2":"mt-4")),u})()})(),null),h(f,(()=>{var p=E(()=>!!(!a&&t.video));return()=>p()&&(()=>{var u=Ct(),m=u.firstChild,g=l;return typeof g=="function"?le(g,m):l=m,m.autoplay=!1,m.controls=!0,m.muted=!0,$(()=>y(m,"poster",t.video.thumbnail)),u})()})(),null),h(f,(()=>{var p=E(()=>!!t.card);return()=>p()&&(()=>{var u=At(),m=u.firstChild,g=m.firstChild,T=g.nextSibling,A=T.nextSibling;return h(u,(()=>{var B=E(()=>!!(t.card.thumb&&!o));return()=>B()&&(()=>{var R=Et();return $(()=>y(R,"src",t.card.thumb)),R})()})(),m),h(g,()=>new URL(t.card.uri).hostname),h(T,()=>t.card.title),h(A,()=>t.card.description),$(()=>y(u,"href",t.card.uri)),u})()})(),null),h(f,(()=>{var p=E(()=>!!t.replyPost);return()=>p()&&(()=>{var u=Pt();return h(u,Ee(Le,rt({linkTarget:e,handleModalContent:n,disableImages:o,disableVideos:a,disableAutoplay:i},{get post(){return t.replyPost},isCard:!0}))),$(()=>y(u,"href",t.card.uri)),u})()})(),null),$(p=>{var u=`https://bsky.app/profile/${t.handle}`,m=`https://bsky.app/profile/${t.handle}/post/${Me(t.uri)}`;return u!==p.e&&y(P,"href",p.e=u),m!==p.t&&y(C,"href",p.t=m),p},{e:void 0,t:void 0}),d})()};ze(["click"]);var zt=v('<section><dialog class="backdrop:bg-gray-800 backdrop:opacity-90"><form class="fixed top-5 right-5"><button type=submit aria-label=close formmethod=dialog formnovalidate class="bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center">X</button></form><img src=""alt=""class=max-h-[90vh]>'),Ne=v("<style>"),Ot=v("<link rel=stylesheet>"),jt=v("<div class=w-full>"),Rt=v('<article class="w-full flex gap-2 p-4 border-b border-slate-300 dark:border-slate-800 animate-pulse"><div class="bg-slate-200 w-14 h-14 rounded-full dark:bg-slate-800"></div><div class="flex-1 space-y-2 py-1"><div class="grid grid-cols-4 gap-4"><div class="h-2 bg-slate-200 rounded col-span-2 dark:bg-slate-800"></div></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800">'),Mt=v('<div class="mt-8 mb-16"><button id=bsky-load-more class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Load More Posts');const Tt=({username:e,filter:t,feed:n,limit:r=10,mode:s="",linkTarget:o="_self",linkImage:a=!1,customStyles:i="",customStylesFile:l,disableStyles:d=!1,search:c,loadMore:f=!1,dateFormat:S,disableImages:P=!1,disableVideos:F=!1,disableAutoplay:pe=!1})=>{let U=null,H=null;const[he,C]=K(!1),[X,p]=K([]),[u]=K(r),[m,g]=K(void 0);ke(()=>{C(!0),T()},[e,n,c,u]);const T=async b=>{e?ft({limit:u(),actor:e,filter:t||"posts_no_replies",cursor:b}).then(({success:_,data:O})=>{if(_){const L=fe(O);R(L),C(!1),g(O.cursor)}else C(!1),g(void 0)}):n?pt({limit:u(),feed:n,cursor:b}).then(({success:_,data:O})=>{if(_){const L=fe(O);R(L),C(!1),g(O.cursor)}else C(!1),g(void 0)}):c&&ht({limit:u(),q:c,cursor:b}).then(({success:_,data:O})=>{if(_){const L={...O,feed:O.posts.map(D=>({post:D}))},z=fe(L);R(z),C(!1),g(void 0)}else C(!1),g(void 0)})},A=(b,_)=>{!a&&U&&H&&(b.preventDefault(),H.src=_.fullsize,H.alt=_.alt,U.showModal())},B=()=>{C(!0),T(m())},R=b=>{const _=[...X(),...b];p(_)};return[!d&&(()=>{var b=Ne();return h(b,dt),b})(),i&&(()=>{var b=Ne();return h(b,i),b})(),l&&(()=>{var b=Ot();return y(b,"href",l),b})(),(()=>{var b=zt(),_=b.firstChild,O=_.firstChild,L=O.nextSibling;return Oe(b,`${s} max-w-screen-sm mx-auto flex flex-col items-center`),h(b,(()=>{var z=E(()=>X().length>0);return()=>z()&&X().map((D,be)=>(()=>{var ge=jt();return y(ge,"id",`post-${be}`),h(ge,Ee(Le,{post:D,handleModalContent:A,linkTarget:o,dateFormat:S,disableImages:P,disableVideos:F,disableAutoplay:pe})),ge})())})(),_),h(b,(()=>{var z=E(()=>!!he());return()=>z()&&Array.from(Array(r)).map(()=>Rt())})(),_),le(z=>U=z,_),le(z=>H=z,L),h(b,(()=>{var z=E(()=>!!(f&&m()));return()=>z()&&(()=>{var D=Mt(),be=D.firstChild;return be.$$click=B,D})()})(),null),b})()]};ze(["click"]),ct("bsky-embed",{username:"",filter:"",feed:"",limit:10,mode:"",linkTarget:"_self",linkImage:!1,customStyles:"",customStylesFile:"",disableStyles:!1,search:"",loadMore:!1,disableAutoplay:!1,disableImages:!1,disableVideos:!1,dateFormat:{}},Tt)})();
