package com.excelr.jobportal.model;

import jakarta.persistence.*;

@Entity
public class Item {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String owner;
  private String status;

  protected Item() {}
  public Item(String name, String owner, String status) { this.name = name; this.owner = owner; this.status = status; }
  public Long getId() { return id; }
  public String getName() { return name; }
  public String getOwner() { return owner; }
  public String getStatus() { return status; }
  public void setName(String name) { this.name = name; }
  public void setOwner(String owner) { this.owner = owner; }
  public void setStatus(String status) { this.status = status; }
}
