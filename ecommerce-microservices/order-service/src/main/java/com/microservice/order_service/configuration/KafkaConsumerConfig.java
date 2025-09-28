package com.microservice.order_service.configuration;

import com.microservice.order_service.kafka.event.StockEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;

@EnableKafka
@Configuration
public class KafkaConsumerConfig {

    @Bean
    ConcurrentKafkaListenerContainerFactory<String, StockEvent> kafkaListenerContainerFactory(
            ConsumerFactory<String, StockEvent> consumerFactory
    ) {
        ConcurrentKafkaListenerContainerFactory<String, StockEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);

        return factory;
    }
}
