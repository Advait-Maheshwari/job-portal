package com.excelr.jobportal.repository;

import com.excelr.jobportal.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
