"use strict";var _createClass=function(){function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var DBHelper=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"getParameterByName",value:function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null}},{key:"openRestaurantsDB",value:function(){return navigator.serviceWorker?idb.open("restaurant-reviews-db",2,function(e){switch(e.oldVersion){case 0:var n=e.createObjectStore("restaurants",{keyPath:"id"});n.createIndex("by-name","name"),n.createIndex("by-date","createdAt"),n.createIndex("by-cuisine","cuisine_type"),n.createIndex("by-neighborhood","neighborhood");case 1:e.createObjectStore("reviews",{keyPath:"id"}).createIndex("by-restaurant","restaurant_id")}}):(console.log("This browser doesn't support Service Worker"),Promise.resolve())}},{key:"fetchReviews",value:function(r){var n=this;fetch(t.REVIEWS_API).then(function(e){return e.json()}).then(function(t){n.openRestaurantsDB().then(function(e){var n=e.transaction("reviews","readwrite").objectStore("reviews");t.forEach(function(e){n.put(e)}),r(null,t)})}).catch(function(e){n.openRestaurantsDB().then(function(e){e.transaction("reviews").objectStore("reviews").getAll().then(function(e){r(null,e)}).catch(function(e){return r(e,null)})}).catch(function(e){return r(e,null)})})}},{key:"fetchReviewById",value:function(r,u){t.fetchReviews(function(e,n){if(e)u(e,null);else{var t=n.find(function(e){return e.id==r});t?u(null,t):u("Review does not exist",null)}})}},{key:"fetchReviewsByRestaurantId",value:function(r,u){t.fetchReviews(function(e,n){if(e)u(e,null);else{var t=n.filter(function(e){return e.restaurant_id==r});u(null,t)}})}},{key:"fetchRestaurants",value:function(r){var n=this;fetch(t.RESTAURANTS_API).then(function(e){return e.json()}).then(function(t){n.openRestaurantsDB().then(function(e){var n=e.transaction("restaurants","readwrite").objectStore("restaurants");t.forEach(function(e){n.put(e)}),n.index("by-date").openCursor(null,"prev").then(function(e){return e.advance(10)}).then(function e(n){if(n)return n.delete(),n.continue().then(e)}),r(null,t)})}).catch(function(e){n.openRestaurantsDB().then(function(e){e.transaction("reviews").objectStore("reviews").getAll().then(function(e){r(null,e)}).catch(function(e){return r(e,null)})}).catch(function(e){return r(e,null)})})}},{key:"fetchRestaurantById",value:function(r,u){t.fetchRestaurants(function(e,n){if(e)u(e,null);else{var t=n.find(function(e){return e.id==r});t?u(null,t):u("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(r,u){t.fetchRestaurants(function(e,n){if(e)u(e,null);else{var t=n.filter(function(e){return e.cuisine_type==r});u(null,t)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,u){t.fetchRestaurants(function(e,n){if(e)u(e,null);else{var t=n.filter(function(e){return e.neighborhood==r});u(null,t)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,u,a){t.fetchRestaurants(function(e,n){if(e)a(e,null);else{var t=n;"all"!=r&&(t=t.filter(function(e){return e.cuisine_type==r})),"all"!=u&&(t=t.filter(function(e){return e.neighborhood==u})),a(null,t)}})}},{key:"fetchNeighborhoods",value:function(u){t.fetchRestaurants(function(e,t){if(e)u(e,null);else{var r=t.map(function(e,n){return t[n].neighborhood}),n=r.filter(function(e,n){return r.indexOf(e)==n});u(null,n)}})}},{key:"fetchCuisines",value:function(u){t.fetchRestaurants(function(e,t){if(e)u(e,null);else{var r=t.map(function(e,n){return t[n].cuisine_type}),n=r.filter(function(e,n){return r.indexOf(e)==n});u(null,n)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return null==e.photograph?"/img/missing-image":"/img/"+e.photograph}},{key:"mapMarkerForRestaurant",value:function(e,n){return new google.maps.Marker({position:e.latlng,title:e.name,url:t.urlForRestaurant(e),map:n,animation:google.maps.Animation.DROP})}},{key:"cleanImageCache",value:function(){return t.openRestaurantsDB().then(function(e){if(e){var u=[];return e.transaction("restaurants").objectStore("restaurants").getAll().then(function(e){return e.forEach(function(e){e.photograph&&u.push(e.photograph)}),caches.open("restaurant-reviews-content-imgs")}).then(function(r){return r.keys().then(function(e){e.forEach(function(e){var n=new URL(e.url),t=n.pathnames.substring(0,n.pathnames.indexOf("_"));u.includes(t)||r.delete(e)})})})}})}},{key:"PORT",get:function(){return 1337}},{key:"RESTAURANTS_API",get:function(){return"http://localhost:"+t.PORT+"/restaurants"}},{key:"REVIEWS_API",get:function(){return"http://localhost:"+t.PORT+"/reviews/"}},{key:"RESTAURANT_REVIEWS_API",get:function(){return"http://localhost:"+t.PORT+"/reviews/?restaurant_id="+t.getParameterByName("id")}}]),t}();