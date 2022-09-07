package com.ynnckth.pizzatime.orderservice.orders;

import com.ynnckth.pizzatime.orderservice.orderitems.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Order {
    private String orderId;
    private String orderDate;
    private List<OrderItem> orderItems;
    private Customer customer;
}
