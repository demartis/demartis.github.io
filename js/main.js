

$(document).ready(function(){

    try{
        hljs.initHighlightingOnLoad();
    }catch(e){
        console.error(e);
        console.error("Are Highlight JS library loaded?");

    }

    $('pre code')
        .mouseover(function(e){
            console.log('s');
            $("div.msg.hover").remove();
            // var m=$('<div class="msg">click to copy to clipboard</div>');
            // e.target.parentElement.append(m.html());
            $(this).parent().prepend('<div class="msg hover">click to copy to clipboard</div>')
        })
        .mouseleave(function(e){
            $("div.msg.hover").remove();
        })
        .click(function(e){

            var selectedText = e.target.textContent;

            if(selectedText !== '') {

                copyToClipboard(selectedText);
            } else {
                $(e.target).focus().select();
            }
            document.execCommand('copy');

            $("div.msg.hover").remove();
            $("div.msg.click").remove();
            $(this).parent().prepend('<div class="msg click">copied!</div>');
        });


    $('#filter').keyup(function (e){
        let val=$.trim($(e.originalEvent.target).val().toLowerCase());

        $("main .card").filter(function() {
            $(this).toggle($(this).find('.title, .label, code').text().toLowerCase().indexOf(val) > -1)

        });

    });

});



function copyToClipboard(text){

    var et = $('<textarea/>',{
        css:{ opacity: '0' }
    });
    $('body').append(et);
    $(et)[0].value = text;
    $(et).focus().select();
    document.execCommand('copy');
    $(et).remove();

}