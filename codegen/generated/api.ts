/// <reference path="./custom.d.ts" />
// tslint:disable
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

import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "http://localhost:3000/api".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = isomorphicFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface Customer
 */
export interface Customer {
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    email: string;
}
/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    orderId: string;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    orderDate: Date;
    /**
     * 
     * @type {Customer}
     * @memberof Order
     */
    customer?: Customer;
    /**
     * 
     * @type {Array<OrderItem>}
     * @memberof Order
     */
    orderItems: Array<OrderItem>;
}
/**
 * 
 * @export
 * @interface OrderItem
 */
export interface OrderItem {
    /**
     * 
     * @type {string}
     * @memberof OrderItem
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof OrderItem
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof OrderItem
     */
    unitPrice: number;
    /**
     * 
     * @type {boolean}
     * @memberof OrderItem
     */
    isAvailable: boolean;
}
/**
 * 
 * @export
 * @interface PlaceOrderRequest
 */
export interface PlaceOrderRequest {
    /**
     * 
     * @type {Date}
     * @memberof PlaceOrderRequest
     */
    orderDate: Date;
    /**
     * 
     * @type {Array<OrderItem>}
     * @memberof PlaceOrderRequest
     */
    orderItems: Array<OrderItem>;
    /**
     * 
     * @type {Customer}
     * @memberof PlaceOrderRequest
     */
    customer: Customer;
}
/**
 * OrderApi - fetch parameter creator
 * @export
 */
export const OrderApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get all past orders
         * @summary Get all orders
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOrders(options: any = {}): FetchArgs {
            const localVarPath = `/orders`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Place a new order in the store
         * @summary Place a new order
         * @param {PlaceOrderRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        placeOrder(body?: PlaceOrderRequest, options: any = {}): FetchArgs {
            const localVarPath = `/orders`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"PlaceOrderRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OrderApi - functional programming interface
 * @export
 */
export const OrderApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Get all past orders
         * @summary Get all orders
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOrders(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<Order>> {
            const localVarFetchArgs = OrderApiFetchParamCreator(configuration).getOrders(options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Place a new order in the store
         * @summary Place a new order
         * @param {PlaceOrderRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        placeOrder(body?: PlaceOrderRequest, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Order> {
            const localVarFetchArgs = OrderApiFetchParamCreator(configuration).placeOrder(body, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * OrderApi - factory interface
 * @export
 */
export const OrderApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * Get all past orders
         * @summary Get all orders
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOrders(options?: any) {
            return OrderApiFp(configuration).getOrders(options)(fetch, basePath);
        },
        /**
         * Place a new order in the store
         * @summary Place a new order
         * @param {PlaceOrderRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        placeOrder(body?: PlaceOrderRequest, options?: any) {
            return OrderApiFp(configuration).placeOrder(body, options)(fetch, basePath);
        },
    };
};

/**
 * OrderApi - object-oriented interface
 * @export
 * @class OrderApi
 * @extends {BaseAPI}
 */
export class OrderApi extends BaseAPI {
    /**
     * Get all past orders
     * @summary Get all orders
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public getOrders(options?: any) {
        return OrderApiFp(this.configuration).getOrders(options)(this.fetch, this.basePath);
    }

    /**
     * Place a new order in the store
     * @summary Place a new order
     * @param {PlaceOrderRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public placeOrder(body?: PlaceOrderRequest, options?: any) {
        return OrderApiFp(this.configuration).placeOrder(body, options)(this.fetch, this.basePath);
    }

}
/**
 * PizzaApi - fetch parameter creator
 * @export
 */
export const PizzaApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get all available pizzas
         * @summary Get all pizzas
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPizzas(options: any = {}): FetchArgs {
            const localVarPath = `/pizzas`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PizzaApi - functional programming interface
 * @export
 */
export const PizzaApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Get all available pizzas
         * @summary Get all pizzas
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPizzas(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<OrderItem>> {
            const localVarFetchArgs = PizzaApiFetchParamCreator(configuration).getPizzas(options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * PizzaApi - factory interface
 * @export
 */
export const PizzaApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * Get all available pizzas
         * @summary Get all pizzas
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPizzas(options?: any) {
            return PizzaApiFp(configuration).getPizzas(options)(fetch, basePath);
        },
    };
};

/**
 * PizzaApi - object-oriented interface
 * @export
 * @class PizzaApi
 * @extends {BaseAPI}
 */
export class PizzaApi extends BaseAPI {
    /**
     * Get all available pizzas
     * @summary Get all pizzas
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PizzaApi
     */
    public getPizzas(options?: any) {
        return PizzaApiFp(this.configuration).getPizzas(options)(this.fetch, this.basePath);
    }

}
