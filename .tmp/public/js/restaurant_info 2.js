"use strict";var map,restaurant=void 0;window.initMap=function(){fetchRestaurantFromURL(function(e,t){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})};var fetchRestaurantFromURL=function(r){if(self.restaurant)r(null,self.restaurant);else{var e=getParameterByName("id");e?DBHelper.fetchRestaurantById(e,function(e,t){(self.restaurant=t)?(fillRestaurantHTML(),r(null,t)):console.error(e)}):(error="No restaurant id in URL",r(error,null))}},fillRestaurantHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=DBHelper.imageUrlForRestaurant(e);document.getElementById("restaurant-source-large-webp").srcset=t+"-1600_large.webp 2x, "+t+"-800_large.webp",document.getElementById("restaurant-source-large").srcset=t+"-1600_large.jpg 2x, "+t+"-800_large.jpg",document.getElementById("restaurant-source-medium-webp").srcset=DBHelper.imageUrlForRestaurant(e)+"_medium.webp",document.getElementById("restaurant-source-medium").srcset=DBHelper.imageUrlForRestaurant(e)+"_medium.jpg",document.getElementById("restaurant-source-webp").srcset=DBHelper.imageUrlForRestaurant(e)+".webp";var r=document.getElementById("restaurant-img");r.className="restaurant-img",r.src=DBHelper.imageUrlForRestaurant(e)+".jpg",r.alt=e.name+" is a "+e.cuisine_type+" restaurant in "+e.address+".",document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()},fillRestaurantHoursHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.getElementById("restaurant-hours");for(var r in e){var n=document.createElement("tr"),a=document.createElement("td");a.innerHTML=r,n.appendChild(a);var l=document.createElement("td");l.innerHTML=e[r],n.appendChild(l),t.appendChild(n)}},fillReviewsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,t=document.getElementById("reviews-container"),r=document.createElement("h3");if(r.innerHTML="Reviews",t.appendChild(r),!e){var n=document.createElement("p");return n.innerHTML="No reviews yet!",void t.appendChild(n)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(createReviewHTML(e))}),t.appendChild(a)},createReviewHTML=function(e){var t=document.createElement("li"),r=document.createElement("p");r.innerHTML=e.name,t.appendChild(r);var n=document.createElement("p");n.innerHTML=e.date,t.appendChild(n);var a=document.createElement("p");a.innerHTML="Rating: "+e.rating,t.appendChild(a);var l=document.createElement("p");return l.innerHTML=e.comments,t.appendChild(l),t},fillBreadcrumb=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.getElementById("breadcrumb"),r=document.createElement("li");r.setAttribute("aria-current","page"),r.innerHTML=e.name,t.appendChild(r)},getParameterByName=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null};