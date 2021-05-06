package com.example.rsSchool.servlets;


import com.example.rsSchool.controllers.CourseController;
import com.example.rsSchool.controllers.EducationController;
import com.example.rsSchool.models.Course;

import com.example.rsSchool.models.Education;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(
        name = "CourseServlet",
        value = {"/course"}
)
public class CourseServlet extends HttpServlet {

        private Gson gson = new Gson();

        public CourseServlet (){}
            protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                PrintWriter out = response.getWriter();


                String id = request.getParameter("id");
                if (id == null) {
                    List<Course> Courses = CourseController.fetchAll();
                    String CoursesJson = this.gson.toJson(Courses);
                    out.print(CoursesJson);
                } else {
                    int eduId = Integer.parseInt(id);
                    Course edu = CourseController.fetchById(eduId);
                    String jsonResult = this.gson.toJson(edu);
                    out.print(jsonResult);
                }

                out.flush();
            }

            protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                PrintWriter out = response.getWriter();
                String name = request.getParameter("name");
                String description = request.getParameter("description");
                String image = request.getParameter("image");
                int educationId = Integer.parseInt(request.getParameter("educationId"));
                Course course = new Course(name, description, image);
                EducationController.addCourse(course,educationId);

                String jsonResult = this.gson.toJson(course);
                out.print(jsonResult);
                out.flush();
            }

            protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                PrintWriter out = response.getWriter();

                String id = request.getParameter("id");
                CourseController.removeCourse(Integer.parseInt(id));


                out.flush();
            }


        }
