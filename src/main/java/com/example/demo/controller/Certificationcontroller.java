package com.example.demo.controller;

import com.example.demo.model.Certification;
import com.example.demo.repository.CertificationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin("*")
public class Certificationcontroller {

    private final CertificationRepository repo;

    public Certificationcontroller(CertificationRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Certification> getCertifications() {
        return repo.findAll();
    }

    @PostMapping
    public Certification addCertification(@RequestBody Certification certification) {
        return repo.save(certification);
    }

    @DeleteMapping("/{id}")
    public void deleteCertification(@PathVariable String id) {
        repo.deleteById(id);
    }
}
