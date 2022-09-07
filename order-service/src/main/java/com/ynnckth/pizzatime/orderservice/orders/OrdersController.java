package com.ynnckth.pizzatime.orderservice.orders;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    private final OrderRepository orderRepository;

    public OrdersController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders() {
        log.info("Requested orders");
        List<Order> orders = orderRepository.getAll();
        return ResponseEntity.ok(orders);
    }

    // TODO: improve response: https://www.baeldung.com/spring-boot-json
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody PlaceOrderRequest placeOrderRequest) {
        log.info("Placed new order");
        Order insertedOrder = orderRepository.insert(placeOrderRequest);
        return ResponseEntity.ok(insertedOrder);
    }
}
