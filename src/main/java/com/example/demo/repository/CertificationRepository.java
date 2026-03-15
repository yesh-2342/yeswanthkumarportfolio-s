package com.example.demo.repository;

import com.example.demo.model.Certification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CertificationRepository extends MongoRepository<Certification, String> {
}
