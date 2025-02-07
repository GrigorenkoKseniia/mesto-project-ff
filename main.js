(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("mousedown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("mousedown",r),e.querySelector("form")&&e.querySelector("form").reset()}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target===e.currentTarget&&t(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://mesto.nomoreparties.co./v1/wff-cohort-31",headers:{authorization:"35da684b-9c50-421b-9cf8-281c9be273db","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function a(e){return fetch(e,{method:"HEAD"}).then((function(e){var t=e.headers.get("Content-Type");return!!/^image\//.test(t)})).catch((function(){console.log("Произошла ошибка")}))}var i=document.querySelector("#card-template").content,u=null,l=document.querySelector(".popup_type_delete");l.querySelector(".popup__button-delete").addEventListener("click",(function(e){var n;e.preventDefault(),u&&(n=u.item,fetch("".concat(o.baseUrl,"/cards/").concat(n._id),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(){t(l),s(u.cardItem),u=null})).catch((function(e){console.log("Ошибка: ".concat(e))}))}));var s=function(e){e.remove()};function d(t,n){var r=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).onOpenPreview,a=i.querySelector(".card").cloneNode(!0),s=a.querySelector(".card__image"),d=a.querySelector(".card__like-button"),f=a.querySelector(".card__delete-button"),p=a.querySelector(".card__number-like");return t.likes.some((function(e){return e._id===n}))&&d.classList.add("card__like-button_is-active"),p.textContent=t.likes.length,s.src=t.link,s.alt=t.name,a.querySelector(".card__title").textContent=t.name,t.owner._id!==n?f.remove():f.addEventListener("click",(function(){e(l),u={item:t,cardItem:a}})),s.addEventListener("click",r),d.addEventListener("click",(function(){var e;d.classList.contains("card__like-button_is-active")?(e=t,fetch("".concat(o.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(e){d.classList.remove("card__like-button_is-active"),p.textContent=e.likes.length})).catch((function(e){console.log("Ошибка: ".concat(e))})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:o.headers}).then((function(e){return c(e)}))}(t).then((function(e){d.classList.add("card__like-button_is-active"),p.textContent=e.likes.length})).catch((function(e){console.log("Ошибка: ".concat(e))}))})),a}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},p=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(f.inputErrorClass),n.textContent="",n.classList.add(f.errorClass)},m=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(f.inactiveButtonClass),t.disabled=!1):(t.classList.add(f.inactiveButtonClass),t.disabled=!0)},v=function(e){var t=Array.from(e.querySelectorAll(f.inputSelector)),n=e.querySelector(f.submitButtonSelector);m(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.error):t.setCustomValidity(""),t.validity.valid?p(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(f.inputErrorClass),r.textContent=n,r.classList.add(f.errorClass)}(e,t,t.validationMessage)})(e,r),m(t,n)}))}))},_=function(e,t){var n=e.querySelector(t.submitButtonSelector);n.classList.add(t.inactiveButtonClass),n.disabled=!0},y=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);m(n,r),n.forEach((function(t){p(e,t)}))};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var S,b=document.querySelector(".places__list"),q=document.querySelectorAll(".popup"),g=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),C=document.querySelector(".profile__image"),E=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_avatar"),A=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),O=document.forms["edit-profile"],T=O.elements.name,P=O.elements.description,B=document.forms["new-place"],j=B.elements["place-name"],D=B.elements.link,I=document.forms.avatar,N=I.elements["link-input-avatar"],H=function(t){var n=document.querySelector(".popup_type_image"),r=document.querySelector(".popup__image"),o=document.querySelector(".popup__caption"),c=t.target;r.src=c.src,r.alt=c.alt,o.textContent=c.alt,e(n)};function J(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return c(e)})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return c(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];A.textContent=o.name,w.textContent=o.about,U.style.backgroundImage="url(".concat(o.avatar,")"),S=o._id,c.forEach((function(e){var t=d(e,S,{onOpenPreview:H});b.append(t)}))})).catch((function(e){console.log("Ошибка: ".concat(e))})),q.forEach((function(e){var n;e.classList.add("popup_is-animated"),(n=e).querySelector(".popup__close").addEventListener("click",(function(){return t(n)}))})),g.addEventListener("click",(function(){T.value=A.textContent,P.value=w.textContent,y(O,f),e(E)})),O.addEventListener("submit",(function(e){var n;e.preventDefault(),J(!0,O),(n={name:T.value,description:P.value},fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n.name,about:n.description})}).then((function(e){return c(e)}))).then((function(e){A.textContent=e.name,w.textContent=e.about,t(E)})).catch((function(e){console.log("Ошибка в обновлении профиля: ".concat(e))})).finally((function(){J(!1,O)}))})),k.addEventListener("click",(function(){y(B,f),e(L)})),B.addEventListener("submit",(function(e){e.preventDefault();var n={name:j.value,link:D.value};a(n.link).then((function(e){e?(J(!0,B),function(e){return fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return c(e)}))}(n).then((function(e){var n=d(e,S,{onOpenPreview:H});b.prepend(n),t(L),y(B,f)})).catch((function(e){console.log("Ошибка добавления карточки: ".concat(e))})).finally((function(){J(!1,B)}))):(B.querySelector(".popup__link-error").textContent="Данная ссылка не является картинкой",_(B,f))}))})),C.addEventListener("click",(function(){y(I,f),e(x)})),I.addEventListener("submit",(function(e){e.preventDefault();var n=N.value;a(n).then((function(e){var r;e?(J(!0,I),(r=n,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:r})}).then((function(e){return c(e)}))).then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")"),t(x)})).catch((function(e){console.log("Ошибка добавления аватара: ".concat(e))})).finally((function(){J(!1,I)}))):(I.querySelector(".popup__link-error").textContent="Данная ссылка не является картинкой",_(I,f))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){v(e)}))}(f)})();