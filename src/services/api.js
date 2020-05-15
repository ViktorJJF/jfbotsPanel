import axios from "axios";

export default {
  listChatbotUsers: () => axios.get("/data/chatbotUsers.json"),
  //dishes
  getDishes: () => axios.get("https://jfbots.com/api/dishes"),
  createDish: (newItem) => axios.post("/api/dishes", newItem),
  updateDish: (id, newItem) => axios.put("/api/dishes/" + id, newItem),
  deleteDish: (id) => axios.delete("/api/dishes/" + id),
  //dishes types
  getDishesTypes: () => axios.get("https://jfbots.com/api/dishes-types"),
  createDishType: (newItem) => axios.post("/api/dishes-types", newItem),
  updateDishType: (id, newItem) =>
    axios.put("/api/dishes-types/" + id, newItem),
  deleteDishType: (id) => axios.delete("/api/dishes-types/" + id),
};
