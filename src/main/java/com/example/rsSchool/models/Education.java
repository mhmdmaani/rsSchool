package com.example.rsSchool.models;


import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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

    // default constructor
    public Education() {
    }

    // constructor
    public Education(String name,String description,String image) {
        this.name = name;
        this.description = description;
        this.image = image;
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


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
