package com.example.rsSchool.controllers;

import com.example.rsSchool.models.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;
import java.util.Set;

public class CourseController {
        static EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");


        public static void createCourse(String name , String description, String image){

            Course Course = new Course(name,description, image);

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
            Course Course = em.find(Course.class,id);
            em.close();
            return Course;
        }
        public static  List<Course> fetchByEducation(int educationId){
            EntityManager em = emf.createEntityManager();
            List<Course> Course = em.createQuery("SELECT c from Course c where c.education.id=:educationId", Course.class).setParameter("educationId",educationId).getResultList();
            em.close();
            return Course;
        }

    public static Course fetchLast(){
        EntityManager em = emf.createEntityManager();
        Course course = em.createQuery("SELECT c FROM Course c ORDER BY id desc",Course.class).getResultList().get(0);
        em.close();
        return course;
    }

    public static List<Course> searchByName(String text , int educationId){

        EntityManager em = emf.createEntityManager();
        List<Course> courses = em.createQuery("SELECT c FROM Course c  WHERE c.name  LIKE :searchText AND c.education.id=:educationId",Course.class).setParameter("searchText",text+"%").setParameter("educationId",educationId).getResultList();
         em.close();
        return courses;
    }

    public static  List<Student> fetchAllCourseStudents(int courseId){
        EntityManager em = emf.createEntityManager();
        Course course = em.find(Course.class,courseId);
        Education education = em.find(Education.class,course.getEducation().getId());
        List<Student> students = em.createQuery("SELECT c FROM  Student c WHERE c.education.id=:educationId",Student.class).setParameter("educationId",education.getId()).getResultList();
        em.close();
        return students;
    }

    public static List<CourseStudent> fetchCourseStudents(int courseId){
        EntityManager em = emf.createEntityManager();
        List<CourseStudent> courseStudents = em.createQuery("SELECT c FROM CourseStudent c WHERE c.course.id=:courseId",CourseStudent.class).setParameter("courseId",courseId).getResultList();
        System.out.println(courseStudents);
        em.close();
        return courseStudents;
    }


    public static  CourseStudent addCourseStudent(int courseId,int studentId,double degree){
        EntityManager em = emf.createEntityManager();
        Course course = em.find(Course.class,courseId);
        Student student = em.find(Student.class,studentId);
        CourseStudent courseStudent = new CourseStudent(course,student,degree);
        em.getTransaction().begin();
        em.persist(courseStudent);
        em.getTransaction().commit();
        em.close();
        return courseStudent;
    }

    public static void removeCourseStudent(int courseId,int studentId){
        EntityManager em = emf.createEntityManager();

        CourseStudent courseStudent =em.createQuery("SELECT c FROM CourseStudent c where c.course.id=:courseId AND c.student.id=:studentId ",CourseStudent.class)
                .setParameter("courseId",courseId).setParameter("studentId",studentId).getSingleResult();
        em.getTransaction().begin();
        em.remove(courseStudent);
        em.getTransaction().commit();
        em.close();
    }

    public  static List<CourseStudent> searchStudentByName(String search,int courseId){
        EntityManager em = emf.createEntityManager();
        List<CourseStudent> courses = em.createQuery("SELECT c FROM CourseStudent c  WHERE c.student.name  LIKE :searchText AND c.course.id=:courseId",CourseStudent.class).setParameter("searchText",search+"%").setParameter("courseId",courseId).getResultList();
        em.close();
        return courses;
    }

    public static void addTeacher(int courseId,int teacherId){
        EntityManager em = emf.createEntityManager();
        Course course = em.find(Course.class,courseId);
        Teacher teacher = em.find(Teacher.class,teacherId);

        em.getTransaction().begin();
        course.addTeacher(teacher);
        em.getTransaction().commit();
        em.close();
    }
    public static void removeTeacher(int courseId,int teacherId){
        EntityManager em = emf.createEntityManager();
        Course course = em.find(Course.class,courseId);
        Teacher teacher = em.find(Teacher.class,teacherId);

        em.getTransaction().begin();
        course.removeTeacher(teacher);
        em.getTransaction().commit();
        em.close();
    }
}
