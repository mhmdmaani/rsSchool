package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.TeacherController;
import com.example.rsSchool.models.Teacher;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(
        name = "TeacherServlet",
        value = {"/Teacher"}
)
public class TeacherServlet {
    private Gson gson = new Gson();

    public TeacherServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();


        String id = request.getParameter("id");
        if (id == null) {
            List<Teacher> Teachers = TeacherController.fetchAll();
            String TeachersJson = this.gson.toJson(Teachers);
            out.print(TeachersJson);
        } else {
            int eduId = Integer.parseInt(id);
            Teacher edu = TeacherController.fetchById(eduId);
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
        TeacherController.createTeacher(name, email,tel,image);
        Teacher tea = TeacherController.fetchLast();


        String jsonResult = this.gson.toJson(tea);
        out.print(jsonResult);
        out.flush();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String id = request.getParameter("id");
        TeacherController.removeTeacher(Integer.parseInt(id));


        out.flush();
    }
}
