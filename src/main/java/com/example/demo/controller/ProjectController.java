package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")

public class ProjectController {

    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Project> getProjects() {
        return repo.findAll();
    }

    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return repo.save(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable String id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable String id, @RequestBody Project project) {

        Project existing = repo.findById(id).orElseThrow();

        existing.setTitle(project.getTitle());
        existing.setDescription(project.getDescription());
        existing.setLiveLink(project.getLiveLink());

        return repo.save(existing);

    }
}
