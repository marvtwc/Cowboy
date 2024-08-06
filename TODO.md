## Notes

- Product Combobox doesn't update initial value for the guy parent guy
- New Order collapsible opens and closes when qty or margin
- New Order check for negative values (Margin, QTY)
- Fix Z index of popups (replace with radix-vue)
- Add margin to calculation in invoice and quotes i guess
- Finish order flows (Edit Quote Details)

- Sizing issues/Too many columns?
- Hide Columns or truncation

- Issue with creating contacts before a vendor or customer is created
  Don't have the id to create contacts with
  Possible Solutions:
  - Get all the data gathered first, then create vendor then contacts with aquired vendor id
    Maybe have a helper api endpoint that takes in a list of contacts to be created
  - Somehow get next id to be generated (Seems too hard)

**_ DUE TODAY _**
[x] Check if products have specific vendors
[ ] Clear data - Make more presentable
[ ] Fix breadcrumbs

- [ ] Fix flow for creating an order
      [ ] Create better product selection screen
      [ ] Create better layout for accessory inputs (Vendor?, Margin, Customer, PO Number)
- [ ] Fix the order product selection screen
      [ ] Find inspiration
      [ ] Think of new UI Design for better product selection and searching/filtering
- Orders Page:
  [ ] Look at orders for employees
  [ ] Create order for specific customer
  [ ] ui cards

- Order Details:
  [ ] PO Number
  [ ] For Customer
  [ ] Subtotal
  [ ] Notes

- Quote Details:
  [ ] Edit Quote
  [ ] Generate Quote Preview

- New Quote:
  [ ] PO Number
  [ ] Add Filter, Search, Sort, More Product Info
  [ ] Fix layout

- Generate Quote:
  [ ] Get PDF

---

--- TODO LATER ---

---

General:
[ ] Make sure every page looks good

- [ ] Create contact UI system
      [ ] Dropdown ComboBox
      [ ] Create new contact
      [ ] Contact list

- General:
- [x] Fix wonky tables
- [ ] Refactor State Management with Pinia?
      [ ] Customer
      [ ] Employees
      [ ] Invoices
      [x] Orders
      [ ] Products
      [ ] Quotes
      [ ] Vendors
- [ ] Fix all the easy layout issues
      [x] Forms
      [ ] Max width on scren sizes
- [x] Contact Integration (Pinia?)
      [x] Customer
      [x] Vendor

Product:
[ ] More user friendly

Vendors:
[ ] Contacts

Customer:
[x] Fix layout

Contractors:
[ ] Assign Employees

## Important - Urgent

[ ] Table Controls
[ ] Searchbar
[ ] Filtering Options
[ ] Emailing system

## Not Important - Urgent

[ ] Find the remaining tables
[ ] Error handling when fetching data
[ ] Error handling props and component renders
[ ] Typescript overhaul on every component
[ ] Data export and import? (Excel/Google Sheets)

## Important - Not Urgent

[ ] Figure out how to maintain realtime reactivity with database/server (Polling?)

- MongoDB change events, Mongoose watch
- Mongoose Middleware (More Research Required)
- Sockets (Socket.io)
- 3rd Party (Pusher)
  [ ] Design Dashboard
  [ ] Design Analytics

## Not Important - Not Urgent

[ ] Add Customer Dialog fix margin and contacts fieldset margin error
[ ] Fix table header dropdown icons (Products)
