package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Teacher;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import java.util.List;

public class TeacherController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");

    public static void addTeacher(Teacher t) {

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();
        em.persist(t);
        em.getTransaction().commit();

        em.close();

    }

    public  static void deleteTecher(int id){

        EntityManager em = emf.createEntityManager();

        Teacher t = em.find(Teacher.class, id);

        em.getTransaction().begin();
        em.remove(t);
        em.getTransaction().commit();

    }

    public  static List<Teacher> fetchAll() {

        EntityManager em = emf.createEntityManager();

        TypedQuery<Teacher> q = em.createQuery("SELECT t FROM Teacher t", Teacher.class);

        List<Teacher> t = q.getResultList();
        em.close();

        return t ;

    }

    public static Teacher fetchById(int id){
        EntityManager em = emf.createEntityManager();
        Teacher teacher = em.find(com.example.rsSchool.models.Teacher.class,id);
        em.close();
        return teacher;
    }


    public static void updateTeacher(int id, String newName ,String newtel,String newemail,String newimage) {

        EntityManager em = emf.createEntityManager();

        Teacher m = em.find(Teacher.class, id);

        em.getTransaction().begin();

        m.setName(newName);
        m.setTel(newtel);
        m.setEmail(newemail);
        m.setImage(newimage);

        em.getTransaction().commit();

        em.close();

    }
}
