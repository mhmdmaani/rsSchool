package com.example.rsSchool.servlets;

import com.example.rsSchool.controllers.CourseController;
import com.example.rsSchool.controllers.TeacherController;
import com.example.rsSchool.models.Teacher;
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
        name = "TeacherServlet",
        value = {"/teacher"}
)
public class TeacherServlet  extends HttpServlet {
    private Gson gson = new Gson();

    public TeacherServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();


        String id = request.getParameter("id");
        String courseId = request.getParameter("courseId");
        String searchText = request.getParameter("search");
        if(searchText!=null && searchText!=""){
            List<Teacher> Teachers = TeacherController.searchByName(searchText);
            String TeachersJson = this.gson.toJson(Teachers);
            out.print(TeachersJson);
        }else
        if (id == null && courseId==null) {
            List<Teacher> Teachers = TeacherController.fetchAll();
            String TeachersJson = this.gson.toJson(Teachers);
            out.print(TeachersJson);
        }
            else if(id==null && courseId!=null){
            List<Teacher> Teachers = TeacherController.fetchByCourse(Integer.parseInt(courseId));
            String TeachersJson = this.gson.toJson(Teachers);
            out.print(TeachersJson);
            }
         else {
            int eduId = Integer.parseInt(id);
            Teacher edu = TeacherController.fetchById(eduId);
            String jsonResult = this.gson.toJson(edu);
            out.print(jsonResult);
        }

        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String teacherId = request.getParameter("teacherId");
        String courseId = request.getParameter("courseId");
        String type = request.getParameter("type");

        System.out.println("type");
        System.out.println(type);
        if(type!=null){
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String tel = request.getParameter("tel");
            String image = request.getParameter("image");
            TeacherController.updateTeacher(Integer.parseInt(teacherId),name, email,tel,image);
            out.print(true);
            out.flush();
            return;
        }else if(teacherId==null){
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String tel = request.getParameter("tel");
            String image = request.getParameter("image");
            Teacher teacher =  TeacherController.createTeacher(name, email,tel,image);
            if(courseId!=null){
                CourseController.addTeacher(Integer.parseInt(courseId),teacher.getId());
            }
            String jsonResult = this.gson.toJson(teacher);
            out.print(jsonResult);
            out.flush();
            return;
        }else{
            CourseController.addTeacher(Integer.parseInt(courseId),Integer.parseInt(teacherId));
            Teacher teacher = TeacherController.fetchById(Integer.parseInt(teacherId));
            String jsonResult = this.gson.toJson(teacher);
            out.print(jsonResult);
            out.flush();
            return;
        }
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String id = request.getParameter("id");
        String courseId = request.getParameter("courseId");
        if(courseId==null){
            TeacherController.removeTeacher(Integer.parseInt(id));
        }else{
            CourseController.removeTeacher(Integer.parseInt(courseId),Integer.parseInt(id));
        }
        out.flush();
    }
}
