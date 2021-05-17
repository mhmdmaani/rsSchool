package com.example.rsSchool.servlets;


import com.example.rsSchool.controllers.CourseController;
import com.example.rsSchool.controllers.EducationController;
import com.example.rsSchool.controllers.StudentController;

import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Education;
import com.example.rsSchool.models.Student;
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
        name = "StudentServlet",
        value = {"/student"}
)
public class StudentServlet extends HttpServlet {
    private Gson gson = new Gson();

    public StudentServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();


        String id = request.getParameter("id");
        String searchText = request.getParameter("search");
        String educationId = request.getParameter("educationId");
        if(id==null && educationId==null&&(searchText==null||searchText=="")){
            List<Student> students = StudentController.fetchAll();
            String studentsJson = this.gson.toJson(students);
            out.print(studentsJson);
        }else if (id == null && (searchText==null || searchText=="")) {
            List<Student> students = StudentController.fetchByEducation(Integer.parseInt(educationId));
            String studentsJson = this.gson.toJson(students);
            out.print(studentsJson);
        } else if(searchText!=null && searchText!=""  ){
            // search
            List<Student> students = StudentController.searchByName(searchText,educationId);
            String jsonResult = this.gson.toJson(students);
            out.print(jsonResult);
        }else{
            int eduId = Integer.parseInt(id);
            Student edu = StudentController.fetchById(eduId);
            String jsonResult = this.gson.toJson(edu);
            out.print(jsonResult);
        }
        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String tel = request.getParameter("tel");
        String image = request.getParameter("image");

        String id = request.getParameter("id");
        if(id==null || id==""){
            String educationId = request.getParameter("educationId");
              if(educationId!=null){
                  Student student = new Student(name, tel,email, image);
                  EducationController.addStudent(student,Integer.parseInt(educationId));
                  String jsonResult = this.gson.toJson(student);
                  out.print(jsonResult);
              }else{
                 Student student1= StudentController.createStudent(name, tel,email, image,null);
                  String jsonResult = this.gson.toJson(student1);
                  out.print(jsonResult);
              }

        }else{
            StudentController.updateStudent(Integer.parseInt(id),name,email,tel,image);
            String jsonResult = this.gson.toJson(id);
            out.print(jsonResult);
        }
        out.flush();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String id = request.getParameter("id");
        String educationId = request.getParameter("educationId");
        if(educationId==null){
            StudentController.removeStudent(Integer.parseInt(id));
        }else{
            EducationController.removeStudent(Integer.parseInt(id) , Integer.parseInt(educationId));
        }
        out.flush();
    }
}
