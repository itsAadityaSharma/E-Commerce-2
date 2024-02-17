export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO : on server it will only return some info of user(not password)
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO : on server it will only return some info of user(not password)
    resolve({ data });
  });
}
export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO : on server it will only return some info of user(not password)
    resolve({ data: { id: itemId } });
  });
}

export function fetchItemByUserId(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export async function resetCart(userId) {
  //get all the items and then delete
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserId(userId);
    const items = response.data;
    // console.log(items);
    for (let item of items) {
      console.log("Item:" + item.id);
      await deleteCartItem(item.id);
    }
    resolve({ status: "success" });
  });
}
