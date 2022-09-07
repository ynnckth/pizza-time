package com.ynnckth.pizzatime.orderservice.orders;

import com.ynnckth.pizzatime.orderservice.orderitems.OrderItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PlaceOrderRequest {
    @NonNull private String orderDate;
    @NonNull private List<OrderItem> orderItems;
    @NonNull private Customer customer;
}
