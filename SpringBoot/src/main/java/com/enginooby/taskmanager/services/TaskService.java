package com.enginooby.taskmanager.services;

import com.enginooby.taskmanager.models.Task;
import com.enginooby.taskmanager.repositories.ITaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private ITaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    public Task create(Task task) {
        return taskRepository.save(task);
    }

    public Task update(Long id, Task taskUpdateDto) {
        var task = taskRepository.findById(id).get();
        task.setTitle(taskUpdateDto.getTitle());
        task.setStatus(taskUpdateDto.getStatus());
        task.setImage(taskUpdateDto.getImage());
        task.setArchived(taskUpdateDto.isArchived());
        task.setTags(taskUpdateDto.getTags());
        task.setPriority(taskUpdateDto.getPriority());

        return taskRepository.save(task);
    }
}
