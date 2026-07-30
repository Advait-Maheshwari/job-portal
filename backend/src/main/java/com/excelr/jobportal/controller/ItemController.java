package com.excelr.jobportal.controller;

import com.excelr.jobportal.model.Item;
import com.excelr.jobportal.service.ItemService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/job-portal/items")
public class ItemController {
  private final ItemService service;
  public ItemController(ItemService service) { this.service = service; }
  @GetMapping public List<Item> all() { return service.all(); }
  @PostMapping public Item create(@RequestBody Item item) { return service.create(item); }
  @PutMapping("/{id}") public Item update(@PathVariable Long id, @RequestBody Item item) { return service.update(id, item); }
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
