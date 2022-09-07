package com.ynnckth.pizzatime.orderservice.orders;

import com.ynnckth.pizzatime.orderservice.orderitems.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.NonNull;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Order {
    @NonNull private String orderId;
    @NonNull private String orderDate;
    @NonNull private List<OrderItem> orderItems;
    @NonNull private Customer customer;
}
