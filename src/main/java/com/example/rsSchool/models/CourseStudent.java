package com.example.rsSchool.models;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity(name="CourseStudent")
@Table(name="course_student")
public class CourseStudent {
    @EmbeddedId
    private CourseStudentId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("courseId")
    private Course course;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("studentId")
    private Student student;

    @Column(name="degree")
    private double degree;

    public CourseStudent() {
    }

    public CourseStudent(Course course, Student student, double degree) {
        this.id = new CourseStudentId(course.getId(),student.getId());
        this.course = course;
        this.student = student;
        this.degree = degree;
    }

    public CourseStudentId getId() {
        return id;
    }

    public void setId(CourseStudentId id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public double getDegree() {
        return degree;
    }

    public void setDegree(double degree) {
        this.degree = degree;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        CourseStudent that = (CourseStudent) o;
        return Objects.equals(course, that.course) &&
                Objects.equals(student, that.student);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, course, student, degree);
    }
}
