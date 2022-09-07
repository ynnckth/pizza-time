package com.ynnckth.pizzatime.orderservice.orders;

import com.ynnckth.pizzatime.orderservice.orderitems.OrderItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class OrderRepository {

    private final List<Order> orders = new ArrayList<>();

    public OrderRepository() {
        orders.add(new Order("001", "2022-09-04T07:58:49.098Z",
                List.of(new OrderItem("Margharita", "Plain and boring", 10, true)),
                new Customer("John", "Doe", "john.doe@test.com")));
        orders.add(
                new Order("002", "2022-09-02T13:58:49.098Z",
                        List.of(
                                new OrderItem("Margharita", "Plain and boring", 10, true),
                                new OrderItem("Salami", "Tasty and spicy", 12, true)),
                        new Customer("John", "Doe", "john.doe@test.com")));
    }

    public List<Order> getAll() {
        return orders;
    }

    public Order insert(PlaceOrderRequest placeOrderRequest) {
        orders.add(new Order(UUID.randomUUID().toString(), placeOrderRequest.getOrderDate(), placeOrderRequest.getOrderItems(), placeOrderRequest.getCustomer()));
        return new Order(UUID.randomUUID().toString(), placeOrderRequest.getOrderDate(), placeOrderRequest.getOrderItems(), placeOrderRequest.getCustomer());
    }

}
