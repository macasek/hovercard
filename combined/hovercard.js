/* Based on Twitter @Anywhere Hovercard */
/*
 Requires: jquery, mustache
 Usage:
<script>
	$(document).ready(function(){
	  hovercard.init(".hovercard-user");
	});
	
	$(document).ready(function(){
	  hovercard.init(".hovercard-app");
	});
</script>

<a class="hovercard-user" rel="profile#macasek" href="#">macasek</a> 
<a class="hovercard-app" rel="app#tweetdeck" href="#">Tweetdeck</a> 
*/
window.hovercard = {
  frameNode: null,
  frameDoc: null,
  $rootNode: null,
  $contentNode: null,
  $arrowNode: null,
  $ajaxRequest: null,
  fetched_data: [],
  path_prefix: {
    "profile": "",
    "app": "item/"
  },

  set_url: function(u){
    document.location.href=u;
  },
  
  show: function(target) {
    this.setContent("<div class='loading-msg'>Loading...</div>", target);
    $(this.frameNode).css("visibility", "visible");     
    this.render($(target).attr("rel"), target);
  },
  
  hide: function() {
    if(this.ajaxRequest != null) {
      this.ajaxRequest.abort();
      this.ajaxRequest = null;
    }
    $(this.frameNode).css({visibility: "hidden", top: "-9999px", left: "-9999px"});
  },
  
  positionArrow: function(target, offset) {
    var left;
    var elm = $(target);
    var offsetWidth = elm[0].offsetWidth;      
    var offset = offset || elm.offset();             
    var contentNode = this.$contentNode;
    var arrow = this.$arrowNode;
    var outerWidth = contentNode.outerWidth();
    var window_width = $(window).width();
    var left_pos = offset.left + outerWidth;  
    
    arrow.attr("style", "");   
               
    if (window_width > left_pos) {
      var arrow_pos = arrow.position().left + Math.round(arrow.width() / 2);       
      left = Math.round(offset.left + (offsetWidth / 2) - arrow_pos);     
    } 
    else {
      var loffset = offset.left + offsetWidth;
      left = loffset - outerWidth;
      var diviot_padding = Math.round((offsetWidth / 2) - (arrow.width() / 2));
      
      if ((window_width - loffset) > offsetWidth) {
        var half_offset = Math.round(offsetWidth / 2);
        left += half_offset;
        diviot_padding += half_offset;
      } 
             
      arrow.css({left: (outerWidth - (arrow[0].offsetWidth + diviot_padding))});
    }
    
    left = (left < 5) ? 5 : left;
    
    return left;
  },
  
  positionContent: function(target, offset) {
    var elm = $(target);
    offset = offset || elm.offset();     
    var height = this.$rootNode.outerHeight();        
    var viewport_top = (offset.top - $(window).scrollTop());   
    var arrow = this.$arrowNode;
    var top;     
    
    if (viewport_top > height) {
      arrow.addClass("hovercard-arrow-bottom").removeClass("hovercard-arrow-top");
      top = Math.round(offset.top - this.$rootNode.outerHeight());
    } 
    else {
      arrow.addClass("hovercard-arrow-top").removeClass("hovercard-arrow-bottom");
      top = Math.round(offset.top + elm.outerHeight());
    }
    
    return top;
  },
  
  position: function(target, offset) {  		  
    var top = this.positionContent(target, offset); 			
    var left = this.positionArrow(target, offset);	
    		
    $(this.frameNode).offset({top: top, left: left});
  },
  
  resize: function() {
    $(this.frameNode).css({width: 'auto', height: 'auto'});
    var contentNodeParent = this.$contentNode.parent().parent();  
    var height = Math.ceil(contentNodeParent.outerHeight() + parseInt(contentNodeParent.css("margin-top"), 10) + parseInt(contentNodeParent.css("margin-bottom"), 10));
    var width = Math.ceil(contentNodeParent.outerWidth() + parseInt(contentNodeParent.css("margin-left"), 10) + parseInt(contentNodeParent.css("margin-right"), 10));

    $(this.frameNode).css({width: width, height: height});
  },

  setContent: function(c, target) {    
    this.$contentNode.html(c);  
    this.resize();    
    this.position(target);
  },
  
  render: function(id, target) { 
    var entity_type = null;
    var entity_id = null;
    
    if(id.indexOf("#") == -1) {
      entity_type = "profile";
      entity_id = id;
    }
    else {
      var id_split = id.split("#");
      entity_type = id_split[0];
      entity_id = id_split[1];
    }
  
    if(this.fetched_data[id]) {
      var html = Mustache.to_html(hovercard.templates.hovercard_content[entity_type], this.fetched_data[id]);
      hovercard.setContent(html, target);
    } 
    else {
      this.ajaxRequest = $.ajax({
        url: hovercard.path_prefix[entity_type]+entity_id+"/hovercard.json",
        dataType: 'json',
        data: {'id':entity_id},
        success: function(response) {
          if(response==null){return;}
          hovercard.fetched_data[id] = response;      
          var html = Mustache.to_html(hovercard.templates.hovercard_content[entity_type], response);
          hovercard.setContent(html, target);
        },
        error: function(response) {
          hovercard.setContent('<span class="bad-content">Sorry, we cannot find this object.</span>', target);
        }
      });
    }
  },
  
  init: function(hovercard_selector){
    var frame = $('<iframe allowtransparency="true" frameborder="0" tabindex="-1" role="presentation" scrolling="no"/>');
    frame.css({'position': 'absolute', 'z-index': '99999', 'overflow-x': 'hidden', 'overflow-y': 'hidden', 
              'visibility': 'hidden', 'width': '298px', 'height': '137px', 'top': '-9999px', 'left': '-9999px'});
    var frame_node = frame[0];
    
    frame.load(function(){    
      frame.unbind("load")
      var doc = (frame_node.contentWindow || frame_node.contentDocument);
      if (doc.document) doc = doc.document;
      var html = "<!DOCTYPE HTML><html><head><style></style></head><body style='margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'><style type='text/css'>";
      html += hovercard.templates.hovercard_css;
      html += "</style><div class='hovercard-wrapper'><div class='hovercard-content'><div class='hovercard hoverer'><div class='hovercard-inner'></div></div></div><div class='hovercard-arrow'></div></div></body></html>";
  
      doc.open();
      doc.writeln(html);
      doc.close();
    
      hovercard.frameNode = frame_node;
      hovercard.frameDoc = doc;
      hovercard.$rootNode = $(".hovercard-wrapper", hovercard.frameDoc);
      hovercard.$contentNode = hovercard.$rootNode.find(".hovercard-inner");
      hovercard.$arrowNode = $(".hovercard-arrow", hovercard.frameDoc);  
      
      $(hovercard.frameNode).mouseenter(function(evt){
  	    hovercard.show(evt.relatedTarget);
  	  }).mouseleave(function(evt){
  	    hovercard.hide();  
  	  });

  	  $(hovercard_selector).mouseover(function(evt){	
  	    hovercard.show(evt.target);
  	  }).mouseout(function(evt){
  	    hovercard.hide();
  	  });
    });
    
    frame.appendTo(document.body);
  }
};

