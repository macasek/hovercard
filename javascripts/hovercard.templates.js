hovercard.templates = hovercard.templates || {};
hovercard.templates.hovercard_content = hovercard.templates.hovercard_content || [];
hovercard.templates.hovercard_content["profile"] = "\
<div class='hovercard-content-inner'>\
  <div class='hovercard-body'>\
    <div class='clearfix'>\
      <div class='icon_wrapper'>\
        <a href='#' onclick=\"parent.hovercard.set_url('{{url}}');return false;\" class='profile_icon'>\
          <img class='icon' src='{{icon}}' width='60' height='60'>\
        </a>\
      </div>\
      <div class='hovercard-id'>\
        <p class='name'>{{name}}</p>\
        <p class='handle'>\
          <a href='#' onclick=\"parent.hovercard.set_url('{{url}}');return false;\">\
            <span class='at_symbol'>@</span>{{handle}}\
          </a>\
        </p>\
      </div>\
    </div>\
    <div class='hovercard-details'>\
      <p><strong>Bio</strong>: {{bio}}</p>\
    </div>\
  </div>\
</div>";
hovercard.templates.hovercard_content["app"] = "\
<div class='hovercard-content-inner'>\
  <div class='hovercard-body'>\
    <div class='clearfix'>\
      <div class='icon_wrapper'>\
        <a href='#' onclick=\"parent.hovercard.set_url('{{url}}');return false;\" class='profile_icon'>\
          <img class='icon' src='{{icon}}' width='60' height='60'>\
        </a>\
      </div>\
      <div class='hovercard-id'>\
        <p class='name'>{{name}}</p>\
        <p class='stars clearfix'>{{{stars}}}</p>\
      </div>\
    </div>\
    <div class='hovercard-details'>\
      <p><strong>Description</strong>: {{description}}</p>\
      <p>Platforms: {{{platforms}}}\
      </p>\
      <p>Categories: {{{categories}}}</p>\
    </div>\
  </div>\
</div>";
hovercard.templates.hovercard_css = "\
.clearfix:after {\
	content: \"\\0020\";\
	display:block;\
	height:0;\
	clear:both;\
	visibility:hidden;\
	overflow:hidden;\
}\
\
.clearfix:after {\
  display:block;\
}\
\
.clearfix {\
	display:block;\
}\
*:first-child+html .clearfix {\
	min-height: 1px;\
}\
\
.hovercard-content {\
  margin: 10px 0 11px 0;\
  border: 4px solid #C0DEED;\
  border-width: 5px 4px 4px 4px;\
  border-radius: 5px;\
  -moz-border-radius: 5px;\
  -webkit-border-radius: 5px;\
  background: #fff;\
  overflow: hidden;\
  -moz-box-shadow: #aaa 0 1px 0;\
  -webkit-box-shadow: #aaa 0 1px 0;\
}\
\
.hovercard-arrow {\
  left: 16px;\
  width: 27px;\
  height: 15px;\
  background-repeat: no-repeat;\
}\
\
.hovercard-arrow-bottom {\
  position: absolute;\
  bottom: 0px;\
  background-image: url(images/hovercard-arrow.png);\
}\
\
.hovercard-arrow-top {\
  position: absolute;\
  top: 0px;\
  background-image: url(images/hovercard-arrow-up.gif);\
}\
\
* {\
  margin: 0;\
  padding: 0;\
}\
\
body {\
  font-family: 'lucida grande', Arial, sans-serif;\
  color: #333;\
  font-size: 11px;\
}\
\
.hovercard-wrapper {\
  \/*  display: inline-block;*\/\
  position: absolute;\
}\
\
a {\
  cursor: pointer;\
  color: #3B9DBF;\
  text-decoration: none;\
}\
\
a img {\
  border: 0;\
}\
\
.hovercard-body .loading-inline-spinner img {\
  display: block;\
  width: 14px;\
  height: 14px;\
  margin: 17px auto;\
}\
\
.loading-msg {\
  background: url(images/spinner.gif) no-repeat left center;\
  padding: 5px 20px 5px 20px;\
  margin: 0 10px;\
  width: 50px;\
}\
\
.bad-content {\
  display: inline-block;\
  padding: 5px;\
  width: 165px;\
}\
\
.hovercard-inner .hovercard-body {\
  padding: 10px;\
  overflow: hidden;\
}\
\
.hovercard-inner a:visited {\
  color: #3B9DBF;\
}\
.hovercard-inner .icon_wrapper {\
  float:left;\
}\
\
.hovercard-inner .icon {\
  outline-color:#FFFFFF;\
  outline-offset:0;\
  outline-style:solid;\
  outline-width:4px;\
\
  -webkit-border-top-left-radius: 10px;\
  -webkit-border-top-right-radius: 10px;\
  -webkit-border-bottom-left-radius: 10px;\
  -webkit-border-bottom-right-radius: 10px;\
\
  -moz-outline-radius-bottomleft:10px;\
  -moz-outline-radius-bottomright:10px;\
  -moz-outline-radius-topleft:10px;\
  -moz-outline-radius-topright:10px;\
\
  display: block;\
  width: 60px;\
  height: 60px;\
}\
\
.hovercard-inner .name {\
   font-weight: bold;\
   font-family: 'lucida grande', arial, sans-serif;\
   font-size: 17px;\
   color: #333;\
   margin-top:10px;\
}\
\
.hovercard-inner .hovercard-id {\
  margin-left: 10px;\
  float:left;\
}\
\
.hovercard-inner .hovercard-details {\
  margin-top: 5px;\
}\
\
.hovercard-inner p {\
  line-height: 16px;\
}\
\
.hovercard-inner .handle,\
.hovercard-inner .stars {\
  margin-top:5px;\
}\
\
.hovercard-inner .stars {\
  width: 80px;\
}\
\
.hovercard-inner .handle a {\
  font-size: 13px;\
  line-height: 14px;\
  font-weight: normal;\
}\
\
.profile_icon {\
  width: 60px;\
  height: 60px;\
  float: left;\
  position: relative;\
}\
\
div.rating-cancel,div.star-rating{float:left;width:16px;height:15px;text-indent:-999em;cursor:pointer;display:block;background:transparent;overflow:hidden}\
div.rating-cancel,div.rating-cancel a{background:url(images/delete.gif) no-repeat 0 -16px}\
div.star-rating,div.star-rating a{background:url(images/star.gif) no-repeat 0 0px}\
div.rating-cancel a,div.star-rating a{display:block;width:16px;height:100%;background-position:0 0px;border:0}\
div.star-rating-on a{background-position:0 -16px!important}\
div.star-rating-hover a{background-position:0 -32px}\
div.star-rating-readonly a{cursor:default !important}\
div.star-rating{background:transparent!important;overflow:hidden!important}";