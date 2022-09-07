package com.ynnckth.pizzatime.orderservice.orders;

import com.ynnckth.pizzatime.orderservice.orderitems.OrderItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PlaceOrderRequest {
    private String orderDate;
    private List<OrderItem> orderItems;
    private Customer customer;
}
