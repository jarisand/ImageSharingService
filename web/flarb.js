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
var commenterList = null;
var errorList= [];
errorList[0] = "https://www.youtube.com/embed/y2M4-fwISDk?autoplay=1";
errorList[1] = "https://www.youtube.com/embed/JThq26BZDxU?autoplay=1";
errorList[2] = "https://youtu.be/M5p9JO9JgvU?autoplay=1";

var $table = $('<table style="width:100%">');
var $tbody = $table.append('<tbody />').children('tbody');
$tbody.append('<tr>');


$(document).ready(function () {
    $("#comment").empty();
    

    $.get("GetCommenterServlet", function (responseJson) {
        commenterList = JSON.parse(responseJson);
        alert(commenterList);

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
                                        //sending comment, commenter and imagepath to comment table
                                        $("#submit").click(function () {
                                            $("#comment").html("");
                                            $("#comment").append('<li>' + $('#input').val() + '</li>');
                                            $('#image').val(array[index]);
                                            var commenter = localStorage.getItem('PrevUser')
                                            $('#commenter').val(commenter);
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
});
function getComments(index) {

    for (var j = 0; j <= commentPath.length; j++) {
        //$("#comment").empty();
        if (array[index] == commentPath[j]) {
            if (comments[j] !== undefined) {
                $("#comment").append('<li>' + commenterList[j] + " commented: " + comments[j] + '</li>');
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
    for (var j = 0; j <= tagList.length - 1; j++) {
        if (tagList[j].indexOf($('#search').val()) > -1) {
            alert("Tagi: " + tagList[j]);
            alert(path + tagPathList[j]);
            $tbody.append('<img style="display:block;" width="100%" height="100%" src="' + path + tagPathList[j] + '" " />');

            for (var i = 0; i <= commentPath.length; i++) {
                if (tagPathList[j] == commentPath[i]) {
                    if (comments[i] !== undefined) {
                        $("#comment").append('<li>' + comments[i] + '</li>');
                    }
                }
            }


            //$("#comment").append('<li>' + comments[j] + '</li>');
            //this.count = 1;
        }
        else if (tagList.length - 1 == count) {
            /**var i = Math.floor((Math.random() * 3) + 1);
            alert(i);
            $tbody.append('<iframe width="1280" height="720" src="'+i+'" frameborder="0" allowfullscreen></iframe>');
            */
        }
        else {
            //alert("VITUIKS MÄN");
            count++;

        }
        //alert("J:n arvo: " + j + " Listan pituus: " + tagList.length);

    }
}

