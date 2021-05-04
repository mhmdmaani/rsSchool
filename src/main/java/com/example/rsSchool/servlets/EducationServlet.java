package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.EducationController;
import com.example.rsSchool.models.Education;
import com.google.gson.Gson;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@WebServlet(name = "EducationServlet", value = "/education")
public class EducationServlet extends HttpServlet {
    private Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String id = request.getParameter("id");
        if(id==null){
            List<Education> educations =EducationController.fetchAll();
            String educationsJson = this.gson.toJson(educations);
            out.print(educationsJson);
        }else{
            int eduId = Integer.parseInt(id);
            Education edu = EducationController.fetchById(eduId);
            String jsonResult = this.gson.toJson(edu);
            out.print(jsonResult);
        }
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String description = request.getParameter("description");
        String image = request.getParameter("image");

        EducationController.createEducation(name,description,image);
        out.print(name+" "+description);
    }
}

