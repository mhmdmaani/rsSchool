package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Education;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class CourseController {
        static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


        public static void createCourse(String name , String description, String image, Education education){

            Course Course = new Course(name,description,education, image);

            EntityManager em = emf.createEntityManager();
            em.getTransaction().begin();
            em.persist(Course);
            em.getTransaction().commit();
            em.close();
        }
        public static void updateCourse(int id,String name,String description,String image){
            EntityManager em = emf.createEntityManager();
            Course Course = em.find(Course.class,id);
            em.getTransaction().begin();

            Course.setName(name);
            Course.setDescription(description);
            Course.setImage(image);
            em.getTransaction().commit();
            em.close();
        }

        public static void removeCourse(int id){
            EntityManager em = emf.createEntityManager();
            Course Course = em.find(Course.class,id);
            em.getTransaction().begin();

            em.remove(Course);

            em.getTransaction().commit();
            em.close();
        }

        public  static List<Course> fetchAll(){
            EntityManager em = emf.createEntityManager();
            List<Course> Courses = em.createQuery("SELECT c FROM Course c",Course.class).getResultList();
            em.close();
            return Courses;
        };

        public static Course fetchById(int id){
            EntityManager em = emf.createEntityManager();
            Course Course = em.find(com.example.rsSchool.models.Course.class,id);
            em.close();
            return Course;
        }

    public static Course fetchLast(){
        EntityManager em = emf.createEntityManager();
        Course course = em.createQuery("SELECT c FROM Course c ORDER BY id desc",Course.class).getResultList().get(0);
        em.close();
        return course;
    }
}