hovercard.templates = hovercard.templates || {};
hovercard.templates.hovercard_content = hovercard.templates.hovercard_content || [];
hovercard.templates.hovercard_content["profile"] = "<div class='hovercard-content-inner'>  <div class='hovercard-body'>    <div class='clearfix'>      <div class='icon_wrapper'>        <a href='#' onclick=\"parent.hovercard.set_url('{{url}}');return false;\" class='profile_icon'>          <img class='icon' src='{{icon}}' width='60' height='60'>        </a>      </div>      <div class='hovercard-id'>        <p class='name'>{{name}}</p>        <p class='handle'>          <a href='#' onclick=\"parent.hovercard.set_url('{{url}}');return false;\">            <span class='at_symbol'>@</span>{{handle}}          </a>        </p>      </div>    </div>    <div class='hovercard-details'>      <p><strong>Bio</strong>: {{bio}}</p>    </div>  </div></div>";
hovercard.templates.hovercard_content["app"] = "<div class='hovercard-content-inner'>  <div class='hovercard-body'>    <div class='clearfix'>      <div class='icon_wrapper'>        <a href='#' onclick=\"parent.hovercard.set_url('{{url}}');return false;\" class='profile_icon'>          <img class='icon' src='{{icon}}' width='60' height='60'>        </a>      </div>      <div class='hovercard-id'>        <p class='name'>{{name}}</p>        <p class='stars clearfix'>{{{stars}}}</p>      </div>    </div>    <div class='hovercard-details'>      <p>{{description}}</p>      <p>Platforms: {{{platforms}}}      </p>      <p>Categories: {{{categories}}}</p>    </div>  </div></div>";
hovercard.templates.hovercard_css = ".clearfix:after {	content: \"\\0020\";	display:block;	height:0;	clear:both;	visibility:hidden;	overflow:hidden;}.clearfix:after {  display:block;}.clearfix {	display:block;} *:first-child+html .clearfix { min-height: 1px; } .hovercard-content {  margin: 10px 0 11px 0;  border: 4px solid #C0DEED;  border-width: 5px 4px 4px 4px;  border-radius: 5px;  -moz-border-radius: 5px;  -webkit-border-radius: 5px;  background: #fff;  overflow: hidden;  -moz-box-shadow: #aaa 0 1px 0;  -webkit-box-shadow: #aaa 0 1px 0;}.hovercard-arrow {  left: 16px;  width: 27px;  height: 15px;  background-repeat: no-repeat;}.hovercard-arrow-bottom {  position: absolute;  bottom: 0px;  background-image: url(images/hovercard-arrow.png);}.hovercard-arrow-top {  position: absolute;  top: 0px;  background-image: url(images/hovercard-arrow-up.gif);}* {  margin: 0;  padding: 0;}body {  font-family: 'lucida grande', Arial, sans-serif;  color: #333;  font-size: 11px;}.hovercard-wrapper {  \/*  display: inline-block;*\/  position: absolute;}a {  cursor: pointer;  color: #3B9DBF;  text-decoration: none;}a img {  border: 0;}.hovercard-body .loading-inline-spinner img {  display: block;  width: 14px;  height: 14px;  margin: 17px auto;}.loading-msg {  background: url(images/spinner.gif) no-repeat left center;  padding: 5px 20px 5px 20px;  margin: 0 10px;  width: 50px;}.bad-content {  display: inline-block;  padding: 5px;  width: 165px;}.hovercard-inner .hovercard-body {  padding: 10px;  overflow: hidden;}.hovercard-inner a:visited {  color: #3B9DBF;}.hovercard-inner .icon_wrapper {  float:left;}.hovercard-inner .icon {  outline-color:#FFFFFF;  outline-offset:0;  outline-style:solid;  outline-width:4px;  -webkit-border-top-left-radius: 10px;  -webkit-border-top-right-radius: 10px;  -webkit-border-bottom-left-radius: 10px;  -webkit-border-bottom-right-radius: 10px;  -moz-outline-radius-bottomleft:10px;  -moz-outline-radius-bottomright:10px;  -moz-outline-radius-topleft:10px;  -moz-outline-radius-topright:10px;  display: block;  width: 60px;  height: 60px;}.hovercard-inner .name {   font-weight: bold;   font-family: 'lucida grande', arial, sans-serif;   font-size: 17px;   color: #333;   margin-top:10px;}.hovercard-inner .hovercard-id {  margin-left: 10px;  float:left;}.hovercard-inner .hovercard-details {  margin-top: 5px;}.hovercard-inner p {  line-height: 16px;}.hovercard-inner .handle,.hovercard-inner .stars {  margin-top:5px;}.hovercard-inner .stars {  width: 80px;}.hovercard-inner .handle a {  font-size: 13px;  line-height: 14px;  font-weight: normal;}.profile_icon {  width: 60px;  height: 60px;  float: left;  position: relative;}div.rating-cancel,div.star-rating{float:left;width:16px;height:15px;text-indent:-999em;cursor:pointer;display:block;background:transparent;overflow:hidden}div.rating-cancel,div.rating-cancel a{background:url(images/delete.gif) no-repeat 0 -16px}div.star-rating,div.star-rating a{background:url(images/star.gif) no-repeat 0 0px}div.rating-cancel a,div.star-rating a{display:block;width:16px;height:100%;background-position:0 0px;border:0}div.star-rating-on a{background-position:0 -16px!important}.own div.star-rating-on a{background-position:0 -32px!important}div.star-rating-hover a{background-position:0 -32px}div.star-rating-readonly a{cursor:default !important}div.star-rating{background:transparent!important;overflow:hidden!important}";