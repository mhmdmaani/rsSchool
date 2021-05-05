package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Course;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import java.util.List;

public class CourseController {


        static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");

        public void addCourse(Course c) {

            EntityManager em = emf.createEntityManager();

            em.getTransaction().begin();
            em.persist(c);
            em.getTransaction().commit();

            em.close();

        }
        public void deleteCourse(int  id){

            EntityManager em = emf.createEntityManager();

            Course c = em.find(Course.class, id);

            em.getTransaction().begin();

            em.remove(c);
            em.getTransaction().commit();

        }
    public static List<Course> fetchAll() {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Course> query = em.createQuery("SELECT c FROM Course c", Course.class);

        List<Course> resultList = query.getResultList();

        em.close();

        return resultList;

    }

    public static Course fetchById(int id){
        EntityManager em = emf.createEntityManager();
        Course course = em.find(com.example.rsSchool.models.Course.class,id);
        em.close();
        return course;
    }

    public static void updateCourse(int id, String newName ,String newdescription,String newimage) {

        EntityManager em = emf.createEntityManager();

        Course c = em.find(Course.class, id);

        em.getTransaction().begin();

       c.setName(newName);
       c.setDescription(newdescription);
       c.setImage(newimage);

        em.getTransaction().commit();

        em.close();

    }

    }

