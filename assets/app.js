// Basic tab functionality
// Table Of Contents
var Toc = {
    init : function(container, wrapper){

        var selectors = ["h1", "h2", "h3"];

        var selected = {parent: container, children: []};

        $(selectors[0], selected.parent).each(function(cnum, child){
            selected.children.push({parent: $(child), children: []});
        })

        function recurseSelection(selected, selectors) {
            selected.parent.nextUntil(selectors[0], selectors[1]).each(function(cnum, child) {
                console.log("Found " );
                console.log( child);
                var cob = {parent: $(child), children: []};
                selected.children.push(cob);
                recurseSelection(cob, selectors.slice(1));
            });
        }

        selected.children.forEach(function(c) {
            recurseSelection(c, selectors);
        });

        function recurseBuilder(node, tocstring, wrapper) {
            var atlevel = 1;
            if (node.parent[0].id === "")
                {
                    node.parent[0].id = "section"+tocstring.join("."); 
                }
                var el = $("<li> <a href='#"+node.parent[0].id+"'>"+tocstring.join(".") + " " + node.parent.text()+"</a></li>");
                wrapper.append(el)
                if (node.children.length > 0) {
                    var subel = $("<ul class='nav nav-list'></ul>");
                    el.append(subel);
                    node.children.forEach(function(child) {
                        var s = tocstring.slice();
                        s.push(atlevel++);
                        recurseBuilder(child, s, subel);
                    });
                }
        };

        var well = $("<div class='row'><div class='span4'><div class='well'></div></div><div class='span8'> </div></div>");
        var ul = $("<ul class='nav nav-list'></ul>");
        wrapper.prepend(well);
        well = $(".well", well);
        console.log(well);
        well.append(ul);
        var level = 1;
        selected.children.forEach(function(c) {
            recurseBuilder(c, [level++], ul);
        });

    }
}
