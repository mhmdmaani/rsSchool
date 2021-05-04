package com.example.rsSchool.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Education {
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO )
    private int id;
    private String name;
    private String description;
    private String image;

    @OneToMany
    private List<Course> courses;

    // default constructor
    public Education() {
        this.courses = new ArrayList<>();
    }

    // constructor
    public Education(String name,String description,String image) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.courses = new ArrayList<>();
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public void addCourse(Course course) {
        this.courses.add(course);
    }

    public void removeCourse(Course course){
        this.courses.removeIf(c->c.getId()==course.getId());
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
