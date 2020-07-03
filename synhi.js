/*
    Synhi - simple syntax highlighter
    https://github.com/ColdSpirit0/synhi 
*/

function highlight(target_element, regex, classes)
{
    // set global flag
    regex = new RegExp(regex.source, "g");

    // highlight text wrapper
    var prefix = "<span class='" + classes + "'>";
    var suffix = "</span>";

    // loop through all nodes and replace text to elements
    var new_html = "";
    for (var i = 0; i < target_element.childNodes.length; i++)
    {
        var node = target_element.childNodes[i];

        if (node.nodeType === Node.TEXT_NODE)
        {
            new_html += node.data.replaceAll(regex, (text, group) =>
            {
                // wrap up only group text, not all match
                var start = text.substring(0, text.indexOf(group));
                var end = text.substring(text.indexOf(group) + group.length, text.length);
                return start + prefix + group + suffix + end;
            });
        }
        else if (node.nodeType === Node.ELEMENT_NODE)
        {
            // dont touch already wrapped text
            new_html += node.outerHTML;
        }
    }

    target_element.innerHTML = new_html;
}
