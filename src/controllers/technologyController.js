import { getAllTech, getTechById, rentTechById, reviewTechById, createNewProduct, updateProduct, deleteProduct } from "../services/technologyService.js";

export async function getAllTechHandler(req, res) {
    const tech = await getAllTech();
    res.status(200).json(tech);
}

export async function getTechByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const tech = await getTechById(id);
  res.status(200).json(tech);
}

export async function rentTechByIdHandler(req, res) {
  const userId = req.user.id;

  const product_id = parseInt(req.params.id);
  const product = await rentTechById(product_id, userId);

  res.status(200).json(product);
}


export async function reviewTechByIdHandler(req, res) {
  const rating = req.body.rating;

  const product_id = parseInt(req.params.id);
  const product = await reviewTechById(product_id, rating);

  res.status(200).json(product);
}


export async function createTechnologyHandler(req, res) {
  const {product_name, category, availability, product_year, avg_rating, total_reviews} = req.body;
  const newProduct = await createNewProduct({product_name, category, availability: Number(availability), product_year: Number(product_year), avg_rating, total_reviews});
  res.status(201).json(newProduct);
}

export async function updateTechnologyHandler(req, res) {
  const id = parseInt(req.params.id);
  let {product_name, category, availability, product_year, avg_rating, total_reviews} = req.body;

  if(availability){
    availability = Number(availability);
  }

  if(product_year){
    product_year = Number(product_year);
  }

  const newProduct = await updateProduct(id, {product_name, category, availability, product_year, avg_rating, total_reviews});
  res.status(200).json(newProduct);
}

export async function deleteProductHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteProduct(id);
  res.status(204).send();
}

