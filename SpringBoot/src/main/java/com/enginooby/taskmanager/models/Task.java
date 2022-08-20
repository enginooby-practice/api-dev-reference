package com.enginooby.taskmanager.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private TaskStatus status;

    @Column
    @Nullable
    private int priority;

    @Column
    private String image;

    @ElementCollection
    @Column()
    private List<String> tags;

    @Column(name = "isArchived")
    private boolean isArchived;

    @Column(name = "createAt")
    @CreatedDate
    private Date createAt;

    @Column(name = "updateAt")
    @LastModifiedDate
    private Date updateAt;
}

