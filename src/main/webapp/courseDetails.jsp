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
        <h6 class="center">Teachers:</h6>
        <div class="addBtnContainer">
            <button type="button" class="btn btn-primary"  onclick="displayCreateTeacherForm()" >New Teacher</button>
            <button type="button" class="btn btn-primary"  onclick="displayTeachersList()" >add existed Teacher</button>
        </div>
        <div class="row" id="teachers">
            <!-- data -->
        </div>
    </div>

    <div class="borderedContainer">
        <h6 class="center">Students degrees:</h6>
        <!--search container-->
        <!-- end search btn -->
        <div class="addBtnContainer">
            <button type="button" class="btn btn-primary"  onclick="displayStudentsList()" >New Degree</button>
        </div>
        <div class="row">
            <ul class="list-group" id="students">
            <!-- data -->
            </ul>
        </div>
    </div>

</div>

</div>

<div id="teacherForm"  >
    <div class="formContentContainer">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="teacherFormTitle">New Teacher</h5>
                <button type="button" class="btn-close" onclick="hideTeacherForm();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hiddenTeacherId" />
                <div class="mb-3">
                    <label for="teacherName" class="col-form-label">Name:</label>
                    <input type="text" name="name" class="form-control" id="teacherName">
                </div>
                <div class="mb-3">
                    <label for="teacherTel" class="col-form-label">Telephone:</label>
                    <input type="tel" name="tel" class="form-control" id="teacherTel">
                </div>
                <div class="mb-3">
                    <label for="teacherEmail" class="col-form-label">Email:</label>
                    <input type="tel" name="tel" class="form-control" id="teacherEmail">
                </div>
                <div class="mb-3">
                    <label for="teacherImage" class="col-form-label">image:</label>
                    <input type="text" name="image" class="form-control" id="teacherImage">
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" onclick="hideTeacherForm()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  id="teacherFormBtn" class="btn btn-primary">Create</button>
            </div>
        </div>
    </div>
</div>

<div id="studentForm"  >
    <div class="formContentContainer">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="studentFormTitle">New Degree</h5>
                <button type="button" class="btn-close" onclick="hideStudentsList();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hiddenCourseId" />
                <div id="radioBtnContainer">

                </div>
                <div class="mb-3">
                    <label for="degreeValue" class="col-form-label">degree:</label>
                    <input type="text" name="degreeValue" class="form-control" id="degreeValue">
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" onclick="hideStudentsList()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  id="formStudentBtn"  class="btn btn-primary">Add</button>
            </div>
        </div>
    </div>
</div>

<div id="teachersListForm"  >
    <div class="formContentContainer">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="teacherListTitle">Teachers list</h5>
                <button type="button" class="btn-close" onclick="hideTeachersList();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="teachersRadioBtnContainer">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" onclick="hideTeachersList()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  id="formTeachersList"  onclick="addExistedTeacher()" class="btn btn-primary">Add</button>
            </div>
        </div>
    </div>
</div>



<jsp:include page="footer.jsp"></jsp:include>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/courseDetalsScript.js"></script>
</body>
</html>