package com.ynnckth.pizzatime.orderservice.orderitems;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderItem {
    @NonNull private String name;
    @NonNull private String description;
    @NonNull private double unitPrice;
    @NonNull private boolean isAvailable;
}
