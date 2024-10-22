import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { setup } from '@nuxt/test-utils'
import { isContact, isCustomer, isProduct } from '~/server/utils/types/type_guards'

describe('Typeguard Tests', async () => {

    test('Product typeguard tests', () => {
        let invalidProduct = {
            "type": "electronics",
            "part_number": "123456",
            "product_name": 100,
            "size": "5.5 inches",
            "amount_per_case": 20,
            "cases_per_pallet": 50,
            "cost_per_product": 300,
            "pallet_per_truck": 20,
            "unit_measure": "pcs",
            "note": "Includes charger and earphones.",
            "vendor_owned":"65de46bf9028fb366630f2da"
        }

        let vProduct = isProduct(invalidProduct)
        expect(vProduct.valid).to.equal(false)
        
        let validProduct = {
            "type": "electronics",
            "part_number": "123456",
            "product_name": "electronic",
            "size": "5.5 inches",
            "amount_per_case": 20,
            "cases_per_pallet": 50,
            "cost_per_product": 300,
            "pallet_per_truck": 20,
            "unit_measure": "pcs",
            "note": "Includes charger and earphones.",
            "vendor_owned":"65de46bf9028fb366630f2da"
        }

        vProduct = isProduct(validProduct)
        expect(vProduct.valid).to.equal(true)
        expect(vProduct.model).to.toStrictEqual(validProduct)

        let ovalidProduct = {
            "type": "electronics",
            "part_number": "123456",
            "product_name": "electronic",
            "size": "5.5 inches",
            "amount_per_case": 20,
            "cost_per_product": 300,
            "vendor_owned":"65de46bf9028fb366630f2da"
        }

        vProduct = isProduct(ovalidProduct)
        expect(vProduct.valid).to.equal(true)
        expect(vProduct.model).to.toStrictEqual(ovalidProduct)

    })

    test('Contact typeguard tests', () => {
        let invalidContact = {
            "name": "John Doe",
            "phone_number": "123-456-7890",
            "email": "johndoe@example.com",
            "title": 1,
            "note": "Available for contact during business hours."
        }

        let vContact = isContact(invalidContact)
        expect(vContact.valid).to.equal(false)
        
        let validContact = {
            "name": "John Doe",
            "phone_number": "123-456-7890",
            "email": "johndoe@example.com",
            "title": "Manager",
            "note": "Available for contact during business hours."
        }

        vContact = isContact(validContact)
        expect(vContact.valid).to.equal(true)
        expect(vContact.model).to.toStrictEqual(validContact)

        let ovalidContact = {
            "name": "John Doe",
            "phone_number": "123-456-7890",
            "email": "johndoe@example.com",
        }

        vContact = isContact(ovalidContact)
        expect(vContact.valid).to.equal(true)
        expect(vContact.model).to.toStrictEqual(ovalidContact)

    })

    test('Customer typeguard tests', () => {
        let invalidCustomer = {
            "name": "XYZ Corporation",
            "address": "456 Elm Street",
            "city": "Los Angeles",
            "state": 100,
            "zip": "90001",
            "billing_address": "456 Elm Street",
            "billing_city": "Los Angeles",
            "billing_state": "CA",
            "billing_zip": "90001",
            "note": "Regular client for electronic products.",
            "margin":.10
        }

        let vCustomer = isCustomer(invalidCustomer)
        expect(vCustomer.valid).to.equal(false)
        
        let validCustomer = {
            "name": "XYZ Corporation",
            "address": "456 Elm Street",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90001",
            "billing_address": "456 Elm Street",
            "billing_city": "Los Angeles",
            "billing_state": "CA",
            "billing_zip": "90001",
            "note": "Regular client for electronic products.",
            "margin":.10
        }

        vCustomer = isCustomer(validCustomer)
        expect(vCustomer.valid).to.equal(true)
        expect(vCustomer.model).to.toStrictEqual(validCustomer)

        let ovalidCustomer = {
            "name": "XYZ Corporation",
            "address": "456 Elm Street",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90001",
            "billing_address": "456 Elm Street",
            "billing_city": "Los Angeles",
            "billing_state": "CA",
            "billing_zip": "90001",
            "margin":.10
        }

        vCustomer = isCustomer(ovalidCustomer)
        expect(vCustomer.valid).to.equal(true)
        expect(vCustomer.model).to.toStrictEqual(ovalidCustomer)

    })
})