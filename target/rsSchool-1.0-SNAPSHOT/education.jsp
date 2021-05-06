<%@ page import="com.example.rsSchool.controllers.EducationController" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Educations</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body onload="onLoad()">
<div class="container">
    <div class="titleContainer">
        <h3 class="center">Educations</h3>
    </div>
    <div class="addBtnContainer">
        <button type="button" class="btn btn-primary"  onclick="displayCreateForm()" >New Education</button>
    </div>
    <div class="row" id="elements">
        <!-- data -->
    </div>
</div>

<!-- display form -->
<!-- Modal -->

<div id="form">
    <div>
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Education</h5>
                <button type="button" class="btn-close" onclick="hideForm();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hiddenId" />
                    <div class="mb-3">
                        <label for="nameId" class="col-form-label">Name:</label>
                        <input type="text" name="name" class="form-control" id="nameId">
                    </div>
                    <div class="mb-3">
                        <label for="descriptionText" class="col-form-label">Description:</label>
                        <textarea name="description" class="form-control" id="descriptionText"></textarea>
                    </div>
                <div class="mb-3">
                    <label for="imageId" class="col-form-label">image:</label>
                    <input type="text" name="image" class="form-control" id="imageId">
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="formBtn" class="btn btn-primary">Create</button>
            </div>
        </div>
    </div>
</div>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/generalScript.js"></script>
</body>
</html>
