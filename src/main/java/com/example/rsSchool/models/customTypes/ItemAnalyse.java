package com.example.rsSchool.models.customTypes;

import com.example.rsSchool.models.Education;

public class ItemAnalyse {

    int id;
    String name;
    String image;
    Education education;
    double avg;
    double count;

    public ItemAnalyse(int id, String name, String image, Education education, double avg, double count) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.education = education;
        this.avg = avg;
        this.count = count;
    }
}

