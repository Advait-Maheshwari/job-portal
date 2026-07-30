package com.excelr.jobportal.service;

import com.excelr.jobportal.model.Item;
import com.excelr.jobportal.repository.ItemRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ItemService {
  private final ItemRepository repo;
  public ItemService(ItemRepository repo) { this.repo = repo; }
  public List<Item> all() { return repo.findAll(); }
  public Item create(Item item) { return repo.save(item); }
  public Item update(Long id, Item input) {
    Item item = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    item.setName(input.getName());
    item.setOwner(input.getOwner());
    item.setStatus(input.getStatus());
    return repo.save(item);
  }
  public void delete(Long id) { repo.deleteById(id); }
}
