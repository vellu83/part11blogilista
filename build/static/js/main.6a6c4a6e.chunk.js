(this.webpackJsonpblogilista=this.webpackJsonpblogilista||[]).push([[0],{42:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),u=a(17),l=a.n(u),c=a(2),s=a(3),i=a(1),o=a.n(i),m=a(4),d=a(6),p=a.n(d),f="/api/blogs",b=null,g=null,v=null,E=function(){var e=Object(m.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get(f);case 2:return t=e.sent,a=t.data.sort((function(e,t){return t.likes-e.likes})),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=function(){var e=Object(m.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post(f,g,v);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=Object(m.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.put(b,g,v);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(m.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.delete(b,v);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k={getAll:E,createNew:function(e,t){return v={headers:{Authorization:"Bearer ".concat(e.token)}},g=Object(s.a)(Object(s.a)({},t),{},{likes:0}),h()},addLike:function(e){return b=f+"/"+e.id,g=Object(s.a)(Object(s.a)({},e),{},{user:e.user.id}),j()},removeBlog:function(e,t){return b=f+"/"+t.id,v={headers:{Authorization:"Bearer ".concat(e.token)}},O()}},w=function(e){var t=e.user,a=e.blog,n=e.updateBlogs,u=e.updateMessage,l=function(){var e=Object(m.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("are you sure??")){e.next=5;break}return e.next=3,k.removeBlog(t,a);case 3:u("blog deleted!","message"),n();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return t&&a.user&&t.id.toString()===a.user.id.toString()?r.a.createElement("button",{onClick:l,className:"delete"}," ","DELETE"," "):r.a.createElement(r.a.Fragment,null," ")},y=function(e){var t=e.blog,a=e.user,u=e.updateBlogs,l=e.updateMessage,i=Object(n.useState)(!1),d=Object(c.a)(i,2),p=d[0],f=d[1],b=Object(n.useState)(null),g=Object(c.a)(b,2),v=g[0],E=g[1],h=function(){f(!p)},j=function(){var e=Object(m.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.likes+1,E("P\xe4ivitet\xe4\xe4n..."),e.next=4,k.addLike(Object(s.a)(Object(s.a)({},t),{},{likes:n}),a);case 4:E(null),u();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return p?r.a.createElement("div",{key:t.id,className:"blogdetail"},r.a.createElement("h3",null,t.title," ",r.a.createElement("br",null),"Kirjoittaja: ",t.author),r.a.createElement("p",null,t.url," ",r.a.createElement("br",null),"likes: ",v||t.likes,r.a.createElement("button",{onClick:j,className:"likebutton"}," like "),r.a.createElement("br",null),"Lis\xe4nnyt: ",t.user.name),r.a.createElement("button",{onClick:h,className:"hidedetail"}," hide "),r.a.createElement(w,{key:"buttonkey"+t.id,user:a,blog:t,updateBlogs:u,updateMessage:l})):r.a.createElement("div",{key:t.id,className:"blog"},r.a.createElement("strong",null," Blogi: ")," ",t.title,r.a.createElement("strong",null," Kirjoittaja: ")," ",t.author,r.a.createElement("button",{onClick:h,className:"viewdetail"},"view"),r.a.createElement(w,{key:"buttonkey"+t.id,user:a,blog:t,updateBlogs:u,setDetailed:f,updateMessage:l}))},x=r.a.forwardRef((function(e,t){x.displayName="Blogs";var a=Object(n.useState)([]),u=Object(c.a)(a,2),l=u[0],s=u[1];Object(n.useEffect)((function(){k.getAll().then((function(e){s(e)}))}),[]);var i=function(){k.getAll().then((function(e){s(e)}))};return Object(n.useImperativeHandle)(t,(function(){return{updateBlogs:i}})),l?r.a.createElement("div",null,l.map((function(t){return r.a.createElement(y,{key:t.id,blog:t,user:e.user,updateBlogs:i,updateMessage:e.updateMessage})}))):r.a.createElement(r.a.Fragment,null)})),S=x,C=r.a.forwardRef((function(e,t){var a=Object(n.useState)(!1),u=Object(c.a)(a,2),l=u[0],s=u[1];C.displayName="Togglable";var i={display:l?"none":""},o={display:l?"":"none"},m=function(){s(!l)};return Object(n.useImperativeHandle)(t,(function(){return{toggleVisibility:m}})),r.a.createElement("div",null,r.a.createElement("div",{style:i},r.a.createElement("button",{onClick:m},e.buttonLabel)),r.a.createElement("div",{style:o},e.children,r.a.createElement("button",{onClick:m},"Cancel")))})),B=C,N=function(e){var t=e.updateMessage,a=e.user,u=e.blogRef,l=Object(n.useRef)(),i=Object(n.useState)({title:"",author:"",url:""}),d=Object(c.a)(i,2),p=d[0],f=d[1],b=function(){var e=Object(m.a)(o.a.mark((function e(n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,k.createNew(a,p);case 4:r=e.sent,f({title:"",author:"",url:""}),t("succsesfully added ".concat(r.title," by ").concat(r.author),"message"),u.current.updateBlogs(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),t(e.t0.message,"warning");case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return a?r.a.createElement(B,{buttonLabel:"Create new blog",ref:l,id:"createblog"},r.a.createElement("div",null,r.a.createElement("strong",null," ",r.a.createElement("h2",null,"Create new:")),r.a.createElement("form",{onSubmit:b,id:"addblogform"},r.a.createElement("div",null,"title:",r.a.createElement("input",{type:"text",id:"title",value:p.title,name:"title",onChange:function(e){var t=e.target;return f(Object(s.a)(Object(s.a)({},p),{},{title:t.value}))}})),r.a.createElement("div",null,"author:",r.a.createElement("input",{type:"text",id:"author",value:p.author,name:"author",onChange:function(e){var t=e.target;return f(Object(s.a)(Object(s.a)({},p),{},{author:t.value}))}})),r.a.createElement("div",null,"url:",r.a.createElement("input",{type:"text",value:p.url,id:"url",name:"url",onChange:function(e){var t=e.target;return f(Object(s.a)(Object(s.a)({},p),{},{url:t.value}))}})),r.a.createElement("button",{type:"submit",id:"submitblog"},"Create")))):r.a.createElement(r.a.Fragment,null)},M=function(){var e=Object(m.a)(o.a.mark((function e(t,a){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("/api/login",{username:t,password:a});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),L={login:M},F=function(e){var t=e.setUser,a=e.updateMessage,u=e.user,l=Object(n.useState)(""),s=Object(c.a)(l,2),i=s[0],d=s[1],p=Object(n.useState)(""),f=Object(c.a)(p,2),b=f[0],g=f[1],v=function(){var e=Object(m.a)(o.a.mark((function e(n){var r,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),g(""),d(""),e.prev=3,e.next=6,L.login(i,b);case 6:r=e.sent,u=JSON.stringify(r),window.localStorage.setItem("userdata",u),t(r),a("".concat(r.name," succesfully logged in"),"message"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),a("invalid credentials!","warning");case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(t){return e.apply(this,arguments)}}();return u?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",null,r.a.createElement("strong",null," LOGIN:"),r.a.createElement("form",{onSubmit:v},r.a.createElement("div",null,"username:",r.a.createElement("input",{type:"text",id:"username",value:i,name:"username",onChange:function(e){var t=e.target;return d(t.value)}})),r.a.createElement("div",null,"password:",r.a.createElement("input",{type:"text",id:"password",value:b,name:"username",onChange:function(e){var t=e.target;return g(t.value)}})),r.a.createElement("button",{type:"submit",id:"submitlogin"},"Login")))},I=function(e){var t=e.user,a=e.setUser;return t?r.a.createElement("div",null,r.a.createElement("p",null,t.name," logged in",r.a.createElement("button",{on:!0,onClick:function(){window.localStorage.clear(),a(null)}}," logout ")," ")):r.a.createElement(r.a.Fragment,null)},R=function(e){var t=e.message;return t?r.a.createElement("div",{className:t.type},r.a.createElement("h3",null,t.text)):r.a.createElement(r.a.Fragment,null)},A=function(){var e=Object(n.useState)(null),t=Object(c.a)(e,2),a=t[0],u=t[1],l=Object(n.useState)(null),s=Object(c.a)(l,2),i=s[0],o=s[1];Object(n.useEffect)((function(){var e=window.localStorage.getItem("userdata");if(e){var t=JSON.parse(e);u(t)}}),[]);var m=function(e,t){o({text:e,type:t}),setTimeout((function(){o(null)}),5e3)},d=Object(n.useRef)();return r.a.createElement("div",null,r.a.createElement(R,{message:i}," "),r.a.createElement(I,{user:a,setUser:u}),r.a.createElement(F,{setUser:u,updateMessage:m,user:a}),r.a.createElement(N,{user:a,updateMessage:m,blogRef:d}),r.a.createElement(S,{user:a,ref:d,updateMessage:m}))};a(42);l.a.render(r.a.createElement(A,null),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.6a6c4a6e.chunk.js.map