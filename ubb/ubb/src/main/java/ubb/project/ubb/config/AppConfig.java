package ubb.project.ubb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@PropertySource(value = "classpath:application-local.properties", ignoreResourceNotFound = true)
public class AppConfig {

}