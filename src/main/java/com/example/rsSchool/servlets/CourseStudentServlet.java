package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.CourseController;
import com.example.rsSchool.models.CourseStudent;
import com.example.rsSchool.models.Student;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "CourseStudentServlet", value = "/courseStudent")
public class CourseStudentServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

            String courseId = request.getParameter("courseId");
            String type = request.getParameter("type");
            switch(type){
                case "course":
                    List<CourseStudent> courseStudents = CourseController.fetchCourseStudents(Integer.parseInt(courseId));
                    String jsonResult = this.gson.toJson(courseStudents);
                    out.print(jsonResult);
                    out.flush();
                    return;
                default:
                    List<Student> students = CourseController.fetchAllCourseStudents(Integer.parseInt(courseId));
                    String jsonData = this.gson.toJson(students);
                    out.print(jsonData);
                    out.flush();
                    return;
            }



    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String studentId = request.getParameter("studentId");
        String courseId = request.getParameter("courseId");
        String degree = request.getParameter("degree");

        CourseStudent courseStudent  = CourseController.addCourseStudent(Integer.parseInt(courseId),Integer.parseInt(studentId),Double.parseDouble(degree));
        String jsonResult = this.gson.toJson(courseStudent);
        out.print(jsonResult);
    }
}
