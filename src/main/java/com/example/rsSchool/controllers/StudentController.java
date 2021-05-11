package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Education;
import com.example.rsSchool.models.Student;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class StudentController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


    public static void createStudent(String name , String email , String tel , String image, Education education){

        Student Student = new Student(name,email,tel,image);

        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(Student);
        em.getTransaction().commit();
        em.close();
    }
    public static void updateStudent(int id,String name , String email , String tel , String image){
        EntityManager em = emf.createEntityManager();
        Student student = em.find(Student.class,id);
        em.getTransaction().begin();
        student.setName(name);
        student.setEmail(email);
        student.setTel(tel);
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
        Student student = em.find(Student.class,id);
        em.close();
        return student;
    }
    public static Student fetchLast(){
        EntityManager em = emf.createEntityManager();
        Student student = em.createQuery("SELECT c FROM Student c ORDER BY id desc",Student.class).getResultList().get(0);
        em.close();
        return student;
    }
    public static  List<Student> fetchByEducation(int educationId){
        EntityManager em = emf.createEntityManager();
        List<Student> Student = em.createQuery("SELECT c from Student c where c.education.id=:educationId", Student.class).setParameter("educationId",educationId).getResultList();
        em.close();
        return Student;
    }

    public static List<Student> searchByName(String text , int educationId){
        EntityManager em = emf.createEntityManager();
        List<Student> students = em.createQuery("SELECT c FROM Student c  WHERE c.name  LIKE :searchText AND c.education.id=:educationId",Student.class).setParameter("searchText",text+"%").setParameter("educationId",educationId).getResultList();
        em.close();
        return students;
    }

}
