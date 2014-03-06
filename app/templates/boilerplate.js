<% if (features.furniture) { %>/*global Furniture:true */<%} %>
<% if (includeHandlebars) { %>/*global JST:true */<% }%>

(function (window<% if (flavour === 'jquery') { %>, $<% } else if (flavour === 'd3') { %>, d3<% } %>) {
  'use strict';<% if (!microsite) { %>

  IG.iframeUtils.setDocumentDomain();

  /**
  * This method makes sure all links open in a new tab.
  * When using this you don't need to have target attributes
  * on link (<a>) elements. Values: '_blank', '_top', '_parent'
  */
  IG.iframeUtils.targetLinks('_blank');<% } %>

  var app = window.app = window.app || {};

  app.views = {};<% if (features.furniture) { %>

  app.views.furniture = {
    model: {
      credits: [],
      footnotes: null
    },
    render: function () {

      if (this.model) {
        Furniture.setCredits(this.model.credits);
        if (this.model.footnotes) {
          Furniture.setFootnotes(this.model.footnotes);
        }
      }

      return this;
    }
  };<%} %>

  app.views.main = {
    messages: {
      no_data: 'Error loading data'
    },
    $el: $('#main-content'),<% if (includeHandlebars) { %>
    template: JST.main<% } %>
  };<% if (includeBerthaSpreadsheet) { %>

  // Spreadsheet data from Bertha is attached to app.
  if (app.data) {
    app.views.main.model = app.data;<% if (features.furniture) { %>
    app.views.furniture.model = {
      credits: app.data.credits,
      footnotes: app.data.options && app.data.options.footnotes ? app.data.options.footnotes : null
    };<% } %>
  }<% } %><% if (features.furniture) { %>

  app.views.furniture.render();<% } %>

}(this<% if (flavour === 'jquery') { %>, jQuery<% } else if (flavour === 'd3') { %>, d3<% } %>));
