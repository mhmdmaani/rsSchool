package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Education;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class EducationController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


    public static void createEducation(String name , String description){

        Education education = new Education(name,description);

        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(education);
        em.getTransaction().commit();
        em.close();
    }
    public static void updateEducation(int id,String name,String description){
        EntityManager em = emf.createEntityManager();
        Education education = em.find(Education.class,id);
        em.getTransaction().begin();

        education.setName(name);
        education.setDescription(description);
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
        List<Education> educations = em.createQuery("SELECT c FROM Education c ORDER BY c.id",Education.class).getResultList();
        return educations;
    };

}
