"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";
import mongoose from "mongoose";
import Category from "@/models/Category";

/*
CREATE PRODUCT
*/

export async function createProduct(data) {

try {

await connectDB();

console.log("PRODUCT DATA RECEIVED:", data);

if(!data.image){
return { error:"Image required" };
}

if(!data.category){
return { error:"Category required" };
}

const slug =
slugify(data.name,{ lower:true }) +
"-" +
Date.now();

const product = await Product.create({

name:data.name,
slug,
description:data.description || "",
actualPrice:Number(data.actualPrice),
sellingPrice:Number(data.sellingPrice),
image:data.image,
category:data.category,
isFeatured:data.isFeatured ?? false,
isVisible:data.isVisible ?? true

});

console.log("PRODUCT CREATED:", product);

return { success:true };

} catch(err){

console.log("CREATE ERROR:", err);

return { error:"Server error" };

}

}

/*
GET ALL PRODUCTS
*/

export async function getProducts(){

await connectDB();

return Product.find()
.select(
"name description sellingPrice actualPrice profitPerItem image category isVisible isFeatured"
)

.populate("category","name")

.sort({ createdAt:-1 })

.lean();

}


/*
DELETE PRODUCT
*/

export async function deleteProduct(id){

await connectDB();

await Product.findByIdAndDelete(id);

return { success:true };

}


/*
TOGGLE FEATURED / VISIBILITY
*/

export async function toggleProductField(
id,
field,
value
){

await connectDB();

await Product.findByIdAndUpdate(id,{
[field]:value
});

return { success:true };

}


/*
GET SINGLE PRODUCT
*/

export async function getSingleProduct(id){

await connectDB();

if(!mongoose.Types.ObjectId.isValid(id)){
return null;
}

return Product.findById(id)

.populate("category","name")

.lean();

}


/*
UPDATE PRODUCT
*/

export async function updateProduct(id,data){

await connectDB();

await Product.findByIdAndUpdate(

id,

{

name:data.name,

description:data.description,

actualPrice:data.actualPrice,

sellingPrice:data.sellingPrice,

image:data.image,

category:data.category,

isFeatured:data.isFeatured,

isVisible:data.isVisible

},

{ new:true }

);

return { success:true };

}

/*
GET FEATURED PRODUCTS
*/

export async function getFeaturedProducts() {

await connectDB();

return Product.find({

isFeatured: true,
isVisible: true

})

.select("name sellingPrice image slug")

.limit(6)

.lean();

}