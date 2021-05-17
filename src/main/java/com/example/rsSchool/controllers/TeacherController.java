package com.example.rsSchool.controllers;

import com.example.rsSchool.models.Course;
import com.example.rsSchool.models.Education;
import com.example.rsSchool.models.Student;
import com.example.rsSchool.models.Teacher;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class TeacherController {

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


    public static Teacher createTeacher(String name , String email , String tel , String image){
        Teacher teacher = new Teacher(name,email,tel,image);
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(teacher);
        em.getTransaction().commit();
        em.close();
        return teacher;
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
        em.createNativeQuery("DELETE FROM course_taacher WHERE teacher_id=:id").setParameter("id",id).executeUpdate();
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

    public static  List<Teacher> fetchByCourse(int courseId){
        EntityManager em = emf.createEntityManager();
        Course course =em.find(Course.class,courseId);

        em.close();
        return course.teachers;
    }

    public static List<Teacher> searchByName(String text ){
        EntityManager em = emf.createEntityManager();
            List<Teacher> teachers= em.createQuery("SELECT c FROM Teacher c  WHERE c.name  LIKE :searchText",Teacher.class).setParameter("searchText",text+"%").getResultList();
            em.close();
            return teachers;
    }

    public  static List<Course> fetchCourses(int teacherId){
        EntityManager em = emf.createEntityManager();
        List<Course> courses= em.createNativeQuery("SELECT c.* FROM Course c  JOIN course_taacher ct ON ct.course_id=c.id  where ct.teacher_id=:id",Course.class).setParameter("id",teacherId).getResultList();
        em.close();
        return courses;
    }
}
