(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{172:function(e,t,n){},173:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(13),i=n.n(c),s=n(8),l=n(15),o=n.n(l),u=n(24),j=n(238),b=n(2),d=Object(j.a)((function(e){return{root:{}}}));function x(e){var t=d(),n=Object(a.useContext)(Kt),r=n.google,c=n.setMap,i=Object(a.useRef)(null);Object(a.useEffect)((function(){if(null!=r&&null!=i){var e=new r.maps.Map(i.current,{zoom:15,center:{lat:35.6432027,lng:139.6729435},disableDefaultUI:!0});e.addListener("click",s),c(e)}}),[r,i]);var s=function(e){console.log(e)};return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{ref:i,className:t.root,style:{height:"100%"},children:"I can use the DOM with react ref"})})}var p=n(273),O=n(244),h=n(63),f=n.n(h);function m(e){var t=Object(a.useState)(e.initialValue),n=Object(s.a)(t,2),r=n[0],c=n[1];return Object(b.jsx)("form",{onSubmit:function(t){t.target.firstChild.firstChild.firstChild.blur(),t.preventDefault(),e.onSubmit(r)},children:Object(b.jsx)(p.a,{required:!0,fullWidth:e.fullWidth,id:"standard-basic",label:e.label,variant:"filled",onChange:function(e){c(e.target.value)},value:r,InputProps:{startAdornment:Object(b.jsx)(O.a,{position:"start",children:Object(b.jsx)(f.a,{color:"secondary",fontSize:"large"})})}})})}var g=n(278),v=n(274);function y(e){var t=function(t){return function(){e.onClick(t)}},n=e.types.map((function(n,a){return Object(b.jsx)(g.a,{label:n.japanese,size:"small",icon:n.icon,variant:"outlined",onClick:t(a),style:{margin:5},color:e.chipIndex==a?"primary":"default"})}));return Object(b.jsxs)(v.a,{mx:2,children:[Object(b.jsx)(v.a,{mb:2,children:Object(b.jsx)(v.a,{children:Object(b.jsx)(m,{fullWidth:!0,onSubmit:e.onSubmit})})}),Object(b.jsx)(v.a,{style:{overflowX:"auto",whiteSpace:"nowrap"},children:n})]})}var w=n(177),k=n(12),C=n(31),S=n(95),T=n.n(S),D=n(245),M=n(246),N=n(249),I=n(248),P=n(247),z=n(250),E=n(52),_=n(282),q=(n(3),n.p+"static/media/img_osaka.c9ba6993.jpg"),B=Object(j.a)((function(e){return{root:{height:"100%",width:"100%"},media:{height:100}}}));function F(e){var t=B(),n=e.place;return null==n?Object(b.jsxs)(D.a,{className:t.root,children:[Object(b.jsxs)(M.a,{children:[Object(b.jsx)(P.a,{className:t.media,image:q,title:"Contemplative Reptile"}),Object(b.jsxs)(I.a,{children:[Object(b.jsxs)(E.a,{gutterBottom:!0,variant:"h5",component:"h2",children:["Title",e.index]}),Object(b.jsxs)(E.a,{variant:"body2",color:"textSecondary",component:"p",children:[Object(b.jsxs)(v.a,{display:"flex",alignItems:"center",children:["Rating",Object(b.jsx)(_.a,{name:"read-only",value:5,precision:.5,readOnly:!0,size:"small"})]}),["\u89b3\u5149","\u5927\u962a","\u4eba\u6c17"].map((function(e){return Object(b.jsx)(g.a,{label:e,color:"primary"})}))]})]})]}),Object(b.jsxs)(N.a,{disableSpacing:!0,children:[Object(b.jsx)(z.a,{size:"small",color:"primary",children:"ADD"}),Object(b.jsx)(z.a,{size:"small",color:"primary",onClick:e.onClickDelete,children:"DELETE"})]})]}):Object(b.jsxs)(D.a,{className:t.root,children:[Object(b.jsxs)(M.a,{onClick:e.onClick,children:[Object(b.jsx)(P.a,{className:t.media,image:null==n.photos?null:n.photos[0].getUrl(),title:"Contemplative Reptile"}),Object(b.jsx)(I.a,{children:Object(b.jsx)(E.a,{variant:"h5",component:"h5",noWrap:!0,children:n.name})})]}),Object(b.jsx)(N.a,{disableSpacing:!0,children:null==n.type?Object(b.jsx)(z.a,{size:"small",color:"primary",onClick:e.onClickAdd,children:"ADD"}):Object(b.jsx)(z.a,{size:"small",color:"primary",onClick:e.onClickDelete,children:"DELETE"})})]})}var A=n(275),G=Object(j.a)({root:{width:"100%"}});function L(e){var t=G(),n=function(){console.log("open"),e.toggleDrawer(e.anchor,!1)};return Object(b.jsx)("div",{children:Object(b.jsx)(A.a,{anchor:e.anchor,open:e.state[e.anchor],onClose:n,onOpen:function(){e.toggleDrawer(e.anchor,!0)},children:(e.anchor,Object(b.jsx)("div",{className:t.root,role:"presentation",onClick:n,onKeyDown:n,children:e.drawer}))})})}var R=n(243),W=n(251),U=n(252),K=n(253),H=n(96),V=n.n(H),J=n(97),Q=n.n(J),X=n(98),Y=n.n(X),Z=n(99),$=n.n(Z),ee=n(100),te=n.n(ee),ne=function(){var e=Object(u.a)(o.a.mark((function e(t,n,a,r){var c,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new t.maps.places.PlacesService(n),(i={query:a,fields:["name","geometry","formatted_address","photos"]}).locationBias=null==r?{north:45.29328154474485,east:153.2360484603554,south:26.151593390188783,west:126.5636657976794}:{lat:r.lat(),lng:r.lng()},e.next=5,new Promise((function(e){c.findPlaceFromQuery(i,(function(n,a){a===t.maps.places.PlacesServiceStatus.OK&&e(n)}))}));case 5:return s=e.sent,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),ae=function(){var e=Object(u.a)(o.a.mark((function e(t,n,a,r){var c,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new t.maps.places.PlacesService(n),i={query:a},null==r?i.bounds=n.getBounds():(i.location={lat:r.lat(),lng:r.lng()},i.radius=5e4),e.next=5,new Promise((function(e){c.textSearch(i,(function(n,a){a==t.maps.places.PlacesServiceStatus.OK&&e(n)}))}));case 5:return s=e.sent,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),re=function(){var e=Object(u.a)(o.a.mark((function e(t,n,a){var r,c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={placeId:a},c=new t.maps.places.PlacesService(n),e.next=4,new Promise((function(e){c.getDetails(r,(function(n,a){a==t.maps.places.PlacesServiceStatus.OK&&e(n)}))}));case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),ce=function(){var e=Object(u.a)(o.a.mark((function e(t,n,a,r){var c,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new t.maps.DirectionsService,i={origin:n,destination:a,travelMode:t.maps.TravelMode.DRIVING},null!=r&&(i.waypoints=r,i.optimizeWaypoints=!0),e.next=5,c.route(i).then((function(e){return e})).catch((function(e){return console.log("Directions request failed due to "+e)}));case 5:return s=e.sent,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),ie=Object(j.a)((function(e){return{root:{width:"100%"},img:{width:"100%",height:200,objectFit:"cover"}}}));function se(e){var t=e.place,n=ie(),r=Object(a.useContext)(Kt),c=r.google,i=r.map,l=(r.plan,r.setPlan,Object(a.useState)(null)),j=Object(s.a)(l,2),d=j[0],x=j[1];if(Object(a.useEffect)((function(){console.log(t),null!=t&&Object(u.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,re(c,i,t.place_id);case 2:n=e.sent,x(n),console.log(n);case 5:case"end":return e.stop()}}),e)})))()}),[]),null!=t)return Object(b.jsxs)(v.a,{className:n.root,children:[Object(b.jsx)("img",{src:null==t.photos?null:t.photos[0].getUrl(),className:n.img}),Object(b.jsxs)(v.a,{px:2,children:[Object(b.jsx)(E.a,{gutterBottom:!0,variant:"h5",component:"h2",children:t.name}),Object(b.jsx)(E.a,{gutterBottom:!0,variant:"body2",color:"textSecondary",component:"p",children:Object(b.jsxs)(v.a,{display:"flex",alignItems:"center",children:[t.rating,Object(b.jsx)(_.a,{name:"read-only",value:t.rating,precision:.5,readOnly:!0,size:"small"}),"(",t.user_ratings_total,")"]})}),Object(b.jsx)(E.a,{children:t.types.map((function(e){return Object(b.jsx)(g.a,{size:"small",label:e,color:"primary",style:{margin:1}})}))}),Object(b.jsxs)(R.a,{children:[Object(b.jsxs)(W.a,{button:!0,children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(V.a,{})}),Object(b.jsx)(K.a,{primary:t.formatted_address})]}),Object(b.jsxs)(W.a,{button:!0,children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(Q.a,{})}),Object(b.jsx)(K.a,{primary:"\u55b6\u696d\u4e2d"})]}),null!=d&&null!=d.formatted_phone_number&&Object(b.jsxs)(W.a,{button:!0,children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(Y.a,{})}),Object(b.jsx)(K.a,{primary:d.formatted_phone_number})]}),null!=d&&null!=d.website&&Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)($.a,{})}),Object(b.jsx)(K.a,{primary:d.website})]}),Object(b.jsxs)(W.a,{button:!0,children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(te.a,{})}),Object(b.jsx)(K.a,{primary:"google\u3067\u691c\u7d22"})]})]})]})]})}function le(e){var t=e.place,n=Object(a.useState)({top:!1,left:!1,bottom:!1,right:!1}),r=Object(s.a)(n,2),c=r[0],i=r[1],l=function(e,t){i(Object(C.a)(Object(C.a)({},c),{},Object(k.a)({},e,t)))};return Object(b.jsxs)(v.a,{children:[Object(b.jsx)(v.a,{children:Object(b.jsx)(F,{place:t,onClick:function(){l("bottom",!0)},onClickAdd:e.onClickAdd,onClickDelete:e.onClickDelete})}),Object(b.jsx)(L,{drawer:Object(b.jsx)(se,{place:t}),toggleDrawer:l,state:c,anchor:"bottom"})]})}var oe=function(e){var t=e.places,n=e.chipIndex,r=e.markers,c=e.setMarkers,i=Object(a.useState)(0),l=Object(s.a)(i,2),o=l[0],u=l[1],j=Object(a.useContext)(Kt),d=j.map,x=j.plan,p=j.setPlan;if(Object(a.useEffect)((function(){u(0)}),[n]),Object(a.useEffect)((function(){null!=r&&(r.markers.map((function(e,t){e.addListener("click",(function(){u(t)}))})),c(r))}),[r]),null!=t)return Object(b.jsx)(T.a,{enableMouseEvents:!0,index:o,onChangeIndex:function(e){return function(e){u(e),d.panTo({lat:t[e].geometry.location.lat(),lng:t[e].geometry.location.lng()})}(e)},style:{padding:"0 30px"},children:t.map((function(e,n){return Object(b.jsx)(v.a,{px:1,children:Object(b.jsx)(le,{place:e,onClickDelete:function(){return function(e){x.places.splice(e,1),p(Object(C.a)({},x))}(n)},onClickAdd:function(){return function(e){x.places.push(t[e]),p(x)}(n)}})})}))})};function ue(e){var t=Object(a.useContext)(Kt),n=(t.google,t.map,t.plan,e.chipIndex),r=e.places;return null==r?null:Object(b.jsx)(w.a,{in:e.display,children:Object(b.jsx)(v.a,{display:"flex",justifyContent:"center",children:Object(b.jsx)(v.a,{width:"100%",children:Object(b.jsx)(oe,{chipIndex:n,setChipIndex:e.setChipIndex,places:r,markers:e.markers,setMarkers:e.setMarkers})})})})}var je=n(263),be=n(254),de=n(256),xe=n(258),pe=n(259),Oe=n(255),he=n(101),fe=n.n(he),me=n(264),ge=n(257),ve=n(279),ye=n(84),we=n(280),ke=n(261),Ce=n(262),Se=n(82),Te=n.n(Se),De=Object(j.a)((function(e){return{paper:{padding:"6px 16px"}}}));function Me(e){De();var t=e.spot,n=e.i;return Object(b.jsxs)(be.a,{children:[Object(b.jsx)(Oe.a,{style:{flex:.1},children:Object(b.jsx)(E.a,{variant:"body2",color:"textSecondary",children:t.arrivalTime.text})}),Object(b.jsxs)(de.a,{style:{flexGrow:.3},children:[Object(b.jsx)(v.a,{display:"flex",justifyContent:"center",children:Object(b.jsx)(v.a,{mx:1,my:1,children:Object(b.jsx)(ge.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:"abcdefghijklmnopqrstuvwxyz"[n-1],color:"secondary",children:Object(b.jsx)(ve.a,{alt:"Remy Sharp",src:null==t.photos?null:t.photos[0].getUrl()})})})}),Object(b.jsx)(xe.a,{})]}),Object(b.jsx)(pe.a,{style:{flexGrow:1},children:Object(b.jsxs)(we.a,{children:[Object(b.jsx)(ke.a,{expandIcon:Object(b.jsx)(Te.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:Object(b.jsxs)(v.a,{children:[Object(b.jsx)(E.a,{variant:"h6",component:"h1",children:t.name}),Object(b.jsx)(E.a,{variant:"caption",children:Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(v.a,{display:"flex",alignItems:"center",children:[t.rating,Object(b.jsx)(_.a,{name:"read-only",value:t.rating,precision:.5,readOnly:!0,size:"small"})]}),"\u6ede\u5728\u6642\u9593: ",t.stayTime.text]})})]})}),Object(b.jsx)(Ce.a,{children:Object(b.jsx)(E.a,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."})})]})})]})}function Ne(e){var t=De(),n=e.spot;return Object(b.jsxs)(be.a,{children:[Object(b.jsx)(Oe.a,{style:{flex:.1},children:Object(b.jsx)(E.a,{variant:"body2",color:"textSecondary",children:n.arrivalTime.text})}),Object(b.jsx)(de.a,{style:{flexGrow:.3},children:Object(b.jsx)(v.a,{display:"flex",justifyContent:"center",children:Object(b.jsx)(v.a,{mx:1,my:1,children:Object(b.jsx)(ge.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:null,color:"secondary",children:Object(b.jsx)(ve.a,{alt:"Remy Sharp",src:null==n.photos?null:n.photos[0].getUrl()})})})})}),Object(b.jsx)(pe.a,{children:Object(b.jsxs)(ye.a,{elevation:3,className:t.paper,children:[Object(b.jsx)(E.a,{variant:"h6",component:"h1",children:n.name}),Object(b.jsx)(E.a,{variant:"caption"})]})})]})}function Ie(e){var t=e.spot,n=e.leg;return Object(b.jsxs)(be.a,{children:[Object(b.jsx)(Oe.a,{style:{flexGrow:.1},children:Object(b.jsx)(E.a,{variant:"body2",color:"textSecondary",children:t.departureTime.text})}),Object(b.jsxs)(de.a,{style:{flexGrow:.3},children:[Object(b.jsx)(xe.a,{}),Object(b.jsx)(v.a,{display:"flex",justifyContent:"center",children:Object(b.jsx)(v.a,{mx:1,my:1,children:Object(b.jsx)(fe.a,{})})}),Object(b.jsx)(xe.a,{})]}),Object(b.jsx)(pe.a,{children:Object(b.jsxs)(v.a,{display:"flex",alignItems:"center",height:"100%",children:[n.duration.newText," by transit"]})})]})}function Pe(e){De();var t=Object(a.useContext)(Kt).plan;if(null==t)return Object(b.jsx)(je.a,{children:[0,1,2,3,4].map((function(){return Object(b.jsxs)(be.a,{children:[Object(b.jsx)(Oe.a,{style:{flex:.1},children:Object(b.jsx)(E.a,{variant:"body2",color:"textSecondary",children:Object(b.jsx)(me.a,{})})}),Object(b.jsxs)(de.a,{style:{flexGrow:.3},children:[Object(b.jsx)(v.a,{mx:1,my:1,children:Object(b.jsx)(me.a,{variant:"circle",children:Object(b.jsx)(ve.a,{})})}),Object(b.jsx)(xe.a,{})]}),Object(b.jsx)(pe.a,{children:Object(b.jsx)(E.a,{variant:"h1",children:Object(b.jsx)(me.a,{})})})]})}))});var n=t.itinerary,r=t.legs;return Object(b.jsx)(je.a,{children:n.map((function(t,a){return Object(b.jsxs)(v.a,{children:[0!=a&&a!=n.length-1?Object(b.jsx)(Me,{spot:t,i:a,onClick:function(){return e.onClick(t)}}):Object(b.jsx)(Ne,{spot:t,onClick:function(){return e.onClick(t)}}),a<r.length?Object(b.jsx)(Ie,{spot:t,leg:r[a]}):null]})}))})}var ze=n(265),Ee=n(283),_e=n(277),qe=n(102),Be=n.n(qe),Fe=n(104),Ae=n.n(Fe),Ge=n(103),Le=n.n(Ge),Re=Object(j.a)((function(e){return{root:{transform:"translateZ(0px)",flexGrow:1},exampleWrapper:{position:"relative",height:380},speedDial:{position:"absolute"}}})),We=[{icon:Object(b.jsx)(Be.a,{}),name:"Timeline"},{icon:Object(b.jsx)(Le.a,{}),name:"New"},{icon:Object(b.jsx)(Ae.a,{}),name:"Update"}];function Ue(e){var t=Re(),n=r.a.useState(!1),a=Object(s.a)(n,2),c=a[0],i=a[1],l=function(){i(!1)},o=function(t){return function(){l(),0==t?e.toggleDrawer("right",!0):1==t?e.handleOpen("new"):2==t&&e.handleOpen("re")}};return Object(b.jsx)("div",{className:t.root,children:Object(b.jsx)("div",{className:t.exampleWrapper,children:Object(b.jsx)(ze.a,{ariaLabel:"SpeedDial example",className:t.speedDial,icon:Object(b.jsx)(Ee.a,{}),onClose:l,onOpen:function(){i(!0)},open:c,direction:"up",children:We.map((function(e,t){return Object(b.jsx)(_e.a,{icon:e.icon,tooltipTitle:e.name,onClick:o(t)},e.name)}))})})})}var Ke=n(266),He=n(267),Ve=n(271),Je=n(270),Qe=n(30),Xe=n(268),Ye=n(269),Ze=n(78),$e=n.n(Ze),et=n(106),tt=n.n(et),nt=n(83),at=n.n(nt),rt=n(276),ct=n(260),it=n(178),st=n(107),lt=n.n(st),ot=n(115),ut=n(23),jt=n(272),bt=Object(j.a)((function(e){return{root:{},fab:{position:"fixed",bottom:e.spacing(10)}}}));function dt(e){return Object(b.jsx)(ut.a,{utils:ot.a,children:Object(b.jsx)(jt.a,{margin:"normal",id:"time-picker",label:"Time picker",value:e.selectedDate,onChange:e.handleDateChange,KeyboardButtonProps:{"aria-label":"change time"}})})}function xt(e){bt();var t=Object(a.useState)(["checkBox"]),n=Object(s.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(e.condition.regionName),l=Object(s.a)(i,2),o=l[0],u=l[1],j=Object(a.useState)(e.condition.originName),d=Object(s.a)(j,2),x=d[0],O=d[1],h=Object(a.useState)(""),f=Object(s.a)(h,2),m=f[0],g=f[1],y=new Date;y.setHours(9),y.setMinutes(0);var w=Object(a.useState)(y),k=Object(s.a)(w,2),S=k[0],T=k[1],D=Object(a.useContext)(Kt),M=(D.condition,D.setCondition),N=function(e){return function(){var t=r.indexOf(e),n=Object(Qe.a)(r);-1===t?n.push(e):n.splice(t,1),c(n)}};return Object(b.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={regionName:o,originName:x,destinationName:m,place:-1!=r.indexOf("place"),lunch:-1!=r.indexOf("lunch"),dinner:-1!=r.indexOf("dinner"),departureTime:3600*S.getHours()+60*S.getMinutes(),status:e.condition.status};-1!=r.indexOf("checkBox")&&(n.destinationName=x),M(Object(C.a)({},n))},children:[Object(b.jsxs)(R.a,{children:[Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(tt.a,{})}),Object(b.jsx)(p.a,{label:"\u30a8\u30ea\u30a2",required:!0,onChange:function(e){u(e.target.value)},value:o})]}),Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(at.a,{})}),Object(b.jsx)(p.a,{label:"\u51fa\u767a",required:!0,onChange:function(e){O(e.target.value)},value:x})]}),Object(b.jsxs)(W.a,{children:[Object(b.jsx)(rt.a,{checked:-1!==r.indexOf("checkBox"),onChange:N("checkBox"),inputProps:{"aria-label":"primary checkbox"}}),Object(b.jsx)(K.a,{primary:"\u51fa\u767a\u5730\u70b9\u3068\u5230\u7740\u5730\u70b9\u304c\u540c\u3058"})]}),Object(b.jsx)(ct.a,{in:-1==r.indexOf("checkBox"),children:Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)(at.a,{})}),Object(b.jsx)(p.a,{label:"\u5230\u7740",variant:"filled",onChange:function(e){g(e.target.value)},value:m})]})}),Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)($e.a,{})}),Object(b.jsx)(K.a,{id:"switch-list-label-bluetooth",primary:"\u30b9\u30dd\u30c3\u30c8\u3092\u81ea\u52d5\u3067\u8ffd\u52a0"}),Object(b.jsx)(Xe.a,{children:Object(b.jsx)(Ye.a,{edge:"end",onChange:N("place"),checked:-1!==r.indexOf("place"),inputProps:{"aria-labelledby":"switch-list-label-bluetooth"}})})]}),Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)($e.a,{})}),Object(b.jsx)(K.a,{id:"switch-list-label-bluetooth",primary:"\u663c\u98df\u3092\u81ea\u52d5\u3067\u8ffd\u52a0"}),Object(b.jsx)(Xe.a,{children:Object(b.jsx)(Ye.a,{edge:"end",onChange:N("lunch"),checked:-1!==r.indexOf("lunch"),inputProps:{"aria-labelledby":"switch-list-label-bluetooth"}})})]}),Object(b.jsxs)(W.a,{children:[Object(b.jsx)(U.a,{children:Object(b.jsx)($e.a,{})}),Object(b.jsx)(K.a,{id:"switch-list-label-bluetooth",primary:"\u5915\u98df\u3092\u81ea\u52d5\u3067\u8ffd\u52a0"}),Object(b.jsx)(Xe.a,{children:Object(b.jsx)(Ye.a,{edge:"end",onChange:N("dinner"),checked:-1!==r.indexOf("dinner"),inputProps:{"aria-labelledby":"switch-list-label-bluetooth"}})})]}),Object(b.jsx)(W.a,{children:Object(b.jsx)(dt,{selectedDate:S,handleDateChange:function(e){T(e)}})})]}),Object(b.jsx)(v.a,{width:"100%",children:Object(b.jsx)(v.a,{display:"flex",justifyContent:"center",children:Object(b.jsxs)(it.a,{color:"primary",variant:"extended",type:"submit",children:[Object(b.jsx)(lt.a,{}),"Navigate"]})})})]})}function pt(e){var t=r.a.useRef(null);return r.a.useEffect((function(){if(e.open){var n=t.current;null!==n&&n.focus()}}),[e.open]),Object(b.jsx)("div",{children:Object(b.jsxs)(Ke.a,{open:e.open,onClose:function(){e.handleClose()},scroll:"paper","aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[Object(b.jsx)(Je.a,{id:"scroll-dialog-title",children:e.title}),Object(b.jsx)(He.a,{dividers:!0,children:Object(b.jsx)(Ve.a,{id:"scroll-dialog-description",ref:t,tabIndex:-1,children:e.content})})]})})}function Ot(e){var t=Object(a.useState)({top:!1,left:!1,bottom:!1,right:!1}),n=Object(s.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(!1),l=Object(s.a)(i,2),o=l[0],u=l[1],j=Object(a.useState)({regionName:"\u5927\u962a",originName:"\u5927\u962a\u99c5"}),d=Object(s.a)(j,2),x=d[0],p=d[1],O=Object(a.useState)(null),h=Object(s.a)(O,2),f=h[0],m=h[1],g=function(e,t){c(Object(C.a)(Object(C.a)({},r),{},Object(k.a)({},e,t)))},v=function(e){x.status=e,p(Object(C.a)({},x)),"new"==x.status?m("NEW"):m("UPDATE"),u(!0)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(L,{drawer:Object(b.jsx)(Pe,{}),toggleDrawer:g,state:r,anchor:"right"}),Object(b.jsx)(pt,{title:f,handleOpen:v,handleClose:function(){u(!1)},open:o,content:Object(b.jsx)(xt,{condition:x})}),Object(b.jsx)(Ue,{toggleDrawer:g,handleOpen:v})]})}var ht=n(108);function ft(e,t,n,a){return mt.apply(this,arguments)}function mt(){return(mt=Object(u.a)(o.a.mark((function e(t,n,a,r){var c,i,l,u,j,b,d,x,p,O,h,f,m,g,v,y,w,k;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=r.regionName,i=r.originName,l=r.destinationName,u=r.lunch,j=r.dinner,b=r.departureTime,d=r.arrivalTime,x=r.status,null==d&&(d=75600),e.next=4,ne(t,n,i);case 4:return p=e.sent,O=Object(s.a)(p,1),h=O[0],e.next=9,ne(t,n,l);case 9:return f=e.sent,m=Object(s.a)(f,1),g=m[0],e.next=14,gt(t,n,a,b,d,u,j,x,c);case 14:return v=e.sent,y=v.map((function(e){return{location:e.formatted_address,stopover:!0}})),e.next=18,ce(t,i,l,y);case 18:if((w=e.sent).routes[0].legs.map((function(e){e.duration.value*=2,e.duration.newText=St(e.duration.value)})),v=yt(w,v,h,g),k=wt(v,h,g,w.routes[0].legs,b),!u){e.next=25;break}return e.next=25,kt(t,n,k,w.routes[0].legs,v,43200,"\u663c\u98df");case 25:if(!j){e.next=28;break}return e.next=28,kt(t,n,k,w.routes[0].legs,v,64800,"\u5915\u98df");case 28:return v.map((function(e){e.type="plan"})),e.abrupt("return",{places:v,origin:h,destination:g,itinerary:k,legs:w.routes[0].legs});case 30:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function gt(e,t,n,a,r,c,i,s,l){return vt.apply(this,arguments)}function vt(){return(vt=Object(u.a)(o.a.mark((function e(t,n,a,r,c,i,s,l,u){var j,b,d,x;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j=c-r,i&&(j-=3600),s&&(j-=3600),b=j/4500,d=[],"new"!=l&&(d=a.places),e.next=8,ae(t,n,u+" \u89b3\u5149");case 8:return x=e.sent,d=d.concat(x.slice(0,b-d.length)),e.abrupt("return",d);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var yt=function(e,t,n,a){return n.stayTime={value:0,text:St(0)},a.stayTime={value:0,text:St(0)},e.routes[0].waypoint_order.map((function(e){var n=t[e];return n.stayTime={value:3600,text:St(3600)},n}))},wt=function(e,t,n,a,r){var c=e.slice();c.unshift(t),c.push(n);for(var i=r,s=0;s<c.length;s++)c[s].arrivalTime={text:Ct(i),value:i},i+=c[s].stayTime.value,c[s].departureTime={text:Ct(i),value:i},s<a.length&&(i+=a[s].duration.value);return c},kt=function(){var e=Object(u.a)(o.a.mark((function e(t,n,a,r,c,i,l){var u,j,b,d,x,p,O,h,f,m;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u=0;case 1:if(!(u<a.length-1)){e.next=35;break}if(!(a[u].departureTime.value>=i)){e.next=32;break}return e.next=5,ne(t,n,l,a[u].geometry.location);case 5:return j=e.sent,b=Object(s.a)(j,1),(d=b[0]).stayTime={value:3600,text:St(3600)},e.next=11,ce(t,a[u].formatted_address,d.formatted_address);case 11:return x=e.sent,p=x.routes[0].legs[0],e.next=15,ce(t,d.formatted_address,a[u+1].formatted_address);case 15:for(O=e.sent,h=O.routes[0].legs[0],p.duration.value*=2,p.duration.newText=St(p.duration.value),h.duration.value*=2,h.duration.newText=St(h.duration.value),i=a[u].departureTime.value+p.duration.value,f=p.duration.value+d.stayTime.value+h.duration.value,d.arrivalTime={value:i,text:Ct(i)},i+=d.stayTime.value,d.departureTime={value:i,text:Ct(i)},i+=h.duration.value,m=u+1;m<a.length;m++)a[m].arrivalTime.value+=f-r[u].duration.value,a[m].arrivalTime.text=Ct(a[m].arrivalTime.value),a[m].departureTime.value+=f-r[u].duration.value,a[m].departureTime.text=Ct(a[m].departureTime.value);return a.splice(u+1,0,d),r.splice(u,1,p,h),c.splice(u+1,0,d),e.abrupt("break",35);case 32:u++,e.next=1;break;case 35:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,i,s){return e.apply(this,arguments)}}();function Ct(e){var t=Math.floor(e/3600),n=Math.floor(e%3600/60);return"".concat(("00"+t).slice(-2),":").concat(("00"+n).slice(-2))}function St(e){var t=Math.floor(e/3600),n=Math.floor(e%3600/60),a="";return t>0&&(a+="".concat(t,"hour")),(0==n&&0==t||n>0)&&(a+="".concat(n,"min")),a}function Tt(e,t,n,a,r,c){var i="abcdefghijklmnopqrstuvwxyz",s=new e.maps.InfoWindow,l=null==r?null:Dt(e,t,s,r,i[25]),o=null==c?null:Dt(e,t,s,c,i[25]);return{markers:n.map((function(n,r){var c="plan"==a.name?i[r]:a.iconCode;return Dt(e,t,s,n,c,"plan"==a.name?null:"Material Icons")})),originMarker:l,destinationMarker:o}}function Dt(e,t,n,a,r,c){var i={text:r,color:"#ffffff",fontSize:"18px"};null!=c&&(i.fontFamily=c);var s={position:{lat:a.geometry.location.lat(),lng:a.geometry.location.lng()},map:t,label:i,title:a.name,optimized:!1,animation:e.maps.Animation.DROP},l=new e.maps.Marker(s);return l.addListener("click",(function(){n.close(),n.setContent(l.getTitle()),n.open(l.getMap(),l)})),l.setMap(t),l}var Mt=n(109),Nt=n.n(Mt),It=n(113),Pt=n.n(It),zt=n(112),Et=n.n(zt),_t=n(114),qt=n.n(_t),Bt=n(110),Ft=n.n(Bt),At=n(111),Gt=n.n(At),Lt=Object(j.a)((function(e){return{root:{width:"100%",position:"relative"}}}));function Rt(){var e=Lt(),t=[{name:"plan",japanese:"\u30d7\u30e9\u30f3",query:"",icon:Object(b.jsx)(Nt.a,{}),iconCode:"\ue87c"},{name:"touristAttractions",japanese:"\u89b3\u5149\u30b9\u30dd\u30c3\u30c8",query:"\u89b3\u5149\u30b9\u30dd\u30c3\u30c8",icon:Object(b.jsx)(Ft.a,{}),iconCode:"\uea1d"},{name:"restrant",japanese:"\u30ec\u30b9\u30c8\u30e9\u30f3",query:"\u30ec\u30b9\u30c8\u30e9\u30f3",icon:Object(b.jsx)(Gt.a,{}),iconCode:"\ue56c"},{name:"park",japanese:"\u516c\u5712",query:"\u516c\u5712",icon:Object(b.jsx)(Et.a,{}),iconCode:"\ue406"},{name:"cafe",japanese:"\u30ab\u30d5\u30a7",query:"\u30ab\u30d5\u30a7",icon:Object(b.jsx)(Pt.a,{}),iconCode:"\ue541"},{name:"amusementPark",japanese:"\u904a\u5712\u5730",query:"\u904a\u5712\u5730",icon:Object(b.jsx)(qt.a,{}),iconCode:"\ue91d"}],n=Object(a.useState)(0),r=Object(s.a)(n,2),c=r[0],i=r[1],l=Object(a.useContext)(Kt),j=l.google,d=l.map,p=l.plan,O=Object(a.useState)(null),h=Object(s.a)(O,2),f=h[0],m=h[1],g=Object(a.useState)(null),w=Object(s.a)(g,2),k=w[0],S=w[1],T=Object(a.useState)(null),D=Object(s.a)(T,2),M=D[0],N=D[1],I=Object(a.useState)(!1),P=Object(s.a)(I,2),z=P[0],E=P[1];!function(){var e=Object(a.useContext)(Kt),t=(e.google,e.setGoogle);Object(a.useEffect)((function(){new ht.a({apiKey:"AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g",version:"weekly",libraries:["places"]}).load().then((function(e){t(e)}))}),[])}(),function(e){var t=Object(a.useContext)(Kt),n=t.google,r=t.map,c=t.plan,i=t.setPlan,s=t.condition;Object(a.useEffect)(Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=n&&null!=r&&null!=s){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,ft(n,r,c,s);case 4:t=e.sent,i(Object(C.a)({},t)),console.log(t);case 7:case"end":return e.stop()}}),e)}))),[n,r,s])}();var _=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S(t),i(-1);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){return Object(u.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=c){e.next=4;break}n=null==p?null:p.places,e.next=13;break;case 4:if(-1!=c){e.next=10;break}return e.next=7,ae(j,d,k);case 7:n=e.sent,e.next=13;break;case 10:return e.next=12,ae(j,d,t[c].query);case 12:n=e.sent;case 13:if(m(n),null!=n){e.next=16;break}return e.abrupt("return");case 16:E(!0);case 17:case"end":return e.stop()}}),e)})))(),function(){E(!1)}}),[c,p]),Object(a.useEffect)((function(){var e;if(null!=f)return e=0==c?Tt(j,d,f,t[c],p.origin,p.destination):Tt(j,d,f,t[c]),N(e),d.panTo({lat:f[0].geometry.location.lat(),lng:f[0].geometry.location.lng()}),function(){null!=e&&(e.markers.map((function(e){return e.setMap(null)})),null!=e.originMarker&&e.originMarker.setMap(null),null!=e.destinationMarker&&e.destinationMarker.setMap(null))}}),[f]),Object(b.jsxs)(v.a,{className:e.root,children:[Object(b.jsx)("div",{style:{height:window.innerHeight},children:Object(b.jsx)(x,{})}),Object(b.jsx)(v.a,{style:{position:"absolute",width:"100%",top:20},children:Object(b.jsx)(y,{onClick:_,chipIndex:c,types:t,onSubmit:q})}),Object(b.jsx)(v.a,{style:{position:"absolute",width:"100%",bottom:20},children:Object(b.jsx)(ue,{chipIndex:c,setChipIndex:i,types:t,places:f,markers:M,setMarkers:N,display:z})}),Object(b.jsx)(v.a,{style:{position:"absolute",bottom:220,right:70},children:Object(b.jsx)(Ot,{})})]})}var Wt=Object(j.a)((function(e){return{root:{width:"100%",height:window.innerHeight,backgroundColor:"pink"}}}));function Ut(e){var t=Wt(),n=Object(a.useState)(!0),r=Object(s.a)(n,2),c=r[0],i=r[1],l=Object(a.useState)("up"),o=Object(s.a)(l,2),u=o[0],j=o[1];return Object(b.jsx)(v.a,{className:t.root,justifyContent:"center",alignItems:"center",display:"flex",children:Object(b.jsx)(w.a,{in:c,direction:u,timeout:300,onEnter:function(){setTimeout((function(){j("down"),i(!1)}),1e3)},onExited:function(){return e.setFirstPage(!1)},children:Object(b.jsx)(v.a,{mx:"auto",children:Object(b.jsx)(v.a,{display:"flex",justifyContent:"center",children:Object(b.jsx)(f.a,{style:{color:"white",fontSize:200}})})})})})}var Kt=Object(a.createContext)();function Ht(){var e=Object(a.useState)(null),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),i=Object(s.a)(c,2),l=i[0],o=i[1],u=Object(a.useState)(null),j=Object(s.a)(u,2),d=j[0],x=j[1],p=Object(a.useState)(null),O=Object(s.a)(p,2),h=O[0],f=O[1],m=Object(a.useState)(!0),g=Object(s.a)(m,2),v=g[0],y=g[1],w={google:n,setGoogle:r,map:l,setMap:o,plan:d,setPlan:x,condition:h,setCondition:f};return v?Object(b.jsx)(Ut,{setFirstPage:y}):Object(b.jsx)(Kt.Provider,{value:w,children:Object(b.jsx)(Rt,{})})}var Vt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,285)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};n(172);i.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(Ht,{})}),document.getElementById("root")),Vt()}},[[173,1,2]]]);
//# sourceMappingURL=main.d3af4a12.chunk.js.map