package com.enginooby.taskmanager.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "tasks")
@EntityListeners(AuditingEntityListener.class)
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

    @Column
    @ElementCollection
    private List<String> tags;

    @Column(name = "isArchived")
    private boolean isArchived;

    @CreatedDate
    @Column(name = "createAt")
    private Date createAt;

    @LastModifiedDate
    @Column(name = "updateAt")
    private Date updateAt;
}

