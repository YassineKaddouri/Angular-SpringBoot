package com.IURC.IURC.Services;

import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;


@Service
public class ImageService {

    public String uploadDir = "images";

    private Path root;

    @PostConstruct
    public void init() {
        createUploadingDirectory();
    }

    private void createUploadingDirectory() {
        try {
            root = Paths.get(uploadDir);
            Files.createDirectories(root);
        } catch (IOException e) {

        }
    }
    public String uploadImage(MultipartFile image) {
        String fileName = image.getOriginalFilename();

        Path filePath = this.root.resolve(fileName);
        try {
            image.transferTo(filePath);
        } catch (IOException e) {
        }
        return fileName;
    }

}
