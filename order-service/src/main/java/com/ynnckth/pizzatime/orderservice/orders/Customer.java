package com.ynnckth.pizzatime.orderservice.orders;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.NonNull;

@Getter
@Setter
@AllArgsConstructor
public class Customer {
    @NonNull private String firstName;
    @NonNull private String lastName;
    @NonNull private String email;
}
