/**
 * Pizza Time
 * This is a sample Pizza Time Server based on the OpenAPI 3.0 specification.
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("OrderApi", () => {
  let instance: api.OrderApi
  beforeEach(function() {
    instance = new api.OrderApi(config)
  });

  test("getOrders", () => {
    return expect(instance.getOrders({})).resolves.toBe(null)
  })
  test("placeOrder", () => {
    const body: api.PlaceOrderRequest = undefined
    return expect(instance.placeOrder(body, {})).resolves.toBe(null)
  })
})

describe("PizzaApi", () => {
  let instance: api.PizzaApi
  beforeEach(function() {
    instance = new api.PizzaApi(config)
  });

  test("getPizzas", () => {
    return expect(instance.getPizzas({})).resolves.toBe(null)
  })
})
