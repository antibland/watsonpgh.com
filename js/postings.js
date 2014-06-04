var source    = document.getElementById("all_job_postings").innerHTML,
    template  = Handlebars.compile(source),
    target    = document.getElementById("main"),
    wrapper   = {objects: tbl};

target.innerHTML = template(wrapper);
$("#job_postings").addClass("show");

