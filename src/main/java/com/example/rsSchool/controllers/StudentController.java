package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Student;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class StudentController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");

    public static void createStudent(String name ,String tel,String email,String image){

        Student student = new Student(name,tel,email,image);

        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(student);
        em.getTransaction().commit();
        em.close();
    }
    public static void updateStudent(int id,String name,String tel,String email,String image){
        EntityManager em = emf.createEntityManager();
        Student student = em.find(Student.class,id);
        em.getTransaction().begin();

        student.setName(name);
        student.setTel(tel);
        student.setEmail(email);
        student.setImage(image);
        em.getTransaction().commit();
        em.close();
    }

    public static void removeStudent(int id){
        EntityManager em = emf.createEntityManager();
        Student student = em.find(Student.class,id);
        em.getTransaction().begin();

        em.remove(student);

        em.getTransaction().commit();
        em.close();
    }

    public  static List<Student> fetchAll(){
        EntityManager em = emf.createEntityManager();
        List<Student> students = em.createQuery("SELECT c FROM Student c",Student.class).getResultList();
        em.close();
        return students;
    };

    public static Student fetchById(int id){
        EntityManager em = emf.createEntityManager();
        Student student = em.find(com.example.rsSchool.models.Student.class,id);
        em.close();
        return student;
    }


}
