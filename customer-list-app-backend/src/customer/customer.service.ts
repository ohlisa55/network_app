// a controller will only carry out the functionality of handling HTTP requests from the frontend
// and delegate the complex tasks to services.
// This file holds all the logic as regards database interaction for creating and updating every details of a new customer

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }
    // fetch all customers
    // To retrieve and return the list of customers from the database
    async getAllCustomer(): Promise<Customer[]> {
        const customers = await this.customerModel.find().exec();
        return customers;
    }
    // Get a single customer
    // It takes customerID as a parameter and based on that,
    // it will search and return the details of a user identified by that ID
    async getCustomer(customerID): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID).exec();
        return customer;
    }
    // post a single customer
    // used to add a new customer to the database
    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = await this.customerModel(createCustomerDTO);
        return newCustomer.save();
    }
    // Edit customer details
    // This method also takes the ID of a customer as an argument and
    // will be used to edit and update the details of such customer in the database.
    async updateCustomer(customerID, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.customerModel
            .findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }
    // Delete a customer
    // this will be used to delete the details of a particular customer completely from the database.
    async deleteCustomer(customerID): Promise<any> {
        const deletedCustomer = await this.customerModel.findByIdAndRemove(customerID);
        return deletedCustomer;
    }
}
