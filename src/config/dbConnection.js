import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb+srv://gabrieltollan:<Gabriel1987>@cluster0.m6bxmyo.mongodb.net/?retryWrites=true&w=majority");
  console.log("mongodb+srv://gabrieltollan:<Gabriel1987>@cluster0.m6bxmyo.mongodb.net/?retryWrites=true&w=majority");
} catch (error) {
    console.log(`Hubo un error conectandose a la base ${error}`);
}