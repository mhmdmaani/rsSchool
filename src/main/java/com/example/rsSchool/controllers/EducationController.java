package com.example.rsSchool.controllers;
import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Education;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public  class EducationController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


    public static void createEducation(String name , String description,String image){
        EntityManager em = emf.createEntityManager();
        Education education = new Education(name,description,image);
        em.getTransaction().begin();
        em.persist(education);
        em.getTransaction().commit();
        em.close();
    }
    public static void updateEducation(int id,String name,String description,String image){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(Education.class,id);
        em.getTransaction().begin();

        education.setName(name);
        education.setDescription(description);
        education.setImage(image);
        em.getTransaction().commit();
        em.close();
    }

    public static void removeEducation(int id){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(Education.class,id);
        em.getTransaction().begin();

        em.remove(education);

        em.getTransaction().commit();
        em.close();
    }

    public  static List<Education> fetchAll(){
        EntityManager em = emf.createEntityManager();
        List<Education> educations = em.createQuery("SELECT c FROM Education c",Education.class).getResultList();
       // em.close();
        return educations;
    };

    public static Education fetchById(int id){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(Education.class,id);
        em.close();
        return education;
    }

    public static Education fetchLast(){
        EntityManager em = emf.createEntityManager();
        Education education = em.createQuery("SELECT c FROM Education c ORDER BY id desc",Education.class).getResultList().get(0);
        em.close();
        return education;
    }



    public static void addCourse(Course course,int educationId ){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(Education.class,educationId);

        em.getTransaction().begin();

        education.addCourse(course);

        em.getTransaction().commit();
        em.close();
    }

    public static  void removeCourse(int courseId,int educationId){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(Education.class,educationId);
        Course course = em.find(Course.class,courseId);
        em.getTransaction().begin();

        education.removeCourse(course);

        em.getTransaction().commit();
        em.close();
    }
}
