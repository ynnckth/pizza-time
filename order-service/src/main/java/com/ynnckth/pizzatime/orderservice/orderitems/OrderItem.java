package com.ynnckth.pizzatime.orderservice.orderitems;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.NonNull;

@Getter
@Setter
@AllArgsConstructor
public class OrderItem {
    @NonNull private String name;
    @NonNull private String description;
    @NonNull private double unitPrice;
    @NonNull private boolean isAvailable;
}
