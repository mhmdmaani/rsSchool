<%--
  Created by IntelliJ IDEA.
  User: almaani
  Date: 13/05/2021
  Time: 02:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Student</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body onload="onLoad()">
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div id="detailsPage" class="detailsPage">
        <div class="imageContainer">
            <img id="pageImage" class="pageImage" />
        </div>
        <div class="detailsInfo">
            <h3 id="pageTitle" class="center"></h3>
            <p id="pageEmail" ></p>
            <p id="pageTel" ></p>
            <a id="educationName"></a>
            <div class="progress">
                <div id="studentDegree" class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
        </div>
    </div>

    <div class="borderedContainer">
        <h6 class="center">Courses :</h6>
        <div class="row" id="elements">
            <!-- data -->
        </div>
    </div>

</div>
<jsp:include page="footer.jsp"></jsp:include>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/studentDetailsScript.js"></script>
</body>
</html>
