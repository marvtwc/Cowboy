import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { Contact, Customer, Employee, Product, Quote, Vendor } from '~/server/models'
import mongoose from 'mongoose'
import { setup } from '@nuxt/test-utils'
import { config } from '@vue/test-utils'
import.meta.env.VITE_DB_URI;

describe('DB Tests', async () => {

    await setup({

    })
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.VITE_DB_URI + "")
            console.log("Connected with state: " + mongoose.connection.readyState)
        } catch (err) {
            console.error("DB connection failed", err);
        }
        return async () => {

        }
    })

    test('Test Connection', () => {

        expect(mongoose.connection.readyState).to.equal(1)
    })

    test('Add/Delete User', async () => {
        let user = {
            name: "TestUser",
            email: "testemail@email.com",
            username: "testuser",
            password: "password",
        }
        await Employee.create(user)

        let userFound = await Employee.find({ name: "TestUser" });

        expect(userFound.length).to.greaterThanOrEqual(1);

        await Employee.deleteMany({ name: "TestUser" });
        userFound = await Employee.find({ name: "TestUser" });
        expect(userFound.length).to.equal(0);
    })
    test('Add/Delete Product', async () => {


        let vendor = {
            "name": "ABC Electronics",
            "address": "123 Main Street",
            "city": "New York",
            "state": "NY",
            "zip": "10001",
            "note": "Main supplier of electronic components."
        }

        let vendorId = (await Vendor.create(vendor))._id

        let product = {
            "type": "electronics",
            "part_number": "123456",
            "product_name": "Smartphone",
            "size": "5.5 inches",
            "amount_per_case": 20,
            "cases_per_pallet": 50,
            "cost_per_product": 300,
            "pallet_per_truck": 20,
            "unit_measure": "pcs",
            "note": "Includes charger and earphones.",
            "vendor_owned": vendorId
        }

        await Product.create(product)

        let found = await Product.find({ part_number: "123456" });

        expect(found.length).to.greaterThanOrEqual(1);

        await Product.deleteMany({ part_number: "123456" });
        found = await Product.find({ part_number: "123456" });
        expect(found.length).to.equal(0);

        await Vendor.deleteOne({_id:vendorId})

    })

    test('Add/Delete Contact', async () => {
        let contact = {
            "name": "John Doe",
            "phone_number": "123-456-7890",
            "email": "johndoe@example.com",
            "title": "Sales Manager",
            "note": "Available for contact during business hours."
        }

        let contactId = (await Contact.create(contact))._id

        let found = await Contact.find({ _id: contactId });

        expect(found.length).to.greaterThanOrEqual(1);

        await Contact.deleteMany({ _id: contactId });
        found = await Contact.find({ _id: contactId });
        expect(found.length).to.equal(0);
    })

    test('Add/Delete Vendor', async () => {
        let vendor = {
            "name": "ABC Electronics",
            "address": "123 Main Street",
            "city": "New York",
            "state": "NY",
            "zip": "10001",
            "note": "Main supplier of electronic components."
        }

        let vendorId = (await Vendor.create(vendor))._id

        let found = await Vendor.find({ _id: vendorId });

        expect(found.length).to.greaterThanOrEqual(1);

        await Vendor.deleteMany({ _id: vendorId });
        found = await Vendor.find({ _id: vendorId });
        expect(found.length).to.equal(0);
    })

    test('Add/Delete Vendor with Contact', async () => {
        let vendor = {
            "name": "ABC Electronics",
            "address": "123 Main Street",
            "city": "New York",
            "state": "NY",
            "zip": "10001",
            "note": "Main supplier of electronic components."
        }

        let vendorCreated = (await Vendor.create(vendor))

        let contact = {
            "name": "John Doe",
            "phone_number": "123-456-7890",
            "email": "johndoe@example.com",
            "title": "Sales Manager",
            "note": "Available for contact during business hours."
        }

        let contactId = (await Contact.create(contact))._id

        //add one contactId to vendor we created
        await Vendor.updateOne({ _id: vendorCreated._id }, { $push: { contacts: contactId } });

        let found = await Vendor.find({ _id: vendorCreated._id }).populate('contacts');
        expect(found.length).to.greaterThanOrEqual(1);

        await Vendor.deleteMany({ _id: vendorCreated._id });
        found = await Vendor.find({ _id: vendorCreated._id });
        expect(found.length).to.equal(0);

        await Contact.deleteMany({ _id: contactId })
        found = await Contact.find({ _id: contactId })
        expect(found.length).to.equal(0);
    })

    test('Add/Delete Customer', async () => {
        let customer = {
            "name": "XYZ Corporation",
            "address": "456 Elm Street",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90001",
            "billing_address": "456 Elm Street",
            "billing_city": "Los Angeles",
            "billing_state": "CA",
            "billing_zip": "90001",
            "note": "Regular client for electronic products."
        }

        let customerId = (await Customer.create(customer))._id

        let found = await Customer.find({ _id: customerId });

        expect(found.length).to.greaterThanOrEqual(1);

        await Customer.deleteMany({ _id: customerId });
        found = await Customer.find({ _id: customerId });
        expect(found.length).to.equal(0);
    })

    test('Add/Delete Quote with Vendor/Customer/Product', async () => {
        let vendor = {
            "name": "ABC Electronics",
            "address": "123 Main Street",
            "city": "New York",
            "state": "NY",
            "zip": "10001",
            "note": "Main supplier of electronic components."
        }
        let customer = {
            "name": "XYZ Corporation",
            "address": "456 Elm Street",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90001",
            "billing_address": "456 Elm Street",
            "billing_city": "Los Angeles",
            "billing_state": "CA",
            "billing_zip": "90001",
            "note": "Regular client for electronic products."
        }
        let product1 = {
            "type": "electronics",
            "part_number": "123456",
            "product_name": "Smartphone",
            "size": "5.5 inches",
            "amount_per_case": 20,
            "cases_per_pallet": 50,
            "cost_per_product": 300,
            "pallet_per_truck": 20,
            "unit_measure": "pcs",
            "note": "Includes charger and earphones.",
            "vendor_owned":""
        }
        let product2 = {
            "type": "clothing",
            "part_number": "987654",
            "product_name": "T-Shirt",
            "size": "Medium",
            "amount_per_case": 50,
            "cases_per_pallet": 100,
            "cost_per_product": 10,
            "pallet_per_truck": 30,
            "unit_measure": "pcs",
            "note": "Various colors available.",
            "vendor_owned":""
        }

        let vendorId = (await Vendor.create(vendor))._id
        let customerId = (await Customer.create(customer))._id

        product1.vendor_owned = vendorId
        product2.vendor_owned = vendorId

        let productId1 = (await Product.create(product1))
        let productId2 = (await Product.create(product2))

        let quote = {
            vendor: vendorId,
            customer: customerId,
            quote_content: [
                {
                    product: productId1._id,
                    quantity: 2
                },
                {
                    product: productId2._id,
                    quantity: 3
                }]
        }

        let quoteId = (await Quote.create(quote))._id;
        //.populate("customer").populate({path:"quote_content"}).exec()

        let found = await (Quote.findOne({_id:quoteId}).populate<{
            vendor: mongoose.Types.Subdocument<VendorModel>,
            customer: mongoose.Types.Subdocument<CustomerModel>,
            quote_content: mongoose.Types.ArraySubdocument<QuoteContentsModel>}>([
                "vendor","customer",
                {
                    path: "quote_content",
                    populate: {path:"product"},
                    options: { sort: {'quantity':-1}}
                }]));
        
        if(found){
            let foundVendor = found.vendor._id;
            let foundCustomer = found.customer._id;
            let foundProduct1 = found.quote_content.at(0).product._id;
            let foundProduct2 = found.quote_content.at(1).product._id;

            expect(foundVendor.toString()).to.equal(vendorId.toString());
            expect(foundCustomer.toString()).to.equal(foundCustomer.toString());
            expect(foundProduct1.toString()).to.equal(productId1._id.toString());
            expect(foundProduct2.toString()).to.equal(productId2._id.toString());

        }

        await Vendor.deleteOne({_id:vendorId})
        await Customer.deleteOne({_id:customerId})
        await Product.deleteOne({_id:productId1})
        await Product.deleteOne({_id:productId2})
        await Quote.deleteOne({_id:quoteId})

    })
    //TODO:: add vendorOrderModel Test
    //TODO:: add PackingSlipModel Test


    afterAll(async () => {

        mongoose.disconnect()
    })
})

