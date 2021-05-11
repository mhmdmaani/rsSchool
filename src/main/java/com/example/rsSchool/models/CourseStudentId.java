package com.example.rsSchool.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CourseStudentId implements Serializable {

    @Column(name="course_id")
    private int courseId;

    @Column(name="student_id")
    private int studentId;

    public CourseStudentId() {
    }

    public CourseStudentId(int courseId, int studentId) {
        this.courseId = courseId;
        this.studentId = studentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        CourseStudentId that = (CourseStudentId) o;
        return Objects.equals(courseId, that.courseId) &&
                Objects.equals(studentId, that.studentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, courseId);
    }

}
