'use strict';

<% if (features.d3) { %>
var d3 = require('../bower_components/d3/d3');
<% } %>

(function (window, $) {

  var view = app.views.main;

  view.render = function() {
    if (!this.model) {
      this.$el.html(this.messages.no_data);
      return this;
    }

<% if (includeHandlebars) { %>
    var  html = this.template(this.model);
<% } else { %>
    var html = '';
<% } %>
    this.$el.html(html);

<% if (includeIFrame) { %>
    /**
    * IFRAME RESIZING OPTION 1
    * Set the size of the iframe to equal the content of this page.
    */
    //IG.iframeUtils.resizeParentFrameToContentSize();

    /**
    * IFRAME RESIZING OPTION 2
    * Sets the size of the iframe along the sides
    * that have not been set on the parent document - i.e it will never override
    * the iframe's explicitly defined dimensions (unless it's 0px).

    * For more, see code docs:
    * /bower_components/ig-utils/js/iframe-utils.js
    */
    // IG.iframeUtils.resizeZeroParentFrameValuesToContent();
<% } %>
    return this;
  };


  $(function () {

    // render the main view (see above)
    view.render();

    // Now the view has been rendered unhide the body
    $(document.body).removeClass('invisible');
  });

}(this, jQuery));
