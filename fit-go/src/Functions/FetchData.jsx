import { v4 as uuidv4 } from "uuid";

const address = "https://fit-go.herokuapp.com"
const headers = { 'Content-Type': 'application/json' }

/*
    Get users that match these optional filters : 
    location, warehouse, item
    
    return an array of users
*/
export async function getUsers() {
    let users = [];
    let url = new URL(address + '/users');

    // getting the full format to retrieve quantity
    // url.searchParams.append("format","full");

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    users = await response.json();
    return users
}

/*
    Get items quantity for items that match following optional filters : 
    item, warehouse, location

    return the number of items that match the filters
*/
export async function getItemsQuantity( item = "", warehouse = "", location = "") {
    let quantity = 0;
    let url = new URL(address + '/records/itemsQuantity');

    //adding optional filters
    if(location !== "") { url.searchParams.append("location",location); }
    if(warehouse !== "") { url.searchParams.append("warehouse",warehouse); }
    if(location !== "") { url.searchParams.append("item",item); }

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    quantity = await response.json();
    return quantity.data.itemsQuantity
}

/*
    Get lists of
    item, warehouse, location

    return a json with 3 arrays
*/
export async function getLists() {
    let warehouses = [];
    let locations = [];
    let items = [];
    let url = new URL(address + '/records');
    url.searchParams.append("format","small");

    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: headers
        });
        let ret = await response.json(); // Get array of each warehouse

        // getting the unique value array for warehouses locations and items
        warehouses= [...new Set(ret.data.map(e => e.warehouse))];
        locations = [...new Set(ret.data.map(e => e.location))];
        items= [...new Set(ret.data.map(e => e.item))];

    } catch (error) {
        console.error(error);
    }

    const result = {
        warehouses: warehouses,
        locations: locations,
        items: items
    }


    if(items.length === 0)
        return null;

    return result;
}

/*
    Create a new record based on :
    item, warehouse, location and quantity

    return the result of the request
*/
export async function postRecord( item, warehouse, location, quantity) {
    let url = new URL(address + '/users');

    console.log(parseInt(quantity , 10 ) );

    const response = await fetch(url,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "warehouse": warehouse,
            "item": item,
            "location": location,
            "quantity": parseInt(quantity , 10 ),
            "loginCode": "1",
            "type": "out",
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "id": uuidv4(),
        })
    });

    return await response.json()
}

export async function createTable(lists) {
    let max = 40
    let i = 0
    let promiseTable = []
    let dataTable = []
    await lists.items.map(async item => {
        await lists.warehouses.map(async warehouse => {
            await lists.locations.map(async location =>{
                i = i + 1;
                if (i <= max) {
                    let quantity = getItemsQuantity(item,warehouse,location)
                    promiseTable.push(quantity);
                    dataTable.push({
                        quantity: await quantity,
                        item: item,
                        warehouse: warehouse,
                        location: location
                    })
                } else {
                    dataTable.push({
                        quantity: 0,
                        item: item,
                        warehouse: warehouse,
                        location: location
                    })
                }
            })
        })
    })
    await Promise.all(promiseTable)
    dataTable.reverse()
    return dataTable;
}
