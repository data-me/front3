(function(e){function t(t){for(var r,u,i=t[0],l=t[1],c=t[2],f=0,p=[];f<i.length;f++)u=i[f],o[u]&&p.push(o[u][0]),o[u]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);s&&s(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(r=!1)}r&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={about:0},a=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var s=l;a.push([1,"chunk-vendors"]),n()})({"0ae2":function(e,t,n){},1:function(e,t,n){e.exports=n("7e66")},"36e5":function(e,t,n){"use strict";var r=n("0ae2"),o=n.n(r);o.a},"7e66":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"This is about page"}}),r("a",{attrs:{href:"/index"}},[e._v("Go to home")])],1)},a=[],u=n("fdab"),i={name:"app",components:{HelloWorld:u["a"]}},l=i,c=(n("36e5"),n("2877")),s=Object(c["a"])(l,o,a,!1,null,null,null),f=s.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(f)}}).$mount("#app")},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},e089:function(e,t,n){},e50e:function(e,t,n){"use strict";var r=n("e089"),o=n.n(r);o.a},fdab:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("br"),n("h1",[e._v(e._s(e.msg))])])},o=[],a={name:"HelloWorld",data:function(){return{msg:""}},mounted:function(){var e=this,t="JWT "+this.$cookies.get("token");this.$http.get("https://api2-datame.herokuapp.com/api/v1/helloworld",{headers:{Authorization:t}}).then(function(t){e.msg=t.data.saludo})}},u=a,i=(n("e50e"),n("2877")),l=Object(i["a"])(u,r,o,!1,null,"feb3ea04",null);t["a"]=l.exports}});
//# sourceMappingURL=about.25e04d00.js.map