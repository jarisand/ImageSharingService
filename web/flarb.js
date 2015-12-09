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
var comments = null;
var commentPath = null;
var array = null;
var userList = null;
var emailList = null;
var uploaderList = null;
var tagList = null;
var tagPathList = null;

var $table = $('<table style="width:100%">');
var $tbody = $table.append('<tbody />').children('tbody');
$tbody.append('<tr>');


$(document).ready(function () {
    $("#comment").empty();
    /**for (var b = 0; b <= comments.length; b++) {
     comments[b] = [];
     }*/

    $.get("GetUploaderNameServlet", function (responseJson) {
        uploaderList = null;
        uploaderList = JSON.parse(responseJson);
        $.get("GetUserServlet", function (responseJson) {
            userList = null;
            userList = JSON.parse(responseJson);
            $.get("GetEmailServlet", function (responseJson) {
                emailList = null;
                emailList = JSON.parse(responseJson);
                $.get("CommentServlet", function (responseJson) {
                    alert(comments);
                    comments = JSON.parse(responseJson);
                    alert(comments);
                    $.get("ImageCommentServlet", function (responseJson) {
                        commentPath = null;
                        commentPath = JSON.parse(responseJson);

                        $.get("TagServlet", function (responseJson) {
                            tagList = JSON.parse(responseJson);

                            $.get("GetTaggedServlet", function (responseJson) {
                                tagPathList = JSON.parse(responseJson);

                                $.get("ListImages", function (responseJson) {



                                    array = null;
                                    array = JSON.parse(responseJson);
                                    var index = 0;
                                    var path = "http://127.0.0.1:8888/images/";
                                    var latest = path + array[index];
                                    //testing if logged in
                                    var prevState = localStorage.getItem('PrevState');
                                    alert(prevState);
                                    if (prevState === "true") {
                                        var test = true;
                                    } else {
                                        test = false;
                                        $('#imageupload').hide();
                                        $('#commentform').hide();
                                    }

                                    if (test !== false) {
                                        alert("ifissääää");
                                        var prevUser = localStorage.getItem('PrevUser');
                                        $("#userIn").append("Hey " + prevUser);
                                        $("#comment").empty();
                                        getComments(index);
                                        alert("Commentsit: " + comments);
                                    }


                                    $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                    $tbody.append('<img style="display:block;" width="100%" height="100%" src="' + latest + '" " />');
                                    $tbody.append('</tr>');
                                    $table.append('</table>');
                                    $table.appendTo('#somediv');
                                    //previoius image
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
                                        $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                        console.log(index);
                                    });
                                    //next image
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
                                        $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                        console.log(array[index]);
                                    });
                                    //sending comment and imagepath to comment table
                                    $("#submit").click(function () {
                                        $("#comment").html("");
                                        $("#comment").append('<li>' + $('#input').val() + '</li>');
                                        $('#image').val(array[index]);
                                        var o = $('#input').val();
                                        alert(o);
                                    });
                                    //sending uploadername to image table
                                    $("#upload").click(function () {
                                        $("#comment").html("");
                                        var prevUser = localStorage.getItem('PrevUser');
                                        $('#uploader').val(prevUser);
                                        var uploaderi = $('#uploader').val();
                                        alert(uploaderi);
                                    });
                                    //login
                                    $("#sendUser").click(function () {
                                        login();
                                        logged = true;
                                    });
                                    //logout
                                    $("#logout").click(function () {
                                        logout();
                                        logged = false;
                                        $('#imageupload').hide();
                                        $('#commentform').hide();
                                    });
                                    //search
                                    $("#searchBut").click(function () {
                                        search();

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
function getComments(index) {

    for (var j = 0; j <= commentPath.length; j++) {
        //$("#comment").empty();
        if (array[index] == commentPath[j]) {
            if (comments[j] !== undefined) {
                $("#comment").append('<li>' + comments[j] + '</li>');
            }
        }
    }
}

function login() {
    var logged = false;
    for (var j = 0; j <= userList.length; j++) {
        if (userList[j] == $('#username').val() && emailList[j] == $('#email').val()) {
            logged = true;
            $('#userIn').append("Hey " + $('#username').val());
            localStorage.setItem('PrevUser', $('#username').val());
            localStorage.setItem('PrevState', logged);
            break;
        }
        else {
            alert("Elsessä");
        }
    }
    if (logged === false) {
        alert("Ei nyt oikein mennyt oikein!");
    }
}

function logout() {
    $("#userIn").html("");
    localStorage.setItem('PrevState', false);
}
function search() {
    var path = "http://127.0.0.1:8888/images/";
    $tbody.empty();
    var count = 0;
    for (var j = 0; j <= tagList.length-1; j++) {
        if (tagList[j].indexOf($('#search').val()) > -1) {
            alert("Tagi: " + tagList[j]);
            alert(path + tagPathList[j]);
            $tbody.append('<img style="display:block;" width="100%" height="100%" src="' + path + tagPathList[j] + '" " />');
            //this.count = 1;
        }
        else if(tagList.length-1 == count){
            $tbody.append('<iframe width="1280" height="720" src="https://www.youtube.com/embed/y2M4-fwISDk" frameborder="0" allowfullscreen></iframe>');
        }
        else {
            //alert("VITUIKS MÄN");
            count++;

        }
        //alert("J:n arvo: " + j + " Listan pituus: " + tagList.length);

    }
}

