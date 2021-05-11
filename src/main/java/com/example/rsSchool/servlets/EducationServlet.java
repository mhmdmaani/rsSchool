//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.EducationController;
import com.example.rsSchool.models.Education;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(
        name = "EducationServlet",
        value = {"/education"}
)
public class EducationServlet extends HttpServlet {
    private Gson gson = new Gson();

    public EducationServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();


        String id = request.getParameter("id");
        String searchText = request.getParameter("search");
        if (id == null && (searchText==null || searchText=="" )) {
            // fetch all
            List<Education> educations = EducationController.fetchAll();
            String educationsJson = this.gson.toJson(educations);
            out.print(educationsJson);
        }else if(searchText!=null && searchText!=""){
            // search
            List<Education> educations = EducationController.searchByName(searchText);
            String jsonResult = this.gson.toJson(educations);
            out.print(jsonResult);
        }
        else {
            int eduId = Integer.parseInt(id);
            Education edu = EducationController.fetchById(eduId);

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
        String id = request.getParameter("educationId");
        if(id==null|| id==""){
           Education inserted = EducationController.createEducation(name, description, image);
           String jsonResult = this.gson.toJson(inserted);
            out.print(jsonResult);
        }else{
            int educationId =Integer.parseInt(id);
            EducationController.updateEducation(educationId,name, description, image);
            String jsonResult = this.gson.toJson(educationId);
            out.print(jsonResult);
        }

        out.flush();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        String id = request.getParameter("id");
        EducationController.removeEducation(Integer.parseInt(id));
        out.flush();
    }
}
