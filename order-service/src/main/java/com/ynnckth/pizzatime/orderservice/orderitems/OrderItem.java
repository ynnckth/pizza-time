package com.ynnckth.pizzatime.orderservice.orderitems;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderItem {
    private String name;
    private String description;
    private double unitPrice;
    private boolean isAvailable;
}
