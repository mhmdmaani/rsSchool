package com.example.rsSchool.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    private String image;



    @ManyToOne
    @JoinColumn(name = "education_id")
    public Education education;

    @ManyToMany
    public List<Teacher> teachers;


    public Course(String name, String description,Education education,String image){
        this.name=name;
        this.description = description;
        this.education = education;
        this.image = image;
        this.teachers = new ArrayList<>();
    }
    public Course(){
        this.teachers = new ArrayList<>();
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

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    public void addTeacher(Teacher teacher){
        this.teachers.add(teacher);
    }

    public void removeTeacher(Teacher teacher){
        this.teachers.removeIf(c->c.getId()==teacher.getId());
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
