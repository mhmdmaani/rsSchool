<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Educations</title>
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
        <p id="pageDescription" ></p>
        </div>
    </div>

    <div class="borderedContainer">
        <h6 class="center">Courses:</h6>
    <!--search container-->
    <div class="searchContainer">
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
    <div class="addBtnContainer">
        <button type="button" class="btn btn-primary"  onclick="displayCreateForm()" >New Course</button>
    </div>
    <div class="row" id="elements">
        <!-- data -->
    </div>
    </div>



<div class="borderedContainer">
    <h6 class="center">Students:</h6>
    <!--search container-->
    <div class="searchContainer">
        <div class="row g-3 align-items-center" style="float: right">
            <div class="col-auto">
                <input type="search" id="searchStudentTxt" class="form-control">
            </div>
            <div class="col-auto">
                <button class="btn btn-primary" onclick="onSearchStudent()">Search</button>
            </div>
        </div>
    </div>
    <!-- end search btn -->
    <div class="addBtnContainer">
        <button type="button" class="btn btn-primary"  onclick="displayCreateStudentForm()" >New Student</button>
    </div>
    <div class="row" id="students">
        <!-- data -->
    </div>
</div>
</div>


</div>


<!-- display form -->
<!-- Modal -->

<div id="form"  >
    <div class="formContentContainer">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="formTitle">New Course</h5>
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
                <button type="button" onclick="hideForm()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  id="formBtn" class="btn btn-primary">Create</button>
            </div>
        </div>
    </div>
</div>




<!-- student form -->

<div id="studentForm"  >
    <div class="formContentContainer">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="studentFormTitle">New Student</h5>
                <button type="button" class="btn-close" onclick="hideStudentForm();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hiddenStudentId" />
                <div class="mb-3">
                    <label for="nameId" class="col-form-label">Name:</label>
                    <input type="text" name="name" class="form-control" id="studentNameId">
                </div>
                <div class="mb-3">
                    <label for="telId" class="col-form-label">Telephone:</label>
                    <input type="tel" name="tel" class="form-control" id="telId">
                </div>
                <div class="mb-3">
                    <label for="telId" class="col-form-label">Email:</label>
                    <input type="tel" name="tel" class="form-control" id="emailId">
                </div>
                <div class="mb-3">
                    <label for="imageId" class="col-form-label">image:</label>
                    <input type="text" name="image" class="form-control" id="studentImageId">
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" onclick="hideStudentForm()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  id="formStudentBtn" class="btn btn-primary">Create</button>
            </div>
        </div>
    </div>
</div>

<jsp:include page="footer.jsp"></jsp:include>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/educationDetailsScript.js"></script>
</body>
</html>