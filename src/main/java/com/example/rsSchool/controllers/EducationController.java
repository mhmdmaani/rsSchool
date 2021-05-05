package com.example.rsSchool.controllers;
import com.example.rsSchool.models.Education;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public  class EducationController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


    public static void createEducation(String name , String description,String image){

        Education education = new Education(name,description,image);

        EntityManager em = emf.createEntityManager();
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

    public  static List<Education>  fetchAll(){
        EntityManager em = emf.createEntityManager();
        List<Education> educations = em.createQuery("SELECT c FROM Education c",Education.class).getResultList();
        em.close();
        return educations;
    };

    public static Education fetchById(int id){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(com.example.rsSchool.models.Education.class,id);
        em.close();
        return education;
    }


}
