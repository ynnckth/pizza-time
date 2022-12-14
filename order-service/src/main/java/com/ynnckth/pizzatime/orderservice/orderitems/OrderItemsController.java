package com.ynnckth.pizzatime.orderservice.orderitems;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// TODO: make this more generic instead of only providing pizzas
@Slf4j
@RestController
@RequestMapping("/api/pizzas")
public class OrderItemsController {

    private final OrderItemRepository orderItemRepository;

    public OrderItemsController(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Operation(
            summary = "Get all order items",
            description = "Get all available order items",
            operationId = "getOrderItems",
            tags = "OrderItem")
    @GetMapping
    public ResponseEntity<List<OrderItem>> getOrderItems() {
        log.info("Requested order items");
        List<OrderItem> orderItems = orderItemRepository.getAll();
        return ResponseEntity.ok(orderItems);
    }

}
