<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Students</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body onload="onLoad()">

<jsp:include page="header.jsp"></jsp:include>


<div class="container">
    <div class="titleContainer">
        <h3 class="center">Students</h3>
    </div>

    <!--search container-->
    <div class="searchContainer" style="width: 100%; height: 50px">
        <div class="row g-3 align-items-center" style="float: right">
            <div class="col-auto">
                <input type="search" id="searchTxt" class="form-control">
            </div>
            <div class="col-auto">
                <button class="btn btn-primary" onclick="onSearch()">Search</button>
            </div>
        </div>
    </div>
    <!-- end search btn -->
    <div class="row" id="elements">
        <!-- data -->
    </div>
</div>

<!-- display form -->
<!-- Modal -->

<div id="form"  >
    <div class="formContentContainer">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="formTitle">New Student</h5>
                <button type="button" class="btn-close" onclick="hideForm();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hiddenId" />
                <div class="mb-3">
                    <label for="name" class="col-form-label">Name:</label>
                    <input type="text" name="name" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="col-form-label">Email:</label>
                    <input type="text" name="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="tel" class="col-form-label">tel:</label>
                    <input type="text" name="tel" class="form-control" id="tel">
                </div>
                <div class="mb-3">
                    <label for="image" class="col-form-label">image:</label>
                    <input type="text" name="image" class="form-control" id="image">
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" onclick="hideForm()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  id="formBtn" class="btn btn-primary">Create</button>
            </div>
        </div>
    </div>
</div>


<jsp:include page="footer.jsp"></jsp:include>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/studentsScript.js"></script>
</body>
</html>