package com.ynnckth.pizzatime.orderservice.orderitems;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class OrderItemRepository {

    private final List<OrderItem> orderItems = List.of(
            new OrderItem("Margharita", "Plain and boring", 10, true),
            new OrderItem("Salami", "Tasty and spicy", 12, true),
            new OrderItem("Hawaii", "Seriously??", 11, false),
            new OrderItem("Pesto Burratina", "Wood-fired thin crust deliciousness", 15, true)
    );

    public List<OrderItem> getAll() {
        return orderItems;
    }

}
