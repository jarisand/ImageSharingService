/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
 * TODO!!
 *
 * Kuvien ID:t SQL:stÃ¤ JS:Ã¤Ã¤n
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
var errorList = [];
errorList[0] = "https://www.youtube.com/embed/y2M4-fwISDk?autoplay=1";
errorList[1] = "https://www.youtube.com/embed/JThq26BZDxU?autoplay=1";
errorList[2] = "https://www.youtube.com/embed/M5p9JO9JgvU?autoplay=1";

var $table = $('<table style="width:100%">');
var $tbody = $table.append('<tbody />').children('tbody');
$tbody.append('<tr>');


$(document).ready(function () {
    $("#comment").empty();


    $.get("GetCommenterServlet", function (responseJson) {
        commenterList = JSON.parse(responseJson);
        alert(commenterList);

        $.get("GetUploaderNameServlet", function (responseJson) {

            uploaderList = JSON.parse(responseJson);
            $.get("GetUserServlet", function (responseJson) {

                userList = JSON.parse(responseJson);
                $.get("GetEmailServlet", function (responseJson) {

                    emailList = JSON.parse(responseJson);
                    $.get("CommentServlet", function (responseJson) {
                        alert(comments);
                        comments = JSON.parse(responseJson);
                        alert(comments);
                        $.get("ImageCommentServlet", function (responseJson) {

                            commentPath = JSON.parse(responseJson);

                            $.get("TagServlet", function (responseJson) {
                                tagList = JSON.parse(responseJson);
                                alert("taglist: " + tagList);

                                $.get("GetTaggedServlet", function (responseJson) {
                                    tagPathList = JSON.parse(responseJson);

                                    $.get("ListImages", function (responseJson) {
                                        array = JSON.parse(responseJson);


                                        //var index = 0;
                                        var index = localStorage.getItem('Index');
                                        if (isNaN(index)) {
                                            index = 0;
                                        }
                                        localStorage.setItem('Index', index);
                                        //indexL = localStorage.getItem('Index');
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
                                            alert("ifissä");
                                            var prevUser = localStorage.getItem('PrevUser');
                                            $("#userIn").append("Hey " + prevUser);
                                            $("#comment").empty();
                                            getComments(index);
                                            alert("Commentsit: " + comments);
                                        }


                                        $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                        $tbody.append('<p style="text-align: center;"><img class="image" style="display:block;" width="100%" height="100%" src="' + latest + '" " /></p>');
                                        $tbody.append('</tr>');
                                        $table.append('</table>');
                                        $table.appendTo('#somediv');
                                        //previoius image
                                        $('#previous').click(function () {
                                            $('#commentDiv').show();
                                            //index = localStorage.getItem('Index');
                                            $("#comment").html("");
                                            if (index == -1) {
                                                index = array.length - 2;
                                                localStorage.setItem('Index', index);
                                            }
                                            else if (index <= 0) {
                                                index = array.length - 1;
                                                localStorage.setItem('Index', index);
                                            }
                                            else {
                                                index--;
                                                localStorage.setItem('Index', index);
                                            }

                                            var prev = path + array[index];
                                            getComments(index);
                                            $tbody.html("");
                                            $tbody.append('<p style="text-align: center;"><img style="display:block;" width="100%" height="100%" src="' + prev + '" " /></p>');
                                            $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                            console.log(index);
                                        });
                                        //next image
                                        $('#next').click(function () {
                                            $('#commentDiv').show();
                                            index = localStorage.getItem('Index');
                                            $("#comment").html("");
                                            if (index >= array.length - 1) {
                                                index = 0;
                                                localStorage.setItem('Index', index);
                                            }
                                            else {
                                                index++;
                                                localStorage.setItem('Index', index);
                                            }
                                            var next = path + array[index];
                                            getComments(index);
                                            $tbody.html("");
                                            $tbody.append('<p style="text-align: center;"><img style="display:block;" width="100%" height="100%" src="' + next + '" " /></p>');
                                            $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                            console.log(array[index]);
                                        });
                                        //sending comment, commenter and imagepath to comment table
                                        $("#submit").click(function () {
                                            index = localStorage.getItem('Index');
                                            $("#comment").html("");
                                            $("#comment").append('<li>' + $('#input').val() + '</li>');
                                            $('#image').val(array[index]);
                                            var commenter = localStorage.getItem('PrevUser')
                                            $('#commenter').val(commenter);
                                            var o = $('#input').val();
                                            alert(o);
                                            location.reload();
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
                                        $("#sendUser3").click(function () {
                                            location.reload(true);
                                            login();
                                            logged = true;
                                            
                                        });
                                        //logout
                                        $("#signOut").click(function () {
                                            alert("logoutissa");
                                            logout();

                                            logged = false;
                                            $('#imageupload').hide();
                                            $('#commentform').hide();
                                            location.reload();
                                        });
                                        //search
                                        $("#searchBut").click(function () {
                                            search();

                                        });
                                        
                                        $('img').click(function(){
                                            alert(path + array[index]);
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

function getCommentsSearch(index) {

    for (var j = 0; j <= commentPath.length; j++) {
        $("#comment").empty();
        if (tagPathList[index] == commentPath[j]) {
            if (comments[j] !== undefined) {
                //$("#comment").append('<li>' + commenterList[j] + " commented: " + comments[j] + '</li>');
                $tbody.append('<ul "style= text-align : left" "margin-left: -50px;"list-style: none;"><li>' + commenterList[j] + " commented: " + comments[j] + '</li></ul>');

            }
        }
    }
}

function login() {
    var logged = false;
    for (var j = 0; j <= userList.length; j++) {

        if (userList[j] == $('#username3').val() && emailList[j] == $('#email3').val()) {
            logged = true;
            //$('#userIn').append("Hey " + $('#username').val());
            localStorage.setItem('PrevUser', $('#username3').val());
            localStorage.setItem('PrevState', true);
            location.reload(true);
            break;
        }
        else {
            //alert("Elsessä");
        }

    }
    if (logged === false) {
        alert("Ei nyt oikein mennyt oikein!");
    }
}

function logout() {
    //$("#userIn").html("");
    localStorage.setItem('PrevState', false);
    localStorage.setItem('Index', 0);
    //localStorage.setItem('PrevUser', "");
}
function search() {
    var path = "http://127.0.0.1:8888/images/";
    $tbody.empty();
    $('#commentDiv').hide();
    var count = 0;
    //alert("Searchissa: " + tagList);
    for (var j = 0; j <= tagList.length - 1; j++) {
        //alert("Searchissa: " + tagList[j]);
        if (tagList[j].indexOf($('#search').val()) > -1) {
            //alert("Tagi: " + tagList[j]);
            //alert(path + tagPathList[j]);
            //$tbody.append('<p style="text-align: center;"><img style="display:block;" width="100%" height="100%" src="' + path + tagPathList[j] + '" " /></p>');

            localStorage.setItem('Index', j);
            var searched = path + tagPathList[j];

            //$tbody.html("");
            $('#upnam').text("Uploaded by: " + uploaderList[j]);
            $tbody.append('<p style="text-align: center;"><img style="display:block;" width="100%" height="100%" src="' + searched + '" " /></p>');
            //$tbody.append('<div><button onclick="logout()">Nappula</button></div>');
            
            
           


        }
        else if (tagList.length - 1 == count) {
            var i = Math.floor((Math.random() * 3) + 1);
            alert(i);
            $tbody.append('<iframe width="1280" height="720" src="' + errorList[i - 1] + '" frameborder="0" allowfullscreen></iframe>');

        }
        else {
            //alert("VITUIKS MÄN");
            count++;

        }
        

    }
}