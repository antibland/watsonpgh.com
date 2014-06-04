var app = app || {};

app.init = function() {
  app.bindings();
};

app.bindings = function() {
  var transition_end_prefixes = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

  $(document).keyup(function(event) {
    var ESC         = 27,
        key_pressed = event.keyCode;

    if (key_pressed === ESC) {
      app.utils.closeModal();
    }
  });

  $("body").on(transition_end_prefixes, "[role=dialog]", function() {
    if ($(this).attr("aria-hidden") == "true") {
      $(".flip_container").removeClass("flip");
      $("#flip_contents").text("Interested?");
    }
  });

  $("[role=dialog]").on("click", ".close", function() {
    app.utils.closeModal();
  });

  $("#job_postings .button").click(function() {
    app.utils.selectActiveButton($(this));
    app.utils.resetModal();
    app.utils.showModal($(this));
  });

  $('#flip_contents').on('click', function(e) {
    var $button = $(this),
        button_text = $button.text(),
        button_label;

    $(".flip_container").toggleClass("flip");
    button_label = button_text == "Interested?"? "Go Back": "Interested?";
    $button.text(button_label);
  });
};

app.utils = {
  resetModal: function() {
    $("[role=dialog]")
      .find(".front")
      .html('\
      <p class="job_title"></p>\
      <p class="job_description"></p>\
    ');
  },

  deselectActiveButton: function() {
    $("#job_postings .button").attr("aria-selected", "false");
  },

  selectActiveButton: function($button) {
    this.deselectActiveButton();
    $button.attr("aria-selected", "true");
  },

  closeModal: function() {
    this.deselectActiveButton();
    $("body").removeClass("show_modal");
    $("[role=dialog]").attr("aria-hidden", "true");
  },

  showModal: function($button) {
    var $dialog = $("[role=dialog]"),
        $li = $button.closest("li"),
        job_description = $li.find(".job_description").text(),
        job_title = $li.find(".job_title").text();

    $dialog
      .find(".job_title")
      .html(job_title)
      .end()
      .find(".job_description")
      .html(job_description)


    $("body").addClass("show_modal");
    $dialog
      .attr("aria-hidden", "false")
      .focus();

    $dialog.find(".front").scrollTop(0);
  }
};

app.init();
