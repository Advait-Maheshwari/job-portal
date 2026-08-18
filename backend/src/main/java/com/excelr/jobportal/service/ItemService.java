package com.excelr.jobportal.service;

import com.excelr.jobportal.model.Item;
import com.excelr.jobportal.repository.ItemRepository;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ItemService {
  private static final Set<String> STATUSES = Set.of("Planned", "Review", "Active", "Closed");
  private final ItemRepository repo;

  public ItemService(ItemRepository repo) {
    this.repo = repo;
  }

  public List<Item> all() {
    return repo.findAll();
  }

  public Item create(Item item) {
    validate(item);
    clean(item);
    return repo.save(item);
  }

  public Item update(Long id, Item input) {
    validate(input);
    Item item = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found"));
    item.setName(input.getName().trim());
    item.setOwner(input.getOwner().trim());
    item.setStatus(input.getStatus());
    return repo.save(item);
  }

  public void delete(Long id) {
    if (!repo.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found");
    repo.deleteById(id);
  }

  private void validate(Item item) {
    if (item.getName() == null || item.getName().trim().length() < 2) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name must contain at least 2 characters");
    }
    if (item.getOwner() == null || item.getOwner().trim().length() < 2) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Owner must contain at least 2 characters");
    }
    if (item.getStatus() == null || !STATUSES.contains(item.getStatus())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
    }
  }

  private void clean(Item item) {
    item.setName(item.getName().trim());
    item.setOwner(item.getOwner().trim());
  }
}
