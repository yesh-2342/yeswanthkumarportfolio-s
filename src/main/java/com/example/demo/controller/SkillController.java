package com.example.demo.controller;

import com.example.demo.model.Skill;
import com.example.demo.repository.SkillRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin("*")
public class SkillController {

    private final SkillRepository repo;

    public SkillController(SkillRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Skill> getSkills() {
        return repo.findAll();
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return repo.save(skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable String id) {
        repo.deleteById(id);
    }
}
