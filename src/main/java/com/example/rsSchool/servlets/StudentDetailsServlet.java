package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.StudentController;
import com.example.rsSchool.models.CourseStudent;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "StudentDetailsServlet", value = "/studentDetails")
public class StudentDetailsServlet extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String studentId = request.getParameter("id");
        List<CourseStudent> courses = StudentController.fetchCourses(Integer.parseInt(studentId));
        String jsonResult = this.gson.toJson(courses);
        out.print(jsonResult);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
