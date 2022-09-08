package com.ynnckth.pizzatime.orderservice.orders;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Customer {
    @NonNull private String firstName;
    @NonNull private String lastName;
    @NonNull private String email;
}
