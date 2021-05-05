package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Education;
import com.example.rsSchool.models.Teacher;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class TeacherController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


    public static void createTeacher(String name , String email , String tel , String image){

        Teacher Teacher = new Teacher(name,email,tel,image);

        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(Teacher);
        em.getTransaction().commit();
        em.close();
    }
    public static void updateTeacher(int id,String name , String email , String tel , String image){
        EntityManager em = emf.createEntityManager();
        Teacher teacher = em.find(Teacher.class,id);
        em.getTransaction().begin();

        teacher.setName(name);
        teacher.setEmail(email);
        teacher.setTel(tel);
        teacher.setImage(image);
        em.getTransaction().commit();
        em.close();
    }

    public static void removeTeacher(int id){
        EntityManager em = emf.createEntityManager();
        Teacher teacher = em.find(Teacher.class,id);
        em.getTransaction().begin();

        em.remove(teacher);

        em.getTransaction().commit();
        em.close();
    }

    public  static List<Teacher> fetchAll(){
        EntityManager em = emf.createEntityManager();
        List<Teacher> teachers = em.createQuery("SELECT c FROM Teacher c",Teacher.class).getResultList();
        em.close();
        return teachers;
    };

    public static Teacher fetchById(int id){
        EntityManager em = emf.createEntityManager();
        Teacher teacher = em.find(Teacher.class,id);
        em.close();
        return teacher;
    }

    public static void addCourse(int courseId,int teacherId){
        EntityManager em = emf.createEntityManager();
        Teacher teacher = em.find(Teacher.class,teacherId);
        Course course = em.find(Course.class,courseId);

        em.getTransaction().begin();
        teacher.addCourse(course);
        em.getTransaction().commit();
        em.close();
    }
    public static Teacher fetchLast(){
        EntityManager em = emf.createEntityManager();
        Teacher teacher = em.createQuery("SELECT c FROM Teacher c ORDER BY id desc",Teacher.class).getResultList().get(0);
        em.close();
        return teacher;
    }
}
