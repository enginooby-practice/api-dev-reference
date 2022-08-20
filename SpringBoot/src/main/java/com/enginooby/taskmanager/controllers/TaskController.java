package com.enginooby.taskmanager.controllers;

import com.enginooby.taskmanager.models.Task;
import com.enginooby.taskmanager.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping()
    public List<Task> getAll() {
        return taskService.getAll();
    }

    @PostMapping()
    public Task create(@RequestBody Task taskCreateDto) {
        return taskService.create(taskCreateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }

    @PatchMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task taskUpdateDto) {
        return taskService.update(id, taskUpdateDto);
    }
}
