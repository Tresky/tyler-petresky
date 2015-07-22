var converter = new showdown.Converter();

function ConvertTextToMarkdown() {
    var markdown_text = $('#edit-article-body').val();
    html = converter.makeHtml(markdown_text);

    $('#article-markdown').html(html);
}

window.onload = function() {
    $('#edit-article-body').bind('input', ConvertTextToMarkdown);

    ConvertTextToMarkdown();
};

