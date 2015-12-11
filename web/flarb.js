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

        $.get("GetUploaderNameServlet", function (responseJson) {

            uploaderList = JSON.parse(responseJson);
            $.get("GetUserServlet", function (responseJson) {

                userList = JSON.parse(responseJson);
                $.get("GetEmailServlet", function (responseJson) {

                    emailList = JSON.parse(responseJson);
                    $.get("CommentServlet", function (responseJson) {
                        comments = JSON.parse(responseJson);
                        $.get("ImageCommentServlet", function (responseJson) {

                            commentPath = JSON.parse(responseJson);

                            $.get("TagServlet", function (responseJson) {
                                tagList = JSON.parse(responseJson);

                                $.get("GetTaggedServlet", function (responseJson) {
                                    tagPathList = JSON.parse(responseJson);

                                    $.get("ListImages", function (responseJson) {
                                        array = JSON.parse(responseJson);


                                        var index = localStorage.getItem('Index');
                                        if (isNaN(index)) {
                                            index = 0;
                                        }
                                        localStorage.setItem('Index', index);
                                        var path = "http://127.0.0.1:8888/images/";
                                        var latest = path + array[index];
                                        
                                        //testing if logged in
                                        var prevState = localStorage.getItem('PrevState');
                                        if (prevState === "true") {
                                            var test = true;
                                        } else {
                                            test = false;
                                            $('#imageupload').hide();
                                            $('#commentform').hide();
                                            $("#helloUser").append("No one in :(");
                                        }

                                        if (test !== false) { 
                                            var prevUser = localStorage.getItem('PrevUser');
                                            $("#helloUser").append("Hey " + prevUser);
                                            $("#comment").empty();
                                            getComments(index);
                                        }


                                        $('#upnam').text("Uploaded by: " + uploaderList[index]);
                                        $tbody.append('<p style="text-align: center;"><img class="image" style="display:block;" width="100%" height="100%" src="' + latest + '" " /></p>');
                                        $tbody.append('</tr>');
                                        $table.append('</table>');
                                        $table.appendTo('#somediv');
                                        
                                        //previoius image
                                        $('#previous').click(function () {
                                            $('#commentDiv').show();
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
                                            location.reload();
                                        });
                                        //sending uploadername to image table
                                        $("#upload").click(function () {
                                            $("#comment").html("");
                                            var prevUser = localStorage.getItem('PrevUser');
                                            $('#uploader').val(prevUser);
                                            var uploaderi = $('#uploader').val();
                                        });
                                        //login
                                        $("#sendUser3").click(function () {
                                            location.reload();
                                            login();
                                            logged = true;
                                            location.reload();
                                        });
                                        //logout
                                        $("#signOut").click(function () {
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
            localStorage.setItem('PrevUser', $('#username3').val());
            localStorage.setItem('PrevState', true);
            break;
        }
    }
    if (logged === false) {
        alert("Incorrect credentials");
    }
}

function logout() {
    localStorage.setItem('PrevState', false);
    localStorage.setItem('Index', 0);
}

function search() {
    var path = "http://127.0.0.1:8888/images/";
    $tbody.empty();
    $('#commentDiv').hide();
    var count = 0;
    for (var j = 0; j <= tagList.length - 1; j++) {
        if (tagList[j].indexOf($('#search').val()) > -1) {

            localStorage.setItem('Index', j);
            var searched = path + tagPathList[j];
            
            $('#upnam').text("Uploaded by: " + uploaderList[j]);
            $tbody.append('<p style="text-align: center;"><img style="display:block;" width="100%" height="100%" src="' + searched + '" " /></p>');

        }
        else if (tagList.length - 1 == count) {
            var i = Math.floor((Math.random() * 3) + 1);
            $tbody.append('<iframe width="100%" height="720" src="' + errorList[i - 1] + '" frameborder="0" allowfullscreen></iframe>');

        }
        else {
            
            count++;

        }
        

    }
}