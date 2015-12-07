/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * TODO!!
 * 
 * Kuvien ID:t SQL:stä JS:ään
 * Uploaderit kuville
 * Kommentointi kuviin
 * 
 */
var comments;
var commentPath;
var array;

$(document).ready(function () {

    $.get("CommentServlet", function (responseJson) {

        comments = JSON.parse(responseJson);
        //alert(responseJson);


        $.get("ImageCommentServlet", function (responseJson) {
            commentPath = JSON.parse(responseJson);
            alert(commentPath[20] + " " + comments[20]);


            $.get("ListImages", function (responseJson) {    // Execute Ajax GET request on URL of "someservlet" and execute the following function with Ajax response JSON...
                //var numberOfColumns = 4;
                //var columnWidth = Math.round(1 / numberOfColumns) * 100;
                // Create table
                $("#comment").html("");
                var $table = $('<table style="width:100%">');
                var $tbody = $table.append('<tbody />').children('tbody');
                $tbody.append('<tr>');
                array = JSON.parse(responseJson);
                var index = 0;
                var path = "http://127.0.0.1:8888/images/";
                var latest = path + array[index];
                getComments(index);

                $tbody.append('<img style="display:block;" width="100%" height="100%" src="' + latest + '" " />');
                //alert(array);
                $tbody.append('</tr>');
                $table.append('</table>');

                $table.appendTo('#somediv');

                $('#previous').click(function () {
                    $("#comment").html("");
                    
                    if (index == -1) {
                        index = array.length - 2;
                    }
                    else if (index <= 0) {
                        index = array.length - 1;
                    }
                    else {
                        index--;
                    }
                    var prev = path + array[index];
                    getComments(index);

                    $tbody.html("");
                    $tbody.append('<img style="display:block;" width="100%" height="100%" src="' + prev + '" " />');
                    console.log(index);
                });
                $('#next').click(function () {
                    $("#comment").html("");
                    
                    if (index >= array.length - 1) {
                        index = 0;
                    }
                    else {
                        index++;
                    }
                    var next = path + array[index];
                    getComments(index);

                    $tbody.html("");
                    $tbody.append('<img style="display:block;" width="100%" height="100%" src="' + next + '" " />');
                    console.log(array[index]);
                });

                $("#submit").click(function () {
                    $("#comment").html("");
                    $("#comment").append('<li>' + $('#input').val() + '</li>');
                    //var lista = [];
                    $('#image').val(array[index]);
                    var o = $('#input').val();
                    alert(o);
                    //lista[0] = [o + " " + array[index]];
                    //alert(lista[0]);

                });
            });

        });
    });


});

function getComments(index) {
    for (var j = 0; j <= commentPath.length; j++) {
        if (array[index] == commentPath[j]) {
            $("#comment").append('<li>' + comments[j] + '</li>');
        }
    }
}
