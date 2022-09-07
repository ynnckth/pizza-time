package com.ynnckth.pizzatime.orderservice.orders;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Customer {

    private String firstName;
    private String lastName;
    private String email;

}
