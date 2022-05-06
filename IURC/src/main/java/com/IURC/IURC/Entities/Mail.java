package com.IURC.IURC.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.AUTO;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="email")
public class Mail {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;
    private String destinataire;
    private String object;
    private String message;
}