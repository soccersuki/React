(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{177:function(e,t,n){},178:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),i=n.n(c),o=n(8),s=n(39),l=n(18),j=n(296),u=n(64),b=n(83),d=n.n(b),x=n(1);var O=n(295);function p(e){var t=Object(a.useState)(e.initialValue),n=Object(o.a)(t,2),r=n[0],c=n[1];return Object(x.jsx)("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit(r)},children:Object(x.jsx)(O.a,{required:!0,fullWidth:e.fullWidth,id:"standard-basic",label:e.label,variant:"filled",onChange:function(e){c(e.target.value)},value:r})})}var h=n(256);n(257),n(258),n(259),Object(h.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper},imageList:{flexWrap:"nowrap",transform:"translateZ(0)"},title:{color:"white"},titleBar:{background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"}}}));var f=n.p+"static/media/img_osaka.c9ba6993.jpg";n.p,n.p;var m=n(277),g=n(29),v=n.n(g),y=n(13),w=n(27),k=n(43),C=n(109),S=function(){var e=Object(a.useContext)(zt),t=e.google,n=e.map,r=e.plan,c=e.setPlan,i=e.markers,o=(e.setMarkers,e.condition),s=e.setPlaces;return Object(a.useEffect)(Object(k.a)(v.a.mark((function e(){var a,l,j,u,b,d;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t&&null!=n&&null!=o){e.next=2;break}return e.abrupt("return");case 2:if(null!=i&&(i.originMarker.setMap(null),i.destinationMarker.setMap(null),i.spotMarkers.map((function(e){e.setMap(null)}))),a=o.regionName,l=o.originName,j=o.destinationName,u=o.meal,o.status,null!=r){e.next=12;break}return e.next=7,T(t,n,a,l);case 7:b=e.sent,s(b.slice(5)),b=b.slice(0,5),e.next=14;break;case 12:b=r.newSpots,c(null);case 14:return e.next=16,M(t,n,l,j,b);case 16:if(d=e.sent,!u){e.next=20;break}return e.next=20,F(t,n,d);case 20:d.newSpots=Object(w.a)(d.spots),c(Object(y.a)({},d)),console.log(d);case 23:case"end":return e.stop()}}),e)}))),[t,n,o]),r},T=function(){var e=Object(k.a)(v.a.mark((function e(t,n,a,r){var c,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z(t,n,a);case 2:return e.sent,e.next=5,z(t,n,r);case 5:return c=e.sent,e.next=8,L(t,n,a+"\u89b3\u5149",c[0].geometry.location);case 8:return i=e.sent,e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),N=function(){var e=Object(a.useContext)(zt),t=(e.google,e.setGoogle);Object(a.useEffect)((function(){new C.a({apiKey:"AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g",version:"weekly",libraries:["places"]}).load().then((function(e){t(e)}))}),[])};function D(e,t,n,a){var r=new e.maps.InfoWindow,c={position:{lat:n.geometry.location.lat(),lng:n.geometry.location.lng()},map:t,label:{text:a,color:"white"},title:n.name,optimized:!1,animation:e.maps.Animation.DROP},i=new e.maps.Marker(c);return i.addListener("click",(function(){r.close(),r.setContent(i.getTitle()),r.open(i.getMap(),i)})),i.setMap(t),i}function M(e,t,n,a,r){return I.apply(this,arguments)}function I(){return(I=Object(k.a)(v.a.mark((function e(t,n,a,r,c){var i,o,s,l,j;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=c.map((function(e){return{location:e.formatted_address,stopover:!0}})),e.next=3,_(t,a,r,i);case 3:return o=e.sent,(s=o.routes[0].legs).map((function(e){e.duration.value*=2,e.duration.newText=R(e.duration.value)})),l=P(o,c),j=G(l,s,o),e.abrupt("return",{spots:l,itinerary:j,legs:s});case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P=function(e,t){return e.routes[0].waypoint_order.map((function(e){var n=t[e];return n.stayTime={value:3600,text:R(3600)},n}))},G=function(e,t,n){var a=e.slice(),r={name:n.request.origin.query,geometry:{location:n.routes[0].legs[0].start_location},stayTime:{value:0,text:R(0)}},c={name:n.request.destination.query,geometry:{location:n.routes[0].legs.slice(-1)[0].end_location},stayTime:{value:0,text:R(0)}};a.unshift(r),a.push(c);for(var i=32400,o=0;o<a.length;o++)a[o].arrivalTime={text:B(i),value:i},i+=a[o].stayTime.value,a[o].departureTime={text:B(i),value:i},o<t.length&&(i+=t[o].duration.value);return a},F=function(){var e=Object(k.a)(v.a.mark((function e(t,n,a){var r,c,i,s,l,j,u,b,d,x,O,p,h,f;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=a.itinerary,c=a.legs,i=a.spots,s=0;case 2:if(!(s<r.length-1)){e.next=36;break}if(!(r[s].departureTime.value>=43200)){e.next=33;break}return e.next=6,z(t,n,"\u663c\u98df",r[s].geometry.location);case 6:return l=e.sent,j=Object(o.a)(l,1),(u=j[0]).stayTime={value:3600,text:R(3600)},e.next=12,_(t,r[s].formatted_address,u.formatted_address);case 12:return b=e.sent,d=b.routes[0].legs[0],e.next=16,_(t,u.formatted_address,r[s+1].formatted_address);case 16:for(x=e.sent,O=x.routes[0].legs[0],d.duration.value*=2,d.duration.newText=R(d.duration.value),O.duration.value*=2,O.duration.newText=R(O.duration.value),p=r[s].departureTime.value+d.duration.value,h=d.duration.value+u.stayTime.value+O.duration.value,u.arrivalTime={value:p,text:B(p)},p+=u.stayTime.value,u.departureTime={value:p,text:B(p)},p+=O.duration.value,f=s+1;f<r.length;f++)r[f].arrivalTime.value+=h-c[s].duration.value,r[f].arrivalTime.text=B(r[f].arrivalTime.value),r[f].departureTime.value+=h-c[s].duration.value,r[f].departureTime.text=B(r[f].departureTime.value);return r.splice(s+1,0,u),c.splice(s,1,d,O),i.splice(s+1,0,u),e.abrupt("break",36);case 33:s++,e.next=2;break;case 36:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),z=function(){var e=Object(k.a)(v.a.mark((function e(t,n,a,r){var c,i,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new t.maps.places.PlacesService(n),(i={query:a,fields:["name","geometry","formatted_address","photos"]}).locationBias=null==r?{north:45.29328154474485,east:153.2360484603554,south:26.151593390188783,west:126.5636657976794}:{lat:r.lat(),lng:r.lng()},e.next=5,new Promise((function(e){c.findPlaceFromQuery(i,(function(n,a){a===t.maps.places.PlacesServiceStatus.OK&&e(n)}))}));case 5:return o=e.sent,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),L=function(){var e=Object(k.a)(v.a.mark((function e(t,n,a,r){var c,i,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new t.maps.places.PlacesService(n),i={query:a},null==r?i.bounds={north:45.29328154474485,east:153.2360484603554,south:26.151593390188783,west:126.5636657976794}:(i.location={lat:r.lat(),lng:r.lng()},i.radius=5e4),e.next=5,new Promise((function(e){c.textSearch(i,(function(n,a){a==t.maps.places.PlacesServiceStatus.OK&&e(n)}))}));case 5:return o=e.sent,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),_=function(){var e=Object(k.a)(v.a.mark((function e(t,n,a,r){var c,i,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new t.maps.DirectionsService,i={origin:n,destination:a,travelMode:t.maps.TravelMode.DRIVING},null!=r&&(i.waypoints=r,i.optimizeWaypoints=!0),e.next=5,c.route(i).then((function(e){return e})).catch((function(e){return console.log("Directions request failed due to "+e)}));case 5:return o=e.sent,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}();function B(e){var t=Math.floor(e/3600),n=Math.floor(e%3600/60);return"".concat(("00"+t).slice(-2),":").concat(("00"+n).slice(-2))}function R(e){var t=Math.floor(e/3600),n=Math.floor(e%3600/60),a="";return t>0&&(a+="".concat(t,"hour")),(0==n&&0==t||n>0)&&(a+="".concat(n,"min")),a}var q=n(10),W=n(3),E=n(298),U=n(283),A=(n(4),n(284),n(297),n(285),n(181)),K=n(269),V=n(260),J=n(262),Z=n(264),H=n(265),Q=n(261),Y=n(110),X=n.n(Y),$=n(304),ee=n(270),te=n(263),ne=n(301),ae=n(99),re=n(302),ce=n(267),ie=n(268),oe=n(93),se=n.n(oe),le=Object(h.a)((function(e){return{paper:{padding:"6px 16px"}}}));function je(e){le();var t=e.spot,n=e.i;return Object(x.jsxs)(V.a,{onClick:e.onClick,children:[Object(x.jsx)(Q.a,{style:{flex:.1},children:Object(x.jsx)(u.a,{variant:"body2",color:"textSecondary",children:t.arrivalTime.text})}),Object(x.jsxs)(J.a,{style:{flexGrow:.3},children:[Object(x.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(x.jsx)(j.a,{mx:1,my:1,children:Object(x.jsx)(te.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:"abcdefghijklmnopqrstuvwxyz"[n-1],color:"secondary",children:Object(x.jsx)(ne.a,{alt:"Remy Sharp",src:null==t.photos?null:t.photos[0].getUrl()})})})}),Object(x.jsx)(Z.a,{})]}),Object(x.jsx)(H.a,{style:{flexGrow:1},children:Object(x.jsxs)(re.a,{children:[Object(x.jsx)(ce.a,{expandIcon:Object(x.jsx)(se.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:Object(x.jsxs)(j.a,{children:[Object(x.jsx)(u.a,{variant:"h6",component:"h1",children:t.name}),Object(x.jsx)(u.a,{variant:"caption",children:Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(j.a,{display:"flex",alignItems:"center",children:[t.rating,Object(x.jsx)($.a,{name:"read-only",value:t.rating,precision:.5,readOnly:!0,size:"small"})]}),"\u6ede\u5728\u6642\u9593: ",t.stayTime.text]})})]})}),Object(x.jsx)(ie.a,{children:Object(x.jsx)(u.a,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."})})]})})]})}function ue(e){var t=le(),n=e.spot;return Object(x.jsxs)(V.a,{onClick:e.onClick,children:[Object(x.jsx)(Q.a,{style:{flex:.1},children:Object(x.jsx)(u.a,{variant:"body2",color:"textSecondary",children:n.arrivalTime.text})}),Object(x.jsx)(J.a,{style:{flexGrow:.3},children:Object(x.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(x.jsx)(j.a,{mx:1,my:1,children:Object(x.jsx)(te.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:null,color:"secondary",children:Object(x.jsx)(ne.a,{alt:"Remy Sharp",src:null==n.photos?null:n.photos[0].getUrl()})})})})}),Object(x.jsx)(H.a,{children:Object(x.jsxs)(ae.a,{elevation:3,className:t.paper,children:[Object(x.jsx)(u.a,{variant:"h6",component:"h1",children:n.name}),Object(x.jsx)(u.a,{variant:"caption"})]})})]})}function be(e){var t=e.spot,n=e.leg;return Object(x.jsxs)(V.a,{children:[Object(x.jsx)(Q.a,{style:{flexGrow:.1},children:Object(x.jsx)(u.a,{variant:"body2",color:"textSecondary",children:t.departureTime.text})}),Object(x.jsxs)(J.a,{style:{flexGrow:.3},children:[Object(x.jsx)(Z.a,{}),Object(x.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(x.jsx)(j.a,{mx:1,my:1,children:Object(x.jsx)(X.a,{})})}),Object(x.jsx)(Z.a,{})]}),Object(x.jsx)(H.a,{children:Object(x.jsxs)(j.a,{display:"flex",alignItems:"center",height:"100%",children:[n.duration.newText," by transit"]})})]})}function de(e){le();var t=Object(a.useContext)(zt).plan;if(null==t)return Object(x.jsx)(K.a,{children:[0,1,2,3,4].map((function(){return Object(x.jsxs)(V.a,{children:[Object(x.jsx)(Q.a,{style:{flex:.1},children:Object(x.jsx)(u.a,{variant:"body2",color:"textSecondary",children:Object(x.jsx)(ee.a,{})})}),Object(x.jsxs)(J.a,{style:{flexGrow:.3},children:[Object(x.jsx)(j.a,{mx:1,my:1,children:Object(x.jsx)(ee.a,{variant:"circle",children:Object(x.jsx)(ne.a,{})})}),Object(x.jsx)(Z.a,{})]}),Object(x.jsx)(H.a,{children:Object(x.jsx)(u.a,{variant:"h1",children:Object(x.jsx)(ee.a,{})})})]})}))});var n=t.itinerary,r=t.legs;return Object(x.jsx)(K.a,{children:n.map((function(t,a){return Object(x.jsxs)(j.a,{children:[0!=a&&a!=n.length-1?Object(x.jsx)(je,{spot:t,i:a,onClick:function(){return e.onClick(t)}}):Object(x.jsx)(ue,{spot:t,onClick:function(){return e.onClick(t)}}),a<r.length?Object(x.jsx)(be,{spot:t,leg:r[a]}):null]})}))})}var xe=n(255),Oe=n(272),pe=n(273),he=n(275),fe=n(274),me=n(271),ge=n(276),ve=n(111),ye=n.n(ve),we=n(87),ke=n.n(we),Ce=n(98),Se=n.n(Ce),Te=n(299),Ne=n(266),De=n(180),Me=n(94),Ie=n.n(Me),Pe=Object(h.a)((function(e){return{root:{},fab:{position:"fixed",bottom:e.spacing(10)}}}));function Ge(e){Pe();var t=Object(a.useState)(["checkBox"]),n=Object(o.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(e.condition.regionName),s=Object(o.a)(i,2),l=s[0],u=s[1],b=Object(a.useState)(e.condition.originName),d=Object(o.a)(b,2),p=d[0],h=d[1],f=Object(a.useState)(""),m=Object(o.a)(f,2),g=m[0],v=m[1],k=Object(a.useContext)(zt),C=(k.condition,k.setCondition),S=function(e){return function(){var t=r.indexOf(e),n=Object(w.a)(r);-1===t?n.push(e):n.splice(t,1),c(n)}};return Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=-1!=r.indexOf("meal"),n={regionName:l,originName:p,destinationName:g,meal:t};-1!=r.indexOf("checkBox")&&(n.destinationName=p),C(Object(y.a)({},n))},children:[Object(x.jsxs)(xe.a,{subheader:Object(x.jsx)(me.a,{children:"Settings"}),children:[Object(x.jsxs)(Oe.a,{children:[Object(x.jsx)(pe.a,{children:Object(x.jsx)(ke.a,{})}),Object(x.jsx)(O.a,{label:"\u30a8\u30ea\u30a2",required:!0,variant:"filled",onChange:function(e){u(e.target.value)},value:l})]}),Object(x.jsxs)(Oe.a,{children:[Object(x.jsx)(pe.a,{children:Object(x.jsx)(Se.a,{})}),Object(x.jsx)(O.a,{label:"\u51fa\u767a",required:!0,variant:"filled",onChange:function(e){h(e.target.value)},value:p})]}),Object(x.jsxs)(Oe.a,{children:[Object(x.jsx)(Te.a,{checked:-1!==r.indexOf("checkBox"),onChange:S("checkBox"),inputProps:{"aria-label":"primary checkbox"}}),Object(x.jsx)(fe.a,{primary:"\u51fa\u767a\u5730\u70b9\u3068\u5230\u7740\u5730\u70b9\u304c\u540c\u3058"})]}),Object(x.jsx)(Ne.a,{in:-1==r.indexOf("checkBox"),children:Object(x.jsxs)(Oe.a,{children:[Object(x.jsx)(pe.a,{children:Object(x.jsx)(Se.a,{})}),Object(x.jsx)(fe.a,{primary:"\u5230\u7740"}),Object(x.jsx)(O.a,{variant:"filled",onChange:function(e){v(e.target.value)},value:g})]})}),Object(x.jsxs)(Oe.a,{children:[Object(x.jsx)(pe.a,{children:Object(x.jsx)(ye.a,{})}),Object(x.jsx)(fe.a,{id:"switch-list-label-bluetooth",primary:"\u663c\u98df\u3092\u81ea\u52d5\u3067\u8ffd\u52a0"}),Object(x.jsx)(he.a,{children:Object(x.jsx)(ge.a,{edge:"end",onChange:S("meal"),checked:-1!==r.indexOf("meal"),inputProps:{"aria-labelledby":"switch-list-label-bluetooth"}})})]})]}),Object(x.jsx)(j.a,{width:"100%",children:Object(x.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(x.jsxs)(De.a,{color:"primary",variant:"extended",type:"submit",children:[Object(x.jsx)(Ie.a,{}),"Navigate"]})})})]})}n(124),n(112),n(113),n(95),Object(h.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper},imageList:{},icon:{color:"rgba(255, 255, 255, 0.54)"},addIcon:{width:50,height:50}}}));var Fe=n(278),ze=n(279),Le=n(282),_e=n(281),Be=n(280),Re=n(303),qe=Object(h.a)((function(e){return{root:{height:"100%"},media:{height:100}}}));function We(e){var t=qe(),n=e.place;return null==n?Object(x.jsxs)(Fe.a,{className:t.root,children:[Object(x.jsxs)(ze.a,{children:[Object(x.jsx)(Be.a,{className:t.media,image:f,title:"Contemplative Reptile"}),Object(x.jsxs)(_e.a,{children:[Object(x.jsxs)(u.a,{gutterBottom:!0,variant:"h5",component:"h2",children:["Title",e.index]}),Object(x.jsxs)(u.a,{variant:"body2",color:"textSecondary",component:"p",children:[Object(x.jsxs)(j.a,{display:"flex",alignItems:"center",children:["Rating",Object(x.jsx)($.a,{name:"read-only",value:5,precision:.5,readOnly:!0,size:"small"})]}),["\u89b3\u5149","\u5927\u962a","\u4eba\u6c17"].map((function(e){return Object(x.jsx)(Re.a,{label:e,color:"primary"})}))]})]})]}),Object(x.jsx)(Le.a,{disableSpacing:!0,children:Object(x.jsx)(U.a,{size:"small",color:"primary",onClick:e.onClick,children:"ADD"})})]}):Object(x.jsxs)(Fe.a,{className:t.root,children:[Object(x.jsxs)(ze.a,{children:[Object(x.jsx)(Be.a,{className:t.media,image:n.photos[0].getUrl(),title:"Contemplative Reptile"}),Object(x.jsxs)(_e.a,{children:[Object(x.jsx)(u.a,{gutterBottom:!0,variant:"h5",component:"h2",children:n.name}),Object(x.jsxs)(u.a,{variant:"body2",color:"textSecondary",component:"p",children:[Object(x.jsxs)(j.a,{display:"flex",alignItems:"center",children:[n.rating,Object(x.jsx)($.a,{name:"read-only",value:n.rating,precision:.5,readOnly:!0,size:"small"})]}),n.types.map((function(e){return Object(x.jsx)(Re.a,{label:e,color:"primary"})}))]})]})]}),Object(x.jsx)(Le.a,{disableSpacing:!0,children:Object(x.jsx)(U.a,{size:"small",color:"primary",onClick:e.onClick,children:"ADD"})})]})}Object(h.a)((function(e){return{root:{flexGrow:1,backgroundColor:e.palette.background.paper}}}));var Ee=n(114),Ue=n.n(Ee),Ae=n(58),Ke=n.n(Ae),Ve=n(59),Je=n.n(Ve);Object(h.a)({list:{width:250},fullList:{width:"auto"}});var Ze=Object(h.a)({list:{width:250},fullList:{width:"auto"}});function He(e){var t,n=Ze(),a=function(){console.log("open"),e.toggleDrawer(e.anchor,!1)};return Object(x.jsx)("div",{children:Object(x.jsx)(E.a,{anchor:e.anchor,open:e.state[e.anchor],onClose:a,onOpen:function(){e.toggleDrawer(e.anchor,!0)},children:(t=e.anchor,Object(x.jsx)("div",{className:Object(W.a)(n.list,Object(q.a)({},n.fullList,"top"===t||"bottom"===t)),role:"presentation",onClick:a,onKeyDown:a,children:e.drawer}))})})}var Qe=function(e){var t=e.place;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("img",{src:null==t?null:t.photos[0].getUrl(),width:"100%"}),Object(x.jsx)(xe.a,{children:["Inbox","Starred","Send email","Drafts"].map((function(e,t){return Object(x.jsxs)(Oe.a,{button:!0,children:[Object(x.jsx)(pe.a,{children:t%2===0?Object(x.jsx)(Ke.a,{}):Object(x.jsx)(Je.a,{})}),Object(x.jsx)(fe.a,{primary:e})]},e)}))}),Object(x.jsx)(m.a,{}),Object(x.jsx)(xe.a,{children:["All mail","Trash","Spam"].map((function(e,t){return Object(x.jsxs)(Oe.a,{button:!0,children:[Object(x.jsx)(pe.a,{children:t%2===0?Object(x.jsx)(Ke.a,{}):Object(x.jsx)(Je.a,{})}),Object(x.jsx)(fe.a,{primary:e})]},e)}))})]})};function Ye(e){var t=e.place,n=Object(a.useState)({top:!1,left:!1,bottom:!1,right:!1}),r=Object(o.a)(n,2),c=r[0],i=r[1],s=function(e,t){i(Object(y.a)(Object(y.a)({},c),{},Object(q.a)({},e,t)))};return Object(x.jsxs)(j.a,{children:[Object(x.jsx)(j.a,{onClick:function(){s("bottom",!0)},children:Object(x.jsx)(We,{place:t})}),Object(x.jsx)(He,{drawer:Object(x.jsx)(Qe,{place:t}),toggleDrawer:s,state:c,anchor:"bottom"})]})}var Xe=function(e){var t=e.places,n=Object(a.useState)(0),r=Object(o.a)(n,2),c=r[0],i=r[1],s=Object(a.useContext)(zt),l=s.map;s.markers;return Object(a.useEffect)((function(){console.log(e.id),null!=t&&l.setCenter({lat:t[0].geometry.location.lat(),lng:t[0].geometry.location.lng()})}),[t]),Object(x.jsxs)(x.Fragment,{children:[e.id,Object(x.jsx)(Ue.a,{enableMouseEvents:!0,index:c,onChangeIndex:function(e){return function(e){i(e);var n=t[e];l.setCenter({lat:n.geometry.location.lat(),lng:n.geometry.location.lng()}),console.log(e)}(e)},children:null==t?[0,1,2].map((function(){return Object(x.jsx)(Ye,{})})):t.map((function(e){return Object(x.jsx)(Ye,{place:e})}))})]})},$e=Object(h.a)({list:{width:250},fullList:{width:"auto"}});function et(e){var t=$e(),n=r.a.useState({top:!1,left:!1,bottom:!1,right:!1}),a=Object(o.a)(n,2),c=a[0],i=a[1],s=(e.place,function(e,t){return function(n){(!n||"keydown"!==n.type||"Tab"!==n.key&&"Shift"!==n.key)&&i(Object(y.a)(Object(y.a)({},c),{},Object(q.a)({},e,t)))}}),l=function(e){return Object(x.jsx)("div",{className:Object(W.a)(t.list,Object(q.a)({},t.fullList,"top"===e||"bottom"===e)),role:"presentation",onClick:s(e,!1),onKeyDown:s(e,!1)})};return Object(x.jsxs)("div",{children:[["left","right","top","bottom"].map((function(e){return Object(x.jsxs)(r.a.Fragment,{children:[Object(x.jsx)(U.a,{onClick:s(e,!0),children:e}),Object(x.jsx)(E.a,{anchor:e,open:c[e],onClose:s(e,!1),onOpen:s(e,!0),children:l(e)})]},e)})),Object(x.jsx)(j.a,{onClick:s("bottom",!0),children:Object(x.jsx)(We,{place:e.place})})]})}var tt=n.p+"static/media/img_travel.b5321376.jpg",nt=Object(h.a)((function(e){return{root:{width:"100%",height:"30vh"}}}));function at(e){var t=nt();return Object(x.jsx)("img",{className:t.root,src:null==e.img?tt:e.img})}function rt(e){var t=Object(l.f)(),n=Object(l.g)(),r=Object(a.useContext)(zt).setCondition,c=n.state.name,i=n.state.originName,o=n.state.img,s={regionName:c,originName:i};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(A.a,{in:!0,mountOnEnter:!0,children:Object(x.jsx)(j.a,{children:Object(x.jsx)(at,{img:o})})}),Object(x.jsx)(j.a,{display:"flex",justifyContent:"center",children:Object(x.jsx)(j.a,{width:"100%",maxWidth:500,children:Object(x.jsx)(Ge,{onSubmit:function(e){r(Object(y.a)(Object(y.a)({},e),{},{status:"first"})),t.push("/plan")},condition:s})})})]})}var ct=Object(h.a)((function(e){return{root:{}}}));function it(e){var t=ct(),n=Object(a.useRef)(null);return function(e){var t=Object(a.useContext)(zt),n=t.google,r=t.setMap;Object(a.useEffect)((function(){if(null!=n&&null!=e){var t=new n.maps.Map(e.current,{zoom:15,center:{lat:35.6432027,lng:139.6729435},disableDefaultUI:!0});r(t)}}),[n,e])}(n),Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("div",{ref:n,className:t.root,style:{height:"100%"},children:"I can use the DOM with react ref"})})}function ot(e){return S(),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(it,{}),Object(x.jsx)(et,{})]})}n(286),n(115),Object(h.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));n(287),n(288),n(117),n(116);var st=n(89),lt=n.n(st);Object(h.a)({root:{position:"fixed",bottom:0,width:"100%"}});var jt=n(289),ut=n(305),bt=n(300),dt=n(118),xt=n.n(dt),Ot=n(119),pt=n.n(Ot),ht=n(120),ft=n.n(ht),mt=n(121),gt=n.n(mt),vt=Object(h.a)((function(e){return{root:{transform:"translateZ(0px)",flexGrow:1},exampleWrapper:{position:"relative",marginTop:e.spacing(3),height:380},speedDial:{position:"absolute","&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft":{bottom:e.spacing(2),right:e.spacing(2)},"&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight":{top:e.spacing(2),left:e.spacing(2)}}}})),yt=[{icon:Object(x.jsx)(xt.a,{}),name:"Copy"},{icon:Object(x.jsx)(pt.a,{}),name:"Save"},{icon:Object(x.jsx)(ft.a,{}),name:"Print"},{icon:Object(x.jsx)(gt.a,{}),name:"Share"},{icon:Object(x.jsx)(lt.a,{}),name:"Like"}];function wt(e){var t=vt(),n=r.a.useState(!1),a=Object(o.a)(n,2),c=a[0],i=a[1],s=function(){i(!1)},l=function(t){return function(){s(),0==t?e.toggleDrawer("right",!0):e.handleOpen()}};return Object(x.jsx)("div",{className:t.root,children:Object(x.jsx)("div",{className:t.exampleWrapper,children:Object(x.jsx)(jt.a,{ariaLabel:"SpeedDial example",className:t.speedDial,icon:Object(x.jsx)(ut.a,{}),onClose:s,onOpen:function(){i(!0)},open:c,direction:"down",children:yt.map((function(e,t){return Object(x.jsx)(bt.a,{icon:e.icon,tooltipTitle:e.name,onClick:l(t)},e.name)}))})})})}var kt=n(290),Ct=n(294),St=n(292),Tt=n(293),Nt=n(291);function Dt(e){var t=function(){e.handleClose()},n=r.a.useRef(null);return r.a.useEffect((function(){if(e.open){var t=n.current;null!==t&&t.focus()}}),[e.open]),Object(x.jsx)("div",{children:Object(x.jsxs)(kt.a,{open:e.open,onClose:t,scroll:"paper","aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[Object(x.jsx)(Nt.a,{id:"scroll-dialog-title",children:"Subscribe"}),Object(x.jsx)(St.a,{dividers:!0,children:Object(x.jsx)(Tt.a,{id:"scroll-dialog-description",ref:n,tabIndex:-1,children:e.content})}),Object(x.jsxs)(Ct.a,{children:[Object(x.jsx)(U.a,{onClick:t,color:"primary",children:"Cancel"}),Object(x.jsx)(U.a,{onClick:t,color:"primary",children:"Subscribe"})]})]})})}var Mt=Object(h.a)((function(e){return{root:{position:"relative"}}}));function It(e){var t=function(t){return function(){e.onClick(t)}},n=e.types.map((function(n,a){return Object(x.jsx)(Re.a,{label:n.jpName,variant:"outlined",onClick:t(a),style:{margin:5},color:e.chipIndex==a?"primary":"default"})}));return Object(x.jsxs)(j.a,{mx:5,children:[Object(x.jsxs)(j.a,{sx:{display:"flex"},mb:2,children:[Object(x.jsx)(j.a,{style:{flexGrow:1},children:Object(x.jsx)(j.a,{sx:{display:"flex",justifyContent:"center",height:"100%",alignItems:"center"},children:Object(x.jsx)(d.a,{color:"secondary",fontSize:"large"})})}),Object(x.jsx)(j.a,{style:{flexGrow:1},children:Object(x.jsx)(p,{fullWidth:!0})})]}),n]})}function Pt(e){var t=Object(a.useState)({top:!1,left:!1,bottom:!1,right:!1}),n=Object(o.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(!1),s=Object(o.a)(i,2),l=s[0],j=s[1],u=function(e,t){c(Object(y.a)(Object(y.a)({},r),{},Object(q.a)({},e,t)))},b=function(){j(!0)};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(He,{drawer:Object(x.jsx)(de,{}),toggleDrawer:u,state:r,anchor:"right"}),Object(x.jsx)(Dt,{handleOpen:b,handleClose:function(){j(!1)},open:l,content:Object(x.jsx)(Ge,{condition:{regionName:"Osaka"}})}),Object(x.jsx)(wt,{toggleDrawer:u,handleOpen:b})]})}function Gt(e){var t=Object(a.useContext)(zt).plan,n=Object(a.useState)([]),r=Object(o.a)(n,2),c=r[0],i=r[1],s=Object(a.useContext)(zt),l=s.google,u=s.map,b=e.index,d=Object(a.useState)(null),O=Object(o.a)(d,2),p=O[0],h=O[1];return Object(a.useEffect)((function(){var e;0==b&&null!=t?e=t.spots:b>=1&&(e=null),null!=e&&(h(e),c.map((function(e){return e.setMap(null)})),i(e.map((function(e,t){return D(l,u,e,t)}))))}),[b]),Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(j.a,{display:"flex",justifyContent:"center",height:"100%",children:Object(x.jsx)(j.a,{width:"100%",children:Object(x.jsx)(Xe,{places:p})})})})}function Ft(){var e=Mt(),t=[{name:"plan",jpName:"\u30d7\u30e9\u30f3"},{name:"popularRegion",jpName:"\u4eba\u6c17\u306e\u30a8\u30ea\u30a2"},{name:"restrant",jpName:"\u30ec\u30b9\u30c8\u30e9\u30f3"},{name:"park",jpName:"\u516c\u5712"}],n=Object(a.useState)(0),r=Object(o.a)(n,2),c=r[0],i=r[1];N(),S();return Object(x.jsxs)(j.a,{className:e.root,children:[Object(x.jsx)("div",{style:{height:window.innerHeight},children:Object(x.jsx)(it,{})}),Object(x.jsx)(j.a,{style:{position:"absolute",width:"100%",top:20},children:Object(x.jsx)(It,{onClick:function(e){i(e)},chipIndex:c,types:t})}),Object(x.jsx)(j.a,{style:{position:"absolute",top:100,left:20},children:Object(x.jsx)(Pt,{})}),Object(x.jsx)(j.a,{style:{position:"absolute",width:"100%",bottom:0},children:Object(x.jsx)(Gt,{index:c,types:t})})]})}var zt=Object(a.createContext)(),Lt=Object(h.a)((function(e){return{root:{},bottomNavigation:{position:"fixed",bottom:e.spacing(2)}}}));function _t(){Lt();var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),i=Object(o.a)(c,2),u=i[0],b=i[1],d=Object(a.useState)(null),O=Object(o.a)(d,2),p=O[0],h=O[1],f=Object(a.useState)(null),m=Object(o.a)(f,2),g=m[0],v=m[1],y=Object(a.useState)(null),w=Object(o.a)(y,2),k=w[0],C=w[1],S=Object(a.useState)(null),T=Object(o.a)(S,2),N={google:n,setGoogle:r,map:u,setMap:b,plan:p,setPlan:h,markers:g,setMarkers:v,condition:k,setCondition:C,places:T[0],setPlaces:T[1]};return Object(x.jsx)(zt.Provider,{value:N,children:Object(x.jsx)(s.a,{children:Object(x.jsx)(j.a,{children:Object(x.jsxs)(l.c,{children:[Object(x.jsx)(l.a,{path:"/condition",children:Object(x.jsx)(rt,{})}),Object(x.jsx)(l.a,{path:"/plan",children:Object(x.jsx)(ot,{})}),Object(x.jsx)(l.a,{path:"/",children:Object(x.jsx)(Ft,{})})]})})})})}var Bt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,307)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};n(177);i.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(_t,{})}),document.getElementById("root")),Bt()}},[[178,1,2]]]);
//# sourceMappingURL=main.831137f6.chunk.js.map