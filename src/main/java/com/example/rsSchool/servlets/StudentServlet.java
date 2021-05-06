package com.example.rsSchool.servlets;


import com.example.rsSchool.controllers.StudentController;

import com.example.rsSchool.models.Student;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(
        name = "StudentServlet",
        value = {"/Student"}
)
public class StudentServlet {
    private Gson gson = new Gson();

    public StudentServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();


        String id = request.getParameter("id");
        if (id == null) {
            List<Student> students = StudentController.fetchAll();
            String studentsJson = this.gson.toJson(students);
            out.print(studentsJson);
        } else {
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
        String id = request.getParameter("educationId");
        //StudentController.createStudent(name, email,tel,image,);
        Student edu = StudentController.fetchLast();


        String jsonResult = this.gson.toJson(edu);
        out.print(jsonResult);
        out.flush();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String id = request.getParameter("id");
        StudentController.removeStudent(Integer.parseInt(id));


        out.flush();
    }
}
