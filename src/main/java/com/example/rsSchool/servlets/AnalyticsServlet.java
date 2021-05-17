package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.AnalyticsController;
import com.example.rsSchool.controllers.CourseController;
import com.example.rsSchool.controllers.TeacherController;
import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Teacher;
import com.example.rsSchool.models.customTypes.Count;
import com.example.rsSchool.models.customTypes.ItemAnalyse;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "AnalyticsServlet", value = "/analytics")
public class AnalyticsServlet extends HttpServlet {
    private Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

         String type = request.getParameter("type");
         switch (type){
             case "counts":
                 long countEducations = AnalyticsController.getCountEducations();
                 long countStudents = AnalyticsController.getCountStudents();
                 long countTeachers = AnalyticsController.getCountTeachers();
                 Count c = new Count(countEducations,countStudents,countTeachers);
                 String countsJSON = gson.toJson(c);
                 out.print(countsJSON);
                 out.flush();
                 break;

             case "averageCourses":
                 List courses = AnalyticsController.getCoursesAverage();
                 String coursesJson = gson.toJson(courses);
                 out.print(coursesJson);
                 out.flush();
                 break;

             case "averageStudents":
                 List<ItemAnalyse> students = AnalyticsController.getStudentsAverage();
                 String studentsJSON = gson.toJson(students);
                 out.print(studentsJSON);
                 out.flush();
                 break;

             case "teachers":
                 List<Teacher> teachers = TeacherController.fetchAll();
                 String teacherJSON = gson.toJson(teachers);
                 out.print(teacherJSON);
                 out.flush();
                 break;
             case "teacherCourses":
                 String teacherId= request.getParameter("id");
                 List<Course> teacherCourses = TeacherController.fetchCourses(Integer.parseInt(teacherId));
                 String coursesJSON = gson.toJson(teacherCourses);
                 out.print(coursesJSON);
                 out.flush();
             default:
                 throw new IllegalStateException("Unexpected value: " + type);
         }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
