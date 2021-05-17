<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>School Management</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://kit.fontawesome.com/aeacc7ce96.js" crossorigin="anonymous"></script>
</head>
<body onload="onLoad()">


<jsp:include page="header.jsp"></jsp:include>

<div class="container">

    <div class="row">
        <div class="col-4 col-md-4 col-sm-12">
            <div class="card" style="background: #8bc34a50;">
                <div class="card-body mainCard">
                    <div class="homeIconContainer">
                        <i class="fas fa-university" style="font-size: 50px;text-align: center; color:#693250;"></i>
                    </div>
                    <h5 class="card-title">Educations</h5>
                    <p id="educationCount" class="card-text">50 Education</p>
                    <a href="/rsSchool-1.0-SNAPSHOT/education.jsp" class="btn btn-primary">View all Educations</a>
                </div>
            </div>
        </div>

        <div class="col col-4 col-md-4 col-sm-12">
            <div class="card" style="background: #FF572250;">
                <div class="card-body mainCard">
                    <div class="homeIconContainer">
                        <i class="fas fa-user-graduate" style="font-size: 50px;text-align: center; color:#693250;"></i>
                    </div>
                    <h5 class="card-title">Students</h5>
                    <p id="studentsCount" class="card-text">.. student</p>
                    <a href="/rsSchool-1.0-SNAPSHOT/students.jsp" class="btn btn-primary">View to all students</a>
                </div>
            </div>
        </div>


        <div class="col col-lg-4 col-md-4 col-sm-12">
            <div class="card" style="background: #673AB750;">
                <div class="card-body mainCard">
                    <div class="homeIconContainer">
                        <i class="fas fa-chalkboard-teacher" style="font-size: 50px;text-align: center; color:#693250;"></i>
                    </div>
                    <h5 class="card-title">Teachers</h5>
                    <p id="teachersCount" class="card-text">... teachers</p>
                    <a href="/rsSchool-1.0-SNAPSHOT/teachers.jsp" class="btn btn-primary">View all teachers</a>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="teachersContainer" style="margin:20px 10px">
        <h4> <i class="fas fa-chalkboard-teacher" style="font-size: 20px;text-align: center; color:#693250;"></i> Teachers</h4>


    </div>

    <div class="row" style="margin:20px 10px">
        <div class="col col-lg-6 col-md-6 col-sm-12">
            <div class="card" style="width: 100%;padding: 10px">
                <h4> <i class="fas fa-book" style="font-size: 20px;text-align: center; color:#693250;"></i> Latest courses</h4>
                <div id="latestCourses">

                </div>
            </div>
        </div>

        <div class="col col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card" style="width: 100%; padding: 10px">
                <h4><i class="fas fa-user-graduate" style="font-size: 20px;text-align: center; color:#693250;"></i>  students</h4>
                <div id="latestStudents">

                </div>
            </div>
        </div>


    </div>

</div>
<jsp:include page="footer.jsp"></jsp:include>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/homeScript.js"></script>
</body>
</html>