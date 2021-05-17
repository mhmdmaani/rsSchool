package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.customTypes.ItemAnalyse;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public class AnalyticsController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");

    public static  long getCountEducations(){
        EntityManager em = emf.createEntityManager();
        long count = em.createQuery("SELECT COUNT(c.id) from Education c", Long.class).getSingleResult();
         return count;
    }

    public static  long getCountStudents(){
        EntityManager em = emf.createEntityManager();
        long count = em.createQuery("SELECT COUNT(c.id) from Student c", Long.class).getSingleResult();
        return count;
    }
    public static  long getCountTeachers(){
        EntityManager em = emf.createEntityManager();
        long count = em.createQuery("SELECT COUNT(c.id) from Student c", Long.class).getSingleResult();
        return count;
    }

    public static  List getCoursesAverage(){
        EntityManager em = emf.createEntityManager();
        List courses = em.createQuery("SELECT c.id, c.name,c.image,c.education,COUNT(cs.course.id), AVG(cs.degree) from Course c JOIN CourseStudent cs ON cs .course.id=c.id group by cs.course.id").getResultList();
        return courses;
    }

    public static  List<ItemAnalyse>getStudentsAverage(){
        EntityManager em = emf.createEntityManager();
        List students = em.createQuery("SELECT c.id, c.name,c.image,c.education,AVG(cs.degree),COUNT(cs.course.id) from Student c JOIN CourseStudent cs ON cs .student.id=c.id group by cs.student.id").getResultList();
       return students;
    }

}
